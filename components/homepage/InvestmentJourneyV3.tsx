"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

interface Step {
    number: string;
    title: string;
    description: string;
    details: string[];
    icon: string; // emoji / SVG-path key
}

const allterraSteps: Step[] = [
    {
        number: "01",
        title: "Discover",
        description:
            "Identify high-potential opportunities across Zimbabwe's growth sectors",
        details: [
            "Market research & analysis",
            "Partnership network sourcing",
            "Initial opportunity screening",
        ],
        icon: "discover",
    },
    {
        number: "02",
        title: "Due Diligence",
        description:
            "Rigorous analysis of every investment with independent verification",
        details: [
            "Financial & legal review",
            "On-ground asset verification",
            "Risk assessment framework",
        ],
        icon: "diligence",
    },
    {
        number: "03",
        title: "Structure",
        description:
            "Design optimal investment structure with robust protections",
        details: [
            "Collateral-backed security",
            "Insurance arrangements",
            "UAE jurisdiction protection",
        ],
        icon: "structure",
    },
];

const investorSteps: Step[] = [
    {
        number: "04",
        title: "Deploy",
        description:
            "Strategic capital deployment with milestone-based disbursement",
        details: [
            "Phased capital release",
            "Project milestone tracking",
            "Active fund management",
        ],
        icon: "deploy",
    },
    {
        number: "05",
        title: "Monitor",
        description:
            "Continuous oversight with regular reporting and site visits",
        details: [
            "Monthly performance reports",
            "Quarterly investor updates",
            "Real-time portfolio dashboard",
        ],
        icon: "monitor",
    },
    {
        number: "06",
        title: "Returns",
        description:
            "Structured exit with target returns of 13-20% annually",
        details: [
            "Capital + interest repayment",
            "USD repatriation to investors",
            "Reinvestment opportunities",
        ],
        icon: "returns",
    },
];

/* ─────────────────────────────────────────────────────────────────────────────
   ICON COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

function IconDiscover() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
    );
}

function IconDiligence() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.21.45 4.55 1.24" />
            <path d="M19 2l-7 7" />
            <path d="M15 2h4v4" />
        </svg>
    );
}

function IconStructure() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <path d="M17.5 17.5l2.5 2.5M17.5 17.5l2.5-2.5M17.5 17.5l-2.5 2.5M17.5 17.5l-2.5-2.5" />
        </svg>
    );
}

function IconDeploy() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    );
}

function IconMonitor() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
            <polyline points="7 10 10 7 13 10 17 6" />
        </svg>
    );
}

function IconReturns() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
    );
}

function StepIcon({ icon }: { icon: string }) {
    switch (icon) {
        case "discover": return <IconDiscover />;
        case "diligence": return <IconDiligence />;
        case "structure": return <IconStructure />;
        case "deploy": return <IconDeploy />;
        case "monitor": return <IconMonitor />;
        case "returns": return <IconReturns />;
        default: return null;
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   STEP CARD  (reused for both columns, themed via props)
───────────────────────────────────────────────────────────────────────────── */

interface StepCardProps {
    step: Step;
    theme: "allterra" | "investor";
    index: number; // 0-based inside its column
    isLeft?: boolean;
}

