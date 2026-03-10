"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export default function OurEdgeV2() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const edges = [
        {
            title: "On-ground Presence",
            description: "Local teams in Zimbabwe ensuring real-time deal sourcing and execution",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            color: "bg-[#1C5244]",
        },
        {
            title: "Credible Partnerships",
            description: "Institutional relationships with key players across sectors",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: "bg-[#F8AB1D]",
        },
        {
            title: "Secured Exposure",
            description: "Focus on collateral-backed investments with tangible assets",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            color: "bg-[#1C5244]",
        },
        {
            title: "Watertight Structuring",
            description: "Sophisticated deal structures that protect investor capital",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: "bg-[#F8AB1D]",
        },
        {
            title: "Due Diligence",
            description: "Independent verification and comprehensive risk assessment",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
            color: "bg-[#1C5244]",
        },
        {
            title: "Collateral Backed",
            description: "First charge over assets, equipment, and cashflows",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            color: "bg-[#F8AB1D]",
        },
        {
            title: "Insurance Protected",
            description: "Credit insurance covering interest and principal repayment",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            color: "bg-[#1C5244]",
        },
        {
            title: "Curated Access",
            description: "Off-market, relationship-led deal flow unavailable elsewhere",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
            ),
            color: "bg-[#F8AB1D]",
        },
    ];

    // Auto-rotate cards every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % edges.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [activeIndex, edges.length]);

    useGSAP(
        () => {
            // Animate header elements
            gsap.fromTo(
                ".edge-header",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#0a0a0a] overflow-hidden border-b border-t border-[#1C5244]"
        >
            <div className="flex flex-col lg:flex-row min-h-[800px]">
                {/* LEFT COLUMN: Header */}
                <div className="w-full lg:w-1/2 py-16 lg:py-20 bg-gradient-to-br from-[#1C5244] to-[#143d33] relative flex items-center justify-center">
                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 overflow-hidden opacity-10">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    <div className="edge-header relative z-10 px-8 lg:px-16 max-w-xl">
                        <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-widest mb-4 block">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
                            All Terra&apos;s{" "}
                            <span className="text-[#F8AB1D]">Edge</span>
                        </h2>
                        <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                            We tap into Zimbabwe&apos;s vast potential through our unique advantages
                            that set us apart from traditional investment approaches.
                        </p>

                        {/* Progress dots */}
                        <div className="mt-8 flex items-center gap-2">
                            {edges.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index
                                        ? "bg-[#F8AB1D] w-6"
                                        : "bg-white/30 hover:bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Card Carousel - Centered (Dark Theme) */}
                <div className="w-full lg:w-1/2 bg-[#0a0a0a] flex items-center justify-center py-20 lg:py-0 px-6 lg:px-12">
                    <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
                        {edges.map((edge, index) => {
                            const relativeIndex = (index - activeIndex + edges.length) % edges.length;

                            let animateProps: any = {};

                            if (relativeIndex === 0) {
                                // Front active card
                                animateProps = { x: 0, y: 0, scale: 1, rotate: 0, zIndex: 20, opacity: 1 };
                            } else if (relativeIndex === 1) {
                                // Peeking right
                                animateProps = { x: 40, y: -20, scale: 0.95, rotate: 5, zIndex: 15, opacity: 1 };
                            } else if (relativeIndex === 2) {
                                // Peeking left
                                animateProps = { x: -40, y: -40, scale: 0.9, rotate: -4, zIndex: 10, opacity: 1 };
                            } else if (relativeIndex === 3) {
                                // Peeking top right
                                animateProps = { x: 20, y: -60, scale: 0.85, rotate: 2, zIndex: 5, opacity: 1 };
                            } else {
                                // Hidden behind the stack
                                animateProps = { x: 0, y: -80, scale: 0.5, rotate: 0, zIndex: 0, opacity: 0 };
                            }

                            return (
                                <motion.div
                                    key={edge.title}
                                    className="absolute w-[280px] sm:w-[320px] h-[320px] bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-col cursor-pointer shadow-xl text-left"
                                    initial={false}
                                    animate={animateProps}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20,
                                        mass: 1,
                                    }}
                                    onClick={() => setActiveIndex(index)}
                                    whileHover={{ scale: relativeIndex === 0 ? 1.02 : animateProps.scale + 0.02 }}
                                >
                                    {/* Icon */}
                                    <div className={`w-12 h-12 ${edge.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                                        {edge.icon}
                                    </div>

                                    {/* Content */}
                                    <h4 className="text-xl font-bold text-white mb-2">
                                        {edge.title}
                                    </h4>
                                    <p className="text-white/60 leading-relaxed text-sm">
                                        {edge.description}
                                    </p>

                                    {/* Card number indicator */}
                                    <div className="mt-auto flex items-center gap-2">
                                        <span className="text-[#F8AB1D] font-bold text-xs">
                                            0{index + 1}
                                        </span>
                                        <div className="flex-1 h-px bg-white/10" />
                                        <span className="text-white/30 text-xs">
                                            0{edges.length}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
