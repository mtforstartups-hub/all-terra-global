"use client";

import { useActionState, useEffect } from "react";
import { pdfSign } from "@/app/actions/pdfSign";

// Accept a callback prop to pass the PDF up to the iframe
export default function PDFSignForm({
  onPreviewReady,
  userEmail,
}: {
  onPreviewReady: (uri: string) => void;
  userEmail: string;
}) {
  const updateUserWithEmail = pdfSign.bind(null, userEmail);
  const [state, formAction, isPending] = useActionState(updateUserWithEmail, {
    errors: {},
    message: null,
    success: false,
    data: { fullName: "", address: "", signature: "" },
    hasPreviewed: false, // Initializes the lock
  });

  // Whenever the state updates with a successful PDF, send it to the parent
  useEffect(() => {
    if (state.success && state.pdfUri) {
      onPreviewReady(state.pdfUri);
    }
  }, [state.pdfUri, state.success, onPreviewReady]);

  return (
    <form action={formAction} className="flex flex-col space-y-5">
      {state.message && (
        <div
          className={`p-3 rounded-md text-sm font-semibold ${state.success ? "text-primary bg-green-50" : "text-red-600 bg-red-50"}`}
        >
          {state.message}
        </div>
      )}

      {/* --- Inputs (Same as before) --- */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-secondary">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          defaultValue={state.data?.fullName || ""}
          className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
        {state.errors?.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.fullName[0]}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-secondary">
          Address
        </label>
        <input
          type="text"
          name="address"
          defaultValue={state.data?.address || ""}
          className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
        {state.errors?.address && (
          <p className="text-red-500 text-sm mt-1">{state.errors.address[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-secondary">
          Signature
        </label>
        <input
          type="text"
          name="signature"
          defaultValue={state.data?.signature || ""}
          className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
        {state.errors?.signature && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.signature[0]}
          </p>
        )}
      </div>

      {/* --- Buttons with Brand Colors & Lock Logic --- */}
      <div className="flex flex-col space-y-3 pt-4">
        <button
          type="submit"
          name="intent"
          value="preview"
          disabled={isPending}
          // Using Accent color for Preview
          className="w-full py-3 rounded-md text-secondary font-bold transition-all bg-accent hover:bg-opacity-90 shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isPending && state.data?.intent === "preview"
            ? "Generating..."
            : "Preview"}
        </button>

        <button
          type="submit"
          name="intent"
          value="sign"
          // LOCKED until hasPreviewed is true
          disabled={isPending || !state.hasPreviewed}
          // Using Primary color for the final Sign action
          className="w-full py-3 rounded-md text-white font-bold transition-all bg-primary hover:bg-opacity-90 shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isPending && state.data?.intent === "sign"
            ? "Signing..."
            : "Sign Document"}
        </button>
      </div>
    </form>
  );
}
