"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

export default function AuthModal({
    isOpen,
    onClose,
    onLoginSuccess,
}: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [isPending, setIsPending] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        console.log("Submit Clicked:- isPending not changed");

        e.preventDefault();
        setIsPending(true);
        console.log("Submit Clicked:- isPending changed");
        setErrorMsg("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const fullname = formData.get("fullname") as string;

        console.log("Form Data: ", formData);


        if (activeTab === "register") {
            const { error } = await authClient.signUp.email({ email, password, name: fullname });
            if (error) setErrorMsg(error.message || "Registration failed.");
            else {
                console.log("Registration Success");

                onLoginSuccess();
                onClose();
            }
        } else {
            const { error } = await authClient.signIn.email({ email, password });
            if (error) setErrorMsg(error.message || "Invalid credentials.");
            else {
                console.log("Login Success");

                onLoginSuccess();
                onClose();
            }
        }
        setIsPending(false);
        console.log("Submit Clicked:- isPending changed back");
    };

    // Reset state when tab changes
    const switchTab = (tab: "login" | "register") => {
        setActiveTab(tab);
        setErrorMsg("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header section */}
                        <div className="bg-[#1C5244] p-6 text-white relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold mb-2">
                                {activeTab === "login" ? "Welcome Back" : "Create Account"}
                            </h2>
                            <p className="text-white/80 text-sm">
                                Unlock full access to exclusive investment opportunities.
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100">
                            <button
                                onClick={() => switchTab("login")}
                                className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${activeTab === "login"
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
                                className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${activeTab === "register"
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

                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* Error Message */}
                                {errorMsg && (
                                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                                        {errorMsg}
                                    </div>
                                )}

                                <AnimatePresence mode="popLayout">
                                    {activeTab === "register" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, y: -10 }}
                                            animate={{ opacity: 1, height: "auto", y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -10 }}
                                            className="space-y-1"
                                        >
                                            <label className="text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                // value={name}
                                                // onChange={(e) => setName(e.target.value)}
                                                name="fullname"
                                                placeholder="John Doe"
                                                required
                                                className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/20 focus:border-[#1C5244] transition-all bg-gray-50/50"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        // value={email}
                                        // onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/20 focus:border-[#1C5244] transition-all bg-gray-50/50"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        {activeTab === "login" && (
                                            <button
                                                type="button"
                                                className="text-xs font-medium text-[#1C5244] hover:underline"
                                            >
                                                Forgot password?
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        // value={password}
                                        // onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1C5244]/20 focus:border-[#1C5244] transition-all bg-gray-50/50"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full py-3.5 bg-[#F8AB1D] text-[#333333] font-bold rounded-xl mt-6 hover:bg-[#d99310] transition-colors shadow-lg shadow-[#F8AB1D]/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? "Please wait..." : (activeTab === "login" ? "Sign In" : "Create Account")}
                                </button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                By continuing, you agree to our{" "}
                                <Link href="/terms-of-service" className="text-[#1C5244] hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy-policy" className="text-[#1C5244] hover:underline">
                                    Privacy Policy
                                </Link>.
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
