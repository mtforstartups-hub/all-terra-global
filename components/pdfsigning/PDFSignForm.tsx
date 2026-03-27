"use client";

import { useActionState, useEffect } from "react";
import { pdfSign } from "@/app/actions/pdfSign";
import { Eye, PenLine, AlertCircle, CheckCircle2 } from "lucide-react";

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
      if (state.data?.intent === "sign" && onSigned) {
        onSigned();
      }
    }
  }, [state.pdfUri, state.success]);

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Jane Appleseed",
      error: state.errors?.fullName?.[0],
    },
    {
      name: "address",
      label: "Address",
      placeholder: "123 Main St, City, State",
      error: state.errors?.address?.[0],
    },
    {
      name: "signature",
      label: "Signature",
      placeholder: "Type your full legal name",
      error: state.errors?.signature?.[0],
      hint: "By typing your name, you agree this is your legal signature.",
    },
  ];

  return (
    <form action={formAction} className="flex flex-col gap-0">
      {/* Status message */}
      {state.message && (
        <div
          className={`flex items-start gap-2 px-3.5 py-2.5 rounded-xl text-[12.5px] font-medium leading-snug mb-5
          ${
            state.success
              ? "bg-primary/8 text-primary border border-primary/15"
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

      {/* Fields */}
      <div className="flex flex-col gap-4 mb-6">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label
              htmlFor={field.name}
              className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              defaultValue={
                (state.data as Record<string, string>)?.[field.name] || ""
              }
              autoComplete="off"
              className={`w-full px-3.5 py-3 rounded-xl border text-[14px] text-secondary bg-[#fafbfa]
                placeholder:text-gray-300 transition-all duration-150 outline-none
                focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10
                ${
                  field.error
                    ? "border-red-300 bg-red-50/50"
                    : "border-[#e2e8e6]"
                }`}
            />
            {field.error && (
              <p className="text-[11.5px] text-red-500">{field.error}</p>
            )}
            {field.hint && !field.error && (
              <p className="text-[11px] text-gray-350 leading-relaxed">
                {field.hint}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10.5px] font-semibold text-gray-300 uppercase tracking-widest">
          Actions
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Preview locked hint */}
      {!state.hasPreviewed && (
        <div className="flex items-center gap-2 text-[11.5px] text-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 mb-4">
          <span className="text-base">💡</span>
          Preview the document first before signing.
        </div>
      )}

      {/* Buttons */}
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
                : "bg-gray-100 text-gray-350 cursor-not-allowed"
            }
            disabled:cursor-not-allowed disabled:active:scale-100`}
        >
          <PenLine size={16} strokeWidth={2} />
          {isPending
            ? "Signing…"
            : !state.hasPreviewed
              ? "Sign Document"
              : "Sign Document"}
        </button>
      </div>
    </form>
  );
}
