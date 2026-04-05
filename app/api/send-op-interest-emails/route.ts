import { env } from "@/env";
import { resend } from "@/lib/auth";
import { getOpportunityInterestEmailHtml } from "@/lib/email-templates";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userName, userEmail, userPhone, oppTitle, oppSector, oppAmount } =
      body;

    const emailHtml = getOpportunityInterestEmailHtml({
      userName,
      userEmail,
      phone: userPhone,
      opportunityTitle: oppTitle,
      sector: oppSector,
      amount: oppAmount,
    });

    // 3. Send the email to the Admin
    const sendResult = await resend.emails.send({
      from: `"All-Terra Global System" <${env.EMAIL_USER}>`,
      to: env.ADMIN_EMAIL,
      subject: `New Interest: ${oppTitle}`,
      html: emailHtml,
    });

    if (!sendResult || ("error" in sendResult && sendResult.error)) {
      console.error("Interest email failed:", sendResult?.error);
      return NextResponse.json(
        { ok: false, error: "Email send failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Interest email failed:", error);
    return NextResponse.json(
      { ok: false, error: "Email send failed" },
      { status: 500 },
    );
  }
}
