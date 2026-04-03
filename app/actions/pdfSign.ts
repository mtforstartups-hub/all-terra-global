"use server";

import "dotenv/config";
import { z } from "zod";
import { grayscale, PDFDocument, rgb } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { connection, resend } from "@/lib/auth";
import {
  getNdaAdminNotificationEmailHtml,
  getNdaUserConfirmationEmailHtml,
} from "@/lib/email-templates";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import fontkit from "@pdf-lib/fontkit";

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

  // Loading Fonts
  pdfDoc.registerFontkit(fontkit);

  const fontPath = path.join(
    process.cwd(),
    "public",
    "fonts",
    "AlexBrush-Regular.ttf",
  );
  const AlexBrushBytes = await fs.readFile(fontPath);
  const AlexBrushFont = await pdfDoc.embedFont(AlexBrushBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const lastPage = pages[3];

  firstPage.drawText(data.fullName, { x: 80, y: 615, size: 11 });
  firstPage.drawText(data.address, { x: 80, y: 600, size: 11 });

  lastPage.drawText(data.fullName, { x: 108, y: 439, size: 11 });
  // lastPage.drawRectangle({
  //   x: 75,
  //   y: 470,
  //   width: 100,
  //   height: 40,
  //   borderColor: grayscale(0.5),
  // });

  // Getting signature
  const isImageSignature = data.signature.startsWith("data:image");
  const BOX = { x: 80, y: 475, width: 100, height: 40 };

  if (isImageSignature) {
    // Strip the data URI prefix to get raw base64
    const base64Data = data.signature.split(",")[1];
    const imageBytes = Buffer.from(base64Data, "base64");

    // Embed as PNG or JPG depending on the data URI
    const isJpg =
      data.signature.startsWith("data:image/jpeg") ||
      data.signature.startsWith("data:image/jpg");

    const embeddedImage = isJpg
      ? await pdfDoc.embedJpg(imageBytes)
      : await pdfDoc.embedPng(imageBytes);

    // Scale to fit inside the box, preserving aspect ratio
    const imgWidth = embeddedImage.width;
    const imgHeight = embeddedImage.height;

    const scaleX = BOX.width / imgWidth;
    const scaleY = BOX.height / imgHeight;
    const scale = Math.min(scaleX, scaleY); // "contain" — never exceeds either dimension

    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    // Center the image inside the box
    const offsetX = (BOX.width - drawWidth) / 2;
    const offsetY = (BOX.height - drawHeight) / 4;

    lastPage.drawImage(embeddedImage, {
      x: BOX.x + offsetX,
      y: BOX.y + offsetY,
      width: drawWidth,
      height: drawHeight,
    });
  } else {
    const fontSize = 22;
    const text = data.signature;

    // Scale font down if text is too wide to fit
    let finalSize = fontSize;
    let textWidth = AlexBrushFont.widthOfTextAtSize(text, finalSize);
    while (textWidth > BOX.width && finalSize > 8) {
      finalSize -= 1;
      textWidth = AlexBrushFont.widthOfTextAtSize(text, finalSize);
    }

    // Center horizontally, center vertically
    const offsetX = (BOX.width - textWidth) / 2;
    const textHeight = AlexBrushFont.heightAtSize(finalSize);
    const offsetY = (BOX.height - textHeight) / 4;

    lastPage.drawText(text, {
      x: BOX.x + offsetX,
      y: BOX.y + offsetY,
      size: finalSize,
      font: AlexBrushFont,
      // color: rgb(0.11, 0.32, 0.27), // #1c5244
    });
  }

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
  await resend.emails.send({
    from: `All-Terra Global <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: "Your Signed NDA – All-Terra Global",
    html: getNdaUserConfirmationEmailHtml(data.fullName),
    attachments: [pdfAttachment],
  });

  // 2. Notification email → admin (with signed PDF attached)
  await resend.emails.send({
    from: `All-Terra Global Portal <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL!,
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
