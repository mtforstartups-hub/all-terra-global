// lib/email-templates.ts

const year = new Date().getFullYear();

const LOGO_URL = "https://www.allterraglobal.com/logo-white.png";

export const getVerificationEmailHtml = (name: string, url: string) => {
  const firstName = name.split(" ")[0];
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
            <tr>
              <td style="background:#1C5244;border-radius:16px 16px 0 0;padding:36px 48px;text-align:center;">
                <img src="${LOGO_URL}" alt="All-Terra Global Logo" width="64" height="64" style="display:block; margin: 0 auto 16px auto; border-radius: 8px;" />
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F8AB1D;text-transform:uppercase;">All-Terra Global</p>
                <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">Verify your email, ${firstName}.</h1>
              </td>
            </tr>
            <tr><td style="background:#F8AB1D;height:4px;"></td></tr>
            <tr>
              <td style="background:#ffffff;padding:40px 48px;text-align:center;">
                <p style="margin:0 0 20px;font-size:15px;color:#333333;line-height:1.7;">
                  Welcome to the All-Terra Global Investor Portal. Please verify your email address to continue setting up your account.
                </p>
                <a href="${url}" style="display:inline-block;background:#F8AB1D;color:#1C5244;font-weight:700;font-size:14px;padding:15px 40px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;margin:20px 0;">
                  Verify Email Address &rarr;
                </a>
              </td>
            </tr>
            <tr><td style="background:#F8AB1D;height:3px;"></td></tr>
            <tr>
              <td style="background:#1C5244;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F8AB1D;letter-spacing:1px;">ALL-TERRA GLOBAL</p>
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.6;">
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
};

export const getResetPasswordEmailHtml = (name: string, url: string) => {
  const firstName = name.split(" ")[0];
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
            <tr>
              <td style="background:#1C5244;border-radius:16px 16px 0 0;padding:36px 48px;text-align:center;">
                <img src="${LOGO_URL}" alt="All-Terra Global Logo" width="64" height="64" style="display:block; margin: 0 auto 16px auto; border-radius: 8px;" />
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F8AB1D;text-transform:uppercase;">Account Security</p>
                <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">Reset Your Password</h1>
              </td>
            </tr>
            <tr><td style="background:#F8AB1D;height:4px;"></td></tr>
            <tr>
              <td style="background:#ffffff;padding:40px 48px;text-align:center;">
                <p style="margin:0 0 20px;font-size:15px;color:#333333;line-height:1.7;">
                  Hi ${firstName}, <br><br>
                  We received a request to reset the password for your All-Terra Global account. Click the button below to set up a new password.
                </p>
                <a href="${url}" style="display:inline-block;background:#F8AB1D;color:#1C5244;font-weight:700;font-size:14px;padding:15px 40px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;margin:20px 0;">
                  Reset Password &rarr;
                </a>
                <p style="margin:20px 0 0;font-size:13px;color:#777777;line-height:1.6;">
                  If you didn't request a password reset, you can safely ignore this email. Your account remains secure.
                </p>
              </td>
            </tr>
            <tr><td style="background:#F8AB1D;height:3px;"></td></tr>
            <tr>
              <td style="background:#1C5244;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F8AB1D;letter-spacing:1px;">ALL-TERRA GLOBAL</p>
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.6;">
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
};

