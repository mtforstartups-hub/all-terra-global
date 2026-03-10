"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
    {
        icon: "🛡️",
        title: "Insurance Backed",
        description: "Credit insurance covering interest and principal",
    },
    {
        icon: "🏦",
        title: "Collateral Secured",
        description: "First charge over tangible assets",
    },
    {
        icon: "📋",
        title: "Due Diligence",
        description: "Independent verification on every deal",
    },
    {
        icon: "🌍",
        title: "UAE Jurisdiction",
        description: "Safe harbour with legal firewall",
    },
];

export default function WhyInvest() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".why-invest-item",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        once: true,
                    },
                },
            );
        },
        { scope: containerRef },
    );

    return (
        <section ref={containerRef} className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
                        Why Invest With Us
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mt-3">
                        Your Investment is Protected
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((item) => (
                        <div
                            key={item.title}
                            className="bg-white rounded-2xl p-6 text-center border border-gray-100 why-invest-item opacity-0"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="font-bold text-[#333333] mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
