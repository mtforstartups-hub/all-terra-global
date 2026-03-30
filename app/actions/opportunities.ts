"use server";

import { auth } from "@/lib/auth"; // Adjust path to wherever your better-auth config is exported
import { transporter } from "@/lib/auth"; // Adjust path if your nodemailer transporter is exported elsewhere
import { headers } from "next/headers";
import { getOpportunityInterestEmailHtml } from "@/lib/email-templates";

export async function expressInterest(
  opportunityId: string,
  opportunityTitle: string,
) {
  try {
    // 1. Get the current logged-in user session securely on the server
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to express interest.",
      };
    }

    const user = session.user;

    // 2. Generate the email HTML
    // const emailHtml = getOpportunityInterestEmailHtml({
    //   userName: user.name,
    //   userEmail: user.email,
    //   opportunityTitle: opportunityTitle,
    // });

    // // 3. Send the email to the Admin
    // const adminEmailAddress = process.env.ADMIN_EMAIL;

    // await transporter.sendMail({
    //   from: `"All-Terra Global System" <${process.env.EMAIL_USER}>`,
    //   to: adminEmailAddress,
    //   subject: `New Interest: ${opportunityTitle}`,
    //   html: emailHtml,
    // });

    // 4. Return success to the frontend
    return { success: true };
  } catch (error) {
    console.error("Failed to process interest:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
