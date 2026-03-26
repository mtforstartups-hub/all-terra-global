"use server";

import { z } from "zod";
import { grayscale, PDFDocument, rgb } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

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
async function generateSignedPDF(
  data: Record<string, string>,
): Promise<string> {
  // 1. Read your existing template from the public folder
  const filePath = path.join(process.cwd(), "public", "main-template.pdf");
  const existingPdfBytes = await fs.readFile(filePath);

  // 2. Load the document and get the first page
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
  lastPage.drawText(data.signature, {
    x: 80,
    y: 475,
    size: 14,
    // color: rgb(0, 0, 0.8),
  });

  // 4. Save and convert to a Base64 Data URI so the frontend iframe can read it
  const pdfBytes = await pdfDoc.save();
  const base64Pdf = Buffer.from(pdfBytes).toString("base64");
  return `data:application/pdf;base64,${base64Pdf}`;
}

export async function pdfSign(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const rawData = Object.fromEntries(formData) as Record<string, string>;

  try {
    const validatedData = formSchema.parse(rawData);

    // Generate the PDF
    const pdfUri = await generateSignedPDF(validatedData);

    if (validatedData.intent === "preview") {
      return {
        success: true,
        message: "Preview generated successfully!",
        data: rawData,
        pdfUri: pdfUri,
        hasPreviewed: true,
      };
    }

    return {
      success: true,
      message: "Document signed successfully!",
      data: rawData,
      pdfUri: pdfUri,
      hasPreviewed: true,
    };
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

    console.error("Form submission error:", error);
    return {
      message: "An unexpected error occurred.",
      success: false,
      data: rawData,
      hasPreviewed: prevState.hasPreviewed,
      pdfUri: prevState.pdfUri,
    };
  }
}
