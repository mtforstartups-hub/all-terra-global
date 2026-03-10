"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leadership = {
    name: "Rahul Jain",
    title: "General Partner",
    subtitle: "Global Investor & Tech-Finance Strategist",
    image: "/images/team/Rahul_Jain.jpeg",
    bio: [
        "Multidisciplinary leader bridging data-driven technology and high-impact financial decision-making",
        "Over two decades of experience with Fortune 500 companies and large conglomerates",
        "Core competencies in investment analysis, systems architecture, digital transformation",
        "Global capital deployment with portfolio valuation of ~$15 million",
    ],
    sectors: ["Agribusiness", "Mining & Resources", "Real Estate & Trade"],
    education: "MBA Finance, Technology Background",
    focus: "Strategic investments in emerging African markets",
};

export default function GeneralPartner() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".gp-image",
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        once: true,
                    },
                },
            );

            gsap.fromTo(
                ".gp-content",
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        once: true,
                    },
                },
            );
        },
        { scope: containerRef },
    );

    return (
        <section ref={containerRef} className="py-24 bg-white overflow-x-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative gp-image opacity-0">
                        <div className="relative h-[600px] rounded-3xl overflow-hidden">
                            <Image
                                src={leadership.image}
                                alt={leadership.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#F8AB1D]/20 rounded-3xl -z-10" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#1C5244]/20 rounded-3xl -z-10" />
                    </div>

                    <div className="gp-content opacity-0">
                        <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
                            General Partner
                        </span>
                        <h2 className="text-4xl font-bold text-[#333333] mt-2 mb-2">
                            {leadership.name}
                        </h2>
                        <p className="text-[#1C5244] font-medium text-lg mb-6">
                            {leadership.subtitle}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {leadership.bio.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-600">
                                    <svg className="w-6 h-6 text-[#1C5244] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mb-8">
                            <p className="text-sm text-gray-500 mb-3">Key Sectors:</p>
                            <div className="flex flex-wrap gap-2">
                                {leadership.sectors.map((sector) => (
                                    <span
                                        key={sector}
                                        className="px-4 py-2 bg-[#1C5244]/10 text-[#1C5244] rounded-full text-sm font-medium"
                                    >
                                        {sector}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-[#F8AB1D] text-[#333333] px-6 py-3 rounded-xl font-semibold hover:bg-[#d99310] transition-all hover:-translate-y-1"
                        >
                            Connect with Rahul
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
