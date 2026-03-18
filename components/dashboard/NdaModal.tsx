// app/dashboard/components/NdaModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { signUserNda } from "@/app/actions";

interface NdaModalProps {
  userId: string;
  userEmail: string;
  userName: string;
}

export default function NdaModal({
  userId,
  userEmail,
  userName,
}: NdaModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  // Fields the user must fill before signing
  const [fullName, setFullName] = useState("");
  const [signature, setSignature] = useState("");
  const [address, setAddress] = useState("");

  const isFormValid =
    fullName.trim().length > 0 &&
    signature.trim().length > 0 &&
    address.trim().length > 0;

  const handleSign = async () => {
    if (!isFormValid) {
      setError("Please fill in all required fields before signing.");
      return;
    }

    setIsPending(true);
    setError("");

    const result = await signUserNda(userId, userEmail, userName);

    if (!result.success) {
      setError("Something went wrong. Please try again.");
      setIsPending(false);
    }
    // If successful, the server action revalidates the path,
    // the page will refresh automatically, and the modal will vanish!
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/40 focus:border-[#1C5244] transition";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
    >
      {/* Header */}
      <div className="bg-[#1C5244] p-6 text-white">
        <h2 className="text-2xl font-bold">Action Required: Sign NDA</h2>
        <p className="text-white/80 mt-1">
          You must agree to our Non-Disclosure Agreement to view dashboard
          contents.
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* NDA Text */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 h-48 overflow-y-auto text-sm text-gray-700">
          <h3 className="font-bold text-lg mb-2">NON-DISCLOSURE AGREEMENT</h3>
          <p className="mb-2">This is a legally binding agreement...</p>
          <p className="mb-2">
            By accessing this dashboard, you agree to keep all investment
            materials, financial data, and platform strategies strictly
            confidential.
          </p>
          {/* Put your actual NDA text here */}
        </div>

        {/* Signatory Fields */}
        <div className="grid grid-cols-1 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Full Legal Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Michael Smith"
              className={inputClass}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 123 Main St, New York, NY 10001"
              className={inputClass}
            />
          </div>

          {/* Signature */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Signature (type your full name to sign){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Type your full name as your electronic signature"
              className={`${inputClass} font-serif italic`}
              style={{ fontFamily: "'Georgia', serif" }}
            />
            <p className="text-xs text-gray-400 mt-1">
              By typing your name above, you acknowledge this constitutes a
              legally binding electronic signature.
            </p>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm text-gray-400">
            Agreement linked to{" "}
            <span className="font-medium text-gray-600">{userEmail}</span>
          </p>

          <button
            onClick={handleSign}
            disabled={isPending || !isFormValid}
            className="px-6 py-3 bg-[#F8AB1D] text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing..." : "I Agree & Sign"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
