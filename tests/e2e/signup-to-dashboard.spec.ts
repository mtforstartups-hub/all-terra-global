import { test, expect } from '@playwright/test';
import { verifyUserEmail, deleteTestUser } from '../helpers/db';

const TEST_EMAIL = `testuser-${Date.now()}@example.com`;
const TEST_PASSWORD = 'TestPassword123!';

test.beforeAll(async () => {
  await deleteTestUser(TEST_EMAIL);
});

test.afterAll(async () => {
  await deleteTestUser(TEST_EMAIL);
});

test('Signup to Dashboard Access Workflow', async ({ page }) => {
  test.setTimeout(60000); // 60s timeout since this flow has artificial delays

  // --- Step 1: Sign Up ---
  await page.goto('/');
  await page.getByRole('button', { name: 'Register & Invest' }).first().click();

  // Switch to Register tab within the modal
  await page.locator('div.flex.border-b.border-gray-100 button:has-text("Register")').click();

  // Fill Registration Form
  const registrationForm = page.locator('form').filter({ hasText: 'Confirm Password' });
  await registrationForm.locator('input[name="fullname"]').fill('Playwright Test User');
  await registrationForm.locator('input[name="company"]').fill('Testing Inc');
  
  // Phone input
  await registrationForm.locator('.phone-input-container input').fill('+12345678900');
  
  // Select Amount
  await registrationForm.locator('select[name="amount"]').selectOption({ index: 1 });
  
  // Select first Investment Interest
  await registrationForm.locator('input[name="investment_interest"]').first().check();
  
  // Email and Passwords
  await registrationForm.locator('input[name="email"]').fill(TEST_EMAIL);
  await registrationForm.locator('input[name="password"]').fill(TEST_PASSWORD);
  await registrationForm.locator('input[name="confirmPassword"]').fill(TEST_PASSWORD);

  // Submit Registration
  await registrationForm.locator('button:has-text("Create Account")').click();

  // Assert Success Screen is visible
  await expect(page.getByText('Verification Link Sent')).toBeVisible();

  // --- Step 2: Bypass Verification ---
  await verifyUserEmail(TEST_EMAIL);

  // --- Step 3: Log In ---
  // Click "Continue to Login" on the success screen
  await page.getByRole('button', { name: 'Continue to Login' }).click();

  // Fill Login Form - Scope to the form that contains "Forgot password?"
  const loginForm = page.locator('form').filter({ hasText: 'Forgot password?' });
  await loginForm.locator('input[name="email"]').fill(TEST_EMAIL);
  await loginForm.locator('input[name="password"]').fill(TEST_PASSWORD);
  
  // Click Sign In and wait for the modal to close
  await loginForm.getByRole('button', { name: 'Sign In' }).click();
  await expect(loginForm).toBeHidden();

  // --- Step 4: NDA Interceptor ---
  // The app doesn't auto-redirect, so we navigate manually.
  // We wait for the "Dashboard" link to appear in the header (after session update)
  const dashboardLink = page.getByRole('link', { name: 'Dashboard' });
  await expect(dashboardLink).toBeVisible({ timeout: 10000 });
  
  // Use a retry-safe click for the dashboard link
  await dashboardLink.click();

  // Wait for navigation to /dashboard
  await page.waitForURL('**/dashboard');
  
  // The NdaModal should appear, blocking the dashboard
  await expect(page.getByText('Action Required: Sign NDA')).toBeVisible();
  await page.getByRole('button', { name: 'Proceed to Sign' }).click();

  // --- Step 5: Sign NDA (PDF Workflow) ---
  // Arrive at /sign-nda (might take 1.5s as per setTimeout in code)
  await page.waitForURL('**/sign-nda');

  // Scope to the desktop sidebar to avoid strict mode violations with the mobile bottom sheet
  const sidebar = page.locator('aside');
  await sidebar.locator('input[name="fullName"]').fill('Playwright Test User');
  await sidebar.locator('input[name="address"]').fill('123 Test Ave, Testing City');
  
  // Ensure the Type tab is active
  await sidebar.getByRole('button', { name: 'Type', exact: true }).click();
  // Type in the signature
  await sidebar.locator('input[placeholder="Enter your full name"]').fill('Playwright Test User');

  // Click Preview Document (value="preview")
  await sidebar.locator('button[value="preview"]').click();

  // Wait for the Sign Document button to become enabled
  const signButton = sidebar.locator('button[value="sign"]');
  await expect(signButton).toBeEnabled({ timeout: 15000 });
  await signButton.click();

  // --- Step 6: Final Dashboard Access ---
  // Redirected to /dashboard?event=signing_complete
  await page.waitForURL('**/dashboard**');
  
  // The "Verifying Signature" modal might appear briefly or be skipped if the DB update is fast.
  // We'll wait for the dashboard to be unblurred and the username to appear.
  await expect(page.getByText('Playwright Test User').first()).toBeVisible({ timeout: 20000 });
  await expect(page.getByText('Verifying Signature')).toBeHidden();

  // Assert Dashboard Header has the user's name
  await expect(page.getByText('Playwright Test User').first()).toBeVisible();
});
