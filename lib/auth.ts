import "dotenv/config";
import { betterAuth } from "better-auth";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
import { waitUntil } from "@vercel/functions";
import {
  getAdminNotificationEmailHtml,
  getResetPasswordEmailHtml,
  getVerificationEmailHtml,
} from "./email-templates";

import { sendEmail } from "./send-email";
import { env } from "@/env";

// Database connection pool for MariaDB / MySQL
export const connection = mysql.createPool({
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
      company: { type: "string", required: false },
      phone: { type: "string", required: false },
      investmentInterest: { type: "string", required: false },
      investmentAmount: { type: "string", required: true },
    },
    changeEmail: {
      enabled: true,
    },
  },
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }, request) => {
      const emailHtml = getResetPasswordEmailHtml(user.name, url);

      // const emailPromise = transporter
      //   .sendMail({
      //     from: `"All-Terra Global" <${process.env.EMAIL_USER}>`,
      //     to: user.email,
      //     subject: "Reset your All-Terra Global password",
      //     html: emailHtml,
      //   })
      //   .catch((err) => console.error("Failed to send reset email:", err));

      const emailPromise = sendEmail({
        from: `"All-Terra Global" <${env.EMAIL_USER}>`,
        to: user.email,
        subject: "Reset your All-Terra Global password",
        html: emailHtml,
      })
        .then(({ error }) => {
          if (error) console.error("Resend API Error (Reset Password):", error);
        })
        .catch((err) => console.error("Failed to send reset email:", err));

      waitUntil(emailPromise);
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }, request) => {
      const emailHtml = getVerificationEmailHtml(user.name, url);

      // const emailPromise = transporter
      //   .sendMail({
      //     from: `"All-Terra Global" <${process.env.EMAIL_USER}>`,
      //     to: user.email,
      //     subject: "Verify your All-Terra Global account",
      //     html: emailHtml,
      //   })
      //   .catch((err) =>
      //     console.error("Failed to send verification email:", err),
      //   );

      const emailPromise = sendEmail({
        from: `"All-Terra Global" <${env.EMAIL_USER}>`,
        to: user.email,
        subject: "Verify your All-Terra Global account",
        html: emailHtml,
      })
        .then(({ error }) => {
          if (error) console.error("Resend API Error (Verification):", error);
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
          // console.log(`[Dev] New user signed up: ${user.email}`);

          // Generate the admin notification email HTML
          const adminHtml = getAdminNotificationEmailHtml({
            name: user.name,
            email: user.email,
            company: user.company as string | undefined,
            phone: user.phone as string | undefined,
            investmentInterest: user.investmentInterest as string | undefined,
            investmentAmount: user.investmentAmount as string | undefined,
          });

          // Send to your company email

          const adminEmailAddress = env.ADMIN_EMAIL;

          // const adminEmailPromise = transporter
          //   .sendMail({
          //     from: `"All-Terra Global System" <${process.env.EMAIL_USER}>`,
          //     to: adminEmailAddress,
          //     subject: `New Registration: ${user.name}`,
          //     html: adminHtml,
          //   })
          //   .catch((err) =>
          //     console.error("Failed to send admin notification:", err),
          //   );
          if (!adminEmailAddress) {
            console.warn(
              "ADMIN_EMAIL is not defined. Skipping admin notification.",
            );
            return;
          }

          const adminEmailPromise = sendEmail({
            from: `"All-Terra Global System" <${env.EMAIL_USER}>`,
            to: adminEmailAddress,
            subject: `New Registration: ${user.name}`,
            html: adminHtml,
          })
            .then(({ error }) => {
              if (error)
                console.error("Resend API Error (Admin Notification):", error);
            })
            .catch((err) =>
              console.error("Failed to send admin notification:", err),
            );

          waitUntil(adminEmailPromise);
        },
      },
    },
  },
});
