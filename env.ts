import "dotenv/config";
import { z } from "zod";

const envSchema = z
  .object({
    DATABASE_URL: z.string().min(1, { error: "DATABASE_URL is required" }),
    BETTER_AUTH_SECRET: z
      .string()
      .min(1, { error: "BETTER_AUTH_SECRET is required" }),
    BETTER_AUTH_URL: z.string().optional(),
    NEXT_PUBLIC_APP_URL: z.string().optional(),

    // 1. Using { error: "..." } instead of strings/messages
    ADMIN_EMAIL: z
      .string({ error: "ADMIN_EMAIL must be a string" })
      .min(1, { error: "ADMIN_EMAIL is required" })
      .transform((str) => str.split(",").map((email) => email.trim()))
      .pipe(z.array(z.email({ error: "One or more admin emails are invalid" }))),

    EMAIL_USER: z.email({ error: "EMAIL_USER must be a valid email" }),
    EMAIL_PROVIDER: z.enum(["resend", "smtp"]).default("resend"),
    EMAIL_HOST: z.string().optional(),
    EMAIL_PORT: z.string().optional(),
    EMAIL_PASSWORD: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
  })
  .refine(
    (env) =>
      env.EMAIL_PROVIDER === "smtp"
        ? Boolean(env.EMAIL_HOST && env.EMAIL_PASSWORD)
        : Boolean(env.RESEND_API_KEY),
    {
      error:
        "Set RESEND_API_KEY, or EMAIL_PROVIDER=smtp together with EMAIL_HOST and EMAIL_PASSWORD",
    },
  );

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const details = z.treeifyError(parsedEnv.error);
  console.error("❌ Invalid environment variables:", details);
  throw new Error(`Invalid environment variables: ${JSON.stringify(details)}`);
}

export const env = parsedEnv.data;
