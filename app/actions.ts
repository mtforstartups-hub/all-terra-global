"use server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// ─── Schema ────────────────────────────────────────────────────────────────

const contactFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  company: z.string().optional(),
  email: z.email("Please enter a valid email address"),
  phone: z.string().optional(),
  investment_interest: z
    .string()
    .min(1, "Please select an investment interest"),
  amount: z.string().optional(),
  message: z.string().optional(),
});

const signUpSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Email helpers ─────────────────────────────────────────────────────────

/**
 * Module-level cache so every request reuses the SAME Ethereal inbox.
 * Creating a fresh account per-request orphans the messages — the preview
 * URL then returns "Invalid or unknown message identifier".
 */
let _transporterCache: nodemailer.Transporter | null = null;

async function getTransporter() {
  if (_transporterCache) return _transporterCache;

  const testAccount = await nodemailer.createTestAccount();

  console.log("─────────────────────────────────────────────");
  console.log("📬  Ethereal test inbox created:");
  console.log("    Login  →  https://ethereal.email/login");
  console.log("    User   →", testAccount.user);
  console.log("    Pass   →", testAccount.pass);
  console.log("─────────────────────────────────────────────");

  _transporterCache = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return _transporterCache;
}

function buildEmailHtml(data: z.infer<typeof contactFormSchema>): string {
  const row = (label: string, value?: string) =>
    value
      ? `
      <tr>
        <td style="padding:10px 16px;font-size:13px;font-weight:600;color:#1C5244;white-space:nowrap;vertical-align:top;width:160px;">${label}</td>
        <td style="padding:10px 16px;font-size:14px;color:#333333;border-left:2px solid #f0f0f0;">${value}</td>
      </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Investment Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1C5244;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F8AB1D;text-transform:uppercase;">All-Terra Global</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">New Investment Inquiry</h1>
              <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">Submitted via the contact form</p>
            </td>
          </tr>

          <!-- Accent bar -->
          <tr>
            <td style="background:#F8AB1D;height:4px;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:32px 40px;">

              <p style="margin:0 0 24px;font-size:15px;color:#555555;line-height:1.6;">
                A new inquiry has been submitted. Please review the details below and follow up within <strong>24–48 hours</strong>.
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="border:1px solid #e8e8e8;border-radius:12px;overflow:hidden;border-collapse:separate;">
                ${row("Full Name", data.name)}
                ${row("Company", data.company)}
                ${row("Email", `<a href="mailto:${data.email}" style="color:#1C5244;text-decoration:none;">${data.email}</a>`)}
                ${row("Phone", data.phone ? `<a href="tel:${data.phone}" style="color:#1C5244;text-decoration:none;">${data.phone}</a>` : undefined)}
                ${row("Investment Interest", data.investment_interest)}
                ${row("Investment Amount", data.amount)}
              </table>

              <!-- Message -->
              ${data.message
      ? `
              <div style="margin-top:24px;">
                <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1C5244;letter-spacing:0.5px;text-transform:uppercase;">Message</p>
                <div style="background:#f8faf9;border:1px solid #e0ebe8;border-radius:10px;padding:16px 20px;font-size:14px;color:#444444;line-height:1.7;white-space:pre-wrap;">${data.message}</div>
              </div>`
      : ""
    }

              <!-- CTA -->
              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${data.email}"
                  style="display:inline-block;background:#F8AB1D;color:#1C5244;font-weight:700;font-size:14px;padding:14px 32px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
                  Reply to ${data.name.split(" ")[0]}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8faf9;border-top:1px solid #e8e8e8;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999999;line-height:1.6;">
                This email was auto-generated by the All-Terra Global contact form.<br/>
                &copy; ${new Date().getFullYear()} All-Terra Global. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Server Action ──────────────────────────────────────────────────────────

export async function investorContact(
  _initialState: unknown,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData);
  const result = contactFormSchema.safeParse(rawFormData);

  if (!result.success) {
    const firstError = result.error.issues[0];
    return {
      success: false,
      message: firstError?.message ?? "Please check your form and try again.",
    };
  }

  const data = result.data;

  try {
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: `"All-Terra Global Contact Form" <no-reply@all-terra.com>`,
      to: "team@all-terra.com", // TODO: replace with real recipient in production
      replyTo: data.email,
      subject: `New Investment Inquiry — ${data.investment_interest} (${data.name})`,
      html: buildEmailHtml(data),
      text: [
        `New Investment Inquiry`,
        `─────────────────────`,
        `Name:                ${data.name}`,
        `Company:             ${data.company ?? "—"}`,
        `Email:               ${data.email}`,
        `Phone:               ${data.phone ?? "—"}`,
        `Investment Interest: ${data.investment_interest}`,
        `Investment Amount:   ${data.amount ?? "—"}`,
        `Message:             ${data.message ?? "—"}`,
      ].join("\n"),
    });

    // In development, log the Ethereal preview URL
    console.log(
      "✉️  Message sent. Preview URL:",
      nodemailer.getTestMessageUrl(info),
    );
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return {
      success: false,
      message:
        "We received your inquiry but couldn't send a confirmation email. Our team will still follow up.",
    };
  }

  return {
    success: true,
    message: "Thank you! We'll be in touch within 24–48 hours.",
  };
}


