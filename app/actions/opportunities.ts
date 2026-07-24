"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function expressInterest(
  opportunityId: string,
  opportunityTitle: string,
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to express interest.",
      };
    }

    // TODO: implement email notification and/or DB record for expressed interest
    // Suggestion: call sendEmail() from @/lib/send-email when ready

    return { success: true };
  } catch (error) {
    console.error("Failed to process interest:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
