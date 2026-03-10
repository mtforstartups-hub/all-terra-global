"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface JourneyStep {
    number: string;
    title: string;
    description: string;
    image: string;
    details: string[];
    color: string;
}

export default function InvestmentJourney() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const steps: JourneyStep[] = [
        {
            number: "01",
            title: "Discover",
            description: "Identify high-potential opportunities across Zimbabwe's growth sectors",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            details: [
                "Market research & sector analysis",
                "Partnership network sourcing",
                "Initial opportunity screening",
            ],
            color: "#1C5244",
        },
        {
            number: "02",
            title: "Due Diligence",
            description: "Rigorous analysis of every investment with independent verification",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
            details: [
                "Financial & legal review",
                "On-ground asset verification",
                "Risk assessment framework",
            ],
            color: "#333333",
        },
        {
            number: "03",
            title: "Structure",
            description: "Design optimal investment structure with robust protections",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
            details: [
                "Collateral-backed security",
                "Insurance arrangements",
                "UAE jurisdiction protection",
            ],
            color: "#1C5244",
        },
        {
            number: "04",
            title: "Deploy",
            description: "Strategic capital deployment with milestone-based disbursement",
            image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
            details: [
                "Phased capital release",
                "Project milestone tracking",
                "Active fund management",
            ],
            color: "#333333",
        },
        {
            number: "05",
            title: "Monitor",
            description: "Continuous oversight with regular reporting and site visits",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            details: [
                "Monthly performance reports",
                "Quarterly investor updates",
                "Real-time portfolio dashboard",
            ],
            color: "#1C5244",
        },
        {
            number: "06",
            title: "Returns",
            description: "Structured exit with target returns of 13-20% annually",
            image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
            details: [
                "Capital + interest repayment",
                "USD repatriation to investors",
                "Reinvestment opportunities",
            ],
            color: "#F8AB1D",
        },
    ];

    useGSAP(
        () => {
            const track = trackRef.current;
            if (!track) return;

            // Calculate total scroll distance
            const totalWidth = track.scrollWidth - window.innerWidth;

            // Create the horizontal scroll animation
            gsap.to(track, {
                x: -totalWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${totalWidth}`,
                    invalidateOnRefresh: true,
                },
            });

            // Animate each card as it enters
            const cards = gsap.utils.toArray<HTMLElement>(".journey-card");
            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0.3,
                        scale: 0.9,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: gsap.getById("horizontalScroll") || undefined,
                            start: "left 80%",
                            end: "left 50%",
                            scrub: true,
                        },
                    }
                );
            });

            // Animate the progress line
            gsap.to(".progress-line", {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${totalWidth}`,
                    scrub: true,
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative bg-[#0a0a0a] overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C5244]/10 via-transparent to-[#333333]/10" />

            {/* Progress Indicator */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50 hidden lg:block">
                <div className="progress-line h-full bg-[#F8AB1D] w-0" />
            </div>

            {/* Header - Fixed during scroll */}
            <div className="sticky top-0 pt-32 pb-8 px-8 lg:px-16 z-10 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-transparent">
                <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
                    The Process
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
                    Your Investment Journey
                </h2>
                <p className="text-white/60 max-w-xl">
                    From discovery to returns — a structured approach to deploying capital
                    in Africa&apos;s emerging markets.
                </p>
            </div>

            {/* Horizontal Scroll Track */}
            <div
                ref={trackRef}
                className="flex gap-8 px-8 lg:px-16 pb-24 pt-8"
                style={{ width: "fit-content" }}
            >
                {steps.map((step, index) => (
                    <div
                        key={step.number}
                        className="journey-card flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[45vw] xl:w-[35vw]"
                    >
                        <div
                            className="relative h-[60vh] lg:h-[65vh] rounded-3xl overflow-hidden group"
                            style={{
                                background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                            }}
                        >
                            {/* Card Background Image */}
                            <div className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />

                            {/* Card Content */}
                            <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                                {/* Step Number */}
                                <div
                                    className="absolute top-8 right-8 text-8xl font-bold opacity-20"
                                    style={{ color: step.color === "#F8AB1D" ? "#F8AB1D" : "white" }}
                                >
                                    {step.number}
                                </div>

                                {/* Connection Line (except last) */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-white/20" />
                                )}

                                {/* Step Badge */}
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit"
                                    style={{
                                        backgroundColor: step.color,
                                        color: step.color === "#F8AB1D" ? "#333333" : "white",
                                    }}
                                >
                                    <span>Step {step.number}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/70 text-lg mb-6 max-w-md">
                                    {step.description}
                                </p>

                                {/* Details List */}
                                <ul className="space-y-3">
                                    {step.details.map((detail, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 text-white/80"
                                        >
                                            <svg
                                                className="w-5 h-5 flex-shrink-0"
                                                style={{ color: step.color === "#F8AB1D" ? "#F8AB1D" : "#1C5244" }}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Hover Glow Effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 50% 100%, ${step.color}30, transparent 60%)`,
                                }}
                            />
                        </div>
                    </div>
                ))}

                {/* End Card - CTA */}
                <div className="journey-card flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[45vw] xl:w-[35vw]">
                    <div className="relative h-[60vh] lg:h-[65vh] rounded-3xl overflow-hidden bg-gradient-to-br from-[#F8AB1D] to-[#d99310] flex items-center justify-center">
                        <div className="text-center px-8">
                            <h3 className="text-3xl lg:text-4xl font-bold text-[#333333] mb-4">
                                Ready to Start?
                            </h3>
                            <p className="text-[#333333]/80 text-lg mb-8 max-w-md mx-auto">
                                Join investors earning 13-20% returns on structured, asset-backed
                                opportunities.
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-[#333333] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1a1a1a] transition-all hover:-translate-y-1"
                            >
                                Begin Your Journey
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
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-sm">
                <span>Scroll to explore</span>
                <svg
                    className="w-4 h-4 animate-bounce-x"
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
            </div>
        </section>
    );
}
