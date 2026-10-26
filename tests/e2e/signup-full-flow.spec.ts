import { test, expect } from "@playwright/test";
import {
  assertLocalDatabase,
  deleteTestUser,
  userExists,
  verifyUserEmail,
} from "../helpers/db";
import fs from "fs/promises";
import path from "path";

// Real-mail mode: `bun run test:e2e:smtp` (sets E2E_REAL_EMAIL=true).
// Emails are NOT intercepted - they leave over SMTP (EMAIL_PROVIDER=smtp) from
// EMAIL_USER, with admin notices going to ADMIN_EMAIL. Verification is done by
// flipping emailVerified in the local DB instead of parsing an inbox.
const REAL_EMAIL = process.env.E2E_REAL_EMAIL === "true";

function resolveRecipient(): string {
  if (!REAL_EMAIL) return `testuser-${Date.now()}@example.com`;

  const email = process.env.E2E_EMAIL?.trim() || process.env.EMAIL_USER?.trim();
  if (!email) {
    throw new Error(
      "E2E_REAL_EMAIL=true requires E2E_EMAIL (or EMAIL_USER) in .env",
    );
  }
  return email;
}

const TEST_EMAIL = resolveRecipient();
const TEST_NAME = REAL_EMAIL ? "E2E Signup Test" : "Playwright Test User";
const TEST_PASSWORD = "TestPassword123!";
const LOG_FILE = path.join(process.cwd(), "test-emails.json");

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
async function waitForEmail(
  subjectIncludes: string,
  maxWaitMs = 15000,
): Promise<EmailLog> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    try {
      const content = await fs.readFile(LOG_FILE, "utf-8");
      const lines = content.split("\n").filter((l) => l.trim().length > 0);
      const emails: EmailLog[] = lines.map((l) => JSON.parse(l));
      const found = emails.find((e) => e.subject.includes(subjectIncludes));
      if (found) return found;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
        throw err;
      }
      // File might not exist yet, ignore
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(
    `Email with subject "${subjectIncludes}" not found within ${maxWaitMs}ms`,
  );
}

test.beforeAll(async () => {
  // Safety net: never create/delete rows outside the local dev database.
  assertLocalDatabase();

  if (REAL_EMAIL) {
    if (process.env.EMAIL_PROVIDER !== "smtp") {
      throw new Error(
        "E2E_REAL_EMAIL=true expects EMAIL_PROVIDER=smtp in .env, otherwise Resend is used.",
      );
    }
    if (await userExists(TEST_EMAIL)) {
      throw new Error(
        `${TEST_EMAIL} already exists in the local DB. Set E2E_EMAIL to a fresh address.`,
      );
    }
    return;
  }

  await deleteTestUser(TEST_EMAIL);
  // Clear the log file before tests
  try {
    await fs.unlink(LOG_FILE);
  } catch (err) {
    // File may not exist on first run - this is expected
  }
});

test.afterAll(async () => {
  await deleteTestUser(TEST_EMAIL);
});

