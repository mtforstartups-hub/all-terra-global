"use client";

import Link from "next/link";
import TiltCard3D from "../TiltCard3D";
import { authClient } from "@/lib/auth-client";
import { useAuthModal } from "@/context/AuthModalContext"; // 👈 import hook

export default function Opportunities() {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const user = session?.user;
  const hasSignedNda = user?.hasSignedNda;

  const { openAuthModal } = useAuthModal(); // 👈 use hook — no local modal state needed

  const opportunities = [
    {
      title: "Mining Investment",
      sector: "Gold Mining",
      location: "Mazowe, Zimbabwe",
      amount: "$4,000,000",
      tenure: "36 months",
      returns: "13% p.a.",
      status: "Active",
      features: [
        "Senior Secured Loan",
        "Monthly interest payments",
        "First charge over plant & equipment",
        "Operating cashflow repayments",
      ],
      description:
        "Operating gold mining concession with focus on dump ore and near-surface material. 1,000-1,500 TPD CIP processing plant.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      gradient: "from-[#1C5244] to-[#143d33]",
    },
    {
      title: "Real Estate Financing",
      sector: "Residential Development",
      location: "Harare, Zimbabwe",
      amount: "$5,000,000",
      tenure: "24 months",
      returns: "20% p.a.",
      status: "Active",
      features: [
        "Senior Secured Loan",
        "Title ownership collateral",
        "Credit insurance coverage",
        "Monthly repayments",
      ],
      description:
        "Large-scale residential development on 9.52-hectare land parcel. 98 standalone plots with 3BHK/4BHK houses.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      gradient: "from-[#333333] to-[#1a1a1a]",
    },
    {
      title: "Vendor Financing",
      sector: "SME Order Financing",
      location: "Zimbabwe",
      amount: "$2,000,000",
      tenure: "36 months",
      returns: "15% p.a.",
      status: "Active",
      features: [
        "RBZ-registered debt",
        "USD repatriation enabled",
        "Monthly interest payments",
        "Bullet principal repayment",
      ],
      description:
        "Structured vendor and SME order financing within Zimbabwe's largest diversified business groups.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      gradient: "from-[#F8AB1D] to-[#d99310]",
    },
  ];

  return (
    <section id="opportunities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
            Investment Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-6">
            Current Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            High-yield, asset-backed investment opportunities across mining,
            real estate, and financing sectors
          </p>
          {/* Auth Display */}
          <div className="flex justify-center items-center gap-4">
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
                onClick={openAuthModal} // 👈 opens shared modal via context
                className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                🔒 Not Logged In (Click to Login)
              </button>
            )}
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opp, index) => (
            <TiltCard3D
              key={opp.title}
              tiltAmount={10}
              glareOpacity={0.15}
              scale={1.03}
            >
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden h-full group">
                {/* Header */}
                <div
                  className={`bg-linear-to-r ${opp.gradient} p-6 relative overflow-hidden`}
                >
                  <div
                    className="absolute -top-2 -right-2 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="text-white/60">{opp.icon}</div>
                  </div>

                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="px-3 py-1 bg-[#F8AB1D] text-secondary rounded-full text-xs font-bold animate-pulse">
                      {opp.status}
                    </span>
                    <span
                      className={`text-sm ${index === 2 ? "text-secondary/80" : "text-white/80"}`}
                    >
                      {opp.sector}
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-bold mb-1 ${index === 2 ? "text-secondary" : "text-white"}`}
                  >
                    {opp.title}
                  </h3>
                  <p
                    className={`text-sm ${index === 2 ? "text-secondary/70" : "text-white/70"}`}
                  >
                    {opp.location}
                  </p>
                </div>

                {/* Stats & Content */}
                <div className="relative">
                  {/* Overlay: Not logged in */}
                  {!isLoggedIn && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-b-3xl">
                      <svg
                        className="w-12 h-12 text-[#1C5244] mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <p className="text-secondary font-semibold mb-2">
                        Login to View Details
                      </p>
                      <p className="text-gray-500 text-sm mb-4 text-center px-4">
                        Full investment details available after authentication
                      </p>
                      <button
                        onClick={openAuthModal} // 👈 opens shared modal via context
                        className="px-6 py-2 bg-[#1C5244] text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                      >
                        Login
                      </button>
                    </div>
                  )}

                  {/* Overlay: Logged in but NDA not signed */}
                  {isLoggedIn && !hasSignedNda && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm rounded-b-3xl">
                      <svg
                        className="w-12 h-12 text-[#F8AB1D] mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-secondary font-semibold mb-2">
                        NDA Signature Required
                      </p>
                      <p className="text-gray-500 text-sm mb-4 text-center px-4">
                        Please sign the Non-Disclosure Agreement to unlock full
                        investment details.
                      </p>
                      <a
                        href="/dashboard"
                        className="px-6 py-2 bg-[#F8AB1D] text-[#1C5244] rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                      >
                        Sign NDA →
                      </a>
                    </div>
                  )}

                  {/* Stats */}
                  <div
                    className={`grid grid-cols-3 divide-x divide-gray-100 bg-gray-50 ${
                      !isLoggedIn || !hasSignedNda ? "blur-md select-none" : ""
                    }`}
                  >
                    <div className="p-4 text-center">
                      <div className="text-lg font-bold text-[#1C5244]">
                        {opp.amount}
                      </div>
                      <div className="text-xs text-gray-500">Amount</div>
                    </div>
                    <div className="p-4 text-center">
                      <div className="text-lg font-bold text-[#1C5244]">
                        {opp.tenure}
                      </div>
                      <div className="text-xs text-gray-500">Tenure</div>
                    </div>
                    <div className="p-4 text-center">
                      <div className="text-lg font-bold text-[#F8AB1D]">
                        {opp.returns}
                      </div>
                      <div className="text-xs text-gray-500">Returns</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`p-6 ${!isLoggedIn || !hasSignedNda ? "blur-md select-none" : ""}`}
                  >
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {opp.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {opp.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <svg
                            className="w-4 h-4 text-[#1C5244] shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-[#F8AB1D] text-secondary py-3 rounded-xl font-semibold hover:bg-accent-dark transition-all group-hover:shadow-lg group-hover:-translate-y-0.5"
                    >
                      Express Interest
                    </Link>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>

        {/* CTA Banner */}
        <TiltCard3D className="mt-16" tiltAmount={5} glareOpacity={0.1}>
          <div className="bg-linear-to-r from-secondary to-[#1a1a1a] rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Looking for Other Investment Opportunities?
              </h3>
              <p className="text-white/70">
                Contact us to discuss custom investment structures and emerging
                opportunities
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 bg-[#F8AB1D] text-secondary px-8 py-4 rounded-xl font-bold hover:bg-accent-dark transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              Schedule a Call
            </Link>
          </div>
        </TiltCard3D>
      </div>
      {/* AuthModal removed — now rendered once in AuthModalProvider */}
    </section>
  );
}
