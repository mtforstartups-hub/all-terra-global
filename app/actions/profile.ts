"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

export type ActionState = {
  success?: boolean;
  message?: string;
  type?: "success" | "error" | "";
};

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional().nullable(),
});

const emailSchema = z.object({
  newEmail: z.email("Invalid email address"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters long"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords do not match",
  path: ["confirmPassword"],
});

export async function updateProfile(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return { success: false, message: "Unauthorized", type: "error" };
    }

    const formValues = Object.fromEntries(formData);
    const parsed = profileSchema.safeParse(formValues);

    if (!parsed.success) {
      return { success: false, message: parsed.error.issues[0].message, type: "error" };
    }

    const { firstName, lastName, phone } = parsed.data;
    const name = `${firstName} ${lastName}`.trim();

    await auth.api.updateUser({
      headers: await headers(),
      body: {
        name,
        phone,
      },
    });

    return { success: true, message: "Profile information updated successfully.", type: "success" };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    return { success: false, message: error.message || "Failed to update profile.", type: "error" };
  }
}

export async function updateEmail(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return { success: false, message: "Unauthorized", type: "error" };
    }

    const formValues = Object.fromEntries(formData);
    const parsed = emailSchema.safeParse(formValues);

    if (!parsed.success) {
      return { success: false, message: parsed.error.issues[0].message, type: "error" };
    }

    const { newEmail } = parsed.data;

    if (newEmail === session.user.email) {
      return { success: false, message: "This is already your current email.", type: "error" };
    }

    await auth.api.changeEmail({
      headers: await headers(),
      body: {
        newEmail,
        callbackURL: process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/profile`
          : "http://localhost:3000/dashboard/profile",
      },
    });

    return { 
      success: true, 
      message: "A verification link has been sent to your new email address.",
      type: "success" 
    };
  } catch (error: any) {
    console.error("Failed to update email:", error);
    return { success: false, message: error.message || "Failed to update email.", type: "error" };
  }
}

export async function updatePassword(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return { success: false, message: "Unauthorized", type: "error" };
    }

    const formValues = Object.fromEntries(formData);
    const parsed = passwordSchema.safeParse(formValues);

    if (!parsed.success) {
      return { success: false, message: parsed.error.issues[0].message, type: "error" };
    }

    const { currentPassword, newPassword } = parsed.data;

    await auth.api.changePassword({
      headers: await headers(),
      body: {
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      },
    });

    return { success: true, message: "Password updated successfully.", type: "success" };
  } catch (error: any) {
    console.error("Failed to update password:", error);
    return { success: false, message: error.body?.message || error.message || "Failed to update password.", type: "error" };
  }
}
