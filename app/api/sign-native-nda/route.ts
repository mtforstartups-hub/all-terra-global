import { NextResponse } from "next/server";
import { auth, transporter } from "@/lib/auth";
import { headers } from "next/headers";
import mysql from "mysql2/promise";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { waitUntil } from "@vercel/functions";

// ... (database connection setup)

export async function POST(req: Request) {
  try {
    // const session = await auth.api.getSession({ headers: await headers() });
    // if (!session || !session.user)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { signature, address, fullName } = await req.json();
    // const { user } = session;
    // const timestamp = new Date().toLocaleDateString();

    // 1. Read your existing interactive PDF from the public folder
    const pdfPath = path.join(
      process.cwd(),
      "public",
      "NDA_ALLTERRA_GLOBAL_2.pdf",
    );
    const existingPdfBytes = await fs.readFile(pdfPath);

    // 2. Load the document into pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // 3. Get the interactive form
    const form = pdfDoc.getForm();

    // 4. Fill in the specific fields using the exact names from your PDF
    form.getTextField("NameAtTop").setText(fullName);
    form.getTextField("Address").setText(address);

    // Inject the typed signature
    form.getTextField("NameAtBottom").setText(fullName);
    form.getTextField("Signature").setText(signature);

    // 5. CRITICAL: Flatten the form!
    // This turns the interactive fields into permanent, un-editable text
    // so the user cannot change the contract after downloading it.
    form.flatten();

    // 6. Save the locked PDF
    const pdfBytes = await pdfDoc.save();
    // const pdfBuffer = Buffer.from(pdfBytes);

    // 6. Update Database
    // ... (Your MySQL update code here)

    // 7. Send Email with the Stamped PDF attached
    // ... (Your Nodemailer code here)

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // 'inline' tells the browser to view it rather than download it
        "Content-Disposition": 'inline; filename="debug-nda.pdf"',
      },
    });

    // return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Native Signing Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
