"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, TrendingUp, Building2, PlayCircle, TrendingDown, Ship } from "lucide-react";

// Ensure plugins are registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- Types ---

interface MineralPoint {
    name: string;
    description: string;
    icon: React.ReactNode;
    image: string;
    color: string;
    category: string;
    stat: string;
    tags: string[];
    ranking: string;
    highlight: string;
}

interface EconomicPoint {
    id: number;
    title: string;
    numericValue: string;
    subtext: string;
    description: string;
    theme: {
        bg: string;
        text: string;
        accent: string;
        iconBg: string;
    };
    icon: React.ReactNode;
}

// --- Data ---

const MINERAL_DATA: MineralPoint[] = [
    {
        name: "Gold",
        description: "Zimbabwe boasts the highest gold reserve densities globally with over 4,000 recorded deposits.",
        icon: <span className="text-xl">🥇</span>,
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
        color: "bg-[#F8AB1D]",
        category: "Precious Metal",
        stat: "4,000+ Deposits",
        tags: ["High Density", "Export Grade"],
        ranking: "#1 Density",
        highlight: "4K+",
    },
    {
        name: "Platinum",
        description: "Ranked #3 globally in platinum group metals production, supplying ~8% of the world's PGMs.",
        icon: <span className="text-xl">💎</span>,
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
        color: "bg-[#1C5244]",
        category: "PGM",
        stat: "~8% Global Supply",
        tags: ["Automotive", "Green Tech"],
        ranking: "#3 Global",
        highlight: "8%",
    },
    {
        name: "Lithium",
        description: "Home to Africa's largest lithium reserves. Critical for EV batteries and renewable energy storage.",
        icon: <span className="text-xl">🔋</span>,
        image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80",
        color: "bg-emerald-600",
        category: "Battery Metal",
        stat: "Top 5 Global",
        tags: ["EV Batteries", "Energy Storage"],
        ranking: "#1 Africa",
        highlight: "1st",
    },
    {
        name: "Chrome",
        description: "Zimbabwe holds the 2nd largest high-grade chrome reserves worldwide. Essential for stainless steel.",
        icon: <span className="text-xl">⚙️</span>,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
        color: "bg-gray-700",
        category: "Industrial",
        stat: "#2 Global Reserves",
        tags: ["Stainless Steel", "Industrial"],
        ranking: "#2 World",
        highlight: "2nd",
    },
];

const ECONOMIC_DATA: EconomicPoint[] = [
    {
        id: 1,
        title: "High GDP Growth",
        numericValue: "6.6%",
        subtext: "Annual Growth Rate",
        description: "Consistently ranking among the highest growing economies in Africa, driven by mining and agriculture recovery.",
        theme: { bg: "bg-[#1C5244]", text: "text-white", accent: "text-[#F8AB1D]", iconBg: "bg-white/10" },
        icon: <TrendingUp size={32} />,
    },
    {
        id: 2,
        title: "Real Estate Boom",
        numericValue: "80%+",
        subtext: "5-Year Value Growth",
        description: "Harare's property market is surging with rapid urbanization and diaspora investment driving demand.",
        theme: { bg: "bg-[#F8AB1D]", text: "text-[#1C5244]", accent: "text-[#333333]", iconBg: "bg-[#1C5244]/10" },
        icon: <Building2 size={32} />,
    },
    {
        id: 3,
        title: "Macroeconomic Stability",
        numericValue: "↓ 4–5%",
        subtext: "Inflation Trend",
        description:
            "Cooling inflation and tighter fiscal discipline are improving economic stability, strengthening investor confidence and long-term planning visibility.",
        theme: {
            bg: "bg-[#333333]",
            text: "text-white",
            accent: "text-[#F8AB1D]",
            iconBg: "bg-white/10",
        },
        icon: <TrendingDown size={32} />,
    },
    {
        id: 4,
        title: "Export Growth Momentum",
        numericValue: "2×",
        subtext: "Exports Growth",
        description:
            "Exports have doubled over recent years, driven by increased global demand, improved trade infrastructure, and diversified export markets.",
        theme: {
            bg: "bg-gray-100",
            text: "text-[#1C5244]",
            accent: "text-[#F8AB1D]",
            iconBg: "bg-[#1C5244]/10",
        },
        icon: <Ship size={32} />,
    }

];