function StepCard({ step, theme, index, isLeft = true }: StepCardProps) {
    const [hovered, setHovered] = useState(false);

    const isAllterra = theme === "allterra";
    const accentColor = isAllterra ? "#1C5244" : "#F8AB1D";
    const accentLight = isAllterra ? "#4ade80" : "#F8AB1D";
    const cardBg = isAllterra
        ? hovered ? "rgba(28,82,68,0.35)" : "rgba(28,82,68,0.18)"
        : hovered ? "rgba(248,171,29,0.18)" : "rgba(248,171,29,0.08)";
    const borderColor = isAllterra
        ? hovered ? "rgba(74,222,128,0.45)" : "rgba(28,82,68,0.45)"
        : hovered ? "rgba(248,171,29,0.55)" : "rgba(248,171,29,0.25)";

    return (
        <div
            className={`ij-card relative flex gap-4 p-5 rounded-2xl border cursor-default select-none`}
            style={{
                background: cardBg,
                borderColor,
                transition: "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                transform: hovered ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hovered
                    ? `0 12px 40px ${accentColor}25`
                    : "none",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Step number badge */}
            <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
                style={{
                    background: `${accentColor}30`,
                    color: accentLight,
                    border: `1.5px solid ${accentColor}60`,
                }}
            >
                {step.number}
            </div>

            <div className="flex-1 min-w-0">
                {/* Icon + Title row */}
                <div className="flex items-center gap-2.5 mb-2">
                    <span
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: accentLight }}
                    >
                        <StepIcon icon={step.icon} />
                    </span>
                    <h3
                        className="text-base font-bold tracking-tight"
                        style={{ color: isAllterra ? "#e2ffe8" : "#fff8e6" }}
                    >
                        {step.title}
                    </h3>
                </div>

                {/* Description */}
                <p className="text-white/65 text-sm leading-relaxed mb-4">
                    {step.description}
                </p>

                {/* Detail pills */}
                <ul className="flex flex-col gap-1.5">
                    {step.details.map((d, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: accentLight }}
                            />
                            <span
                                className="text-xs font-medium"
                                style={{ color: isAllterra ? "rgba(200,255,220,0.85)" : "rgba(255,240,190,0.85)" }}
                            >
                                {d}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONNECTOR / HANDOFF BADGE
───────────────────────────────────────────────────────────────────────────── */

function HandoffBadge() {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-0 pointer-events-none">
            {/* Vertical dashed line top */}
            <div
                className="w-px"
                style={{
                    height: "120px",
                    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12))",
                }}
            />

            {/* Badge */}
            <div
                className="flex flex-col items-center gap-1 px-3 py-3 rounded-2xl"
                style={{
                    background: "linear-gradient(135deg, rgba(28,82,68,0.9) 0%, rgba(15,25,35,0.95) 50%, rgba(40,30,10,0.9) 100%)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
                    backdropFilter: "blur(16px)",
                }}
            >
                {/* Arrow icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span
                    className="text-[9px] font-black uppercase tracking-widest text-center leading-tight"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                >
                    Hand<br />off
                </span>
            </div>

            {/* Vertical dashed line bottom */}
            <div
                className="w-px"
                style={{
                    height: "120px",
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)",
                }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function InvestmentJourneyV3() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Header fade-in
            gsap.fromTo(
                ".ij3-header",
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
                }
            );

            // Column headers
            gsap.fromTo(
                ".ij3-col-header",
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.15,
                    scrollTrigger: { trigger: ".ij3-cols", start: "top 78%" },
                }
            );

            // Cards stagger
            gsap.fromTo(
                ".ij3-card",
                { opacity: 0, y: 35 },
                {
                    opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: ".ij3-cols", start: "top 70%" },
                }
            );

            // Handoff badge
            gsap.fromTo(
                ".ij3-handoff",
                { opacity: 0, scale: 0.7 },
                {
                    opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)",
                    scrollTrigger: { trigger: ".ij3-cols", start: "top 60%" },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative py-20 lg:py-28 overflow-hidden"
            style={{ background: "#080e0d" }}
        >
            {/* ── Background texture layers ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Left green glow */}
                <div
                    className="absolute inset-y-0 left-0 w-1/2"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(28,82,68,0.22) 0%, transparent 70%)",
                    }}
                />
                {/* Right amber glow */}
                <div
                    className="absolute inset-y-0 right-0 w-1/2"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 80% 50%, rgba(248,171,29,0.12) 0%, transparent 70%)",
                    }}
                />
                {/* Center vertical separator glow */}
                <div
                    className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                    style={{
                        background:
                            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Section Header ── */}
                <div className="ij3-header text-center mb-16">
                    <span
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-4"
                        style={{ color: "#F8AB1D" }}
                    >
                        <span
                            className="inline-block w-8 h-px"
                            style={{ background: "#F8AB1D" }}
                        />
                        The Full Picture
                        <span
                            className="inline-block w-8 h-px"
                            style={{ background: "#F8AB1D" }}
                        />
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                        How We Work.{" "}
                        <span
                            className="relative inline-block"
                            style={{
                                background: "linear-gradient(90deg, #F8AB1D 0%, #ffd16b 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            How You Profit.
                        </span>
                    </h2>
                    <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
                        From discovery to returns — a structured approach to deploying
                        capital in Africa&apos;s emerging markets.
                    </p>
                </div>

                {/* ── Dual Column Layout ── */}
                <div className="ij3-cols relative grid grid-cols-1 lg:grid-cols-2 gap-0">

                    {/* ════════════════════════════════════════
                        LEFT — Allterra's Process
                    ════════════════════════════════════════ */}
                    <div
                        className="relative flex flex-col lg:pr-12"
                        style={{ paddingBottom: "2px" }}
                    >
                        {/* Left panel background */}
                        <div
                            className="absolute inset-0 rounded-l-3xl lg:rounded-l-3xl lg:rounded-r-none rounded-t-3xl rounded-b-none lg:rounded-b-3xl pointer-events-none"
                            style={{
                                background: "linear-gradient(180deg, rgba(15,30,25,0.7) 0%, rgba(8,18,14,0.4) 100%)",
                                border: "1px solid rgba(28,82,68,0.4)",
                                borderRight: "none",
                            }}
                        />

                        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                            {/* Column header */}
                            <div className="ij3-col-header flex items-center gap-3 mb-8">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "rgba(28,82,68,0.5)",
                                        border: "1.5px solid rgba(74,222,128,0.35)",
                                    }}
                                >
                                    {/* Shield/lock icon — "Our work" */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3
                                        className="text-xl font-black"
                                        style={{ color: "#e2ffe8" }}
                                    >
                                        Allterra&apos;s Process
                                    </h3>
                                    {/* <p
                                        className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5"
                                        style={{ color: "rgba(74,222,128,0.7)" }}
                                    >
                                        Process
                                    </p> */}

                                </div>
                            </div>

                            {/* Steps */}
                            <div className="flex flex-col gap-4">
                                {allterraSteps.map((step, i) => (
                                    <div key={step.number} className="ij3-card">
                                        <StepCard step={step} theme="allterra" index={i} isLeft={true} />
                                    </div>
                                ))}
                            </div>

                            {/* Bottom tagline */}
                            {/* <div
                                className="mt-6 flex items-center gap-2.5 px-4 py-3 rounded-xl"
                                style={{
                                    background: "rgba(28,82,68,0.2)",
                                    border: "1px solid rgba(28,82,68,0.4)",
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span
                                    className="text-xs font-semibold"
                                    style={{ color: "rgba(200,255,220,0.7)" }}
                                >
                                    Every deal is fully vetted before you see it
                                </span>
                            </div> */}
                        </div>
                    </div>

                    {/* ════════════════════════════════════════
                        CENTER DIVIDER (desktop)
                    ════════════════════════════════════════ */}
                    <div className="hidden lg:flex absolute left-1/2 inset-y-0 -translate-x-1/2 z-10 items-center justify-center w-1">
                        <div className="ij3-handoff absolute" style={{ top: "50%", transform: "translateY(-50%)" }}>
                            <HandoffBadge />
                        </div>
                    </div>

                    {/* ── Mobile divider ── */}
                    <div className="lg:hidden flex items-center gap-4 py-4 px-2">
                        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(28,82,68,0.5), rgba(255,255,255,0.15))" }} />
                        <div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "rgba(255,255,255,0.5)",
                            }}
                        >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                            </svg>
                            Handoff to You
                        </div>
                        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, rgba(248,171,29,0.5), rgba(255,255,255,0.15))" }} />
                    </div>

                    {/* ════════════════════════════════════════
                        RIGHT — Investor's Journey
                    ════════════════════════════════════════ */}
                    <div className="relative flex flex-col lg:pl-12">
                        {/* Right panel background */}
                        <div
                            className="absolute inset-0 rounded-r-3xl lg:rounded-r-3xl lg:rounded-l-none rounded-b-3xl rounded-t-none lg:rounded-t-3xl pointer-events-none"
                            style={{
                                background: "linear-gradient(180deg, rgba(30,22,8,0.7) 0%, rgba(8,8,6,0.4) 100%)",
                                border: "1px solid rgba(248,171,29,0.25)",
                                borderLeft: "none",
                            }}
                        />

                        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                            {/* Column header */}
                            <div className="ij3-col-header flex items-center gap-3 mb-8">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "rgba(248,171,29,0.15)",
                                        border: "1.5px solid rgba(248,171,29,0.4)",
                                    }}
                                >
                                    {/* Star/investor icon */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F8AB1D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3
                                        className="text-xl font-black"
                                        style={{ color: "#fff8e6" }}
                                    >
                                        Investor&apos;s Journey
                                    </h3>
                                    {/* <p
                                        className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5"
                                        style={{ color: "rgba(248,171,29,0.7)" }}
                                    >
                                        Journey
                                    </p> */}
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="flex flex-col gap-4">
                                {investorSteps.map((step, i) => (
                                    <div key={step.number} className="ij3-card">
                                        <StepCard step={step} theme="investor" index={i} isLeft={false} />
                                    </div>
                                ))}
                            </div>

                            {/* Bottom tagline */}
                            {/* <div
                                className="mt-6 flex items-center gap-2.5 px-4 py-3 rounded-xl"
                                style={{
                                    background: "rgba(248,171,29,0.1)",
                                    border: "1px solid rgba(248,171,29,0.3)",
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F8AB1D" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                                <span
                                    className="text-xs font-semibold"
                                    style={{ color: "rgba(255,240,190,0.7)" }}
                                >
                                    Target 13–20% annual returns in USD
                                </span>
                            </div> */}
                        </div>
                    </div>

                </div>

                {/* ── Bottom summary strip ── */}
                {/* <div
                    className="ij3-card mt-10 grid grid-cols-2 sm:grid-cols-4 divide-x rounded-2xl overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    {[
                        { label: "Avg. Vetting Time", value: "6–8 wks", color: "#4ade80" },
                        { label: "Asset backing", value: "100%", color: "#4ade80" },
                        { label: "Target Return", value: "13–20%", color: "#F8AB1D" },
                        { label: "Currency", value: "USD", color: "#F8AB1D" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center justify-center py-5 px-4 gap-1" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                            <span
                                className="text-2xl font-black"
                                style={{ color: stat.color }}
                            >
                                {stat.value}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40 text-center">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div> */}
            </div>
        </section>
    );
}
