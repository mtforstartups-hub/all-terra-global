"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuthModal from "../shared/AuthModal";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Check, FileText, Lock, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const THROTTLE_HOURS = 24;

const opportunities = [
  {
    id: "mining",
    title: "Mining Investment",
    sector: "Copper Mining",
    location: "Zimbabwe",
    amount: "$4,000,000",
    tenure: "36 months",
    returns: "13% p.a.",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1580544859986-05322c53b1d4?auto=format&fit=crop&w=800&q=80",
    features: [
      "Senior Secured Loan",
      "Monthly interest payments",
      "First charge over plant & equipment",
      "Operating cashflow repayments",
    ],
    description:
      "Operating Copper mining concession with focus on dump ore and near-surface material. 1,000-1,500 TPD CIP processing plant.",
  },
  {
    id: "real-estate",
    title: "Real Estate Financing",
    sector: "Residential Development",
    location: "Harare, Zimbabwe",
    amount: "$5,000,000",
    tenure: "24 months",
    returns: "20% p.a.",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    features: [
      "Senior Secured Loan",
      "Title ownership collateral",
      "Credit insurance coverage",
      "Monthly repayments",
    ],
    description:
      "Large-scale residential development on 9.52-hectare land parcel. 98 standalone plots with 3BHK/4BHK houses.",
  },
  {
    id: "vendor-financing",
    title: "Vendor Financing",
    sector: "SME Order Financing",
    location: "Zimbabwe",
    amount: "$2,000,000",
    tenure: "36 months",
    returns: "15% p.a.",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
    features: [
      "RBZ-registered debt",
      "USD repatriation enabled",
      "Monthly interest payments",
      "Bullet principal repayment",
    ],
    description:
      "Structured vendor and SME order financing within Zimbabwe's largest diversified business groups.",
  },
];

// ─── Throttle helper ──────────────────────────────────────────────────────────
// Returns true if we should send the email (i.e. not sent within THROTTLE_HOURS)
// and updates the timestamp in localStorage.
function checkAndMarkEmailThrottle(userId: string, oppId: string): boolean {
  const key = `express_interest_${userId}_${oppId}`;
  const now = Date.now();

  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const lastSent = parseInt(stored, 10);
      const hoursSince = (now - lastSent) / (1000 * 60 * 60);
      if (hoursSince < THROTTLE_HOURS) {
        return false; // throttled — do NOT send
      }
    }
    localStorage.setItem(key, String(now));
    return true; // cleared — send the email
  } catch {
    // localStorage unavailable (e.g. SSR / private mode) — allow send
    return true;
  }
}

