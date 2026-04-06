"use server";

import { sendEmail } from "@/lib/send-email";
import { env } from "@/env";
import { getContactFormNotificationHtml } from "@/lib/email-templates";
import { contactFormSchema } from "@/types/formSchema";

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
    const response = await sendEmail({
      from: `"All-Terra Global Contact Form" <${env.EMAIL_USER}>`,
      to: env.ADMIN_EMAIL,
      replyTo: data.email,
      subject: `New Investment Inquiry — ${data.investment_interest} (${data.name})`,
      html: getContactFormNotificationHtml(data),
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

    if (response.error || !response.data?.id) {
      throw new Error(
        response.error?.message ?? "Email provider did not confirm delivery.",
      );
    }

    // console.log("✉️  Message sent  : ", data);
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
