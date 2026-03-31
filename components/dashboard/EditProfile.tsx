"use client";
import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { requireUser } from "@/lib/session";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  ActionState,
} from "@/app/actions/profile";

const initialState: ActionState = { type: "", message: "", success: false };

export default function EditProfile({
  user,
}: {
  user: Awaited<ReturnType<typeof requireUser>>;
}) {
  const [profileMsg, profileAction, isPendingProfile] = useActionState(
    updateProfile,
    initialState,
  );
  const [emailMsg, emailAction, isPendingEmail] = useActionState(
    updateEmail,
    initialState,
  );
  const [passwordMsg, passwordAction, isPendingPassword] = useActionState(
    updatePassword,
    initialState,
  );

  const passwordFormRef = useRef<HTMLFormElement>(null);

  // Clear password form only on success automatically
  useEffect(() => {
    if (passwordMsg.success && passwordFormRef.current) {
      passwordFormRef.current.reset();
    }
  }, [passwordMsg]);

  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-8 animate-fade-in pb-10">
      {/* --- Personal Information --- */}
      <div className="p-8 border border-black/5 bg-white/90 backdrop-blur-md shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] rounded-2xl">
        <div className="mb-6 pb-4 border-b border-black/10">
          <h2 className="text-[22px] font-semibold text-secondary mb-1">
            Personal Information
          </h2>
          <p className="text-sm text-slate-500">
            Update your name and primary contact number.
          </p>
        </div>

        <form action={profileAction} className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                defaultValue={user.name?.split(" ")[0] || ""}
                required
                className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                defaultValue={user.name?.split(" ").slice(1).join(" ") || ""}
                required
                className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1 relative">
              <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={user.phone?.toString() || ""}
                className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
              />
            </div>
          </div>

          {profileMsg.message && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${profileMsg.type === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}
            >
              {profileMsg.message}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-3 pt-6 border-t border-black/10">
            <Link
              href="/dashboard/profile"
              className="px-6 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 bg-transparent border border-black/10 text-secondary hover:bg-slate-500/10"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPendingProfile}
              className="px-6 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 bg-accent border border-accent text-white hover:bg-[#e09915] hover:-translate-y-px disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isPendingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>

      {/* --- Email Address --- */}
      <div className="p-8 border border-black/5 bg-white/90 backdrop-blur-md shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] rounded-2xl">
        <div className="mb-6 pb-4 border-b border-black/10">
          <h2 className="text-[22px] font-semibold text-secondary mb-1">
            Email Address
          </h2>
          <p className="text-sm text-slate-500">
            Changing your email will trigger a verification link to ensure you
            own the new address.
          </p>
        </div>

        <form action={emailAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">
              New Email Address
            </label>
            <input
              type="email"
              name="newEmail"
              defaultValue={user.email || ""}
              required
              className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
            />
          </div>

          {emailMsg.message && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${emailMsg.type === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}
            >
              {emailMsg.message}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-3 pt-6 border-t border-black/10">
            <button
              type="submit"
              disabled={isPendingEmail}
              className="px-6 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 bg-slate-800 border border-slate-800 text-white hover:bg-slate-700 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isPendingEmail ? "Processing..." : "Update Email"}
            </button>
          </div>
        </form>
      </div>

      {/* --- Change Password --- */}
      <div className="p-8 border border-black/5 bg-white/90 backdrop-blur-md shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] rounded-2xl">
        <div className="mb-6 pb-4 border-b border-black/10">
          <h2 className="text-[22px] font-semibold text-secondary mb-1">
            Change Password
          </h2>
          <p className="text-sm text-slate-500">
            Ensure your account uses a long, random password to stay secure.
          </p>
        </div>

        <form
          action={passwordAction}
          ref={passwordFormRef}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                minLength={8}
                required
                className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                minLength={8}
                required
                className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
              />
            </div>
          </div>

          {passwordMsg.message && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${passwordMsg.type === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}
            >
              {passwordMsg.message}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-3 pt-6 border-t border-black/10">
            <button
              type="submit"
              disabled={isPendingPassword}
              className="px-6 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 bg-slate-800 border border-slate-800 text-white hover:bg-slate-700 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isPendingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
