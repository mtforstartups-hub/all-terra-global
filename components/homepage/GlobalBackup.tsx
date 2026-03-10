"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Location {
    id: string;
    name: string;
    country: string;
    role: string;
    x: number;
    y: number;
    isHQ?: boolean;
}

export default function GlobalPresence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeLocation, setActiveLocation] = useState<string | null>(null);

    const locations: Location[] = [
        { id: "dubai", name: "Dubai", country: "UAE", role: "Global Headquarters", x: 555, y: 260, isHQ: true },
        { id: "harare", name: "Harare", country: "Zimbabwe", role: "Operations Center", x: 500, y: 365 },
        { id: "usa", name: "New York", country: "USA", role: "Investor Relations", x: 220, y: 200 },
        { id: "india", name: "Mumbai", country: "India", role: "Tech & Analytics", x: 630, y: 280 },
    ];

    // Zimbabwe location for connections
    const zimbabwe = { x: 500, y: 365 };

    // Dynamic connection paths to Zimbabwe (excluding Zimbabwe itself)
    const getConnectionPath = (from: Location) => {
        if (from.id === "harare") return "";
        return `M ${from.x} ${from.y} Q ${(from.x + zimbabwe.x) / 2} ${(from.y + zimbabwe.y) / 2 - 50} ${zimbabwe.x} ${zimbabwe.y}`;
    };

    useGSAP(
        () => {
            // Animate continents
            gsap.fromTo(
                ".continent-path",
                { strokeDashoffset: 2000, opacity: 0 },
                {
                    strokeDashoffset: 0,
                    opacity: 1,
                    duration: 2.5,
                    stagger: 0.2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        once: true,
                    },
                }
            );

            // Animate Zimbabwe highlight
            gsap.fromTo(
                ".zimbabwe-highlight",
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    delay: 2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        once: true,
                    },
                }
            );

            // Animate location dots
            gsap.fromTo(
                ".location-dot",
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.2,
                    delay: 2.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        once: true,
                    },
                }
            );

            // Pulse animation for HQ
            gsap.to(".hq-pulse", {
                scale: 2,
                opacity: 0,
                duration: 1.5,
                repeat: -1,
                ease: "power2.out",
            });

            // Animate info cards
            gsap.fromTo(
                ".location-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    delay: 3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        once: true,
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
                        Global Network
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
                        Connecting Capital to Opportunity
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Our global presence enables us to bridge international capital with local expertise,
                        creating value across borders.
                    </p>
                </div>

                {/* Map Container */}
                <div className="relative">
                    {/* SVG Map */}
                    <svg
                        viewBox="0 0 800 500"
                        className="w-full h-auto max-h-[500px]"
                        style={{ filter: "drop-shadow(0 0 40px rgba(28, 82, 68, 0.3))" }}
                    >
                        {/* Grid Lines */}
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path
                                    d="M 40 0 L 0 0 0 40"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.03)"
                                    strokeWidth="0.5"
                                />
                            </pattern>
                            {/* Glow filter for connections */}
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Background Grid */}
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {/* SIMPLIFIED RECOGNIZABLE CONTINENTS */}

                        {/* North America - wider top, narrower middle */}
                        <path
                            className="continent-path"
                            d="M 120,120 L 140,105 L 165,95 L 190,90 L 215,92 L 235,100 L 250,115 L 260,135 L 265,160 L 265,185 L 260,210 L 250,235 L 235,255 L 215,270 L 195,280 L 175,285 L 160,290 L 150,300 L 145,315 L 140,325 L 135,330 L 125,325 L 115,310 L 105,290 L 95,265 L 88,235 L 85,205 L 85,175 L 90,150 L 100,130 Z"
                            fill="rgba(28, 82, 68, 0.15)"
                            stroke="#1C5244"
                            strokeWidth="1.5"
                            strokeDasharray="2000"
                        />

                        {/* South America - triangle-ish shape */}
                        <path
                            className="continent-path"
                            d="M 200,320 L 215,310 L 230,308 L 240,315 L 245,330 L 248,350 L 248,370 L 245,390 L 238,410 L 228,428 L 215,442 L 200,450 L 185,452 L 170,448 L 158,438 L 150,423 L 146,405 L 146,385 L 150,365 L 158,347 L 170,332 L 185,322 Z"
                            fill="rgba(28, 82, 68, 0.15)"
                            stroke="#1C5244"
                            strokeWidth="1.5"
                            strokeDasharray="2000"
                        />

                        {/* Europe - small irregular blob */}
                        <path
                            className="continent-path"
                            d="M 380,145 L 395,140 L 410,138 L 425,140 L 438,145 L 448,155 L 453,168 L 453,182 L 448,195 L 438,205 L 425,210 L 410,212 L 395,210 L 382,203 L 373,193 L 368,180 L 368,167 L 372,155 Z"
                            fill="rgba(28, 82, 68, 0.15)"
                            stroke="#1C5244"
                            strokeWidth="1.5"
                            strokeDasharray="2000"
                        />

                        {/* Africa - distinctive shape with bulge on west */}
                        <path
                            className="continent-path"
                            d="M 445,225 L 465,218 L 485,215 L 505,217 L 523,223 L 538,233 L 548,247 L 553,263 L 555,280 L 555,298 L 553,316 L 548,334 L 540,351 L 528,367 L 513,381 L 495,392 L 475,399 L 455,401 L 437,398 L 422,390 L 410,378 L 402,363 L 398,346 L 398,328 L 402,310 L 410,293 L 422,278 L 437,266 L 450,257 L 460,250 L 468,243 L 473,235 Z"
                            fill="rgba(28, 82, 68, 0.2)"
                            stroke="#1C5244"
                            strokeWidth="2"
                            strokeDasharray="2000"
                        />

                        {/* Asia - large irregular mass */}
                        <path
                            className="continent-path"
                            d="M 530,140 L 555,135 L 580,133 L 605,135 L 630,142 L 653,153 L 673,168 L 688,186 L 698,206 L 703,227 L 703,248 L 698,269 L 688,289 L 673,307 L 653,322 L 630,333 L 605,340 L 580,343 L 555,341 L 532,334 L 515,322 L 503,306 L 495,287 L 492,267 L 492,246 L 495,226 L 503,207 L 515,190 L 528,175 L 540,163 L 550,153 Z"
                            fill="rgba(28, 82, 68, 0.15)"
                            stroke="#1C5244"
                            strokeWidth="1.5"
                            strokeDasharray="2000"
                        />

                        {/* Australia - oval island */}
                        <path
                            className="continent-path"
                            d="M 640,375 L 660,372 L 680,373 L 698,378 L 713,387 L 723,400 L 728,415 L 728,430 L 723,445 L 713,458 L 698,467 L 680,472 L 660,473 L 640,470 L 622,463 L 608,452 L 598,438 L 593,422 L 593,407 L 598,392 L 608,381 L 622,373 Z"
                            fill="rgba(28, 82, 68, 0.15)"
                            stroke="#1C5244"
                            strokeWidth="1.5"
                            strokeDasharray="2000"
                        />

                        {/* Zimbabwe Highlight */}
                        <circle
                            className="zimbabwe-highlight"
                            cx="500"
                            cy="365"
                            r="18"
                            fill="rgba(248, 171, 29, 0.3)"
                            stroke="#F8AB1D"
                            strokeWidth="2"
                        />
                        <text
                            x="500"
                            y="370"
                            textAnchor="middle"
                            className="zimbabwe-highlight"
                            fill="#F8AB1D"
                            fontSize="7"
                            fontWeight="bold"
                        >
                            ZIMBABWE
                        </text>

                        {/* Dynamic Connection Paths (only on hover) */}
                        {locations.map((loc) => {
                            if (loc.id === "harare" || activeLocation !== loc.id) return null;

                            const pathLength = 500;
                            return (
                                <path
                                    key={`connection-${loc.id}`}
                                    d={getConnectionPath(loc)}
                                    fill="none"
                                    stroke="#F8AB1D"
                                    strokeWidth="2"
                                    filter="url(#glow)"
                                    strokeLinecap="round"
                                    strokeDasharray={pathLength}
                                    strokeDashoffset={pathLength}
                                    style={{
                                        animation: "drawPath 0.8s ease-out forwards"
                                    }}
                                />
                            );
                        })}

                        {/* Location Dots */}
                        {locations.map((loc) => (
                            <g
                                key={loc.id}
                                className="location-dot cursor-pointer"
                                onMouseEnter={() => setActiveLocation(loc.id)}
                                onMouseLeave={() => setActiveLocation(null)}
                            >
                                {/* Pulse ring for HQ */}
                                {loc.isHQ && (
                                    <circle
                                        className="hq-pulse"
                                        cx={loc.x}
                                        cy={loc.y}
                                        r="12"
                                        fill="none"
                                        stroke="#F8AB1D"
                                        strokeWidth="2"
                                    />
                                )}

                                {/* Outer ring */}
                                <circle
                                    cx={loc.x}
                                    cy={loc.y}
                                    r={loc.isHQ ? 16 : 12}
                                    fill={loc.isHQ ? "#F8AB1D" : "#1C5244"}
                                    className="transition-all duration-300"
                                    style={{
                                        filter: activeLocation === loc.id ? "brightness(1.3)" : "none",
                                        transform: activeLocation === loc.id ? "scale(1.2)" : "scale(1)",
                                        transformOrigin: `${loc.x}px ${loc.y}px`,
                                    }}
                                />

                                {/* Inner dot */}
                                <circle
                                    cx={loc.x}
                                    cy={loc.y}
                                    r={loc.isHQ ? 6 : 4}
                                    fill="white"
                                />

                                {/* Tooltip on hover */}
                                {activeLocation === loc.id && (
                                    <g>
                                        <rect
                                            x={loc.x - 60}
                                            y={loc.y - 55}
                                            width="120"
                                            height="45"
                                            rx="8"
                                            fill="rgba(51, 51, 51, 0.95)"
                                            stroke="rgba(255,255,255,0.1)"
                                        />
                                        <text
                                            x={loc.x}
                                            y={loc.y - 35}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize="12"
                                            fontWeight="bold"
                                        >
                                            {loc.name}
                                        </text>
                                        <text
                                            x={loc.x}
                                            y={loc.y - 20}
                                            textAnchor="middle"
                                            fill="#F8AB1D"
                                            fontSize="10"
                                        >
                                            {loc.role}
                                        </text>
                                    </g>
                                )}
                            </g>
                        ))}
                    </svg>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-6 text-white/60 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#F8AB1D]" />
                            <span>Headquarters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#1C5244]" />
                            <span>Regional Office</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-0.5 bg-[#F8AB1D]" />
                            <span>Capital Flow</span>
                        </div>
                    </div>
                </div>

                {/* Location Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                    {locations.map((loc) => (
                        <div
                            key={loc.id}
                            className={`location-card p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${activeLocation === loc.id
                                ? "bg-[#1C5244]/30 border-[#F8AB1D]"
                                : "bg-white/5 border-white/10 hover:border-white/20"
                                }`}
                            onMouseEnter={() => setActiveLocation(loc.id)}
                            onMouseLeave={() => setActiveLocation(null)}
                        >
                            {loc.isHQ && (
                                <span className="inline-block px-2 py-1 text-xs font-semibold bg-[#F8AB1D] text-[#333333] rounded-full mb-3">
                                    HQ
                                </span>
                            )}
                            <h4 className="text-white font-bold text-lg">{loc.name}</h4>
                            <p className="text-white/50 text-sm">{loc.country}</p>
                            <p className="text-[#1C5244] text-sm mt-2">{loc.role}</p>
                        </div>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#F8AB1D]">4</div>
                        <div className="text-white/50 text-sm mt-1">Global Offices</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#F8AB1D]">3</div>
                        <div className="text-white/50 text-sm mt-1">Continents</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#F8AB1D]">24/7</div>
                        <div className="text-white/50 text-sm mt-1">Coverage</div>
                    </div>
                </div>
            </div>

            {/* Add CSS animation for path drawing */}
            <style jsx>{`
                @keyframes drawPath {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
        </section>
    );
}