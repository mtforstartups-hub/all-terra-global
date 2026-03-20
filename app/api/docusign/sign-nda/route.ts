// app/api/docusign/sign-nda/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Adjust this import path to your auth config
import { headers } from "next/headers";
import { getDocusignAccessToken } from "@/lib/docusign";

export async function POST(req: Request) {
  // 1. GET THE AUTHENTICATED USER
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { user } = session;

  // 2. CONFIGURATION (Still using Temp Token for this test phase)
  const DOCUSIGN_BASE_URL = process.env.DOCUSIGN_BASE_PATH;
  const ACCOUNT_ID = process.env.DOCUSIGN_ACCOUNT_ID!;
  const TEMPLATE_ID = process.env.DOCUSIGN_TEMPLATE_ID!;
  // const ACCESS_TOKEN = process.env.DOCUSIGN_TEMP_TOKEN!; // Remember this expires in 8hrs

  try {
    const ACCESS_TOKEN = await getDocusignAccessToken();
    // 3. CREATE THE ENVELOPE
    const createEnvelopeResponse = await fetch(
      `${DOCUSIGN_BASE_URL}/accounts/${ACCOUNT_ID}/envelopes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: TEMPLATE_ID,
          status: "sent",
          // ─── ADD THESE TWO LINES ─────────────────────────────
          emailSubject: "Your Executed Non-Disclosure Agreement",
          emailBlurb: `Hi ${user.name},\n\nThank you for signing the NDA. Attached is your final executed copy for your records. Welcome to the platform!\n\nBest,\nThe Team`,
          // ─────────────────────────────────────────────────────
          templateRoles: [
            {
              email: user.email,
              name: user.name,
              roleName: "Signer",
              // CRITICAL: We pass your database User ID here
              clientUserId: user.id,
            },
          ],
        }),
      },
    );

    const envelopeData = await createEnvelopeResponse.json();
    // console.log(envelopeData);

    if (!createEnvelopeResponse.ok)
      throw new Error("Failed to create envelope");

    // Optional: You could save envelopeData.envelopeId to your database here
    // using your mysql pool if you want to track it immediately.

    // 4. GENERATE THE SIGNING URL
    const createViewResponse = await fetch(
      `${DOCUSIGN_BASE_URL}/accounts/${ACCOUNT_ID}/envelopes/${envelopeData.envelopeId}/views/recipient`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
          authenticationMethod: "none",
          email: user.email,
          userName: user.name,
          clientUserId: user.id,
        }),
      },
    );

    const viewData = await createViewResponse.json();

    // LOOK HERE: We are now logging the exact DocuSign error payload
    if (!createViewResponse.ok) {
      console.error(
        "🚨 DOCUSIGN VIEW ERROR:",
        JSON.stringify(viewData, null, 2),
      );
      return NextResponse.json(
        {
          error: "Failed to create view URL",
          details: viewData,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, signingUrl: viewData.url });
  } catch (error) {
    console.error("DocuSign Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
