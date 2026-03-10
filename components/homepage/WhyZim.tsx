"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EconomicPoint {
    title: string;
    numericValue: number;
    prefix?: string;
    suffix?: string;
    description: string;
}

export default function WhyZimbabwe() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const mineralData = [
        {
            name: "Gold",
            description:
                "Highest gold reserve density globally (4,000+ deposits)",
            icon: "🥇",
        },
        {
            name: "Platinum (PGMs)",
            description: "#3 globally by production (~8% of global supply)",
            icon: "🪨",
        },
        {
            name: "Lithium",
            description:
                "Largest reserves in Africa; top 5–7 globally for EV batteries",
            icon: "🔋",
        },
        {
            name: "Chrome",
            description: "2nd largest high-grade chrome reserves worldwide",
            icon: "⚙️",
        },
    ];

    const economicPoints: EconomicPoint[] = [
        {
            title: "High GDP Growth",
            numericValue: 6.6,
            suffix: "%",
            description: "Among the highest growing countries of Africa",
        },
        {
            title: "Real Estate Boom",
            numericValue: 80,
            suffix: "%+",
            description: "Harare home prices growth over 5 years",
        },
        {
            title: "Macroeconomic Stability",
            numericValue: 4,
            // prefix: "$",
            suffix: "-5%",
            description: "Cooling inflation and tighter fiscal discipline",
        },
        {
            title: "Export Growth Momentum",
            numericValue: 2,
            suffix: "-3x",
            description: "Doubled over recent years, driven by increased global demand",
        },
    ];

    useGSAP(
        () => {
            // Animate mineral cards sliding in
            gsap.fromTo(
                ".mineral-card",
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true,
                    },
                },
            );

            // Animate economic cards sliding in
            gsap.fromTo(
                ".economic-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".economic-grid",
                        start: "top 80%",
                        once: true,
                    },
                },
            );

            // Animate counters
            const counters = gsap.utils.toArray<HTMLElement>(".econ-counter");
            counters.forEach((counter, index) => {
                const targetValue = parseFloat(counter.dataset.value || "0");
                const isDecimal = targetValue % 1 !== 0;

                gsap.fromTo(
                    counter,
                    { innerText: 0 },
                    {
                        innerText: targetValue,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerText: isDecimal ? 0.1 : 1 },
                        scrollTrigger: {
                            trigger: ".economic-grid",
                            start: "top 80%",
                            once: true,
                        },
                        delay: index * 0.15,
                        onUpdate: function () {
                            if (isDecimal) {
                                counter.innerText = parseFloat(counter.innerText).toFixed(1);
                            }
                        },
                    },
                );
            });

            // Animate key signals
            gsap.fromTo(
                ".key-signal",
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".key-signals-box",
                        start: "top 85%",
                        once: true,
                    },
                },
            );
        },
        { scope: sectionRef },
    );

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
                        The Opportunity
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333333] mt-3 mb-6">
                        Why Zimbabwe (Now)
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Africa faces a structural capital gap across MSMEs, mining, land,
                        and real estate. Zimbabwe offers unique opportunities for strategic
                        investors.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Mineral Snapshot */}
                    <div>
                        <h3 className="text-2xl font-bold text-[#333333] mb-8 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-lg bg-[#1C5244] flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-white"
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
                            </span>
                            Mineral Snapshot
                        </h3>
                        <div className="space-y-4">
                            {mineralData.map((mineral) => (
                                <div
                                    key={mineral.name}
                                    className="mineral-card flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-[#1C5244]/5 transition-colors border border-gray-100 opacity-0"
                                >
                                    <span className="text-3xl">{mineral.icon}</span>
                                    <div>
                                        <h4 className="font-bold text-[#333333] text-lg">
                                            {mineral.name}
                                        </h4>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {mineral.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Economic Snapshot */}
                    <div>
                        <h3 className="text-2xl font-bold text-[#333333] mb-8 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-lg bg-[#F8AB1D] flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-[#333333]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                </svg>
                            </span>
                            Economic Snapshot
                        </h3>
                        <div className="economic-grid grid grid-cols-2 gap-4">
                            {economicPoints.map((point) => (
                                <div
                                    key={point.title}
                                    className="economic-card p-5 bg-[#333333] rounded-xl text-white hover:-translate-y-1 transition-transform opacity-0"
                                >
                                    <div className="text-3xl font-bold text-[#F8AB1D] mb-2">
                                        {point.prefix && <span>{point.prefix}</span>}
                                        <span
                                            className="econ-counter"
                                            data-value={point.numericValue}
                                        >
                                            0
                                        </span>
                                        {point.suffix && <span>{point.suffix}</span>}
                                    </div>
                                    <h4 className="font-semibold text-white mb-1">
                                        {point.title}
                                    </h4>
                                    <p className="text-white/70 text-sm">{point.description}</p>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}
