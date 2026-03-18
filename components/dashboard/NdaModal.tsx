// app/dashboard/components/NdaModal.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
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

  const handleSign = async () => {
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
    >
      <div className="bg-[#1C5244] p-6 text-white">
        <h2 className="text-2xl font-bold">Action Required: Sign NDA</h2>
        <p className="text-white/80 mt-1">
          You must agree to our Non-Disclosure Agreement to view dashboard
          contents.
        </p>
      </div>

      <div className="p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 h-64 overflow-y-auto text-sm text-gray-700 mb-6">
          <h3 className="font-bold text-lg mb-2">NON-DISCLOSURE AGREEMENT</h3>
          <p className="mb-2">This is a legally binding agreement...</p>
          <p className="mb-2">
            By accessing this dashboard, you agree to keep all investment
            materials, financial data, and platform strategies strictly
            confidential.
          </p>
          {/* Put your actual NDA text here */}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            A copy of this agreement will be sent to{" "}
            <strong>{userEmail}</strong>.
          </p>

          <button
            onClick={handleSign}
            disabled={isPending}
            className="px-6 py-3 bg-[#F8AB1D] text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            {isPending ? "Signing..." : "I Agree & Sign"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
