// Inside any Next.js API route or script
import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const pdfPath = path.join(
    process.cwd(),
    "public",
    "NDA_ALLTERRA_GLOBAL_2.pdf",
  );
  const existingPdfBytes = await fs.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const form = pdfDoc.getForm();
  const fields = form.getFields();

  console.log("--- PDF FIELD NAMES ---");
  fields.forEach((field) => {
    const type = field.constructor.name;
    const name = field.getName();
    console.log(`${type}: "${name}"`);
  });
  console.log("-----------------------");

  return Response.json({ message: "Check your terminal!" });
}
