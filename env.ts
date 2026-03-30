import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  // 1. Using { error: "..." } instead of strings/messages
  ADMIN_EMAIL: z
    .string({ error: "ADMIN_EMAIL must be a string" })
    .min(1, { error: "ADMIN_EMAIL is required" })
    .transform((str) => str.split(",").map((email) => email.trim()))
    .pipe(z.array(z.email({ error: "One or more admin emails are invalid" }))),

  EMAIL_USER: z.email({ error: "EMAIL_USER must be a valid email" }),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    z.treeifyError(parsedEnv.error),
  );
  process.exit(1);
}

export const env = parsedEnv.data;
