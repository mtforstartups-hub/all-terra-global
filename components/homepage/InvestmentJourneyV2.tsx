"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StepDetail {
    number: string;
    title: string;
    owner: "Our Process" | "Your Journey";
    description: string;
    details: string[];
}

const stepsData: StepDetail[] = [
    {
        number: "01",
        title: "Discover",
        owner: "Our Process",
        description:
            "Identify high-potential opportunities across Zimbabwe's growth sectors",
        details: [
            "Market research & analysis",
            "Partnership network sourcing",
            "Initial opportunity screening",
        ],
    },
    {
        number: "02",
        title: "Due Diligence",
        owner: "Our Process",
        description:
            "Rigorous analysis of every investment with independent verification",
        details: [
            "Financial & legal review",
            "On-ground asset verification",
            "Risk assessment framework",
        ],
    },
    {
        number: "03",
        title: "Structure",
        owner: "Our Process",
        description:
            "Design optimal investment structure with robust protections",
        details: [
            "Collateral-backed security",
            "Insurance arrangements",
            "UAE jurisdiction protection",
        ],
    },
    {
        number: "04",
        title: "Deploy",
        owner: "Your Journey",
        description:
            "Strategic capital deployment with milestone-based disbursement",
        details: [
            "Phased capital release",
            "Project milestone tracking",
            "Active fund management",
        ],
    },
    {
        number: "05",
        title: "Monitor",
        owner: "Your Journey",
        description:
            "Continuous oversight with regular reporting and site visits",
        details: [
            "Monthly performance reports",
            "Quarterly investor updates",
            "Real-time portfolio dashboard",
        ],
    },
    {
        number: "06",
        title: "Returns",
        owner: "Your Journey",
        description:
            "Structured exit with target returns of 13-20% annually",
        details: [
            "Capital + interest repayment",
            "USD repatriation to investors",
            "Reinvestment opportunities",
        ],
    },
];

const FIRM_COLOR = "#1C5244";
const INVESTOR_COLOR = "#F8AB1D";
const AUTOPLAY_MS = 2800;

function getStepColor(index: number) {
    return index <= 2 ? FIRM_COLOR : INVESTOR_COLOR;
}

