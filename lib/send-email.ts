import { resend } from "./auth";
import fs from "fs";
import path from "path";

/**
 * A wrapper around Resend's `resend.emails.send` that intercepts test emails.
 * If an email is directed to a test user or contains test identifiers,
 * it will be logged to `test-emails.json` and rerouted to `delivered@resend.dev`
 * to ensure successful API testing without using actual email sending quotas.
 */
export async function sendEmail(payload: any) {
  // Check if it's an E2E test email
  const isTestEmail =
    (typeof payload.to === "string" && payload.to.includes("testuser-")) ||
    (Array.isArray(payload.to) &&
      payload.to.some((email: string) => email.includes("testuser-"))) ||
    (typeof payload.html === "string" &&
      payload.html.includes("Playwright Test User")) ||
    (typeof payload.subject === "string" &&
      payload.subject.includes("Playwright Test User"));

  if (isTestEmail) {
    const logPath = path.join(process.cwd(), "test-emails.json");
    
    // Log the INTENDED destination before we potentially change it for a mock response
    const logEntry = {
      ...payload,
      _interceptedAt: new Date().toISOString(),
      _originalTo: payload.to,
    };
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + "\n");

    // If ENABLE_RESEND_TEST_API is "true", we actually hit the Resend API
    // using their official test address which doesn't count against limits.
    if (process.env.ENABLE_RESEND_TEST_API === "true") {
      payload.to = "delivered@resend.dev";
      // Clear CC/BCC to prevent accidental leakage during tests
      if (payload.cc) payload.cc = undefined;
      if (payload.bcc) payload.bcc = undefined;
      return resend.emails.send(payload);
    }

    // Default: return a mock success immediately to avoid ANY network call or quota usage
    return { 
      data: { id: "test_intercepted_" + Date.now() }, 
      error: null 
    };
  }

  // Real email for non-test users
  return resend.emails.send(payload);
}
