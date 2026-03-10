"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: "$11M+", label: "Total Opportunities" },
    { value: "13-20%", label: "Target Returns" },
    { value: "24-36", label: "Months Tenure" },
    { value: "100%", label: "Secured" },
];

export default function Stats() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".stat-item",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        once: true,
                    },
                },
            );
        },
        { scope: containerRef },
    );

    return (
        <section ref={containerRef} className="py-12 bg-[#1C5244]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat-item opacity-0">
                            <div className="text-4xl font-bold text-[#F8AB1D]">
                                {stat.value}
                            </div>
                            <div className="text-white/80 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
