"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuthModal from "../shared/AuthModal";
import { authClient } from "@/lib/auth-client";

gsap.registerPlugin(ScrollTrigger);

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

export default function OpportunitiesList() {
    const containerRef = useRef<HTMLElement>(null);
    const { data: session, isPending } = authClient.useSession();
    const isLoggedIn = !!session;

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
                {/* Login toggle for demo */}
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
                    {opportunities.map((opp, index) => (
                        <div
                            key={opp.id}
                            className={`flex flex-col opp-row ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                } gap-8 items-center overflow-hidden`}
                        >
                            {/* Image */}
                            <div className="w-full lg:w-1/2 opp-image opacity-0">
                                <div className="relative h-80 lg:h-[450px] rounded-3xl overflow-hidden group">
                                    <Image
                                        src={opp.image}
                                        alt={opp.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-2 bg-[#F8AB1D] text-[#333333] rounded-full text-sm font-bold">
                                            {opp.status}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    {/* Returns / Tenure badges — blurred when logged out */}
                                    <div className={`absolute bottom-6 left-6 right-6 ${!isLoggedIn ? "blur-sm select-none" : ""}`}>
                                        <div className="flex gap-4">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                                                <div className="text-white font-bold">{opp.returns}</div>
                                                <div className="text-white/70 text-xs">Returns</div>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                                                <div className="text-white font-bold">{opp.tenure}</div>
                                                <div className="text-white/70 text-xs">Tenure</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full lg:w-1/2 opp-content opacity-0">
                                {/* Always visible: sector, title, location */}
                                <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
                                    {opp.sector}
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mt-2 mb-4">
                                    {opp.title}
                                </h2>
                                <p className="text-gray-600 text-lg mb-4">{opp.location}</p>

                                {/* Gated block — blurred + overlay when logged out */}
                                <div className="relative">
                                    {/* Lock overlay */}
                                    {!isLoggedIn && (
                                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
                                            <svg
                                                className="w-10 h-10 text-[#1C5244] mb-3"
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
                                            <p className="text-[#333333] font-semibold mb-1">
                                                Login to View Details
                                            </p>
                                            <p className="text-gray-500 text-sm mb-4 text-center px-6">
                                                Full investment details available after authentication
                                            </p>
                                            <button
                                                onClick={() => setIsAuthModalOpen(true)}
                                                className="px-6 py-2 bg-[#1C5244] text-white rounded-lg font-semibold hover:bg-[#143d33] transition-colors"
                                            >
                                                Login
                                            </button>
                                        </div>
                                    )}

                                    {/* Blurred content */}
                                    <div className={!isLoggedIn ? "blur-md select-none" : ""}>
                                        <p className="text-gray-600 mb-6">{opp.description}</p>

                                        {/* Amount Badge */}
                                        <div className="inline-block bg-[#1C5244]/10 rounded-xl px-6 py-4 mb-6">
                                            <div className="text-sm text-[#1C5244] font-medium">
                                                Investment Amount
                                            </div>
                                            <div className="text-3xl font-bold text-[#1C5244]">
                                                {opp.amount}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-3 mb-8">
                                            {opp.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-center gap-3 text-gray-600"
                                                >
                                                    <svg
                                                        className="w-5 h-5 text-[#1C5244] flex-shrink-0"
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
                                            // href={`/opportunities/${opp.id}`}
                                            href={`/contact`}
                                            className="inline-flex items-center gap-2 bg-[#F8AB1D] text-[#333333] px-8 py-4 rounded-xl font-semibold hover:bg-[#d99310] transition-all hover:-translate-y-1"
                                        >
                                            {/* View Details */}
                                            Express Interest
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLoginSuccess={() => { }} // Controlled globally now
            />
        </section>
    );
}
