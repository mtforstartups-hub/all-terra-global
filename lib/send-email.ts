import { resend } from "./email-client";
import fs from "fs/promises";
import path from "path";
import { CreateEmailOptions } from "resend";

export interface SendEmailAttachment {
  filename: string;
  content?: string | Buffer;
  path?: string;
}

export type SendEmailPayload = CreateEmailOptions;

export interface SendEmailResponse {
  data: { id: string } | null;
  error: { message: string; name: string } | null;
}

/**
 * A wrapper around Resend's `resend.emails.send` that intercepts test emails.
 * If an email is directed to a test user or contains test identifiers,
 * it will be logged to `test-emails.json` and rerouted to `delivered@resend.dev`
 * to ensure successful API testing without using actual email sending quotas.
 */
export async function sendEmail(
  payload: SendEmailPayload,
): Promise<SendEmailResponse> {
  const shouldIntercept = 
    process.env.INTERCEPT_TEST_EMAILS === "true" || 
    process.env.NODE_ENV === "test" || 
    process.env.NODE_ENV === "development";

  // Check if it's an E2E test email
  const isTestEmail = shouldIntercept && (
    (typeof payload.to === "string" && payload.to.includes("testuser-")) ||
    (Array.isArray(payload.to) &&
      payload.to.some((email: string) => email.includes("testuser-"))) ||
    (typeof payload.html === "string" &&
      payload.html.includes("Playwright Test User")) ||
    (typeof payload.subject === "string" &&
      payload.subject.includes("Playwright Test User"))
  );

  if (isTestEmail) {
    const logPath = path.join(process.cwd(), "test-emails.json");

    // Log the INTENDED destination before we potentially change it for a mock response
    const logEntry = {
      ...payload,
      _interceptedAt: new Date().toISOString(),
      _originalTo: payload.to,
    };
    
    try {
      await fs.appendFile(logPath, JSON.stringify(logEntry) + "\n");
    } catch (err) {
      console.error("Failed to log test email:", err);
    }

    // If ENABLE_RESEND_TEST_API is "true", we actually hit the Resend API
    // using their official test address which doesn't count against limits.
    if (process.env.ENABLE_RESEND_TEST_API === "true") {
      const testPayload = {
        ...payload,
        to: "delivered@resend.dev",
        // Clear CC/BCC to prevent accidental leakage during tests
        cc: undefined,
        bcc: undefined,
      };
      return resend.emails.send(testPayload as any);
    }

    // Default: return a mock success immediately to avoid ANY network call or quota usage
    return {
      data: { id: "test_intercepted_" + Date.now() },
      error: null,
    };
  }

  // Real email for non-test users
  return resend.emails.send(payload as any);
}
