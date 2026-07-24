// app/dashboard/components/NdaModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface NdaModalProps {
  userId: string;
  userEmail: string;
  userName: string;
  isVerifying?: boolean;
  hasSignedNda?: boolean | null;
}

export default function NdaModal({
  userEmail,
  isVerifying,
  hasSignedNda,
}: NdaModalProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // from here starts inbuilt pdf sign
  // State to track if our artificial delay is finished
  const [minDelayComplete, setMinDelayComplete] = useState(false);

  // 1. Enforce a minimum 3-second display time for the verifying UI
  useEffect(() => {
    if (isVerifying) {
      const timer = setTimeout(() => {
        setMinDelayComplete(true);
      }, 5000); // Adjust this time (in ms) to control the artificial delay

      return () => clearTimeout(timer);
    }
  }, [isVerifying]);
  // 2. Poll the server if the DB hasn't updated yet
  useEffect(() => {
    if (isVerifying && !hasSignedNda) {
      const interval = setInterval(() => {
        router.refresh(); // Fetches fresh server data
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVerifying, hasSignedNda, router]);

  // 3. Close the modal when BOTH conditions are met: time has passed AND DB is updated
  useEffect(() => {
    if (isVerifying && minDelayComplete && hasSignedNda) {
      // Replaces the URL to remove `?event=signing_complete`, which unmounts the modal
      router.replace("/dashboard");
    }
  }, [isVerifying, minDelayComplete, hasSignedNda, router]);

  // to here ends inbuilt pdf sign
  const handleSign = async () => {
    setIsPending(true);

    // Simulate loading/processing time before redirecting
    setTimeout(() => {
      router.push("/sign-nda");
    }, 1500);
  };

  // ─── LOADING STATE UI ──────────────────────────────────────────────────
  if (isVerifying) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center flex flex-col items-center"
      >
        <Loader2 className="w-12 h-12 text-[#1C5244] animate-spin mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Verifying Signature
        </h2>

        {/* ACTIVE LOCAL TEXT */}
        <p className="text-gray-500 text-sm">
          Please wait while we securely process your signed document. This
          usually takes a few seconds...
        </p>

      </motion.div>
    );
  }

  // ─── NORMAL NDA STATE UI ───────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
    >
      {/* Header */}
      <div className="bg-[#1C5244] p-6 text-white">
        <h2 className="text-2xl font-bold">Action Required: Sign NDA</h2>
        <p className="text-white/80 mt-1">
          You must agree to our Non-Disclosure Agreement to continue.
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-700">
          <p className="mb-3">
            To ensure the confidentiality of our investment materials and
            platform strategies, we require all users to sign a Non-Disclosure
            Agreement (NDA).
          </p>

          {/* ACTIVE LOCAL TEXT */}
          <p className="font-medium text-gray-900">
            You will be redirected to our secure portal to review and complete
            the agreement.
          </p>

        </div>



        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-sm text-gray-400">
            Agreement linked to{" "}
            <span className="font-medium text-gray-600 block sm:inline">
              {userEmail}
            </span>
          </p>

          <button
            onClick={handleSign}
            disabled={isPending}
            className="w-full sm:w-auto px-6 py-3 bg-[#F8AB1D] text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isPending ? "Preparing document..." : "Proceed to Sign"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
