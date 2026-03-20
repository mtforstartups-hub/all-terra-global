// app/api/webhooks/docusign/route.ts
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// You might need to export your connection pool from your auth file to reuse it here,
// or recreate it for this route if you prefer.
const connection = mysql.createPool({
  uri: process.env.DATABASE_URL!,
});

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // 1. Check if the event is a completed envelope
    if (payload.event !== "envelope-completed") {
      return NextResponse.json({ message: "Ignored non-completion event" });
    }

    // 2. Extract the data.
    // DocuSign's JSON structure can be deep. We need the clientUserId we passed earlier.
    const envelopeId = payload.data.envelopeId;
    const signers = payload.data.envelopeSummary.recipients.signers;

    // Find our embedded signer
    const primarySigner = signers.find((signer: any) => signer.clientUserId);

    if (!primarySigner || !primarySigner.clientUserId) {
      console.error("Could not find clientUserId in webhook payload");
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const userId = primarySigner.clientUserId;

    // 3. Update your MySQL Database
    const [result] = await connection.execute(
      `UPDATE user 
       SET hasSignedNda = ?, docusignEnvelopeId = ? 
       WHERE id = ?`,
      [true, envelopeId, userId],
    );

    console.log(
      `[Webhook] Successfully updated NDA status for user: ${userId}`,
    );

    // You MUST return a 200 OK so DocuSign knows you received it,
    // otherwise they will keep retrying.
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
