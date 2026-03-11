"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface Location {
  id: string;
  name: string;
  country: string;
  role: string;
  x: number;
  y: number;
  isTarget?: boolean;
}

export default function GlobalPresence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  // Zimbabwe is the target - all connections flow TO it
  const locations: Location[] = [
    {
      id: "harare",
      name: "Harare",
      country: "Zimbabwe",
      role: "Operations Hub",
      x: 540,
      y: 340,
      isTarget: true,
    },
    {
      id: "dubai",
      name: "Dubai",
      country: "UAE",
      role: "Global HQ",
      x: 600,
      y: 240,
    },
    {
      id: "usa",
      name: "New Jersey",
      country: "USA",
      role: "Investor Relations",
      x: 200,
      y: 200,
    },
    {
      id: "india",
      name: "Mumbai",
      country: "India",
      role: "Tech & Analytics",
      x: 660,
      y: 280,
    },
  ];

  // All connections flow TOWARD Zimbabwe (Harare)
  const connections = [
    { from: "dubai", to: "harare", fromX: 600, fromY: 240, toX: 540, toY: 340 },
    { from: "usa", to: "harare", fromX: 200, fromY: 200, toX: 540, toY: 340 },
    { from: "india", to: "harare", fromX: 660, fromY: 280, toX: 540, toY: 340 },
  ];

  useGSAP(
    () => {
      // Animate map perspective reveal
      gsap.fromTo(
        ".tactical-map",
        { opacity: 0, rotateX: 30 },
        {
          opacity: 1,
          rotateX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );

      // Draw continent outlines
      gsap.fromTo(
        ".continent-path",
        { strokeDashoffset: 3000 },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          stagger: 0.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );

      // Animate Zimbabwe highlight with pulse
      gsap.fromTo(
        ".target-highlight",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );

      // Animated connection lines flowing toward Zimbabwe
      const pathElements =
        gsap.utils.toArray<SVGPathElement>(".connection-path");
      pathElements.forEach((path, index) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: 2 + index * 0.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        });
      });

      // Animate flowing particles along paths using MotionPath
      gsap.utils
        .toArray<SVGCircleElement>(".flow-particle")
        .forEach((particle, index) => {
          const path = document.querySelectorAll(".connection-path")[
            index
          ] as SVGPathElement;
          if (!path) return;

          // Set initial position at start of path
          gsap.set(particle, { opacity: 0 });

          gsap.to(particle, {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
            },
            opacity: 1,
            duration: 2.5,
            repeat: -1,
            delay: 3 + index * 0.8,
            ease: "power1.inOut",
            onRepeat: () => {
              gsap.set(particle, { opacity: 0 });
              gsap.to(particle, { opacity: 1, duration: 0.3 });
            },
          });
        });

      // Location dots appear
      gsap.fromTo(
        ".location-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );

      // Target pulse animation
      gsap.to(".target-pulse", {
        scale: 2.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      });

      // Radar sweep animation
      gsap.to(".radar-sweep", {
        rotation: 360,
        transformOrigin: "540px 340px",
        duration: 4,
        repeat: -1,
        ease: "none",
      });

      // Grid scan line
      gsap.to(".scan-line", {
        y: 400,
        duration: 3,
        repeat: -1,
        ease: "none",
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
          delay: 2.5,
          ease: "power3.out",
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
            Our global presence enables us to bridge international capital with
            local expertise, channeling resources toward Zimbabwe's growth
            potential.
          </p>
        </div>

        {/* 2.5D Tactical Map Container */}
        <div
          className="relative tactical-map"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 30%",
          }}
        >
          <div
            className="relative"
            style={{
              transform: "rotateX(25deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <svg
              viewBox="0 0 800 450"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
            >
              <defs>
                {/* Tactical Grid Pattern */}
                <pattern
                  id="tacticalGrid"
                  width="25"
                  height="25"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 25 0 L 0 0 0 25"
                    fill="none"
                    stroke="rgba(28, 82, 68, 0.15)"
                    strokeWidth="0.5"
                  />
                </pattern>

                {/* Fine Grid Overlay */}
                <pattern
                  id="fineGrid"
                  width="5"
                  height="5"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="2.5"
                    cy="2.5"
                    r="0.3"
                    fill="rgba(28, 82, 68, 0.1)"
                  />
                </pattern>

                {/* Glow Filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Strong Glow for Target */}
                <filter
                  id="targetGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Gradient for connections */}
                <linearGradient
                  id="flowGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#1C5244" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#F8AB1D" stopOpacity="1" />
                </linearGradient>

                {/* Radar sweep gradient */}
                <linearGradient
                  id="radarGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#F8AB1D" stopOpacity="0" />
                  <stop offset="50%" stopColor="#F8AB1D" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#F8AB1D" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Background Layers */}
              <rect width="100%" height="100%" fill="#0a0f14" />
              <rect width="100%" height="100%" fill="url(#tacticalGrid)" />
              <rect width="100%" height="100%" fill="url(#fineGrid)" />

              {/* Scan Line Effect */}
              <rect
                className="scan-line"
                x="0"
                y="-10"
                width="800"
                height="3"
                fill="url(#radarGradient)"
                opacity="0.5"
              />

              {/* STYLIZED CONTINENTS - Geometric/Abstract shapes */}

              {/* North America - Geometric polygon */}
              <path
                className="continent-path"
                d="M 80 120 
                                   L 150 100 L 220 110 L 250 130 L 240 160 
                                   L 260 190 L 250 220 L 220 250 L 180 270 
                                   L 140 260 L 100 230 L 80 190 L 70 150 Z"
                fill="rgba(28, 82, 68, 0.08)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="3000"
                strokeDashoffset="3000"
              />

              {/* South America */}
              <path
                className="continent-path"
                d="M 180 280 
                                   L 210 290 L 230 320 L 240 360 L 230 400 
                                   L 200 420 L 170 410 L 160 370 L 170 330 Z"
                fill="rgba(28, 82, 68, 0.08)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="3000"
                strokeDashoffset="3000"
              />

              {/* Europe - Smaller geometric shape */}
              <path
                className="continent-path"
                d="M 400 100 
                                   L 450 90 L 480 100 L 490 130 L 470 160 
                                   L 430 170 L 390 160 L 380 130 Z"
                fill="rgba(28, 82, 68, 0.08)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="3000"
                strokeDashoffset="3000"
              />

              {/* Africa - Larger, prominent (with Zimbabwe highlighted) */}
              <path
                className="continent-path"
                d="M 440 180 
                                   L 490 170 L 540 180 L 570 210 L 580 260 
                                   L 575 310 L 560 360 L 530 400 L 490 420 
                                   L 450 410 L 420 380 L 410 340 L 420 290 
                                   L 425 240 L 430 200 Z"
                fill="rgba(28, 82, 68, 0.15)"
                stroke="#1C5244"
                strokeWidth="2"
                strokeDasharray="3000"
                strokeDashoffset="3000"
              />

              {/* Middle East / Arabia */}
              <path
                className="continent-path"
                d="M 560 200 
                                   L 600 190 L 640 200 L 650 230 L 630 260 
                                   L 590 270 L 560 250 L 555 220 Z"
                fill="rgba(28, 82, 68, 0.08)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="3000"
                strokeDashoffset="3000"
              />

              {/* India / South Asia */}
              <path
                className="continent-path"
                d="M 640 240 
                                   L 680 230 L 710 250 L 700 300 L 670 330 
                                   L 640 320 L 630 280 Z"
                fill="rgba(28, 82, 68, 0.08)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="3000"
                strokeDashoffset="3000"
              />

              {/* East Asia */}
              <path
                className="continent-path"
                d="M 680 160 
                                   L 740 150 L 780 180 L 770 230 L 730 250 
                                   L 690 230 L 680 190 Z"
                fill="rgba(28, 82, 68, 0.06)"
                stroke="#1C5244"
                strokeWidth="1"
                strokeDasharray="3000"
                strokeDashoffset="3000"
              />

              {/* Australia */}
              <path
                className="continent-path"
                d="M 700 360 
                                   L 750 350 L 780 370 L 775 400 L 740 420 
                                   L 700 410 L 690 380 Z"
                fill="rgba(28, 82, 68, 0.05)"
                stroke="#1C5244"
                strokeWidth="1"
                strokeDasharray="3000"
                strokeDashoffset="3000"
              />

              {/* Radar Sweep (centered on Zimbabwe) */}
              <g className="radar-sweep" opacity="0.6">
                <path
                  d="M 540 340 L 540 200 A 140 140 0 0 1 680 340 Z"
                  fill="url(#radarGradient)"
                />
              </g>

              {/* ZIMBABWE TARGET HIGHLIGHT */}
              <g className="target-highlight">
                {/* Outer glow ring */}
                <circle
                  className="target-pulse"
                  cx="540"
                  cy="340"
                  r="30"
                  fill="none"
                  stroke="#F8AB1D"
                  strokeWidth="2"
                  opacity="0.6"
                />

                {/* Target rings */}
                <circle
                  cx="540"
                  cy="340"
                  r="45"
                  fill="none"
                  stroke="#F8AB1D"
                  strokeWidth="1"
                  opacity="0.3"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="540"
                  cy="340"
                  r="35"
                  fill="rgba(248, 171, 29, 0.15)"
                  stroke="#F8AB1D"
                  strokeWidth="2"
                  filter="url(#targetGlow)"
                />

                {/* Crosshairs */}
                <line
                  x1="540"
                  y1="300"
                  x2="540"
                  y2="320"
                  stroke="#F8AB1D"
                  strokeWidth="2"
                />
                <line
                  x1="540"
                  y1="360"
                  x2="540"
                  y2="380"
                  stroke="#F8AB1D"
                  strokeWidth="2"
                />
                <line
                  x1="500"
                  y1="340"
                  x2="520"
                  y2="340"
                  stroke="#F8AB1D"
                  strokeWidth="2"
                />
                <line
                  x1="560"
                  y1="340"
                  x2="580"
                  y2="340"
                  stroke="#F8AB1D"
                  strokeWidth="2"
                />

                {/* Zimbabwe label */}
                <text
                  x="540"
                  y="400"
                  textAnchor="middle"
                  fill="#F8AB1D"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="2"
                >
                  ZIMBABWE
                </text>
              </g>

              {/* CONNECTION PATHS - All flowing TO Zimbabwe */}
              {connections.map((conn, idx) => {
                // Calculate control points for curved paths
                const midX = (conn.fromX + conn.toX) / 2;
                const midY = (conn.fromY + conn.toY) / 2 - 40;

                return (
                  <path
                    key={`${conn.from}-${conn.to}`}
                    className="connection-path"
                    d={`M ${conn.fromX} ${conn.fromY} Q ${midX} ${midY} ${conn.toX} ${conn.toY}`}
                    fill="none"
                    stroke="#F8AB1D"
                    strokeWidth="2"
                    filter="url(#glow)"
                    style={{ strokeLinecap: "round" }}
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}

              {/* Arrow marker */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#F8AB1D" />
                </marker>
              </defs>

              {/* Flow Particles (animated circles along paths) */}
              {connections.map((conn, idx) => (
                <circle
                  key={`particle-${idx}`}
                  className="flow-particle"
                  r="4"
                  fill="#F8AB1D"
                  filter="url(#glow)"
                  opacity="0"
                />
              ))}

              {/* LOCATION MARKERS */}
              {locations.map((loc) => (
                <g
                  key={loc.id}
                  className="location-dot cursor-pointer"
                  onMouseEnter={() => setActiveLocation(loc.id)}
                  onMouseLeave={() => setActiveLocation(null)}
                >
                  {/* Marker */}
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r={loc.isTarget ? 8 : 10}
                    fill={loc.isTarget ? "#F8AB1D" : "#1C5244"}
                    stroke={loc.isTarget ? "#F8AB1D" : "#fff"}
                    strokeWidth="2"
                    filter="url(#glow)"
                    className="transition-all duration-300"
                    style={{
                      transform:
                        activeLocation === loc.id ? "scale(1.3)" : "scale(1)",
                      transformOrigin: `${loc.x}px ${loc.y}px`,
                    }}
                  />

                  {/* Inner dot */}
                  {!loc.isTarget && (
                    <circle cx={loc.x} cy={loc.y} r="3" fill="white" />
                  )}

                  {/* Location Label */}
                  <text
                    x={loc.x}
                    y={loc.y - 18}
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="600"
                    opacity={activeLocation === loc.id ? 1 : 0.7}
                  >
                    {loc.name.toUpperCase()}
                  </text>

                  {/* Tooltip on hover */}
                  {activeLocation === loc.id && !loc.isTarget && (
                    <g>
                      <rect
                        x={loc.x - 55}
                        y={loc.y + 15}
                        width="110"
                        height="36"
                        rx="6"
                        fill="rgba(10, 15, 20, 0.95)"
                        stroke="#1C5244"
                        strokeWidth="1"
                      />
                      <text
                        x={loc.x}
                        y={loc.y + 32}
                        textAnchor="middle"
                        fill="#F8AB1D"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {loc.role}
                      </text>
                      <text
                        x={loc.x}
                        y={loc.y + 44}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.6)"
                        fontSize="8"
                      >
                        {loc.country}
                      </text>
                    </g>
                  )}
                </g>
              ))}

              {/* Compass Rose (tactical element) */}
              <g transform="translate(60, 390)" opacity="0.4">
                <circle
                  cx="0"
                  cy="0"
                  r="20"
                  fill="none"
                  stroke="#1C5244"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="-25"
                  x2="0"
                  y2="25"
                  stroke="#1C5244"
                  strokeWidth="1"
                />
                <line
                  x1="-25"
                  y1="0"
                  x2="25"
                  y2="0"
                  stroke="#1C5244"
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="-30"
                  textAnchor="middle"
                  fill="#1C5244"
                  fontSize="8"
                  fontWeight="bold"
                >
                  N
                </text>
              </g>

              {/* Scale indicator */}
              <g transform="translate(700, 420)" opacity="0.4">
                <line
                  x1="0"
                  y1="0"
                  x2="60"
                  y2="0"
                  stroke="#1C5244"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="-3"
                  x2="0"
                  y2="3"
                  stroke="#1C5244"
                  strokeWidth="1"
                />
                <line
                  x1="60"
                  y1="-3"
                  x2="60"
                  y2="3"
                  stroke="#1C5244"
                  strokeWidth="1"
                />
                <text
                  x="30"
                  y="12"
                  textAnchor="middle"
                  fill="#1C5244"
                  fontSize="7"
                >
                  TACTICAL VIEW
                </text>
              </g>
            </svg>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex items-center gap-6 text-white/60 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F8AB1D]" />
              <span>Operations Hub</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1C5244] border border-white" />
              <span>Global Office</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="24" height="10">
                <path
                  d="M 0 5 L 20 5"
                  stroke="#F8AB1D"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
              <span>Capital Flow</span>
            </div>
          </div>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className={`location-card p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                loc.isTarget
                  ? "bg-[#F8AB1D]/10 border-[#F8AB1D]/50"
                  : activeLocation === loc.id
                    ? "bg-[#1C5244]/30 border-[#F8AB1D]"
                    : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
              onMouseEnter={() => setActiveLocation(loc.id)}
              onMouseLeave={() => setActiveLocation(null)}
            >
              {loc.isTarget && (
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-[#F8AB1D] text-[#333333] rounded-full mb-3">
                  TARGET
                </span>
              )}
              <h4 className="text-white font-bold text-lg">{loc.name}</h4>
              <p className="text-white/50 text-sm">{loc.country}</p>
              <p
                className={`text-sm mt-2 ${loc.isTarget ? "text-[#F8AB1D]" : "text-[#1C5244]"}`}
              >
                {loc.role}
              </p>
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
    </section>
  );
}