// ─── Email sender ─────────────────────────────────────────────────────────────
// Replace this with your actual email API route, e.g. /api/send-email
async function sendInterestEmail(payload: {
  userName: string;
  userEmail: string;
  userPhone: string;
  oppTitle: string;
  oppSector: string;
  oppAmount: string;
}): Promise<void> {
  // Example: POST to your own Next.js API route that calls Resend / Nodemailer / etc.
  await fetch("/api/send-op-interest-emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  });
  // Errors are intentionally swallowed — the UX is already optimistically updated.
}

// ─── Per-opportunity button state ─────────────────────────────────────────────
type ButtonState = "idle" | "success";

export default function OpportunitiesList() {
  const containerRef = useRef<HTMLElement>(null);
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const user = session?.user;
  const hasSignedNda = user?.hasSignedNda;

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Map of oppId → ButtonState for optimistic per-card feedback
  const [buttonStates, setButtonStates] = useState<Record<string, ButtonState>>(
    {},
  );
  // Track active reset timers so we can clear them if needed
  const resetTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const isLockedOut = isPending || !isLoggedIn || !hasSignedNda;

  // ─── Express Interest handler ───────────────────────────────────────────────
  const handleExpressInterest = useCallback(
    (opp: (typeof opportunities)[0]) => {
      // 1. Optimistic UI update — instantly show success state
      setButtonStates((prev) => ({ ...prev, [opp.id]: "success" }));

      // 2. Reset button after 5 seconds
      if (resetTimers.current[opp.id]) {
        clearTimeout(resetTimers.current[opp.id]);
      }
      resetTimers.current[opp.id] = setTimeout(() => {
        setButtonStates((prev) => ({ ...prev, [opp.id]: "idle" }));
      }, 5000);

      // 3. Smart throttle — only fire the email once per 24h per user+opp
      if (!user?.id) return;
      const shouldSend = checkAndMarkEmailThrottle(user.id, opp.id);
      if (!shouldSend) return;

      // 4. Fire email in the background (non-blocking)
      sendInterestEmail({
        userName: user.name ?? "Unknown",
        userEmail: user.email ?? "Unknown",
        userPhone: user.phone ?? "Unknown",
        oppTitle: opp.title,
        oppSector: opp.sector,
        oppAmount: opp.amount,
      }).catch(console.error);
      //   console.log(user.phone);
    },
    [user],
  );

  // ─── GSAP scroll animations ─────────────────────────────────────────────────
  useGSAP(
    () => {
      const oppRows = gsap.utils.toArray<HTMLElement>(".opp-row");
      oppRows.forEach((row, i) => {
        const image = row.querySelector(".opp-image");
        const content = row.querySelector(".opp-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            once: true,
          },
        });

        tl.fromTo(
          image,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        ).fromTo(
          content,
          { opacity: 0, x: i % 2 === 0 ? 50 : -50 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
          "-=0.8",
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Session status toggle */}
        <div className="flex justify-end mb-8 items-center gap-4">
          {isPending ? (
            <span className="text-gray-500 text-sm">Loading session...</span>
          ) : isLoggedIn ? (
            <button
              onClick={() => authClient.signOut()}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-green-100 text-green-700 hover:bg-green-200"
            >
              ✓ Logged In as {session.user?.name} (Click to Logout)
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              🔒 Not Logged In (Click to Login)
            </button>
          )}
        </div>

        <div className="space-y-12">
          {opportunities.map((opp, index) => {
            const btnState = buttonStates[opp.id] ?? "idle";
            const isSuccess = btnState === "success";

            return (
              <div
                key={opp.id}
                className={`flex flex-col opp-row ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 items-center overflow-hidden`}
              >
                {/* ── Image ─────────────────────────────────────────────── */}
                <div className="w-full lg:w-1/2 opp-image opacity-0">
                  <div className="relative h-80 lg:h-112.5 rounded-3xl overflow-hidden group">
                    <Image
                      src={opp.image}
                      alt={opp.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-[#F8AB1D] text-secondary rounded-full text-sm font-bold">
                        {opp.status}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                    {/* Masked Badges */}
                    <div
                      className={`absolute bottom-6 left-6 right-6 ${
                        isLockedOut ? "blur-sm select-none" : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                          <div className="text-white font-bold">
                            {isLockedOut ? "XX%" : opp.returns}
                          </div>
                          <div className="text-white/70 text-xs">Returns</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                          <div className="text-white font-bold">
                            {isLockedOut ? "XX mos" : opp.tenure}
                          </div>
                          <div className="text-white/70 text-xs">Tenure</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Content ───────────────────────────────────────────── */}
                <div className="w-full lg:w-1/2 opp-content opacity-0">
                  <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
                    {opp.sector}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-4">
                    {opp.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-4">{opp.location}</p>

                  {/* Gated block */}
                  <div className="relative">
                    {/* Lock overlay */}
                    {!isLoggedIn && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
                        <Lock className="size-10 mb-3 text-[#1C5244]" />
                        <p className="text-secondary font-semibold mb-1">
                          Login to View Details
                        </p>
                        <p className="text-gray-500 text-sm mb-4 text-center px-6">
                          Full investment details available after authentication
                        </p>
                        <button
                          onClick={() => setIsAuthModalOpen(true)}
                          className="px-6 py-2 bg-[#1C5244] text-white rounded-lg font-semibold hover:bg-[#174539] transition-colors"
                        >
                          Login
                        </button>
                      </div>
                    )}

                    {/* NDA Overlay */}
                    {isLoggedIn && !hasSignedNda && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
                        <FileText className="size-12 text-[#F8AB1D] mb-3" />
                        <p className="text-secondary font-semibold mb-1">
                          NDA Signature Required
                        </p>
                        <p className="text-gray-500 text-sm mb-4 text-center px-6">
                          Please sign the Non-Disclosure Agreement to unlock
                          full investment details.
                        </p>
                        <Link
                          href="/dashboard"
                          className="px-6 py-2 bg-[#1C5244] text-white rounded-lg font-semibold hover:bg-[#174539] transition-colors"
                        >
                          Sign NDA →
                        </Link>
                      </div>
                    )}

                    {/* Masked Data Content */}
                    <div className={isLockedOut ? "blur-md select-none" : ""}>
                      <p className="text-gray-600 mb-6">
                        {isLockedOut
                          ? "This is a secure placeholder description. Sign in and complete your NDA to view the full investment thesis, operational metrics, and comprehensive asset overview."
                          : opp.description}
                      </p>

                      {/* Amount Badge */}
                      <div className="inline-block bg-[#1C5244]/10 rounded-xl px-6 py-4 mb-6">
                        <div className="text-sm text-[#1C5244] font-medium">
                          Investment Amount
                        </div>
                        <div className="text-3xl font-bold text-[#1C5244]">
                          {isLockedOut ? "$X,XXX,XXX" : opp.amount}
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {(isLockedOut
                          ? [
                              "Confidential operational detail",
                              "Secured structural advantage",
                              "Protected financial metric",
                            ]
                          : opp.features
                        ).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-gray-600"
                          >
                            <Check className="size-5 shrink-0 text-[#1C5244]" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* ── Express Interest Button ──────────────────────── */}
                      <button
                        onClick={() => handleExpressInterest(opp)}
                        disabled={isLockedOut}
                        className={`
                          group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold
                          transition-all duration-300 ease-in-out
                          ${
                            isSuccess
                              ? // Success state — green tones matching primary
                                "bg-[#1C5244] text-white scale-[1.02] shadow-lg shadow-[#1C5244]/20 cursor-default"
                              : // Idle state — accent yellow
                                "bg-[#F8AB1D] text-secondary hover:bg-[#e69c10] hover:-translate-y-1 hover:shadow-md active:scale-[0.98]"
                          }
                        `}
                      >
                        {isSuccess ? (
                          <>
                            <CheckCircle2 className="size-5 shrink-0 animate-[scale-in_0.2s_ease-out]" />
                            <span>Our team will get back to you soon</span>
                          </>
                        ) : (
                          <>
                            <span>Express Interest</span>
                            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>

                      {/* Subtle re-assurance copy shown after success */}
                      <p
                        className={`
                          mt-3 text-sm text-[#1C5244]/70 font-medium
                          transition-all duration-500
                          ${isSuccess ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}
                        `}
                      >
                        ✓ We've received your interest and will be in touch
                        shortly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {}}
      />
    </section>
  );
}
