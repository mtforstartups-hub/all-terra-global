import { test, expect } from '@playwright/test';
import { deleteTestUser } from '../helpers/db';
import fs from 'fs/promises';
import path from 'path';

const TEST_EMAIL = `testuser-${Date.now()}@example.com`;
const TEST_PASSWORD = 'TestPassword123!';
const LOG_FILE = path.join(process.cwd(), 'test-emails.json');

interface EmailAttachment {
  filename: string;
  content?: string | Buffer;
  path?: string;
}

interface EmailLog {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from: string;
  attachments?: EmailAttachment[];
  _interceptedAt: string;
  _originalTo: string | string[];
}

// Helper to wait for a specific email in the log file
async function waitForEmail(subjectIncludes: string, maxWaitMs = 15000): Promise<EmailLog> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    try {
      const content = await fs.readFile(LOG_FILE, 'utf-8');
      const lines = content.split('\n').filter((l) => l.trim().length > 0);
      const emails: EmailLog[] = lines.map((l) => JSON.parse(l));
      const found = emails.find((e) => e.subject.includes(subjectIncludes));
      if (found) return found;
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
      // File might not exist yet, ignore
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Email with subject "${subjectIncludes}" not found within ${maxWaitMs}ms`);
}

test.beforeAll(async () => {
  await deleteTestUser(TEST_EMAIL);
  // Clear the log file before tests
  try {
    await fs.unlink(LOG_FILE);
  } catch (err) {}
});

test.afterAll(async () => {
  await deleteTestUser(TEST_EMAIL);
  // Optional: clear log file after test
});

test('Complete Signup Flow with Email Verification and NDA Sign', async ({ page }) => {
  test.setTimeout(90000); // 90 seconds for full end-to-end flow

  // --- Step 1: Sign Up ---
  await page.goto('/');
  await page.getByRole('button', { name: 'Register & Invest' }).first().click();

  await page.locator('div.flex.border-b.border-gray-100 button:has-text("Register")').click();

  const registrationForm = page.locator('form').filter({ hasText: 'Confirm Password' });
  await registrationForm.locator('input[name="fullname"]').fill('Playwright Test User');
  await registrationForm.locator('input[name="company"]').fill('Testing Inc');
  await registrationForm.locator('.phone-input-container input').fill('+12345678900');
  await registrationForm.locator('select[name="amount"]').selectOption({ index: 1 });
  await registrationForm.locator('input[name="investment_interest"]').first().check();
  
  await registrationForm.locator('input[name="email"]').fill(TEST_EMAIL);
  await registrationForm.locator('input[name="password"]').fill(TEST_PASSWORD);
  await registrationForm.locator('input[name="confirmPassword"]').fill(TEST_PASSWORD);

  await registrationForm.locator('button:has-text("Create Account")').click();
  await expect(page.getByText('Verification Link Sent')).toBeVisible();

  // --- Step 2: Email Verification ---
  // Wait for the verification email to hit our mock logger
  const verificationEmail = await waitForEmail('Verify your All-Terra Global account');
  
  // Verify it was correctly identified as a test email
  expect(verificationEmail._originalTo).toBe(TEST_EMAIL);

  // Extract the verification link from the HTML body
  // better-auth emails contain a link like: href="http://localhost:3000/api/auth/verify-email?token=..."
  const urlMatch = verificationEmail.html.match(/href="([^"]+verify-email\?token=[^"]+)"/);
  expect(urlMatch).not.toBeNull();
  const verificationLink = urlMatch![1];

  // Navigate to the verification link
  await page.goto(verificationLink);
  
  // Wait for redirection after verification
  await page.waitForURL('**/*', { timeout: 15000 });
  
  if (!page.url().includes('/dashboard')) {
    // If not auto redirected, login
    await page.goto('/');
    const loginBtn = page.getByRole('button', { name: 'Login' }).first();
    await loginBtn.click();
    
    const loginForm = page.locator('form').filter({ hasText: 'Forgot password?' });
    await loginForm.locator('input[name="email"]').fill(TEST_EMAIL);
    await loginForm.locator('input[name="password"]').fill(TEST_PASSWORD);
    await loginForm.getByRole('button', { name: 'Sign In' }).click();
    await expect(loginForm).toBeHidden();
  }

  // --- Step 3: Check Admin Notification ---
  const adminNotification = await waitForEmail('New Registration: Playwright Test User');
  expect(adminNotification._originalTo).toBeDefined();

  // --- Step 4: NDA Interceptor ---
  // We need to wait for the header to re-render with the Dashboard link if we aren't already there
  if (!page.url().includes('/dashboard')) {
    const dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    await expect(dashboardLink).toBeVisible({ timeout: 10000 });
    await dashboardLink.click();
  }
  await page.waitForURL('**/dashboard');
  
  await expect(page.getByText('Action Required: Sign NDA')).toBeVisible();
  await page.getByRole('button', { name: 'Proceed to Sign' }).click();

  // --- Step 5: Sign NDA (PDF Workflow) ---
  await page.waitForURL('**/sign-nda');

  const sidebar = page.locator('aside');
  await sidebar.locator('input[name="fullName"]').fill('Playwright Test User');
  await sidebar.locator('input[name="address"]').fill('123 Test Ave, Testing City');
  await sidebar.getByRole('button', { name: 'Type', exact: true }).click();
  await sidebar.locator('input[placeholder="Enter your full name"]').fill('Playwright Test User');
  await sidebar.locator('button[value="preview"]').click();

  const signButton = sidebar.locator('button[value="sign"]');
  await expect(signButton).toBeEnabled({ timeout: 15000 });
  await signButton.click();

  // --- Step 6: Final Dashboard Access ---
  await page.waitForURL('**/dashboard**');
  await expect(page.getByText('Playwright Test User').first()).toBeVisible({ timeout: 20000 });
  await expect(page.getByText('Verifying Signature')).toBeHidden();
  
  // --- Step 7: Check Signed Documents Emails ---
  // User Confirmation
  const userNdaEmail = await waitForEmail('Your Signed NDA – All-Terra Global');
  expect(userNdaEmail._originalTo).toBe(TEST_EMAIL);
  expect(userNdaEmail.attachments).toBeDefined();
  expect(userNdaEmail.attachments?.[0].filename).toBe('NDA-AllTerraGlobal-Signed.pdf');

  // Admin Notification
  const adminNdaEmail = await waitForEmail('NDA Signed – Playwright Test User');
  expect(adminNdaEmail._originalTo).toBeDefined();
  expect(adminNdaEmail.attachments).toBeDefined();
});