test("Complete Signup Flow with Email Verification and NDA Sign", async ({
  page,
}) => {
  test.setTimeout(90000); // 90 seconds for full end-to-end flow

  // --- Step 1: Sign Up ---
  await page.goto("/");
  await page.getByRole("button", { name: "Register & Invest" }).first().click();

  await page
    .locator('div.flex.border-b.border-gray-100 button:has-text("Register")')
    .click();

  const registrationForm = page
    .locator("form")
    .filter({ hasText: "Confirm Password" });
  await registrationForm
    .locator('input[name="fullname"]')
    .fill(TEST_NAME);
  await registrationForm.locator('input[name="company"]').fill("Testing Inc");
  await registrationForm
    .locator(".phone-input-container input")
    .fill("+12345678900");
  await registrationForm
    .locator('select[name="amount"]')
    .selectOption({ index: 1 });
  await registrationForm
    .locator('input[name="investment_interest"]')
    .first()
    .check();

  await registrationForm.locator('input[name="email"]').fill(TEST_EMAIL);
  await registrationForm.locator('input[name="password"]').fill(TEST_PASSWORD);
  await registrationForm
    .locator('input[name="confirmPassword"]')
    .fill(TEST_PASSWORD);

  await registrationForm.locator('button:has-text("Create Account")').click();
  await expect(page.getByText("Verification Link Sent")).toBeVisible();

  // --- Step 2: Email Verification ---
  // Mock mode: the message was intercepted into test-emails.json - read the link from there.
  // Real mode: the message really went out over SMTP, so mark the user verified in the
  // local DB instead of parsing an inbox (the link is also waiting in E2E_EMAIL's mailbox).
  let verificationLink: string | null = null;

  if (REAL_EMAIL) {
    await verifyUserEmail(TEST_EMAIL);
    console.log(`[e2e] Verification email sent via SMTP to ${TEST_EMAIL}`);
  } else {
    const verificationEmail = await waitForEmail(
      "Verify your All-Terra Global account",
    );

    // Verify it was correctly identified as a test email
    expect(verificationEmail._originalTo).toBe(TEST_EMAIL);

    // Extract the verification link from the HTML body
    // better-auth emails contain a link like: href="http://localhost:3000/api/auth/verify-email?token=..."
    const urlMatch = verificationEmail.html.match(
      /href="([^"]+verify-email\?token=[^"]+)"/,
    );
    expect(urlMatch).not.toBeNull();
    verificationLink = urlMatch![1];
  }

  // Navigate to the verification link (mock mode only)
  if (verificationLink) {
    await page.goto(verificationLink);
    await page.waitForURL("**/*", { timeout: 15000 });
  }

  if (!page.url().includes("/dashboard")) {
    // If not auto redirected, login
    await page.goto("/");
    const loginBtn = page.getByRole("button", { name: "Login" }).first();
    await loginBtn.click();

    const loginForm = page
      .locator("form")
      .filter({ hasText: "Forgot password?" });
    await loginForm.locator('input[name="email"]').fill(TEST_EMAIL);
    await loginForm.locator('input[name="password"]').fill(TEST_PASSWORD);
    await loginForm.getByRole("button", { name: "Sign In" }).click();
    await expect(loginForm).toBeHidden();
  }

  // --- Step 3: Check Admin Notification ---
  if (REAL_EMAIL) {
    console.log(
      `[e2e] Admin notification should arrive at ${process.env.ADMIN_EMAIL}`,
    );
  } else {
    const adminNotification = await waitForEmail(
      `New Registration: ${TEST_NAME}`,
    );
    expect(adminNotification._originalTo).toBeDefined();
  }

  // --- Step 4: NDA Interceptor ---
  // We need to wait for the header to re-render with the Dashboard link if we aren't already there
  if (!page.url().includes("/dashboard")) {
    const dashboardLink = page.getByRole("link", { name: "Dashboard" });
    await expect(dashboardLink).toBeVisible({ timeout: 10000 });
    await dashboardLink.click();
  }
  await page.waitForURL("**/dashboard");

  await expect(page.getByText("Action Required: Sign NDA")).toBeVisible();
  await page.getByRole("button", { name: "Proceed to Sign" }).click();

  // --- Step 5: Sign NDA (PDF Workflow) ---
  await page.waitForURL("**/sign-nda");

  const sidebar = page.locator("aside");
  await sidebar.locator('input[name="fullName"]').fill(TEST_NAME);
  await sidebar
    .locator('input[name="address"]')
    .fill("123 Test Ave, Testing City");
  await sidebar.getByRole("button", { name: "Type", exact: true }).click();
  await sidebar
    .locator('input[placeholder="Enter your full name"]')
    .fill(TEST_NAME);
  await sidebar.locator('button[value="preview"]').click();

  const signButton = sidebar.locator('button[value="sign"]');
  await expect(signButton).toBeEnabled({ timeout: 15000 });
  await signButton.click();

  // --- Step 6: Final Dashboard Access ---
  await page.waitForURL("**/dashboard**");
  await expect(page.getByText(TEST_NAME).first()).toBeVisible({
    timeout: 20000,
  });
  await expect(page.getByText("Verifying Signature")).toBeHidden();

  // --- Step 7: Check Signed Documents Emails ---
  if (REAL_EMAIL) {
    console.log(
      `[e2e] Signed NDA email sent via SMTP to ${TEST_EMAIL}; admin copy to ${process.env.ADMIN_EMAIL}`,
    );
  } else {
    // User Confirmation
    const userNdaEmail = await waitForEmail(
      "Your Signed NDA – All-Terra Global",
    );
    expect(userNdaEmail._originalTo).toBe(TEST_EMAIL);
    expect(userNdaEmail.attachments).toBeDefined();
    expect(userNdaEmail.attachments?.[0].filename).toBe(
      "NDA-AllTerraGlobal-Signed.pdf",
    );

    // Admin Notification
    const adminNdaEmail = await waitForEmail(`NDA Signed – ${TEST_NAME}`);
    expect(adminNdaEmail._originalTo).toBeDefined();
    expect(adminNdaEmail.attachments).toBeDefined();
  }
});
