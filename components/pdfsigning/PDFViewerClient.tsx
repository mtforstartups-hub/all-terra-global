"use client";

import { useState } from "react";
import PDFSignForm from "./PDFSignForm";
import {
  FileText,
  X,
  ChevronUp,
  Shield,
  CheckCircle2,
  PenLine,
} from "lucide-react";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col h-full bg-[#1a1f1e] items-center justify-center gap-3">
      <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      <span className="text-white/40 text-[12px]">Loading document…</span>
    </div>
  ),
});

const STEPS = ["Review", "Fill Details", "Sign"];

export default function PDFViewerClient({ userEmail }: { userEmail: string }) {
  const [pdfSource, setPdfSource] = useState("/main-template.pdf");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0=Review, 1=Fill, 2=Done
  const [isSigned, setIsSigned] = useState(false);

  // Change handler:
  const handlePreviewReady = (uri: string) => {
    setPdfSource(uri); // no hash fragment needed
    setCurrentStep(1);
  };

  const handleSigned = () => {
    setIsSigned(true);
    setCurrentStep(2);
    setIsSheetOpen(false);
  };

  return (
    <div className="relative flex flex-col h-dvh w-full overflow-hidden bg-[#111514]">
      {/* ── Top Nav Bar ── */}
      <header className="shrink-0 flex items-center justify-between px-4 py-3 bg-[#111514] border-b border-white/10 z-20">
        {/* Left: icon + title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <FileText size={14} className="text-accent" strokeWidth={2} />
          </div>
          <span className="text-white/80 text-[13px] font-medium truncate">
            Document.pdf
          </span>
        </div>

        {/* Center: Step indicator (hidden on very small screens) */}
        <div className="hidden sm:flex items-center gap-1">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-300
                ${
                  i < currentStep
                    ? "bg-accent/20 text-accent"
                    : i === currentStep
                      ? "bg-primary text-white"
                      : "text-white/30"
                }`}
              >
                {i < currentStep ? (
                  <CheckCircle2 size={11} strokeWidth={2.5} />
                ) : (
                  <span className="w-3.5 text-center">{i + 1}</span>
                )}
                {step}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-4 h-px transition-colors duration-300 ${i < currentStep ? "bg-accent/40" : "bg-white/15"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Right: signed badge or email */}
        <div className="flex items-center gap-2 shrink-0">
          {isSigned ? (
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-accent bg-accent/10 border border-accent/25 rounded-full px-2.5 py-1">
              <CheckCircle2 size={11} strokeWidth={2.5} /> Signed
            </span>
          ) : (
            <span className="hidden md:block text-white/40 text-[11px] truncate max-w-35">
              {userEmail}
            </span>
          )}
        </div>
      </header>

      {/* ── PDF Viewer — full remaining height ── */}
      <div className="flex flex-1 min-h-0">
        {/* PDF takes full width on mobile, ~65% on desktop */}
        <div className="relative flex-1 min-w-0 bg-[#1a1f1e]">
          {/* <iframe
            src={pdfSource}
            className="w-full h-full border-none"
            title="Document Viewer"
          /> */}
          <PDFViewer src={pdfSource} />

          {/* Mobile-only: gradient at bottom so the CTA button is readable */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/60 to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Desktop sidebar (hidden on mobile) */}
        <aside className="hidden md:flex flex-col w-90 min-w-[320px] max-w-100 h-full bg-white overflow-y-auto shrink-0 border-l border-gray-100">
          <div className="h-1 bg-linear-to-r from-primary to-accent shrink-0" />
          <div className="flex flex-col flex-1 p-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
              <Shield size={18} className="text-accent" strokeWidth={1.5} />
            </div>
            <h1 className="font-heading text-[22px] font-bold text-primary leading-tight mb-1.5 tracking-tight">
              Sign Document
            </h1>
            <p className="text-[13px] text-gray-400 leading-relaxed mb-5">
              Fill in your details to preview and sign this document securely.
            </p>
            <div className="flex items-center gap-2 bg-[#f4f6f3] border border-[#e2e8e6] rounded-full px-3 py-1.5 w-fit max-w-full mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-light shrink-0" />
              <span className="text-[12px] text-gray-600 font-medium truncate">
                {userEmail}
              </span>
            </div>
            <PDFSignForm
              onPreviewReady={handlePreviewReady}
              onSigned={handleSigned}
              userEmail={userEmail}
            />
            <p className="flex items-center gap-1.5 text-[11px] text-gray-300 mt-5">
              <Shield size={10} strokeWidth={2} />
              Secured with 256-bit encryption
            </p>
          </div>
        </aside>
      </div>

      {/* ── Mobile: Sticky bottom CTA bar ── */}
      {!isSigned && (
        <div className="md:hidden shrink-0 px-4 pb-5 pt-3 bg-transparent absolute bottom-0 left-0 right-0 z-20">
          <button
            onClick={() => setIsSheetOpen(true)}
            className="w-full flex items-center justify-center gap-2.5 bg-primary text-white font-semibold text-[15px] py-4 rounded-2xl shadow-2xl shadow-primary/40 active:scale-[0.98] transition-transform"
          >
            <PenLine size={17} strokeWidth={2} />
            Review &amp; Sign Document
            <ChevronUp
              size={17}
              strokeWidth={2.5}
              className={`transition-transform duration-200 ${isSheetOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}

      {isSigned && (
        <div className="md:hidden shrink-0 px-4 pb-5 pt-3 absolute bottom-0 left-0 right-0 z-20">
          <div className="w-full flex items-center justify-center gap-2 bg-accent/15 border border-accent/30 text-accent font-semibold text-[14px] py-3.5 rounded-2xl">
            <CheckCircle2 size={17} strokeWidth={2} />
            Document Signed Successfully
          </div>
        </div>
      )}

      {/* ── Mobile: Bottom Sheet ── */}
      {/* Backdrop */}
      <div
        onClick={() => setIsSheetOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${isSheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sheet panel */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl transition-transform duration-400 ease-out flex flex-col
          ${isSheetOpen ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "88dvh" }}
      >
        {/* Drag handle */}
        <div className="shrink-0 flex flex-col items-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Sheet header */}
        <div className="shrink-0 flex items-center justify-between px-5 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield size={14} className="text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-heading font-bold text-[16px] text-primary leading-none">
                Sign Document
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-50">
                {userEmail}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSheetOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 active:bg-gray-200 transition-colors"
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-8">
          {/* Mobile step pills */}
          <div className="flex items-center gap-1 mb-5">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-1">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all
                  ${
                    i < currentStep
                      ? "bg-accent/15 text-accent-dark"
                      : i === currentStep
                        ? "bg-primary text-white"
                        : "text-gray-300"
                  }`}
                >
                  {i < currentStep ? "✓ " : `${i + 1}. `}
                  {step}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-3 h-px ${i < currentStep ? "bg-accent/40" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <PDFSignForm
            onPreviewReady={(uri) => {
              handlePreviewReady(uri);
            }}
            onSigned={() => {
              handleSigned();
            }}
            userEmail={userEmail}
          />
        </div>
      </div>
    </div>
  );
}
