// app/api/docusign/download-nda/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getDocusignAccessToken } from "@/lib/docusign";
import mysql from "mysql2/promise";

// Reusing your database connection pool
const connection = mysql.createPool({
  uri: process.env.DATABASE_URL!,
});

export async function GET(req: Request) {
  try {
    // 1. Authenticate the user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    // 2. Fetch the Envelope ID from your database
    const [rows]: any = await connection.execute(
      `SELECT docusignEnvelopeId FROM user WHERE id = ?`,
      [userId],
    );

    if (!rows || rows.length === 0 || !rows[0].docusignEnvelopeId) {
      return new NextResponse("NDA not found for this user", { status: 404 });
    }

    const envelopeId = rows[0].docusignEnvelopeId;

    // 3. Get a fresh automated JWT Token
    const ACCESS_TOKEN = await getDocusignAccessToken();
    const DOCUSIGN_BASE_URL = "https://demo.docusign.net/restapi/v2.1";
    const ACCOUNT_ID = process.env.DOCUSIGN_ACCOUNT_ID!;

    // 4. Fetch the PDF from DocuSign
    // 'combined' gets the signed document AND the Certificate of Completion in one PDF
    const documentResponse = await fetch(
      `${DOCUSIGN_BASE_URL}/accounts/${ACCOUNT_ID}/envelopes/${envelopeId}/documents/combined`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      },
    );

    if (!documentResponse.ok) {
      const errorData = await documentResponse.json();
      console.error("DocuSign Download Error:", errorData);
      return new NextResponse("Failed to fetch document from DocuSign", {
        status: 500,
      });
    }

    // 5. Stream the PDF directly to the user's browser
    const pdfBuffer = await documentResponse.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // 'attachment' forces a download.
        // Change to 'inline' if you want it to open in a new browser tab instead!
        "Content-Disposition": `attachment; filename="AllTerraGlobal_Signed_NDA.pdf"`,
      },
    });
  } catch (error) {
    console.error("Download Route Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