export const getAdminNotificationEmailHtml = (details: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  investmentInterest?: string;
  investmentAmount?: string;
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
            <tr>
              <td style="background:#1C5244;border-radius:16px 16px 0 0;padding:36px 48px;text-align:center;">
                <img src="${LOGO_URL}" alt="All-Terra Global Logo" width="64" height="64" style="display:block; margin: 0 auto 16px auto; border-radius: 8px;" />
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F8AB1D;text-transform:uppercase;">System Notification</p>
                <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">New Investor Registration</h1>
              </td>
            </tr>
            <tr><td style="background:#F8AB1D;height:4px;"></td></tr>
            <tr>
              <td style="background:#ffffff;padding:40px 48px;">
                <p style="margin:0 0 24px;font-size:15px;color:#333333;line-height:1.7;">
                  A new user has just created an account on the investor portal. Here are their registration details:
                </p>
                
                <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse: collapse; background: #fafafa; border-radius: 12px; border: 1px solid #eeeeee;">
                  <tr style="border-bottom: 1px solid #eeeeee;">
                    <td width="35%" style="font-weight:700; color:#1C5244; font-size: 14px;">Full Name</td>
                    <td width="65%" style="color:#333333; font-size: 14px;">${details.name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eeeeee;">
                    <td style="font-weight:700; color:#1C5244; font-size: 14px;">Email Address</td>
                    <td style="color:#333333; font-size: 14px;"><a href="mailto:${details.email}" style="color:#F8AB1D;">${details.email}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eeeeee;">
                    <td style="font-weight:700; color:#1C5244; font-size: 14px;">Company / Org</td>
                    <td style="color:#333333; font-size: 14px;">${details.company || "<em>Not provided</em>"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eeeeee;">
                    <td style="font-weight:700; color:#1C5244; font-size: 14px;">Phone Number</td>
                    <td style="color:#333333; font-size: 14px;">${details.phone || "<em>Not provided</em>"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eeeeee;">
                    <td style="font-weight:700; color:#1C5244; font-size: 14px;">Interest</td>
                    <td style="color:#333333; font-size: 14px;">${details.investmentInterest || "<em>Not provided</em>"}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700; color:#1C5244; font-size: 14px;">Amount</td>
                    <td style="color:#333333; font-size: 14px;">${details.investmentAmount || "<em>Not provided</em>"}</td>
                  </tr>
                </table>

              </td>
            </tr>
            <tr><td style="background:#F8AB1D;height:3px;"></td></tr>
            <tr>
              <td style="background:#1C5244;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F8AB1D;letter-spacing:1px;">ALL-TERRA GLOBAL</p>
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.6;">
                  This is an automated system notification.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
};

export const getOpportunityInterestEmailHtml = (details: {
  userName: string;
  userEmail: string;
  opportunityTitle: string;
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
            <tr>
              <td style="background:#1C5244;border-radius:16px 16px 0 0;padding:36px 48px;text-align:center;">
                <img src="${LOGO_URL}" alt="All-Terra Global Logo" width="64" height="64" style="display:block; margin: 0 auto 16px auto; border-radius: 8px;" />
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F8AB1D;text-transform:uppercase;">Lead Notification</p>
                <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">Opportunity Interest</h1>
              </td>
            </tr>
            <tr><td style="background:#F8AB1D;height:4px;"></td></tr>
            <tr>
              <td style="background:#ffffff;padding:40px 48px;">
                <p style="margin:0 0 24px;font-size:15px;color:#333333;line-height:1.7;">
                  A user has expressed interest in an investment opportunity. Here are the details:
                </p>
                
                <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse: collapse; background: #fafafa; border-radius: 12px; border: 1px solid #eeeeee;">
                  <tr style="border-bottom: 1px solid #eeeeee;">
                    <td width="35%" style="font-weight:700; color:#1C5244; font-size: 14px;">User Name</td>
                    <td width="65%" style="color:#333333; font-size: 14px;">${details.userName}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eeeeee;">
                    <td style="font-weight:700; color:#1C5244; font-size: 14px;">Email Address</td>
                    <td style="color:#333333; font-size: 14px;"><a href="mailto:${details.userEmail}" style="color:#F8AB1D;">${details.userEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="font-weight:700; color:#1C5244; font-size: 14px;">Opportunity</td>
                    <td style="color:#333333; font-size: 14px; font-weight: 600;">${details.opportunityTitle}</td>
                  </tr>
                </table>

              </td>
            </tr>
            <tr><td style="background:#F8AB1D;height:3px;"></td></tr>
            <tr>
              <td style="background:#1C5244;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F8AB1D;letter-spacing:1px;">ALL-TERRA GLOBAL</p>
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.6;">
                  This is an automated system notification.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
};

export const getNdaUserConfirmationEmailHtml = (name: string) => {
  const firstName = name.split(" ")[0];
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
 
            <!-- Header -->
            <tr>
              <td style="background:#1C5244;border-radius:16px 16px 0 0;padding:36px 48px;text-align:center;">
                <img src="${LOGO_URL}" alt="All-Terra Global Logo" width="64" height="64"
                  style="display:block;margin:0 auto 16px auto;border-radius:8px;" />
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F8AB1D;text-transform:uppercase;">
                  Legal Document
                </p>
                <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">
                  Your NDA Has Been Signed
                </h1>
              </td>
            </tr>
 
            <!-- Gold divider -->
            <tr><td style="background:#F8AB1D;height:4px;"></td></tr>
 
            <!-- Body -->
            <tr>
              <td style="background:#ffffff;padding:40px 48px;text-align:center;">
 
                <!-- Check icon -->
                <div style="width:64px;height:64px;background:#eaf5f1;border-radius:50%;margin:0 auto 24px auto;display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:32px;line-height:64px;">&#10003;</span>
                </div>
 
                <p style="margin:0 0 20px;font-size:15px;color:#333333;line-height:1.7;">
                  Hi ${firstName},<br><br>
                  Thank you for signing the Non-Disclosure Agreement with <strong>All-Terra Global</strong>.
                  Your signed copy is attached to this email for your records.
                </p>
 
                <!-- Info box -->
                <table width="100%" cellpadding="16" cellspacing="0"
                  style="border-collapse:collapse;background:#f4f9f7;border-radius:12px;border:1px solid #d0e8df;margin:24px 0;">
                  <tr>
                    <td style="font-size:13px;color:#1C5244;line-height:1.7;text-align:left;">
                      <strong style="display:block;margin-bottom:6px;font-size:14px;">What happens next?</strong>
                      Our team will be in touch shortly to guide you through the next steps of your investment journey.
                      Please keep this email for your records.
                    </td>
                  </tr>
                </table>
 
                <p style="margin:20px 0 0;font-size:13px;color:#777777;line-height:1.6;">
                  If you have any questions, please don't hesitate to reach out to our team.
                </p>
              </td>
            </tr>
 
            <!-- Thin gold divider -->
            <tr><td style="background:#F8AB1D;height:3px;"></td></tr>
 
            <!-- Footer -->
            <tr>
              <td style="background:#1C5244;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F8AB1D;letter-spacing:1px;">
                  ALL-TERRA GLOBAL
                </p>
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.6;">
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
};

export const getNdaAdminNotificationEmailHtml = (details: {
  name: string;
  email: string;
  address: string;
  signedAt: string;
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
 
            <!-- Header -->
            <tr>
              <td style="background:#1C5244;border-radius:16px 16px 0 0;padding:36px 48px;text-align:center;">
                <img src="${LOGO_URL}" alt="All-Terra Global Logo" width="64" height="64"
                  style="display:block;margin:0 auto 16px auto;border-radius:8px;" />
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F8AB1D;text-transform:uppercase;">
                  System Notification
                </p>
                <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">
                  NDA Signed by Investor
                </h1>
              </td>
            </tr>
 
            <!-- Gold divider -->
            <tr><td style="background:#F8AB1D;height:4px;"></td></tr>
 
            <!-- Body -->
            <tr>
              <td style="background:#ffffff;padding:40px 48px;">
                <p style="margin:0 0 24px;font-size:15px;color:#333333;line-height:1.7;">
                  An investor has completed and signed the Non-Disclosure Agreement on the portal.
                  A copy of the signed document is attached to this notification.
                </p>
 
                <!-- Details table -->
                <table width="100%" cellpadding="12" cellspacing="0"
                  style="border-collapse:collapse;background:#fafafa;border-radius:12px;border:1px solid #eeeeee;">
                  <tr style="border-bottom:1px solid #eeeeee;">
                    <td width="35%" style="font-weight:700;color:#1C5244;font-size:14px;">Full Name</td>
                    <td width="65%" style="color:#333333;font-size:14px;">${details.name}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #eeeeee;">
                    <td style="font-weight:700;color:#1C5244;font-size:14px;">Email Address</td>
                    <td style="color:#333333;font-size:14px;">
                      <a href="mailto:${details.email}" style="color:#F8AB1D;">${details.email}</a>
                    </td>
                  </tr>
                  <tr style="border-bottom:1px solid #eeeeee;">
                    <td style="font-weight:700;color:#1C5244;font-size:14px;">Address</td>
                    <td style="color:#333333;font-size:14px;">${details.address}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:700;color:#1C5244;font-size:14px;">Signed At</td>
                    <td style="color:#333333;font-size:14px;">${details.signedAt}</td>
                  </tr>
                </table>
              </td>
            </tr>
 
            <!-- Thin gold divider -->
            <tr><td style="background:#F8AB1D;height:3px;"></td></tr>
 
            <!-- Footer -->
            <tr>
              <td style="background:#1C5244;border-radius:0 0 16px 16px;padding:24px 48px;text-align:center;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F8AB1D;letter-spacing:1px;">
                  ALL-TERRA GLOBAL
                </p>
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.6;">
                  This is an automated system notification.
                </p>
              </td>
            </tr>
 
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
};
