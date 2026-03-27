"use server";

import "dotenv/config";
import { z } from "zod";
import { grayscale, PDFDocument, rgb } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { connection, transporter } from "@/lib/auth";
import {
  getNdaAdminNotificationEmailHtml,
  getNdaUserConfirmationEmailHtml,
} from "@/lib/email-templates";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  address: z.string().min(10, "Please provide a more complete address."),
  signature: z.string().min(2, "Signature is required."),
  intent: z.enum(["preview", "sign"]),
});

export type FormState = {
  errors?: Record<string, string[]>;
  message?: string | null;
  success?: boolean;
  data?: Record<string, string>;
  pdfUri?: string | null;
  hasPreviewed?: boolean;
};

// --- PDF-LIB HELPER FUNCTION ---
async function generateSignedPDF(data: Record<string, string>): Promise<{
  base64: string;
  dataUri: string;
}> {
  const filePath = path.join(process.cwd(), "public", "main-template.pdf");
  const existingPdfBytes = await fs.readFile(filePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const lastPage = pages[3];

  firstPage.drawText(data.fullName, { x: 80, y: 615, size: 11 });
  firstPage.drawText(data.address, { x: 80, y: 600, size: 11 });

  lastPage.drawText(data.fullName, { x: 108, y: 439, size: 11 });
  lastPage.drawRectangle({
    x: 75,
    y: 470,
    width: 100,
    height: 40,
    borderColor: grayscale(0.5),
  });
  lastPage.drawText(data.signature, { x: 80, y: 475, size: 14 });

  const pdfBytes = await pdfDoc.save();
  const base64 = Buffer.from(pdfBytes).toString("base64");

  return {
    base64,
    dataUri: `data:application/pdf;base64,${base64}`,
  };
}

// Email Sending After pdf sign
async function sendNdaEmails(
  data: Record<string, string>,
  pdfBase64: string,
): Promise<void> {
  const signedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  const pdfAttachment = {
    filename: "NDA-AllTerraGlobal-Signed.pdf",
    content: pdfBase64,
    encoding: "base64" as const,
    contentType: "application/pdf",
  };

  // 1. Confirmation email → investor (with signed PDF attached)
  await transporter.sendMail({
    from: `All-Terra Global <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: "Your Signed NDA – All-Terra Global",
    html: getNdaUserConfirmationEmailHtml(data.fullName),
    attachments: [pdfAttachment],
  });

  // 2. Notification email → admin (with signed PDF attached)
  await transporter.sendMail({
    from: `All-Terra Global Portal <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `NDA Signed – ${data.fullName}`,
    html: getNdaAdminNotificationEmailHtml({
      name: data.fullName,
      email: data.email,
      address: data.address,
      signedAt,
    }),
    attachments: [pdfAttachment],
  });
}

export async function pdfSign(
  userEmail: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const rawData = Object.fromEntries(formData) as Record<string, string>;

  try {
    const validatedData = formSchema.parse(rawData);
    const finalData = {
      ...validatedData,
      email: userEmail,
    };
    const { base64, dataUri } = await generateSignedPDF(validatedData);

    // ── Preview intent: just return the rendered PDF ──
    if (validatedData.intent === "preview") {
      return {
        success: true,
        message: "Preview generated successfully!",
        data: rawData,
        pdfUri: dataUri,
        hasPreviewed: true,
      };
    }

    // ── Sign intent: send emails then redirect to dashboard ──
    await sendNdaEmails(finalData, base64);

    await connection.execute(
      "UPDATE user SET hasSignedNda = true WHERE email = ?",
      [userEmail],
    );
    revalidatePath("/dashboard");
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (fieldName) {
          if (!fieldErrors[fieldName]) fieldErrors[fieldName] = [];
          fieldErrors[fieldName].push(issue.message);
        }
      });

      return {
        errors: fieldErrors,
        message: "Please fill all the fields correctly.",
        success: false,
        data: rawData,
        hasPreviewed: prevState.hasPreviewed,
        pdfUri: prevState.pdfUri,
      };
    }

    console.error("Submission error:", error);
    return {
      message:
        "Failed to finalize the agreement. Please try again or contact support.",
      success: false,
      data: rawData,
      hasPreviewed: prevState.hasPreviewed,
      pdfUri: prevState.pdfUri,
    };
  }

  // Reached only on successful "sign" intent — redirect must be outside try/catch
  redirect("/dashboard?event=signing_complete");
}
