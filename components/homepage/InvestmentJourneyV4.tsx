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
        description: "Identify high-potential opportunities across Zimbabwe's growth sectors",
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
        description: "Rigorous analysis of every investment with independent verification",
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
        description: "Design optimal investment structure with robust protections",
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
        description: "Strategic capital deployment with milestone-based disbursement",
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
        description: "Continuous oversight with regular reporting and site visits",
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
        description: "Structured exit with target returns of 13-20% annually",
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

export default function InvestmentJourneySplitView() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [progressKey, setProgressKey] = useState(0);

    const sectionRef = useRef<HTMLElement>(null);
    const leftContentRef = useRef<HTMLDivElement>(null);
    const rightContentRef = useRef<HTMLDivElement>(null);
    const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isFirmTheme = activeIndex <= 2;

    // Derived state to keep the inactive side showing a relevant step
    const leftIndex = activeIndex <= 2 ? activeIndex : 2;
    const rightIndex = activeIndex >= 3 ? activeIndex : 3;
    const activeStepLeft = stepsData[leftIndex];
    const activeStepRight = stepsData[rightIndex];

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
                ".split-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay: 0.15,
                    stagger: 0.2,
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
    const animateContent = useCallback(
        (newIndex: number, fn: () => void) => {
            if (isTransitioning) return;
            setIsTransitioning(true);

            // Determine which side's content panel needs to animate
            const refToAnimate = newIndex <= 2 ? leftContentRef.current : rightContentRef.current;

            if (!refToAnimate) {
                fn();
                setIsTransitioning(false);
                return;
            }

            gsap.to(refToAnimate, {
                opacity: 0,
                y: -8,
                duration: 0.18,
                ease: "power2.in",
                onComplete: () => {
                    fn();
                    gsap.fromTo(
                        refToAnimate,
                        { opacity: 0, y: 12 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.25,
                            ease: "power2.out",
                            onComplete: () => setIsTransitioning(false),
                        }
                    );
                },
            });
        },
        [isTransitioning]
    );

    const goToStep = useCallback(
        (index: number) => {
            if (index === activeIndex) return;
            animateContent(index, () => {
                setActiveIndex(index);
                setProgressKey((k) => k + 1);
            });
        },
        [activeIndex, animateContent]
    );

    // ── Autoplay ──────────────────────────────────────────────────────────
    const scheduleNext = useCallback(() => {
        if (autoplayRef.current) clearTimeout(autoplayRef.current);
        autoplayRef.current = setTimeout(() => {
            if (!isPaused) {
                const next = (activeIndex + 1) % stepsData.length;
                goToStep(next);
            }
        }, AUTOPLAY_MS);
    }, [activeIndex, isPaused, goToStep]);

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
        setIsPaused(false);
    }

    return (
        <section
            ref={sectionRef}
            className="relative py-20 lg:py-32 bg-[#0a0a0a] overflow-hidden"
        >
            {/* Split Ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                    background: `
                        radial-gradient(circle at 25% 40%, ${isFirmTheme ? "rgba(72, 180, 152, 0.3)" : "rgba(28,82,68,0.05)"
                        } 0%, transparent 50%),
                        radial-gradient(circle at 75% 40%, ${!isFirmTheme ? "rgba(248,171,29,0.2)" : "rgba(248,171,29,0.05)"
                        } 0%, transparent 50%)
                    `,
                    transition: "background 0.8s ease",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ── Section Header ── */}
                <div className="ij-header text-center mb-16">
                    <span className="inline-block text-[#F8AB1D] text-sm font-semibold uppercase tracking-widest mb-3">
                        The Process
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        And Investment Journey
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        From discovery to returns — a structured approach to deploying
                        capital in Africa&apos;s emerging markets.
                    </p>
                </div>

                {/* ── Split Layout Grid ── */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">

                    {/* =======================
                        LEFT CARD: OUR PROCESS
                    ======================= */}
                    <div
                        className={`split-card flex flex-col rounded-2xl overflow-hidden transition-all duration-700 ease-in-out ${isFirmTheme
                            ? "border border-[#1C5244]/50 shadow-[0_20px_60px_rgba(28,82,68,0.25)] scale-100 opacity-100"
                            : "border border-white/5 shadow-none scale-[0.97] opacity-50 grayscale-[40%]"
                            }`}
                        style={{ backgroundColor: "#0f1923" }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Header & Rail */}
                        <div className="px-6 sm:px-10 pt-10 pb-6 border-b border-white/10 relative">
                            <h3 className="text-2xl font-bold text-white mb-8 text-center" style={{ color: "#4ade80" }}>
                                Allterra&apos;s Process
                            </h3>
                            <div className="relative">
                                {/* Rail Background */}
                                <div className="absolute inset-x-0 top-[18px] h-[3px] rounded-full overflow-hidden bg-[#1C5244]" />

                                {/* Nodes */}
                                <div className="relative z-10 flex justify-between">
                                    {[0, 1, 2].map((i) => {
                                        const isActive = i === activeIndex;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleStepClick(i)}
                                                className="group flex flex-col items-center gap-2.5 focus:outline-none"
                                            >
                                                <div
                                                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-[3px] border-[#0f1923]"
                                                    style={{
                                                        backgroundColor: isActive ? FIRM_COLOR : "rgba(28,82,68,0.4)",
                                                        color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                                                        transform: isActive ? "scale(1.22)" : "scale(1)",
                                                        boxShadow: isActive ? `0 0 0 4px ${FIRM_COLOR}40, 0 4px 12px ${FIRM_COLOR}50` : "none",
                                                        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                                    }}
                                                >
                                                    {stepsData[i].number}
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-[#4ade80]" : "text-white/40"}`}>
                                                    {stepsData[i].title}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div
                            ref={leftContentRef}
                            className="relative flex-grow p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#0d201a] to-[#0a0a0a]"
                        >
                            <span className="block text-sm font-bold uppercase tracking-[0.15em] text-[#4ade80] mb-4">
                                STEP {activeStepLeft.number}
                            </span>
                            <h4 className="text-3xl font-bold text-white mb-3">{activeStepLeft.title}</h4>
                            <p className="text-white/75 text-[17px] mb-8 min-h-[50px]">{activeStepLeft.description}</p>
                            <div className="flex flex-col gap-3">
                                {activeStepLeft.details.map((detail, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-[#4ade80]/20 bg-[#1C5244]/25">
                                        <span className="font-bold text-[#4ade80] mt-0.5">→</span>
                                        <span className="text-white/90 text-sm font-medium">{detail}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Watermark */}
                            <div className="absolute bottom-4 right-8 text-[120px] font-black leading-none text-[#1C5244]/20 pointer-events-none select-none">
                                {activeStepLeft.number}
                            </div>
                        </div>

                        {/* Nav Footer */}
                        <div className="flex items-center justify-between bg-[#0f1923] px-8 py-5 border-t border-white/10">
                            <button onClick={() => handleStepClick(activeIndex === 0 ? 5 : activeIndex - 1)} className="text-sm font-semibold text-white/50 hover:text-white transition-colors">
                                ← Prev
                            </button>
                            <div className="flex items-center gap-2">
                                {[0, 1, 2].map((i) => {
                                    const isActive = i === activeIndex;
                                    return (
                                        <button key={i} onClick={() => handleStepClick(i)} className="relative rounded-full overflow-hidden transition-all duration-300 bg-white/20" style={{ width: isActive ? "36px" : "8px", height: "8px" }}>
                                            {isActive && (
                                                <span key={progressKey} className="absolute inset-y-0 left-0 rounded-full bg-[#4ade80]" style={{ animation: isPaused ? "none" : `ij-progress ${AUTOPLAY_MS}ms linear forwards` }} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            <button onClick={() => handleStepClick((activeIndex + 1) % 6)} className="text-sm font-semibold text-white/50 hover:text-white transition-colors">
                                Next →
                            </button>
                        </div>
                    </div>


                    {/* =======================
                        RIGHT CARD: YOUR JOURNEY
                    ======================= */}
                    <div
                        className={`split-card flex flex-col rounded-2xl overflow-hidden transition-all duration-700 ease-in-out ${!isFirmTheme
                            ? "border border-[#F8AB1D]/50 shadow-[0_20px_60px_rgba(248,171,29,0.2)] scale-100 opacity-100"
                            : "border border-white/5 shadow-none scale-[0.97] opacity-50 grayscale-[40%]"
                            }`}
                        style={{ backgroundColor: "#0f1923" }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Header & Rail */}
                        <div className="px-6 sm:px-10 pt-10 pb-6 border-b border-white/10 relative">
                            <h3 className="text-2xl font-bold text-white mb-8 text-center" style={{ color: INVESTOR_COLOR }}>
                                Investor&apos;s Journey
                            </h3>
                            <div className="relative">
                                {/* Rail Background */}
                                <div className="absolute inset-x-0 top-[18px] h-[3px] rounded-full overflow-hidden bg-[#F8AB1D]" />

                                {/* Nodes */}
                                <div className="relative z-10 flex justify-between">
                                    {[3, 4, 5].map((i) => {
                                        const isActive = i === activeIndex;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleStepClick(i)}
                                                className="group flex flex-col items-center gap-2.5 focus:outline-none"
                                            >
                                                <div
                                                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-[3px] border-[#0f1923]"
                                                    style={{
                                                        backgroundColor: isActive ? INVESTOR_COLOR : "rgba(248,171,29,0.25)",
                                                        color: isActive ? "#111" : "rgba(255,255,255,0.6)",
                                                        transform: isActive ? "scale(1.22)" : "scale(1)",
                                                        boxShadow: isActive ? `0 0 0 4px ${INVESTOR_COLOR}40, 0 4px 12px ${INVESTOR_COLOR}50` : "none",
                                                        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                                    }}
                                                >
                                                    {stepsData[i].number}
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? `text-[${INVESTOR_COLOR}]` : "text-white/40"}`}>
                                                    {stepsData[i].title}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div
                            ref={rightContentRef}
                            className="relative flex-grow p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#1c140a] to-[#0a0a0a]"
                        >
                            <span className="block text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: INVESTOR_COLOR }}>
                                STEP {activeStepRight.number}
                            </span>
                            <h4 className="text-3xl font-bold text-white mb-3">{activeStepRight.title}</h4>
                            <p className="text-white/75 text-[17px] mb-8 min-h-[50px]">{activeStepRight.description}</p>
                            <div className="flex flex-col gap-3">
                                {activeStepRight.details.map((detail, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-[#F8AB1D]/30 bg-[#F8AB1D]/10">
                                        <span className="font-bold mt-0.5" style={{ color: INVESTOR_COLOR }}>→</span>
                                        <span className="text-white/90 text-sm font-medium">{detail}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Watermark */}
                            <div className="absolute bottom-4 right-8 text-[120px] font-black leading-none text-[#F8AB1D]/15 pointer-events-none select-none">
                                {activeStepRight.number}
                            </div>
                        </div>

                        {/* Nav Footer */}
                        <div className="flex items-center justify-between bg-[#0f1923] px-8 py-5 border-t border-white/10">
                            <button onClick={() => handleStepClick(activeIndex === 0 ? 5 : activeIndex - 1)} className="text-sm font-semibold text-white/50 hover:text-white transition-colors">
                                ← Prev
                            </button>
                            <div className="flex items-center gap-2">
                                {[3, 4, 5].map((i) => {
                                    const isActive = i === activeIndex;
                                    return (
                                        <button key={i} onClick={() => handleStepClick(i)} className="relative rounded-full overflow-hidden transition-all duration-300 bg-white/20" style={{ width: isActive ? "36px" : "8px", height: "8px" }}>
                                            {isActive && (
                                                <span key={progressKey} className="absolute inset-y-0 left-0 rounded-full bg-[#F8AB1D]" style={{ animation: isPaused ? "none" : `ij-progress ${AUTOPLAY_MS}ms linear forwards` }} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            <button onClick={() => handleStepClick((activeIndex + 1) % 6)} className="text-sm font-semibold text-white/50 hover:text-white transition-colors">
                                Next →
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @keyframes ij-progress {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
            `}</style>
        </section>
    );
}