// app/api/webhooks/docusign/route.ts
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { transporter } from "@/lib/auth"; // Import your exported transporter!
import { waitUntil } from "@vercel/functions";

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL!,
});

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (payload.event !== "envelope-completed") {
      return NextResponse.json({ message: "Ignored non-completion event" });
    }

    const envelopeId = payload.data.envelopeId;
    const signers = payload.data.envelopeSummary.recipients.signers;
    const primarySigner = signers.find((signer: any) => signer.clientUserId);

    if (!primarySigner)
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    const userId = primarySigner.clientUserId;
    const userName = primarySigner.name;
    const userEmail = primarySigner.email;

    // 1. Update your MySQL Database
    const [result] = await connection.execute(
      `UPDATE user SET hasSignedNda = ?, docusignEnvelopeId = ? WHERE id = ?`,
      [true, envelopeId, userId],
    );

    console.log(
      `[Webhook] Successfully updated NDA status for user: ${userId}`,
    );

    // 2. Prepare Email Variables
    const firstName = userName.split(" ")[0];
    const dateSigned = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const year = new Date().getFullYear();

    // 3. Inject variables into your exact HTML string
    const welcomeHtml = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background:#1C5244;border-radius:16px 16px 0 0;padding:36px 48px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F8AB1D;text-transform:uppercase;">All-Terra Global</p>
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">Welcome, ${firstName}.</h1>
              <p style="margin:12px 0 0;font-size:13px;color:rgba(255,255,255,0.65);line-height:1.5;">Your Non-Disclosure Agreement is confirmed.</p>
            </td>
          </tr>
          <tr><td style="background:#F8AB1D;height:4px;"></td></tr>
          <tr>
            <td style="background:#ffffff;padding:40px 48px;">
              <p style="margin:0 0 20px;font-size:15px;color:#444444;line-height:1.7;">
                Thank you for completing the onboarding process. We have received your signed Non-Disclosure Agreement and you now have full access to the <strong style="color:#1C5244;">All-Terra Global Investor Portal</strong>.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8faf9;border:1px solid #d4e3de;border-radius:12px;overflow:hidden;border-collapse:separate;margin-bottom:28px;">
                <tr>
                  <td style="background:#1C5244;padding:12px 20px;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;color:#F8AB1D;text-transform:uppercase;">NDA Confirmation</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:12px 20px;font-size:12px;font-weight:700;color:#1C5244;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;vertical-align:top;width:150px;border-bottom:1px solid #e8efed;">Signatory</td>
                        <td style="padding:12px 20px;font-size:14px;color:#333333;border-left:2px solid #e0ebe8;border-bottom:1px solid #e8efed;">${userName}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 20px;font-size:12px;font-weight:700;color:#1C5244;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;vertical-align:top;width:150px;border-bottom:1px solid #e8efed;">Email</td>
                        <td style="padding:12px 20px;font-size:14px;color:#333333;border-left:2px solid #e0ebe8;border-bottom:1px solid #e8efed;">${userEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 20px;font-size:12px;font-weight:700;color:#1C5244;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;vertical-align:top;width:150px;">Date Signed</td>
                        <td style="padding:12px 20px;font-size:14px;color:#333333;border-left:2px solid #e0ebe8;">${dateSigned}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#1C5244;letter-spacing:0.5px;text-transform:uppercase;">What's next</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;padding-top:1px;">
                          <div style="width:20px;height:20px;background:#F8AB1D;border-radius:50%;text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#1C5244;">1</div>
                        </td>
                        <td style="font-size:14px;color:#444444;padding-left:10px;line-height:1.5;">
                          <strong>Explore investment opportunities</strong> — browse current deals and sector insights in the portal.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;padding-top:1px;">
                          <div style="width:20px;height:20px;background:#F8AB1D;border-radius:50%;text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#1C5244;">2</div>
                        </td>
                        <td style="font-size:14px;color:#444444;padding-left:10px;line-height:1.5;">
                          <strong>Review financial data</strong> — access confidential deal materials shared exclusively with signed investors.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;padding-top:1px;">
                          <div style="width:20px;height:20px;background:#F8AB1D;border-radius:50%;text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#1C5244;">3</div>
                        </td>
                        <td style="font-size:14px;color:#444444;padding-left:10px;line-height:1.5;">
                          <strong>Connect with our team</strong> — reach us any time at <a href="mailto:investments@allterraglobal.com" style="color:#1C5244;font-weight:600;">investments@allterraglobal.com</a>.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8e8;border-left:4px solid #F8AB1D;border-radius:0 8px 8px 0;margin-bottom:32px;">
                <tr>
                  <td style="padding:14px 18px;font-size:13px;color:#7a5c10;line-height:1.6;">
                    <strong>Reminder:</strong> All information you access through the portal is strictly confidential under the NDA you have signed. Please do not share any materials with third parties.
                  </td>
                </tr>
              </table>
              <div style="text-align:center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://allterraglobal.com"}/dashboard" style="display:inline-block;background:#F8AB1D;color:#1C5244;font-weight:700;font-size:14px;padding:15px 40px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
                  Go to Your Dashboard &rarr;
                </a>
              </div>
              <p style="margin:28px 0 0;font-size:14px;color:#555555;line-height:1.7;">
                We look forward to building something meaningful together.<br/>
                <strong style="color:#1C5244;">— The All-Terra Global Team</strong>
              </p>
            </td>
          </tr>
          <tr><td style="background:#F8AB1D;height:3px;"></td></tr>
          <tr>
            <td style="background:#1C5244;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F8AB1D;letter-spacing:1px;">ALL-TERRA GLOBAL</p>
              <p style="margin:0 0 8px;font-size:11px;color:rgba(255,255,255,0.55);">
                Dubai &bull; Harare &bull; New Jersey &bull; Mumbai
              </p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.6;">
                A signed copy of your NDA has been sent in a separate email from DocuSign.<br/>
                &copy; ${year} All-Terra Global. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // 4. Send the email!
    const emailPromise = transporter
      .sendMail({
        from: `"All-Terra Global" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "Welcome to All-Terra Global",
        html: welcomeHtml,
      })
      .catch((err) => console.error("Failed to send Welcome email:", err));

    waitUntil(emailPromise);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
