import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { env } from "@/env";
import { z } from "zod";
import { sendEmail } from "@/lib/send-email";
import { getOpportunityInterestEmailHtml } from "@/lib/email-templates";
import { NextRequest, NextResponse } from "next/server";

const bodySchema = z.object({
  oppTitle: z.string().min(1).max(120),
  oppSector: z.string().min(1).max(120),
  oppAmount: z.string().min(1).max(40),
});

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!session.user.hasSignedNda) {
    return NextResponse.json({ ok: false, error: "NDA required" }, { status: 403 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const { oppTitle, oppSector, oppAmount } = parsed.data;
  const user = session.user;

  try {
    const emailHtml = getOpportunityInterestEmailHtml({
      userName: user.name || "Unknown",
      userEmail: user.email,
      phone: user.phone || "Unknown",
      opportunityTitle: oppTitle,
      sector: oppSector,
      amount: oppAmount,
    });

    // shortcut: no server-side rate limit — add one if interest emails get abused.
    const sendResult = await sendEmail({
      from: `"All-Terra Global System" <${env.EMAIL_USER}>`,
      to: env.ADMIN_EMAIL,
      replyTo: user.email,
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