export default function InvestmentJourneyV2() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    // Key that resets the CSS progress animation on each step change
    const [progressKey, setProgressKey] = useState(0);

    const sectionRef = useRef<HTMLElement>(null);
    const widgetRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const activeStep = stepsData[activeIndex];
    const isFirmTheme = activeIndex <= 2;

    // ── Scroll-reveal animations ──────────────────────────────────────────
    useGSAP(
        () => {
            gsap.fromTo(
                ".ij-header",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            gsap.fromTo(
                widgetRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    // ── Content transition animation ─────────────────────────────────────
    const animateContent = useCallback((fn: () => void) => {
        if (!contentRef.current || isTransitioning) return;
        setIsTransitioning(true);
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -8,
            duration: 0.18,
            ease: "power2.in",
            onComplete: () => {
                fn();
                if (contentRef.current) {
                    gsap.fromTo(
                        contentRef.current,
                        { opacity: 0, y: 12 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.25,
                            ease: "power2.out",
                            onComplete: () => setIsTransitioning(false),
                        }
                    );
                }
            },
        });
    }, [isTransitioning]);

    const goToStep = useCallback((index: number) => {
        if (index === activeIndex) return;
        animateContent(() => {
            setActiveIndex(index);
            setProgressKey(k => k + 1);
        });
    }, [activeIndex, animateContent]);

    // ── Autoplay ──────────────────────────────────────────────────────────
    const scheduleNext = useCallback(() => {
        if (autoplayRef.current) clearTimeout(autoplayRef.current);
        autoplayRef.current = setTimeout(() => {
            if (!isPaused) {
                const next = (activeIndex + 1) % stepsData.length;
                animateContent(() => {
                    setActiveIndex(next);
                    setProgressKey(k => k + 1);
                });
            }
        }, AUTOPLAY_MS);
    }, [activeIndex, isPaused, animateContent]);

    useEffect(() => {
        if (!isPaused) {
            scheduleNext();
        }
        return () => {
            if (autoplayRef.current) clearTimeout(autoplayRef.current);
        };
    }, [activeIndex, isPaused, scheduleNext]);

    function handleStepClick(index: number) {
        if (autoplayRef.current) clearTimeout(autoplayRef.current);
        goToStep(index);
        // Resume autoplay after a brief pause when user manually clicks
        setIsPaused(false);
    }

    return (
        <section
            ref={sectionRef}
            className="relative py-20 lg:py-32 bg-[#0a0a0a] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isFirmTheme
                        ? "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(28,82,68,0.28) 0%, transparent 70%)"
                        : "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(248,171,29,0.18) 0%, transparent 70%)",
                    transition: "background 0.7s ease",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ── Section Header ── */}
                <div className="ij-header text-center mb-14">
                    <span className="inline-block text-[#F8AB1D] text-sm font-semibold uppercase tracking-widest mb-3">
                        The Process
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Your Investment Journey
                    </h2>
                    <p className="text-white/60 max-w-xl mx-auto text-lg">
                        From discovery to returns — a structured approach to deploying
                        capital in Africa&apos;s emerging markets.
                    </p>
                </div>

                {/* ── Stepper Widget ── */}
                <div
                    ref={widgetRef}
                    className="rounded-2xl overflow-hidden border border-white/15"
                    style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.6)" }}
                >
                    {/* Node Rail */}
                    <div className="bg-[#0f1923] px-6 sm:px-10 pt-10 pb-6 border-b border-white/10">
                        <div className="relative mb-8">
                            {/* Dual-color connecting rail */}
                            <div className="absolute inset-x-0 top-[18px] h-[3px] rounded-full overflow-hidden">
                                <div className="h-full w-full flex">
                                    <div className="h-full" style={{ width: "50%", backgroundColor: FIRM_COLOR }} />
                                    <div className="h-full" style={{ width: "50%", backgroundColor: INVESTOR_COLOR }} />
                                </div>
                            </div>

                            {/* Nodes */}
                            <div className="relative z-10 flex justify-between">
                                {stepsData.map((step, index) => {
                                    const isActive = index === activeIndex;
                                    const stepColor = getStepColor(index);
                                    return (
                                        <button
                                            key={step.number}
                                            onClick={() => handleStepClick(index)}
                                            aria-label={`Step ${step.number}: ${step.title}`}
                                            className="group flex flex-col items-center gap-2.5 focus:outline-none"
                                        >
                                            <div
                                                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-[3px] border-[#0f1923]"
                                                style={{
                                                    backgroundColor: isActive
                                                        ? stepColor
                                                        : index <= 2
                                                            ? "rgba(28,82,68,0.4)"
                                                            : "rgba(248,171,29,0.25)",
                                                    color: isActive
                                                        ? index <= 2 ? "#fff" : "#111"
                                                        : "rgba(255,255,255,0.6)",
                                                    transform: isActive ? "scale(1.22)" : "scale(1)",
                                                    boxShadow: isActive
                                                        ? `0 0 0 4px ${stepColor}40, 0 4px 12px ${stepColor}50`
                                                        : "none",
                                                    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                                }}
                                            >
                                                {step.number}
                                            </div>
                                            <span
                                                className="hidden sm:block text-[10px] font-bold uppercase tracking-wider"
                                                style={{
                                                    color: isActive ? stepColor : "rgba(255,255,255,0.4)",
                                                    transition: "color 0.3s ease",
                                                }}
                                            >
                                                {step.title}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Owner labels */}
                        <div className="flex text-xs font-bold uppercase tracking-widest">
                            <div className="w-1/2 text-center" style={{ color: `${FIRM_COLOR}ee` }}>
                                Our Process
                            </div>
                            <div className="w-1/2 text-center" style={{ color: `${INVESTOR_COLOR}ee` }}>
                                Your Journey
                            </div>
                        </div>
                    </div>

                    {/* Content Panel */}
                    <div
                        ref={contentRef}
                        className="relative p-6 sm:p-8 lg:p-12 min-h-[480px] sm:min-h-[350px] lg:min-h-[300px] overflow-hidden"
                        style={{
                            background: isFirmTheme
                                ? "linear-gradient(135deg, #0d201a 0%, #0a0a0a 100%)"
                                : "linear-gradient(135deg, #1c140a 0%, #0a0a0a 100%)",
                            transition: "background 0.5s ease",
                        }}
                    >
                        {/* Step meta row */}
                        <div className="flex items-center justify-between mb-6">
                            <span
                                className="text-sm font-bold uppercase tracking-[0.15em]"
                                style={{ color: isFirmTheme ? "#4ade80" : INVESTOR_COLOR }}
                            >
                                STEP {activeStep.number}
                            </span>
                            <span
                                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                                style={
                                    isFirmTheme
                                        ? {
                                            backgroundColor: "rgba(28,82,68,0.35)",
                                            color: "#6ee7b7",
                                            borderColor: "rgba(28,82,68,0.7)",
                                        }
                                        : {
                                            backgroundColor: "rgba(248,171,29,0.2)",
                                            color: INVESTOR_COLOR,
                                            borderColor: "rgba(248,171,29,0.5)",
                                        }
                                }
                            >
                                {activeStep.owner}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                            {activeStep.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/75 text-lg mb-8 max-w-2xl">
                            {activeStep.description}
                        </p>

                        {/* Detail cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {activeStep.details.map((detail, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 p-4 rounded-xl border"
                                    style={
                                        isFirmTheme
                                            ? {
                                                backgroundColor: "rgba(28,82,68,0.25)",
                                                borderColor: "rgba(74,222,128,0.2)",
                                            }
                                            : {
                                                backgroundColor: "rgba(248,171,29,0.12)",
                                                borderColor: "rgba(248,171,29,0.3)",
                                            }
                                    }
                                >
                                    <span
                                        className="font-bold text-base flex-shrink-0 mt-0.5"
                                        style={{
                                            color: isFirmTheme ? "#4ade80" : INVESTOR_COLOR,
                                        }}
                                    >
                                        →
                                    </span>
                                    <span className="text-white/90 text-sm leading-relaxed font-medium">
                                        {detail}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Ghost watermark */}
                        <div
                            className="absolute bottom-4 right-8 text-[120px] font-black leading-none pointer-events-none select-none"
                            style={{
                                color: isFirmTheme
                                    ? "rgba(28,82,68,0.18)"
                                    : "rgba(248,171,29,0.14)",
                                transition: "color 0.5s ease",
                            }}
                        >
                            {activeStep.number}
                        </div>
                    </div>

                    {/* Nav Footer */}
                    <div className="flex items-center justify-between bg-[#0f1923] px-8 py-5 border-t border-white/10">
                        {/* Prev */}
                        <button
                            onClick={() => handleStepClick(activeIndex === 0 ? stepsData.length - 1 : activeIndex - 1)}
                            className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-all duration-200 group"
                        >
                            <svg
                                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            Previous
                        </button>

                        {/* Progress dots */}
                        <div className="flex items-center gap-2">
                            {stepsData.map((_, i) => {
                                const isActive = i === activeIndex;
                                const dotColor = getStepColor(i);
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleStepClick(i)}
                                        className="relative rounded-full overflow-hidden transition-all duration-300"
                                        style={{
                                            width: isActive ? "36px" : "8px",
                                            height: "8px",
                                            backgroundColor: isActive
                                                ? `${dotColor}33`
                                                : "rgba(255,255,255,0.2)",
                                        }}
                                    >
                                        {isActive && (
                                            <span
                                                key={progressKey}
                                                className="absolute inset-y-0 left-0 rounded-full"
                                                style={{
                                                    backgroundColor: dotColor,
                                                    animation: isPaused
                                                        ? "none"
                                                        : `ij-progress ${AUTOPLAY_MS}ms linear forwards`,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Next */}
                        <button
                            onClick={() => handleStepClick((activeIndex + 1) % stepsData.length)}
                            className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-all duration-200 group"
                        >
                            Next
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Keyframe for progress bar fill */}
            <style>{`
                @keyframes ij-progress {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
            `}</style>
        </section>
    );
}
