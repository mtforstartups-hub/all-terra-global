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
const transporter = nodemailer.createTransport({
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
      // console.log(`[Dev] Verification link for ${user.email}:}`);
      // console.log(url);

      const emailPromise = transporter
        .sendMail({
          from: `"AllTerraGlobal" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Verify your email address",
          html: `<p>Click <a href="${url}">here</a> to verify your account.</p>`,
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
