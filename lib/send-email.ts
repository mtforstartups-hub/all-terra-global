import { resend } from "./email-client";
import nodemailer from "nodemailer";
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

// ---------------------------------------------------------------------------
// SMTP transporter (used when EMAIL_PROVIDER=smtp)
// Configured from env vars set in Plesk / .env
// ---------------------------------------------------------------------------
function createSmtpTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    // If EMAIL_PORT=465 we need secure:true; for 587 (STARTTLS) secure:false
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

async function sendViaSMTP(payload: SendEmailPayload): Promise<SendEmailResponse> {
  try {
    const transporter = createSmtpTransporter();
    const info = await transporter.sendMail({
      from: typeof payload.from === "string" ? payload.from : String(payload.from),
      to: Array.isArray(payload.to) ? payload.to.join(", ") : payload.to,
      subject: payload.subject,
      html: typeof payload.html === "string" ? payload.html : undefined,
      text: typeof payload.text === "string" ? payload.text : undefined,
    });
    return { data: { id: info.messageId ?? "smtp_sent" }, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[SMTP] Failed to send email:", message);
    return { data: null, error: { message, name: "SMTPError" } };
  }
}

// ---------------------------------------------------------------------------
// Main sendEmail — routes to SMTP or Resend based on EMAIL_PROVIDER env var
//   EMAIL_PROVIDER=smtp   → use Plesk SMTP (Nodemailer)
//   EMAIL_PROVIDER=resend → use Resend API  (default / current behaviour)
// ---------------------------------------------------------------------------

/**
 * A wrapper around email sending that supports two providers:
 * - Resend (default): set EMAIL_PROVIDER=resend or leave unset
 * - SMTP (Plesk):     set EMAIL_PROVIDER=smtp with EMAIL_HOST / EMAIL_PORT /
 *                     EMAIL_USER / EMAIL_PASSWORD env vars
 *
 * For E2E tests the same interception logic applies regardless of provider.
 */
export async function sendEmail(
  payload: SendEmailPayload,
): Promise<SendEmailResponse> {
  const shouldIntercept =
    process.env.INTERCEPT_TEST_EMAILS === "true" ||
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "development";

  // Check if it's an E2E test email
  const isTestEmail =
    shouldIntercept &&
    ((typeof payload.to === "string" && payload.to.includes("testuser-")) ||
      (Array.isArray(payload.to) &&
        payload.to.some((email: string) => email.includes("testuser-"))) ||
      (typeof payload.html === "string" &&
        payload.html.includes("Playwright Test User")) ||
      (typeof payload.subject === "string" &&
        payload.subject.includes("Playwright Test User")));

  if (isTestEmail) {
    const logPath = path.join(process.cwd(), "test-emails.json");

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

    if (process.env.ENABLE_RESEND_TEST_API === "true") {
      const testPayload: SendEmailPayload = {
        ...payload,
        to: "delivered@resend.dev",
      };
      delete testPayload.cc;
      delete testPayload.bcc;
      return resend.emails.send(testPayload);
    }

    return {
      data: { id: "test_intercepted_" + Date.now() },
      error: null,
    };
  }

  // ── Route to the configured provider ──────────────────────────────────────
  const provider = (process.env.EMAIL_PROVIDER ?? "resend").toLowerCase();

  if (provider === "smtp") {
    return sendViaSMTP(payload);
  }

  // Default: Resend
  return resend.emails.send(payload);
}
