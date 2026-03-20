// app/dashboard/components/NdaModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Make sure to install/import lucide-react or use your own spinner

interface NdaModalProps {
  userId: string;
  userEmail: string;
  userName: string;
}

export default function NdaModal({ userEmail }: NdaModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Check if they just returned from DocuSign
  const isVerifying = searchParams.get("event") === "signing_complete";

  // Poll the server to check for the database update
  useEffect(() => {
    if (isVerifying) {
      // Refresh the page data every 3 seconds until the session updates
      // (When the session updates, the parent page will unmount this modal completely)
      const interval = setInterval(() => {
        router.refresh();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isVerifying, router]);

  const handleSign = async () => {
    setIsPending(true);
    setError("");

    try {
      const response = await fetch("/api/docusign/test", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success && data.signingUrl) {
        window.location.href = data.signingUrl;
      } else {
        setError(data.error || "Failed to generate signing link.");
        setIsPending(false);
      }
    } catch (err) {
      console.error(err);
      setError("A network error occurred. Please try again.");
      setIsPending(false);
    }
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
        <p className="text-gray-500 text-sm">
          Please wait while we securely sync your signed document with DocuSign.
          This usually takes a few seconds...
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
          <p className="font-medium text-gray-900">
            You will be redirected to our secure partner, DocuSign, to review
            and complete the agreement.
          </p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-sm font-medium text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

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
            {isPending ? "Connecting to DocuSign..." : "Proceed to Sign"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
