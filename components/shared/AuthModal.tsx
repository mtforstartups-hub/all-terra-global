"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
// import { redirect } from "next/navigation";
import "react-phone-number-input/style.css";
import PhoneInput, { Value } from "react-phone-number-input";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

type TabState = "login" | "register" | "forgotPassword";

// Brought over from ContactForm
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

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<TabState>("login");
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // State for the Phone Input
  const [phoneValue, setPhoneValue] = useState<Value>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullname = formData.get("fullname") as string;

    if (activeTab === "register") {
      const confirmPassword = formData.get("confirmPassword") as string;

      // Confirm password validation
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        setIsPending(false);
        return;
      }

      // Extract new fields
      const company = formData.get("company") as string;
      const phone = formData.get("phone") as string;

      // Get all checked values and join them into a comma-separated string
      const investmentInterestArray = formData.getAll(
        "investment_interest",
      ) as string[];
      const investmentInterest = investmentInterestArray.join(", ");

      const investmentAmount = formData.get("amount") as string;

      const { error } = await authClient.signUp.email({
        email,
        password,
        name: fullname,
        company,
        phone,
        investmentInterest,
        investmentAmount,
      });

      if (error) {
        setErrorMsg(error.message || "Registration failed.");
      } else {
        setSuccessMsg(
          "Registration successful! Please check your email to verify your account.",
        );
        setTimeout(() => {
          onLoginSuccess();
          onClose();
        }, 4000);
        // redirect("/dashboard");
      }
    } else if (activeTab === "login") {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        if (
          error.status === 403 &&
          error.message!.toLowerCase().includes("verify")
        ) {
          setErrorMsg("Please verify your email address before logging in.");
        } else {
          setErrorMsg(error.message || "Invalid credentials.");
        }
      } else {
        onLoginSuccess();
        onClose();
      }
    } else if (activeTab === "forgotPassword") {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setErrorMsg(error.message || "Failed to send reset link.");
      } else {
        setSuccessMsg("Password reset link sent! Please check your inbox.");
      }
    }

    setIsPending(false);
  };

  const switchTab = (tab: TabState) => {
    setActiveTab(tab);
    setErrorMsg("");
    setSuccessMsg("");
    setPhoneValue(undefined); // Reset phone on tab switch
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 flex flex-col max-h-[90vh]"
          >
            {/* Header section (Fixed) */}
            <div className="bg-[#1C5244] p-6 text-white relative shrink-0 rounded-t-3xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-2">
                {activeTab === "login"
                  ? "Welcome Back"
                  : activeTab === "register"
                    ? "Create Account"
                    : "Reset Password"}
              </h2>
              <p className="text-white/80 text-sm">
                {activeTab === "forgotPassword"
                  ? "Enter your email to receive a password reset link."
                  : "Unlock full access to exclusive investment opportunities."}
              </p>
            </div>

            {/* Scrollable Body Content */}
            <div className="overflow-y-auto grow">
              {activeTab !== "forgotPassword" && (
                <div className="flex border-b border-gray-100">
                  <button
                    onClick={() => switchTab("login")}
                    className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                      activeTab === "login"
                        ? "text-[#1C5244]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Login
                    {activeTab === "login" && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F8AB1D]"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => switchTab("register")}
                    className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                      activeTab === "register"
                        ? "text-[#1C5244]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Register
                    {activeTab === "register" && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F8AB1D]"
                      />
                    )}
                  </button>
                </div>
              )}

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                      {errorMsg}
                    </div>
                  )}

                  {successMsg && (
                    <div className="p-3 text-sm text-green-700 bg-green-50 rounded-lg border border-green-200">
                      {successMsg}
                    </div>
                  )}

                  <AnimatePresence mode="popLayout">
                    {activeTab === "register" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-gray-700">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullname"
                            placeholder="John Doe"
                            required
                            className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/20 focus:border-[#1C5244] transition-all bg-gray-50/50"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                              Company / Org
                            </label>
                            <input
                              type="text"
                              name="company"
                              placeholder="Your Company"
                              className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/20 focus:border-[#1C5244] transition-all bg-gray-50/50"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                              Phone Number
                            </label>
                            <PhoneInput
                              placeholder="Phone"
                              value={phoneValue}
                              onChange={setPhoneValue}
                              international
                              defaultCountry="IN"
                              className="phone-input-container w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus-within:ring-2 focus-within:ring-[#1C5244]/20 focus-within:border-[#1C5244] transition-all [&_input]:bg-transparent [&_input]:outline-none"
                            />
                            <input
                              type="hidden"
                              name="phone"
                              value={phoneValue ?? ""}
                            />
                          </div>
                        </div>

                        {/* Amount Field */}
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-gray-700">
                            Amount *
                          </label>
                          <select
                            name="amount"
                            required
                            className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/20 focus:border-[#1C5244] transition-all bg-gray-50/50"
                          >
                            <option value="">Select range</option>
                            {amountOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Sectors of Interest - Checkbox Grid */}
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-gray-700">
                            Sectors of Interest (Select all that apply)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                            {investmentOptions.map((option) => (
                              <label
                                key={option}
                                className="flex items-center p-2 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-700 hover:bg-gray-100 transition-all cursor-pointer has-checked:border-[#1C5244] has-checked:bg-[#1C5244]/5 has-checked:text-[#1C5244]"
                              >
                                <input
                                  type="checkbox"
                                  name="investment_interest"
                                  value={option}
                                  className="w-5 h-5 shrink-0 text-[#1C5244] border-gray-300 rounded focus:ring-[#1C5244] focus:ring-2 accent-[#1C5244] transition-all cursor-pointer"
                                />
                                <span className="ml-3 text-xs font-medium leading-tight transition-colors">
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/20 focus:border-[#1C5244] transition-all bg-gray-50/50"
                    />
                  </div>

                  <AnimatePresence mode="popLayout">
                    {activeTab !== "forgotPassword" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1"
                      >
                        <div className="flex justify-between items-center mt-4">
                          <label className="text-sm font-medium text-gray-700">
                            Password *
                          </label>
                          {activeTab === "login" && (
                            <button
                              type="button"
                              onClick={() => switchTab("forgotPassword")}
                              className="text-xs font-medium text-[#1C5244] hover:underline"
                            >
                              Forgot password?
                            </button>
                          )}
                        </div>
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          required
                          className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/20 focus:border-[#1C5244] transition-all bg-gray-50/50"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Confirm Password field only for Registration */}
                  <AnimatePresence mode="popLayout">
                    {activeTab === "register" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className="space-y-1 mt-4"
                      >
                        <label className="text-sm font-medium text-gray-700">
                          Confirm Password *
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          required
                          className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/20 focus:border-[#1C5244] transition-all bg-gray-50/50"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3.5 bg-[#F8AB1D] text-secondary font-bold rounded-xl mt-6 hover:bg-accent-dark transition-colors shadow-lg shadow-[#F8AB1D]/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending
                      ? "Please wait..."
                      : activeTab === "login"
                        ? "Sign In"
                        : activeTab === "register"
                          ? "Create Account"
                          : "Send Reset Link"}
                  </button>
                </form>

                {activeTab === "forgotPassword" && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => switchTab("login")}
                      className="inline-flex items-center text-sm text-gray-500 hover:text-[#1C5244] transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back to login
                    </button>
                  </div>
                )}

                {activeTab !== "forgotPassword" && (
                  <div className="mt-6 text-center text-sm text-gray-500">
                    By continuing, you agree to our{" "}
                    <Link
                      href="/terms-of-service"
                      className="text-[#1C5244] hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-[#1C5244] hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
