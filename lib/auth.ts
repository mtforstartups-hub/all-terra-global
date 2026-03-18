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
  host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com or smtp.resend.com
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "false", // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    // This is the magic line for Plesk/cPanel servers
    rejectUnauthorized: false,
  },

  // ADD THESE NEW SETTINGS:
  pool: true, // Uses a connection pool (better for Next.js API routes)
  maxConnections: 1, // Don't overwhelm the Plesk server
  maxMessages: 10,
  greetingTimeout: 10000, // Wait 10 seconds for the server to say hello
  connectionTimeout: 10000, // Wait 10 seconds for the initial connection
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
      console.log(`[Dev] Password reset link for ${user.email}: ${url}`);

      // FIRE AND FORGET: Do not await this promise
      const emailPromise = transporter
        .sendMail({
          from: '"AllTerraGlobal" <info@allterraglobal.com>',
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
      console.log(`[Dev] Verification link for ${user.email}: ${url}`);

      // FIRE AND FORGET: Do not await this promise
      const emailPromise = transporter
        .sendMail({
          from: '"AllTerraGlobal" <info@allterraglobal.com>',
          to: user.email,
          subject: "Verify your email address",
          html: `<p>Click <a href="${url}">here</a> to verify your account.</p>`,
        })
        .catch((err) =>
          console.error("Failed to send verification email:", err),
        );

      // SERVERLESS FIX:
      waitUntil(emailPromise);
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log(`[Dev] New user signed up: ${user.email}`);

          // 1. Fire and forget the Welcome Email
          const welcomePromise = transporter
            .sendMail({
              from: '"AllTerraGlobal" <info@allterraglobal.com>',
              to: user.email,
              subject: "Welcome to Our Platform!",
              html: `<p>Hi ${user.name}, we're thrilled to have you here!</p>`,
            })
            .catch((err) =>
              console.error("Failed to send welcome email:", err),
            );

          waitUntil(welcomePromise);
        },
      },
    },
  },
});
