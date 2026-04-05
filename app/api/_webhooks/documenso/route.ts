import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { transporter } from "@/lib/auth";
import { waitUntil } from "@vercel/functions";

const connection = mysql.createPool({ uri: process.env.DATABASE_URL! });

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Documenso uses 'document.completed' or 'document.signed'
    if (payload.event !== "document.completed") {
      return NextResponse.json({ message: "Ignored non-completion event" });
    }

    const document = payload.payload;
    const documentId = document.id;
    // Look up the primary signer
    const primarySigner =
      document.recipients.find((r: any) => r.role === "Signer") ||
      document.recipients[0];

    const userEmail = primarySigner.email;
    const userName = primarySigner.name;

    // 1. Update your MySQL Database (Locating user by email instead of ClientUserId)
    const [result] = await connection.execute(
      `UPDATE user SET hasSignedNda = ?, docusignEnvelopeId = ? WHERE email = ?`,
      [true, documentId, userEmail],
      // Note: You might want to rename the database column to 'documensoDocumentId' later!
    );

    // 2. Send your beautiful Welcome HTML Email
    // ... (Paste your exact Nodemailer transporter logic from the previous step here!) ...

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
