import "dotenv/config";
import { betterAuth } from "better-auth";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
import { waitUntil } from "@vercel/functions"; // Uncomment if deploying to Vercel

// Database connection pool for MariaDB / MySQL
const connection = mysql.createPool({
  uri: process.env.DATABASE_URL!,
});

// Configure Nodemailer Transporter
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const auth = betterAuth({
  database: connection,
  user: {
    additionalFields: {
      hasSignedNda: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      docusignEnvelopeId: {
        type: "string",
        required: false,
      },
    },
  },
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,

    sendResetPassword: async ({ user, url }, request) => {
      // console.log(`[Dev] Password reset link for ${user.email}: ${url}`);

      // FIRE AND FORGET: Do not await this promise
      const emailPromise = transporter
        .sendMail({
          from: `"AllTerraGlobal" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Reset your password",
          html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
        })
        .catch((err) => console.error("Failed to send reset email:", err));

      // SERVERLESS FIX: If deploying to Vercel, wrap the promise in waitUntil
      // so the serverless function doesn't die before the email finishes sending.
      waitUntil(emailPromise);
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }, request) => {
      const firstName = user.name.split(" ")[0];
      const year = new Date().getFullYear();

      const brandHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
                <tr>
                  <td style="background:#1C5244;border-radius:16px 16px 0 0;padding:36px 48px;text-align:center;">
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F8AB1D;text-transform:uppercase;">All-Terra Global</p>
                    <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">Verify your email, ${firstName}.</h1>
                  </td>
                </tr>
                <tr><td style="background:#F8AB1D;height:4px;"></td></tr>
                <tr>
                  <td style="background:#ffffff;padding:40px 48px;text-align:center;">
                    <p style="margin:0 0 20px;font-size:15px;color:#444444;line-height:1.7;">
                      Welcome to the All-Terra Global Investor Portal. Please verify your email address to continue setting up your account.
                    </p>
                    <a href="${url}" style="display:inline-block;background:#F8AB1D;color:#1C5244;font-weight:700;font-size:14px;padding:15px 40px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;margin:20px 0;">
                      Verify Email Address &rarr;
                    </a>
                  </td>
                </tr>
                <tr><td style="background:#F8AB1D;height:3px;"></td></tr>
                <tr>
                  <td style="background:#1C5244;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F8AB1D;letter-spacing:1px;">ALL-TERRA GLOBAL</p>
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.6;">
                      &copy; ${year} All-Terra Global. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>`;

      const emailPromise = transporter
        .sendMail({
          from: `"All-Terra Global" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Verify your All-Terra Global account",
          html: brandHtml,
        })
        .catch((err) =>
          console.error("Failed to send verification email:", err),
        );

      waitUntil(emailPromise);
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log(`[Dev] New user signed up: ${user.email}`);
        },
      },
    },
  },
});
