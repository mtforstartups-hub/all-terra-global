import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !session.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { user } = session;
  const API_URL = process.env.DOCUMENSO_API_URL!;
  const API_TOKEN = process.env.DOCUMENSO_API_TOKEN!;

  try {
    // 1. Create the Document from your Template
    const createRes = await fetch(`${API_URL}/documents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templateId: Number(process.env.DOCUMENSO_TEMPLATE_ID),
        title: `NDA - ${user.name}`,
        recipients: [
          {
            email: user.email,
            name: user.name,
            role: "Signer",
          },
        ],
      }),
    });

    const documentData = await createRes.json();
    if (!createRes.ok) throw new Error("Failed to create Documenso document");

    // 2. Return the direct signing URL so the user stays in your flow
    // Documenso generates a unique token for the recipient to sign directly
    const signingToken = documentData.recipients[0].token;

    return NextResponse.json({
      success: true,
      signingUrl: `https://documenso-pdf-sign.vercel.app/sign/${signingToken}`,
    });
  } catch (error) {
    console.error("Documenso Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
