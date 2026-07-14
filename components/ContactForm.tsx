"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { Value } from "react-phone-number-input";
import { usePathname } from "next/navigation";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { investorContact } from "@/app/actions/contactForm";

const initialState = {
  success: false,
  message: "",
};

const investmentOptions = [
  "Mining Investment",
  "Real Estate Financing",
  "Vendor Financing",
  "Custom Investment Structure",
  "General Inquiry",
];

const amountOptions = [
  "Under $100K",
  "$100K - $250K",
  "$250K - $500K",
  "$500K - $1M",
  "Over $1M",
  "Not Sure Yet",
];

export default function ContactForm({
  className = "",
}: {
  className?: string;
}) {
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  const [phoneValue, setPhoneValue] = useState<Value>();
  const [formKey, setFormKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const [state, formAction, pending] = useActionState(
    investorContact,
    initialState,
  );

  // Mirror server-action success into local state so we can reset it
  useEffect(() => {
    if (state.success) setShowSuccess(true);
  }, [state.success]);

  function handleReset() {
    setShowSuccess(false);
    setPhoneValue(undefined);
    formRef.current?.reset();
    setFormKey((k) => k + 1);
  }

  return (
    <div className={`bg-gray-50 rounded-3xl p-8 lg:p-12 ${className}`}>
      {showSuccess ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-12">
          <div className="w-24 h-24 rounded-full bg-[#1C5244] flex items-center justify-center mb-8">
            <Check className="text-white size-12" />
          </div>
          <h3 className="text-3xl font-bold text-secondary mb-4">Thank You!</h3>
          <p className="text-gray-600 mb-8 max-w-md">
            Your inquiry has been received. Our team will review your
            information and get back to you within 24-48 hours.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="text-[#1C5244] font-semibold hover:text-[#F8AB1D] transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <>
          {pathname === "/contact" && (
            <h2 className="text-2xl font-bold text-secondary mb-8">
              Investment Inquiry
            </h2>
          )}
          <form
            key={formKey}
            ref={formRef}
            action={formAction}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  name="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#1C5244] focus:ring-2 focus:ring-[#1C5244]/20 outline-none transition-all"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#1C5244] focus:ring-2 focus:ring-[#1C5244]/20 outline-none transition-all"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#1C5244] focus:ring-2 focus:ring-[#1C5244]/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Phone Number
                </label>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  international
                  defaultCountry="IN"
                  className="phone-input-container"
                />
                {/* Hidden input so the phone value is included in FormData */}
                <input type="hidden" name="phone" value={phoneValue ?? ""} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Investment Interest *
                </label>
                <select
                  id="interest"
                  required
                  name="investment_interest"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#1C5244] focus:ring-2 focus:ring-[#1C5244]/20 outline-none transition-all"
                >
                  <option value="" className="text-gray-500">
                    Select an option
                  </option>
                  {investmentOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="text-gray-900"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Investment Amount
                </label>
                <select
                  id="amount"
                  name="amount"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#1C5244] focus:ring-2 focus:ring-[#1C5244]/20 outline-none transition-all"
                >
                  <option value="" className="text-gray-500">
                    Select range
                  </option>
                  {amountOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="text-gray-900"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-secondary mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                name="message"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 focus:border-[#1C5244] focus:ring-2 focus:ring-[#1C5244]/20 outline-none transition-all resize-none"
                placeholder="Tell us about your investment goals, timeline, and any questions you have..."
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#F8AB1D] text-secondary py-4 rounded-xl font-bold text-lg hover:bg-accent-dark transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  Submitting...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </button>

            {/* Error message from server action */}
            {!state.success && state.message && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{state.message}</span>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree to receive communications regarding
              investment opportunities. Your information is kept strictly
              confidential.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