// --- Sub-Components ---

const MineralSnapshot = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Select elements scoped to this container
        const cards = gsap.utils.toArray<HTMLElement>(".mineral-card", containerRef.current);
        const progressBars = gsap.utils.toArray<HTMLElement>(".mineral-progress", containerRef.current);

        if (cards.length === 0) return;

        const masterTimeline = gsap.timeline({
            repeat: -1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play pause resume pause",
            },
        });

        cards.forEach((card, i) => {
            const progressBar = progressBars[i];
            const cardTl = gsap.timeline();

            // 1. Enter
            cardTl.fromTo(card,
                { xPercent: 110, rotation: 5, autoAlpha: 0, scale: 0.9, zIndex: 1 },
                { xPercent: 0, rotation: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out", zIndex: 10 }
            );

            // 2. Display (Progress Bar)
            cardTl.to(progressBar, { width: "100%", duration: 4, ease: "none" }, "<");

            // 3. Exit
            cardTl.to(card, {
                xPercent: -110, rotation: -5, autoAlpha: 0, scale: 0.9, duration: 0.6, ease: "power3.in", zIndex: 1
            });

            // Reset progress bar for next loop
            cardTl.set(progressBar, { width: 0 });

            masterTimeline.add(cardTl, i === 0 ? 0 : "-=0.4");
        });

        // Hover interactions
        const el = containerRef.current;
        const onEnter = () => masterTimeline.pause();
        const onLeave = () => masterTimeline.play();

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        return () => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
        };

    }, { scope: containerRef });

    return (
        <div className="flex flex-col h-full">
            <h3 className="text-2xl font-bold text-[#333333] mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-[#1C5244] flex items-center justify-center shadow-lg shadow-[#1C5244]/20">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </span>
                Mineral Snapshot
            </h3>

            <div ref={containerRef} className="relative w-full h-[420px] md:h-[350px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                {/* Placeholder/Background if needed */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-6xl opacity-10 uppercase tracking-widest">
                    Resources
                </div>

                {MINERAL_DATA.map((mineral, index) => (
                    <div
                        key={mineral.name}
                        className="mineral-card absolute inset-4 md:inset-6 opacity-0"
                    >
                        <div className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row ring-1 ring-black/5">

                            {/* Image */}
                            <div className="relative w-full md:w-5/12 h-48 md:h-full overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <img
                                    src={mineral.image}
                                    alt={mineral.name}
                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm ${mineral.color}`}>
                                        {mineral.category}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 z-20 text-white">
                                    <div className="text-2xl font-black">{mineral.highlight}</div>
                                    <div className="text-[10px] uppercase opacity-80 font-medium">Metric Highlight</div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative w-full md:w-7/12 p-6 flex flex-col justify-between">
                                {/* Progress Bar */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                                    <div className={`mineral-progress h-full ${mineral.color} w-0`} />
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-gray-900">{mineral.name}</h2>
                                        <span className="text-2xl opacity-50 grayscale">{mineral.icon}</span>
                                    </div>

                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {mineral.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {mineral.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-xs font-bold text-gray-900">{mineral.ranking}</div>
                                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{mineral.stat}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const EconomicSnapshot = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const nextIndex = (activeIndex + 1) % ECONOMIC_DATA.length;
    const activeData = ECONOMIC_DATA[activeIndex];
    const nextData = ECONOMIC_DATA[nextIndex];

    // --- Animation Logic ---

    const triggerReveal = useCallback((startX: number, startY: number) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveIndex((prev) => (prev + 1) % ECONOMIC_DATA.length);
                gsap.set(revealRef.current, { clipPath: "circle(0% at 50% 50%)" });
                setIsAnimating(false);
            }
        });

        gsap.set(revealRef.current, {
            clipPath: `circle(0% at ${startX}px ${startY}px)`,
            zIndex: 20,
            autoAlpha: 1
        });

        tl.to(revealRef.current, {
            clipPath: `circle(150% at ${startX}px ${startY}px)`,
            duration: 1.0,
            ease: "power3.inOut"
        });
    }, [isAnimating]);

    const handleManualReveal = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Reset auto-play timer on manual interaction
        if (timerRef.current) clearInterval(timerRef.current);

        triggerReveal(x, y);
    };

    // --- Auto Play ---
    useEffect(() => {
        // Start autoplay
        timerRef.current = setInterval(() => {
            if (!containerRef.current || isAnimating) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Randomize start position slightly for visual interest, or stick to center
            triggerReveal(rect.width / 2, rect.height / 2);
        }, 4500); // 4.5 seconds per slide

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [triggerReveal, isAnimating]);


    // --- Card Content Helper ---
    const CardLayout = ({ data }: { data: EconomicPoint }) => (
        <div className={`w-full h-full p-8 md:p-12 flex flex-col justify-between ${data.theme.bg} ${data.theme.text} transition-colors`}>
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${data.theme.iconBg} backdrop-blur-sm`}>
                    {data.icon}
                </div>
                <div className={`text-4xl md:text-5xl font-black tracking-tight ${data.theme.accent}`}>
                    {data.numericValue}
                </div>
            </div>

            <div className="space-y-4 max-w-md">
                <div>
                    <div className={`text-sm font-bold uppercase tracking-wider mb-2 opacity-80`}>
                        {data.subtext}
                    </div>
                    <h3 className="text-3xl font-bold leading-none">{data.title}</h3>
                </div>
                <p className="opacity-90 leading-relaxed text-sm md:text-base font-medium">
                    {data.description}
                </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-current border-opacity-10">
                <div className="flex gap-1">
                    {ECONOMIC_DATA.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`h-1.5 rounded-full transition-all duration-300 ${item.id === data.id ? 'w-8 bg-current' : 'w-2 bg-current opacity-30'}`}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
                    {isAnimating ? "Updating..." : "Next Insight"}
                    <ArrowRight size={14} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full">
            <h3 className="text-2xl font-bold text-[#333333] mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-[#F8AB1D] flex items-center justify-center shadow-lg shadow-[#F8AB1D]/20">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </span>
                Economic Snapshot
            </h3>

            <div
                ref={containerRef}
                onClick={handleManualReveal}
                className="relative w-full h-[420px] md:h-[350px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
            >
                {/* Base Layer */}
                <div className="absolute inset-0 z-10">
                    <CardLayout data={activeData} />
                </div>

                {/* Reveal Layer */}
                <div
                    ref={revealRef}
                    className="absolute inset-0 z-20 invisible"
                    style={{ clipPath: 'circle(0% at 0 0)' }}
                >
                    <CardLayout data={nextData} />
                </div>

                {/* Click Hint (Only shows on hover) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                        <PlayCircle className="text-white w-8 h-8" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

export default function WhyZimbabwe() {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Fade in the whole section on scroll
    useGSAP(() => {
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-emerald-50 text-[#1C5244] text-xs font-bold uppercase tracking-widest px-4 border border-emerald-100">
                        Strategic Outlook
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#333333] mb-6 tracking-tight">
                        Why Zimbabwe (Now)
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Africa faces a structural capital gap. Zimbabwe offers unique, high-yield opportunities for strategic investors willing to look beyond the headlines.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <MineralSnapshot />
                    <EconomicSnapshot />
                </div>

            </div>
        </section>
    );
}