"use client";

import { useActionState, useEffect } from "react";
import { pdfSign } from "@/app/actions/pdfSign";
import { Eye, PenLine, AlertCircle, CheckCircle2 } from "lucide-react";
import SignaturePad from "./SignaturePad";

export default function PDFSignForm({
  onPreviewReady,
  onSigned,
  userEmail,
}: {
  onPreviewReady: (uri: string) => void;
  onSigned?: () => void;
  userEmail: string;
}) {
  const updateUserWithEmail = pdfSign.bind(null, userEmail);
  const [state, formAction, isPending] = useActionState(updateUserWithEmail, {
    errors: {},
    message: null,
    success: false,
    data: { fullName: "", address: "", signature: "" },
    hasPreviewed: false,
  });

  useEffect(() => {
    if (state.success && state.pdfUri) {
      onPreviewReady(state.pdfUri);
      if (state.data?.intent === "sign" && onSigned) onSigned();
    }
  }, [state.pdfUri, state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-0">
      {/* Status message */}
      {state.message && (
        <div
          className={`flex items-start gap-2 px-3.5 py-2.5 rounded-xl text-[12.5px] font-medium leading-snug mb-5
          ${
            state.success
              ? "bg-primary/[0.07] text-primary border border-primary/15"
              : "bg-red-50 text-red-600 border border-red-100"
          }`}
        >
          {state.success ? (
            <CheckCircle2
              size={14}
              strokeWidth={2}
              className="shrink-0 mt-px"
            />
          ) : (
            <AlertCircle size={14} strokeWidth={2} className="shrink-0 mt-px" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <div className="flex flex-col gap-4 mb-6">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="fullName"
            className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Jane Appleseed"
            defaultValue={state.data?.fullName || ""}
            autoComplete="off"
            className={`w-full px-3.5 py-3 rounded-xl border text-[14px] text-secondary bg-[#fafbfa]
              placeholder:text-gray-300 transition-all duration-150 outline-none
              focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10
              ${state.errors?.fullName ? "border-red-300 bg-red-50/50" : "border-[#e2e8e6]"}`}
          />
          {state.errors?.fullName && (
            <p className="text-[11.5px] text-red-500">
              {state.errors.fullName[0]}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="address"
            className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="123 Main St, City, State"
            defaultValue={state.data?.address || ""}
            autoComplete="off"
            className={`w-full px-3.5 py-3 rounded-xl border text-[14px] text-secondary bg-[#fafbfa]
              placeholder:text-gray-300 transition-all duration-150 outline-none
              focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10
              ${state.errors?.address ? "border-red-300 bg-red-50/50" : "border-[#e2e8e6]"}`}
          />
          {state.errors?.address && (
            <p className="text-[11.5px] text-red-500">
              {state.errors.address[0]}
            </p>
          )}
        </div>

        {/* Signature Pad */}
        <SignaturePad
          defaultName={state.data?.fullName || ""}
          error={state.errors?.signature?.[0]}
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10.5px] font-semibold text-gray-300 uppercase tracking-widest">
          Actions
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {!state.hasPreviewed && (
        <div className="flex items-center gap-2 text-[11.5px] text-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 mb-4">
          <span>💡</span>
          Preview the document first before signing.
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        <button
          type="submit"
          name="intent"
          value="preview"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-[14px]
            bg-accent text-[#1a1200] shadow-sm shadow-accent/30
            hover:bg-accent-light active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
            transition-all duration-150"
        >
          <Eye size={16} strokeWidth={2} />
          {isPending ? "Generating…" : "Preview Document"}
        </button>

        <button
          type="submit"
          name="intent"
          value="sign"
          disabled={isPending || !state.hasPreviewed}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-[14px]
            transition-all duration-150 active:scale-[0.98]
            ${
              state.hasPreviewed
                ? "bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary-light"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            } disabled:cursor-not-allowed disabled:active:scale-100`}
        >
          <PenLine size={16} strokeWidth={2} />
          {isPending ? "Signing…" : "Sign Document"}
        </button>
      </div>
    </form>
  );
}
