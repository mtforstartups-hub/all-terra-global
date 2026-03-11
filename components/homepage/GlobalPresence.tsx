"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Location {
  id: string;
  name: string;
  country: string;
  x: number;
  y: number;
  isHQ?: boolean;
}

export default function GlobalPresence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const locations: Location[] = [
    { id: "dubai", name: "Dubai", country: "UAE", x: 440, y: 215, isHQ: true },
    { id: "harare", name: "Harare", country: "Zimbabwe", x: 390, y: 310 },
    { id: "usa", name: "New Jersey", country: "USA", x: 235, y: 160 },
    { id: "india", name: "Mumbai", country: "India", x: 480, y: 238 },
  ];

  const connections = [
    { from: "india", to: "dubai" },
    { from: "usa", to: "dubai" },
    { from: "dubai", to: "harare" },
  ];

  // Generate curved flow paths between two locations
  const getFlowPath = (from: Location, to: Location) => {
    // Create a curved path with control point offset for visual appeal
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - 40;
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
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
        },
      );

      // Animate location pins
      gsap.fromTo(
        ".location-pin",
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
        },
      );

      // Animate location labels
      gsap.fromTo(
        ".location-label",
        { opacity: 0, y: 5 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.15,
          delay: 3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );

      // Pulse animation for Harare (destination)
      gsap.to(".harare-pulse", {
        scale: 2.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      });

      // Animate flow paths drawing
      gsap.fromTo(
        ".flow-path",
        { strokeDashoffset: 500 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          stagger: 0.3,
          delay: 3.5,
          ease: "power2.inOut",
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
      className="py-24 bg-linear-to-b from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a] overflow-hidden"
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
            local expertise, creating value across borders.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative">
          {/* SVG Map */}
          <svg
            viewBox="0 0 800 500"
            className="w-full h-auto max-h-175"
            style={{ filter: "drop-shadow(0 0 40px rgba(28, 82, 68, 0.3))" }}
          >
            {/* Definitions */}
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
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
              {/* Green glow filter for Harare */}
              <filter
                id="greenGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Grid */}
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* SIMPLIFIED RECOGNIZABLE CONTINENTS */}

            {/* North America */}
            <g id="north-america" transform="translate(50, 80)">
              <path
                className="continent-path"
                d="M227 0h8l1 1 1 1h-1l-3 1h-2l-4 1-2 1-3 1h-3l-1 1h-3l-1 1-1 1h-3l-1 1v1h-1l-4 1h-1 1v1l-1 1h-1v1h-9 1v1l3-1h1v1l1-1h5l1 1v2h1l1 1h2v1l3 1 1 1 1 2h-1l-1 1h1l2 1 1 1 2 1v1l-1 1-4 2q0 2 0 0h-2v-1l-1-1h-2l1 1 1 1h1v3l-1 2h-3v-1 2l-1 1-3-1-3-1v-1h-2a1 1 0 0 1 0-2l-1-1-1 1h-5l-1-1v-1l2-1h3l3-1 1-1 3-2v-1h-1l-1-1v3h-5l1-1v-1l1-1h1v-1h1v-1h-6v1l-1 1-1 1v1l-1 1-4 2h-4 1v1h1l1 1h1v1q1 0 0 0h1l1 1-1 1-1 1h-1l-2-1h-2l-3 1v-1h-2v-1l2-1-3 1h-2l-2 1v1l-1 1h-2l-3 1-3 3-1 1-2 2h2v2l-1 1h2l3 1 1 1 1 1h1l1 1h5v1l-1 2-1 2v2l1 2 2-1 1-2 1-3-1-1 1-1 3-1 2-1 2-1v-3l-1-1v-1l3-2 1-2 1-3 2-1 2 1h2l1-1h1l1 1 1 1v1h2l1 1-1 2-1 2h2v1l2-1 3-2 1-1h1v2l1 2 1 3v1h-1l1 1 1 1 2 1h1l1 1v1l1 1v3l-1 1h1v1l-1 1-1 1h-1 1a1 1 0 0 1 0 2l1-1h1l1 1v1l1 1v3l-1 2h-2l-1-1v-1l-2 1h-1v-1h-5l-1-1v-1h1v-1l2-2 3-3h-2l-2 2h-5l1 1v1h-1v1l-1-1h-2l-1-1v-1h-2l-2 1h3l2 1-1 1-1 1-1 2h2v1h2l1 1 2-2 1 1v2l-3 2-4 1-2 1-2 2h-1l-1-1h-1l1-2v-1h1-1v1l-3 1-2 1h-2l-1 1v1h-1 1v1h1v1l-1 1h-2l-2 1-3 1h-1l-1 2-2 2v1l-1 1-1 1-1 1v3l-2 2-2 1-1 1h-2v1h-1v1l-2 1-2 1-1 1v7l1 3-1 2v1l-1 1-1 1-1-1-1-1-1-2v-2l-1-1 1-2v-1l-1-1h-2l-1 1v-1l-1-1h-6v2l-1 1v-1l-1 1h-2v-1h-3l-1-1h-1l-1 1-2 1-3 1-1 1v1l-1 2 1 1-1 1-1 2v1l-1 3v3l1 2v1h1v2l2 1 1 1 1-1h3l1-1h1l1-2v-2h1l1-1h1l2-1h3v1h1v2h-1l-1 1v3l-1 2h-1v-1h-1v1l-1 1h-3l-1 1h1v3h-3v2l-1 1h-1l-2-2v-1h-4v1h-2l-1-1h-1l-2-1-1-1h-1l-2-1-1-1h-1l-2-1h-1v-1l-2-2-1-1v-3h1v-1h-1v-3l-1-2-2-1v-2l-2-1v-2l-1-1v-2h-1l-1-1-1-1v-5l-1-1h-1v3l1 2v1h1v3l1 1v2l1 1v2l1 1v1l1 1v1l-1 1h-1l-1-1v-1l-1-1-1-1-1-1v-3l-1-1h-1v-1h-1l-1-2v-1h2v-1l-1-1-1-1v-5l-1-2 1-1h-1v-1h-1l-1-1h-2v-2l-1-2v-5l-1-2 1-2v-1l1-2 1-2v-2l2-2 2-2 1-2 2-3v-3h1-1v-1l-1-1q-1 0 0 0h-1l-1-1v-1l1-1h2v-2l1-1h-1v-1l1-2-1-1v-1l1-1h-1v-1l1-2v-3h-4l-1-1-1-2h-1l-1-1-3 1v-1h-2v-1h-3l-1 1v1h-3l-2 1h-3v-1l-2 1-1 1h-1v1h1v1h-1l-2 1-3 1-1-1 1-1-2 1-1 1-4 1-1 1h-1l-2 1h-3l-3 1-2 1h-4v-2h3l2-1 3-1h1l2-1h1l4-2h1l2-1 1-1-1 1-1-1h-3l-1-1 2-1h-1l-1-1-1-1v1l-1 1h-2v-1h-1l1-1 2-1 1 1v-1l2-1h-1l1-1 2-1 3-1 1-1h3l2-1h3v-1l-1 1h-1v-1l-2 1h-1l-1-1-1-1h1l-1-1 1-1 3-1 5-1h1l1 1v-3h-1v-1l2-1h3l3-1 1-1h1l2-1h2l4-1h1l4-1 1 1h3l1 1h7l1 1 2-1 1 1h2l2 1 1 1h1l2-1 2-1h1l1 1 3-1 3-1h1v1h1l1-1h2v1l3-1v1h4l1 1h2l2 1v-3l1-1h-2l-5 1v-1l-2-1v-1l2-1 2-1 3-1v-1h10l1 1 1 1h3v1l3-1 1 1 1-1h2l1-1h3v2l-2 1-1 1v2l2 1v1l2-1 2-1 1 1h1l1-2-1 1-2-1-2-2v-1l1-1 1 1v-1h1l2-1h4l1 1v-1h2l1-1h-1v-1l-1 1h-4l-1-1v-1l1-2h7v2h-1 1l2-1 1 1v2h-1 1l2 1v1l2-1h2-2l-3-1-1-1 1-1-2-1h-1v-1l1-1h1-1V7h1V6h3l1 1v1h1v1l-1 1h2v1h1v1h4l-1-1h-2l-1-1 1-1h3V8h-5V6h-1V4h2l2-1h5l1 1-1-1V2h1l2-1h9l1-1zM4 125v1h1l1 1h1v2h1l1 1v1l-1 1H7q0 2 0 0H6v-3h1-1 1l-1-1H5l-1-1H3v-2zm164 0h1l-1 1v1h-2v-2h1zM1 124v2l-1-1zm159-11v1h1v3h1l1 1h-1 1v1l1 1h1v1l-1 1h1v1h1v2h-2v-1l-1-1v-1h-2v-1h-1v-1h2v1-1l-1-1v-1h-1v-1h-1v-2h1-2l-1 1v-1h-1v-1h3zm8 10v1h-1l-1-1zm-9-6h1v2h-1v3h-1v-1l-1-1v-3m28-16v2l-1-1zm-24-21-1 1h1zm-6-7v1l-2 1-1 2v1l-1 1v1h1l1-1v-3h1v-1l1-1zv-1h1zm5-1v2l1 1-1 1h1v-2l1-1 1-1h1v1h1v-1l-1-1h-4m8 5h1zm-13-11h-1l-1 1-2 1h-2l1 1 1-1 2-1h2v1l1 1 1-1h3-1v-1l-1-1v-1h-2M87 52l1-1a1 1 0 0 1 1 2l-2 2v1l-1 1h-1v-1l-1-1 1-1h-1v-1l1-1zm98-18v2l-1 1h-1l-1-1v-1h1zm-2-1v2l-3 1h-1l-1-1v-1l2-1zM48 34h2l1 1v1h-4l-1-1zm135-17-2 1-2 1h1v4h2l1 2-2 1v1l2-1 2-2 2-1-1-1h-3v-2zl3-2zm-33 8h1zm15-1h-2l-1 1h-4 2l1 1h4l1-1h1l-1-1zm-17 1-2 1-1-1v1zl1-1zm24-2-1 1h-1zm-2-17 2 1-1 1h-1v1h-1l-2 1h2v1h1l1 1-1 1-2 1h-5l-4 1h-2l-1-1h-3a1 1 0 0 1 0-2h1-6v-1l4-2 5-1h4v1l-1 1 2 1 1 1h2v-2h2-2l-1-1V8l2-1h1zm8-1 2 1h3v3h-3l-1-1h-3V7h1V6z"
                fill="rgba(28, 82, 68, 0.15)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="2000"
              />
            </g>

            {/* South America - triangle-ish shape */}
            <g id="south-america" transform="translate(150, 220)">
              <path
                className="continent-path"
                d="M9 0h3v1h1v1h1v3h-1v4l-1 1h1l-1 1v1l1 1v1l1 1h1v1h2v-1h2v-1h2v1h2l1 1h1l1-1h1v-3l1-1h2v-1l2 1 1-1 1-1 1-1h1l1 1v2h-1 1v-1l1-1V8h2v1h-1l1 1h1l1 2h4l1 1h2l1-1h6v-1h1v-1l1 1-1 1v2h-1l1 1v2h2l1 1 1 2h1v1l1 1h1l1 1 1-1h2l2 1 2 1 2 2h1v1l1 1 1 4h1v2l-1 2h3l1 1v1-1h1l2 1 3 1h1l1 2h1l4 1h3l3 2 3 3h3l1 1 1 3v2l-1 4-1 1-2 3-2 3-1 2-1 1 1 4-1 4v2h-1v3l-1 3-1 2v1l-1 1-1 1h-2l-3 1-1 1-2 1-2 1-1 2-1 2 1 1v2l-1 1v1l-1 1-1 4-2 2-1 1v2l-1 1-1 1v1l-2 1h-3l-2-1 1 1v1l1 1h1v2l-2 3-2 1-4 1h-1v2l1 1-1 1h-1l-1 1h-1l-1-1v2h2v-1l1 1 1 1-1 1h-1l-1 1 1 2v2h-2l-1 1v1l2 1 1 1h1v3l-2 1v3h-1v1l1 2 2 1v1h-1l1 1 2 1 2 1 3 1v2h-3l-2 1h-2l-1-1h-2l-3-1-2-2-4-2v-1h-1l-1-2v-1l-2-1-1-4-1-3h1v-1h-2v-1l1-2-1-3 1-1h1v-2 1l-1 1-1-1h-1v-3l-1-4v-1l1-1-2-2v-3l1-3v-7l-1-3v-2l-1-3 1-3V84l-1-3v-3l-2-1-1-1-4-3-3-2-2-1v-1l-1-2-2-3-2-4-2-5-1-1-1-1-1-2h-1l-1-1 1-1-1-2v-2h1l1-1v-1l-1-1v-4l1-1v-2l1-1h1l1-1h-1l1-1v-1l1-1h1l1-1v-7l-1-1v-1h-1v-3h-1v1h-2l1 1v1h-1v1h-1l-1-1h-1v-1h-1a1 1 0 0 1-2 0l-1-1v-2H9v-1H8v-4l-1-1H6V9L5 8H3V7H1L0 6V5l1-1h1V2h1l1-1h1V0h2v1zm64 149h1l1-1v1h3l1 1-1 1-1 1h-4v-1h-1v-2zM36 14v1zm20-6v1h-2zM41 8v1l1-1 1 1v1h-3V8m19-2v2h-1l-1-1zm-3-2v4h-1l-1-1V6h1V4"
                fill="rgba(28, 82, 68, 0.15)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="2000"
              />
            </g>

            {/* Europe - small irregular blob */}
            <g id="europe" transform="translate(300, 100)">
              <path
                className="continent-path"
                d="m76 16 5 1a1 1 0 0 1 0 2v1l-2 1h-1v1l3 1v1l-1 1 2 1v2l1 2v1l2 1 1 1-1 1-1 1-3 3h-3l-2 1h-4l-1-1h-1l-1-1 1-2-1-1v-2l1-2 4-2-2-1-2 1-1 1h1l-1 1-2 2-2 1-1 3 1 1 2 1v1l-1 2h-1l-1 1v3l-1 2h-2v1l-1 1h-3 1l2 1v1l1-1 3-1h5l2 1h5v1l1 1v4l1 2v1h-1l-1 2h1l-1 1v1h1v1l-1 1-1 1-1 2-2 1h-1l1 1v1h-1l1 1v2h-1v2h-1v1l-2-1-1-1-2-1-2-1v-2h-3v-2l-1 1v1l1 1 1 1h1v2l2 1h2v1l1 1 2 1 2 1v2h-1l-1-1h-1v1l1 1v1l-1 1-1 1-1 1h-1l1 1-1 1-1 1-1-1-1-1-3-1v-2h6v-2l-1-1v-1h-1l-1-1-1-1h-1l-2-1-2-1-1-2-1-2h-2l-1 1h-1l-1 1h-6v3l-2 1-2 1-1 2-1 1 1 1-1 1v1l-1 1-1 1-2 1-2 1-2-1-1 1-1 1h-2v-1l-1-1h-3l-1-1v-2l-1-1v-3h1v-8l2-1h11l1-1v-4l-2-2-1-1h-2l-1-1v-2h1l2-1 2 1v-2l1-1 1 1 4-1v-1h-1v1l-2-1-3 1h-1l-1 1-2-1-1 1h-1v-1l2-2h-1v-1h-1l1-1 1-1h-1v-1l1-1v-1l2 1v-1l-1-1h-2v-1l-1-1v-2h-1v-1l1-2 1-2h4l1 1-1 1h2v2l-1 1h1v1l1 2h1l1 1 1 2v1h2v3h-1 1v1l1-1h2l1-3v-1l3-1h4l-1-1v-2h-1v-3h1v-1h2v-1h3v1l-1 1h1v1h2l-2-2-1-3-1-1-2 2-1 1h-2l-2-1h-1v-3l-1-4v-1l1-1h1l4-2 2-2 3-3 3-3v-1l2-1 4-2 3-1h2l2-2zM53 74l1 1 1 2-1 2 1 1v3l-1 1h-2v-1l-1-2v-1l1-1h1l-1-1v-3zM26 48l2 1v1l-1 1v2l-1 2-3 2h-1l-2-1-1-1 2-2-1-2 3-2 1-1zm27 0 1 1h1l-1-1-1-1v-1zM27 33l-1 1v1h-1l-1-1v-1l1-1zm-12-8 1 1v1l1 1v1l-2 1-5 2H6l-4-1v-1l-1-1v-1l-1-1 1-1 1-1h3l1 1 2-1h1l1 1 3-1zM65 0h3l2 1 1 1-2 1h-5v1l2-1v1h2a1 1 0 0 1 0 2h-5V5l-1-1h-1v1l-1 1v1h-3q0 1 0 0l-3-1-1-1-2-1h-1l-1-1 1-1 3-1h5l4-1z"
                fill="rgba(28, 82, 68, 0.15)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="2000"
              />
            </g>

            {/* Africa - distinctive shape with bulge on west */}
            <g id="africa" transform="translate(300, 180)">
              <path
                className="continent-path"
                d="m117 0 1 1 1 1h1l2-1V0h1v1h1v2h1l1 2h2l1 1 3 1 2-1 2-1 1-1h4l2 1h1l3 2h1l1 1v1l2 1 1-1 1-1h1V6h1V5h4l1 1h1l1-1h2l-1-1h1V3h2l1 1v2h2V5h5v1l2 1 1 2h3v1l-1 2-1 1h-2l-2-1-1 1 1 1 1 2 2 1v1l-1 1v1l-1 3-1 2-2 2v1l-2-1-1 2 1 1v1l1 1 1 1v3h-4l-1 1h-1l-1-1h-1l-1-1-1-2-3 1h-6l-4-1h-2l-2-1h-1v-1 2l1 2h1l1 1h2l1 2h1v3l-1 1-1 1v1h-1v3l-1 1h-1v1h-1v1h-2v1l-1 1h-1l-1 1h-2v1l-1 1-2 1-3 1-1 1-1 1h-2v1h-3v1h-1l-1 1-1-1v1h-1v1h-1l1 1v1h3l2-1h3l1-1h3l1-1h2v4l-1 3-1 2-1 3-2 4-1 2-3 3-2 2-3 2-1 2-2 3-1 1v1h-2v1h-1v2l-1 1v1l-1 1-1 2v1l1 1v5l1 2 1 1v12l-1 1v1l-2 1-2 1-2 1-2 2-1 1-1 1-1 1v1l1 1v7l-1 1-2 1-2 1-1 1 1 1v1l-1 2v2l-1 1-2 1-1 1v1l-2 2-2 2-1 2h-1l-1 1-2 1h-1l-1 1-1-1v1h-1l-2-1-1 1-1-1-1 1h-1l-1 1h-1l-1 1-1-1h-1v-1h-1v-2l-1-2v-1h1v-1l-1-2-1-2-1-3-2-1v-2l-1-2v-2l-1-3v-4l-1-1-1-2-1-3v-1l-1-2h-1v-4l1-2v-3l1-2 1-1 1-1v-4l-1-2v-6l-1-1v-2l-1-1-1-2-2-3-2-2-1-2v-2l1-2v-2l1-2v-2l-1-1h-1v-1h-6l-1-1v-2l-2-1h-4l-1 1-3 1-1 1h-5l-2-1h-1l-2 1h-1l-2 1h-2l-2-1-2-2-1-1-2-1v-1h-2v-1l-1-1v-2l-1-2H7v-1H6v-2H5l-1-1H3v-1H2v-4l-1-1-1-1 1-1v-1l1-1 1-1-1-1 1-1v-7l-1-1v-3l1-1v-1l1-2 1-2h1v-2l1-2 1-1 2-2 1-1h2l1-2h1l1-2v-3l1-1v-2l2-1v-1h2l1-1 1-2 1-2h2l1 1h4l2-1h2l1-1 2-1h3l3-1 1 1 1-1h5l1-1h1l1 1h2v1l-1 1v1h1v3l-1 1h1v1l1 1h3l1 1h1l2 1 1 2h2l2 1h1l1 1h1v-4h1l1-1 1-1h1l2 1h1v1h3l1 1h2l2 1h2l1 1 1-1 1-1h3v1h4l1-1v-3h1l1-1 1 1v1h1l3-2 4-2V8l1-1 1-1 1-1h2v1-2l-1-2V1zm15 115 1 1v1l1 1v6l-1 1v1h-1v2l-1 3-1 3-2 4-1 3v1l-1 2-2 1-2 1-1-1h-2v-4l-1-2v-3l1-1v-1l1-1 1-1-1-1v-4l1-1v-2h2l1-1h1l1-1 2-2v-1l1-1 1-1v-1l1-1zm11 20v1h-1v1h-1v-1h-1v-1l1-1zm3-2v1h1v1h-1v1h-1v-3m12-1h1l-1 1h-1zm-38-18v1h1v-1l1 1v1h1v2h-1v-2h-3v-1h-1v-2zm6-5v2h-1l-1-1zm18-10v1h-1zm-44-9v3l-1 1h2v-1l1-1 1-1v-1l-1-1zm-52-2v2h-1l-1-1zm1-3h1l1 1h-2zm52-58h-1l1 3 1 1v1l2 2v2l2 2 1 1 1 2v1h-1l1 2v2l1 1 1 1 2 2v2l1 1 3 2 1 2 1 1 1 1v-2l-1-2v-4h-1v-1l-1-1-1-2-1-2-1-1-1-1-2-2v-3l-1-2-1-1h-1v-1l-1-1v-1h-1v-1l-1-2-1-1zm27-4 1 1 1 2h1v1l1 1 1 1 1 1v-1l1 1 1 1v3h4l1-1v-1l1-1 1-1v-1h2-1v-1l-1 1-2 1-3-1-2-2h-2v-1l-2-2-1-2h-1zM1 24l1 1v1h1v-1h2v1h2v1l-1 1H5v-1H2v1H0v-1h1q0-1 0 0h1v-1H1v-1H0zm9-1q1 0 0 0v2H9v1H7l1-1v-2h1z"
                fill="rgba(28, 82, 68, 0.2)"
                stroke="#1C5244"
                strokeWidth="2"
                strokeDasharray="2000"
              />
            </g>

            {/* Asia - large irregular mass */}
            <g id="asia" transform="translate(370, 100)">
              <path
                className="continent-path"
                d="M203 130h2v2l1 1v2l-1 1v3h2l3 1v2l1 1h2v1l1 3h-1v2h-2v-1 1l-1 1v1h-1l1 1h1v-1h2l-1-1 1-1 2 1v1l1 1v6h-1l-1 1-1 1-2-2-1-2v-1l-1 1v-1l-2 2-1-1v-1l1-2 1-1h1-1l-1-2v-2 1l-1-1-1-1v-2l1-1 1 1h1l1 1h1l1-1-1-1h-1l-1-1-1-1-1 1-1-2v3l-1 1-1-1-1-2v-2l-1-2-1-1v-2l1-1-1-2 1-2zM83 0l4 1 4 1h1l1 2 1-1h2l4 1 1 1 3 1v1h8l4 1 2 1 1 1v1h-1l-1 1h4l1 1 2-1 5 1h1l4 1v-1l1-1 3 1h2l4 1 2 1v1l3 1h2v-1h5l3 1v-1h1-1v-2h-1l-1-1h1v-1h2l3 1h1v1l10 1 3 1 6 2 5-1h3v1h3l1 2h12l2 1v-2h8l6 1 3 1 12 8v2l3 1 1 1h1l1 1v1h-3l-3 1v1l-1 1v1l-1 1-3-1-2 1h-2l-1 1-1-1v1l1 2 3 1 3 3v1h-1l1 1h1a1 1 0 0 1 0 2h-1l2 2-1 1h-1l1 2q1 0 0 0v2l-1 1-2-2-4-3-5-5h-1l-2-3v-1l-1-1 1-1h1v-5l1-1-2-2 1 1-2 3h-1l-4-3-2 1v2l2 1a1 1 0 0 1 0 2h-6l-1-1h-3v1l-6-1-4 1-1 4-1 4h2l2 1 1 1v-1h3l4 2-1-1v-1l1-1v1l2 1 3 2 1 2 3 2 5 4-1 1h-2l1 2 3 2 1 1-1 1h-1l-1 1-2-2-1-2-2-3-1-1-2-3-2-2 2 3 2 3v1l-1 3 1 1v1l-1 2-1 3v1l-2 2h-2l-1-1-1 1v1h-1v1l1 1v1h-1v1l-1 1v1h1l1 1 3 2v1l1 1 2 3-1 1v1h-1l-1 1h-3l-1-1v-2l-2-2v-1h1l-2-1h-2v-1h-1v-3h-1l-1-1-2 1-1 1h-2v-1l-1-1 1-1-1-1h-1l-1 2v1l-1 1h-1l1 1h1l1 1 1 1 1-1v-1h1l2 1h1l1 1v2h-2v1l-2 1v1l2 1h1l1 3 2 2 2 1v1l1 1-1 1v1h2v5h-1l-1 2v3l-2 3-2 2-2 2h-1l-2 1h-2v1l-3 1h-1l-1 2h1l1 1v1l-1 1v1h-1l-1 1h-2l-1-1v-2l1-1 1-1-1-1v-1h-2l-2 2-1 2v1l1 2 2 3 2 1 2 2 1 4 1 4-1 1-1 1-2 2-2 2-2 2h-1l-1-2v-1l-1-1-1-1h-1v-1l-2-2-1-1h-2v-2h-1v5l-1 2v1h1l1 1 1 2v2l1 1h1l1 1v2h-3v-1l-1-1v1l-1-1-1-1v-1l-1-1-1 1v-1l-1-1v-2l1-2-1-1v-1l1-1-1-1v-3l-1-1-1-2v-3l-1-1h-1l-2 2h-1l-2-1v-5l-2-2v-1h-1l-2-2-1-1v-3l-1-1h-1v2h-3v1h-3v2l-1 1-3 2-1 2-2 1v1l-1 1-1 1v1h-2v1h-1v3l1 1v2l-1 2v4h-1v1a1 1 0 0 1 0 2h-2v2h-2l-2-2-1-3-1-2-1-1v-1l-1-2-1-3v-1l-2-3-2-4v-3l-1-3v-1l-2 1h-2v-1l-3-2v-2l-2-2v-1l1-1v-1h4-1l-1-1v-2l-2-1v-1l2-2 1-1 1 1 2-2v-3h1l1-2-1-1 1-1-1-1-1-2-1-2 1-1v-1l3 1h2v-1l-2-1-1-2-2-1h-4l-1 1h-1l-1-1v-2h-1v-1 2h-2v1h-8v2l-1 1h-1v1h-5v-1l-1-1-1-1-2-1-2-1-2-1h-1l-1 1-1-1-1 1v1h-2l-1-2v-2l-1-1h-1v-1l-1-1v-2l-1-1v-2l-2-1h-1l-1-2-1-1v-2l1 1v-2h3v-1l-1-1h-1l-2-1-1 1-1 1-1 1h-2v2l1 2 1 1 2 3 1 1 1 1h1v1h1v1h-1v2l-1 1v2h-1l-2-2v-1l-1 1-1 1h-1l-1-1-1-1h-1l1 2v1l1 1v1l-1 1-1-1h-2l-1 1-1 1v4l-4 3-3 2h-1l-1-1v2h-1v1h-1l-1-1v-2l1-1-1-1 1-1v-5l-2-1v1h-1l-3 1v-1l-2-1h-1v1h-2q0 1 0 0l-2-1h-2l-2-2-1-1v-2l-1-1v-1h1l-1-1v-1h-3 1a1 1 0 0 1 0 2h-2v2h1l1 1v1l-1 1-1 1 1 1-1 1H9l-1-1H7v-2l-1-2-1-1-1-1v-1l-1-1-1-1v-2h1-1v-1l-1-1v-2l1-1v-1l-1-1v-3l1-1h3v-1l1-2h1l-1-1v-3l2-2-1-2v-5H1l-1-1v-1l1-1h1v-5h1l1-1h1l1 2h1v-1l-1-1H5v-3h2l2-1 2 1h1l1-1h-1v-1l2-3 1-1h1l-3-1v-2l-1-1v-2l-2-2v-1l1-1-2-1-1-1 1-1h1l2-1 1-1h1l3 1 3 1h1l6 2 1 1h1v2l-1 1 2-1h3l-1-1h-1v-1l-1-1 1-1h4v1l2 1-1 1h-1 3v-1l3-1 4-2h1l1 1v1l1-1h3l1-1h1l2 1-2-1v-1l1-1 5 1 2 1h2v-1l-2-1v-2l1-1v-2h6l1 1v2l1-1v-2h1l2 1v1l2-1h3l-2-1a1 1 0 0 1 1-2h6l-1-1 1-1h2l1-1h3V8h9V6h1-6V5h-7l-3-1-2-1h-2a1 1 0 0 1 0-2l2-1zm42 149 1 1 1 2 1 2v4h-1l-2 1v-1l-1-1-1-1v-3zm77-4v2l-1 2-1 1-2 2-1-1v-1h1l1-2 1-1zm-2-30 1-1 1 1 1 1v1l-1 4v2a1 1 0 0 1-2 0l-1-2-1-2 1-2v-1zM29 92l1 1h1l-1 1v1h-3v-1l-1-1h1zm-17-1 1 1h4l1 1-1 1h-4l-1-1h-1zm52-12h2zM22 68v1l-1 2v1h-1v2l-1 1-1 1 1 1v1l2 1h3l2-1 2-1h4l3 2 2 1 2-1h2l1-1v-1l-1-1h-1l-1-1-3-2h-2l-1-2-1 1h-1l-2 1h-2l-1-1h1l-2-1v-1l1-1h-3v-1zm11 0h-1l-1 1 1 1h3v-2zM20 27l1 1v2h2l-1-1h1v-1h1l4 2-1-1v-2l-2 1zm55-3-1 2h1l1-1zm-9-2-1-1zm5-3 1 1v-1zM56 7h2v1l-1 1-4 1-3 1-3 1-1 2-1 1 1 1 3 2v1h-6l-1-1h-2l-1-1v-3h1a1 1 0 0 1 0-2l2-1h-1l1-1 2-1 4-1h4l1-1zm97 1 6 1 2 2-1 1h-7l-4-1-2-1a1 1 0 0 1 1-2zm11 1 4 1v2h-3l-4-1-1-1 1-1zM29 0l2 1v1h-2l-1 1h-3l-1-1h-2V1h5z"
                fill="rgba(28, 82, 68, 0.15)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="2000"
              />
            </g>

            {/* Australia - oval island */}
            <g id="australia" transform="translate(530, 260)">
              <path
                className="continent-path"
                d="M75 103h1l1 1h1l2-1h1l1 1-2 3-1 1-1 2h-1l-2 1h-2v-3l1-2v-2zm17-67h1l1 2v3l1 1v1l-1 1h2v1l1 1v4l1 1v2l-1 1 1 1 1 1 1 1 1 1 1 1h-1l1 1v2h1l1 1v2l1 1 1 1 1 2v2l-1 1v4l-1 2-1 1-1 2-1 1-1 2-1 2h-1l-1 1-2 2-1 1-2 2-1 1-1 2-1 1v1h-1l-1 1h-3l-2 1-1 1-2 1v-1l-1-1h-1l-2 1h-1l-1-1h-2l-1-1h-1v-4h1l-1-1h-1v-1h-2v-1l1-1 1-1h-1l-2 2h-1l-1-1 1-1-1-2v-1l-1-1h-2l-1-1h-3l-3 1-2 1-2-1-2 2h-2l-1 1-1 1h-7l-1 1-1 1v-1l-1 1-1 1h-3l-1-1-1-1h-1v-2l1-1h1v-1l1-1V74l-1-2v-1h1v-1h1v-2h-1v-1l1-1v-1l1-1v-1l1-2h1l2-1 1-1 2-1h3l1-1h2l2-1 1-1 1-1 1-1v-2l2-2h1l1-1h1v-1l1-1 1-1h1v-1h1l1-1h2l1 1 1 1h1l1-2h1v-1l1-2 2-1 1 1 1-1h-1a1 1 0 0 1 0-2h2l1 1 1 1h6l1 1v1l-1 1-1 1v1l-1 1-1 1 1 1 2 1 1 1 1 1h1v1l2 1v-1l1-1 1-1v-1l1-2v-3l1-1v-3l1-1v-1zM74 13l3 1h1v1l1 4h1l1-1v-1l3-1h2l2 1 1 1h2l3 2 4 1 2 1 1 1v2l3 1 1 1-1 1h-1v1l1 1h1v1l1 2v-1l1 1v1h1v1h1v2h-3l-1-1h-2l-2-1v-1l-1-1v-2h-4l-1 1v2h-6l-1-2h-5v-1l1-1v-1h1v-2l-1-2-3-1h-2v-1l-2-1h-1v1h-1l-1-1v-1l-1-1v-2l-1-1h-1v-1l-1-1v-1h3zM62 31l1 1-1 1-2 1h-2l-1 2h-1l-1 1-1-1v-1l1-2 2-1h1l1-1zm-8-1 1 1v1l-1 1h-5l1 1 1 1v1h-2l-3-1v-1l2-1v-2h5zm-9 0h1l1 1-1 1h-2l-1 1h-2v-1l1-2h1zM1 0l3 1h1l1 2 2 1 1 1 2 3h2l2 1 1 2 1 1v3h1l1 2 1 1h1l1 1v1l-1 3v2l2 1h2l1 1 3 1v-1h1l4 1 1 1 2 1 3 1v1l-3 1-2-1h-6l-2-1h-2l-4-1v-1h-2v-1l1-1h-2v-1l-2-1-2-2-1-2-2-1v-1l-1-1-1-3-2-2V9L5 8 4 6 3 5 0 2zm116 24h1l1 1 1 1v3h-1l-1-1-1-2zq-1 0 0 0m-39 0h1v2l-1 2a1 1 0 0 1-2-1v-2h1v-1zm32-6 1 1h1v1l1 1h1v2l-1 1h-1v1l-1 1h-1v1h-1l-1 1h-2l-1-1-1-1h-1v-1h1v-1l2 1 1-1v-1h1v1h1l1-1v-1h1v-1l-1-1h-1zM60 9v1l-1 2v1h-8l-1 1 1 1h1v-1h5v1l-1 1h-1v1h-2l2 3v1l1 2v2l-1 1h-1l-1-1v-1h-1v-2l-1-1v4l-1 1h-2v-1h-1l1-2v-2h-1l-1-2h1v-2l1-1 1-4v-1l2-1V9h1l1 1h4zM44 3h1l1 1-1 2 1 1v2l2 1a1 1 0 0 1 0 2h-2l-1 1v2l-2 2v2l-1 3h-1l-1 1-1-1-1-1h-5v-1h-3v-1l-1-2v-1h-1v-2h-1v-4l1-1 1-1h1v2h3l1-1h4l1-3h1l1-3zm24 15h2l1 1v1l-1 1-1-1h-5l-1 1h-2v-3h2l1 1 1-1zM65 8h1v3l-1 1 1 1-1 1h-1l-1-1V8z"
                fill="rgba(28, 82, 68, 0.15)"
                stroke="#1C5244"
                strokeWidth="1.5"
                strokeDasharray="2000"
              />
            </g>

            {/* Capital Flow Paths */}
            {connections.map((conn, index) => {
              const fromLoc = locations.find((l) => l.id === conn.from);
              const toLoc = locations.find((l) => l.id === conn.to);
              if (!fromLoc || !toLoc) return null;

              const flowPath = getFlowPath(fromLoc, toLoc);
              const pathId = `flow-path-${conn.from}-to-${conn.to}`;

              return (
                <g key={`flow-group-${pathId}`}>
                  {/* Static flow path line */}
                  <path
                    className="flow-path"
                    d={
                      fromLoc.country === "India"
                        ? "M 480 232 Q 460 186.5 440 215"
                        : flowPath
                    }
                    fill="none"
                    stroke="#F8AB1D"
                    strokeWidth="2"
                    strokeOpacity="0.4"
                    strokeLinecap="round"
                    strokeDasharray="500"
                    filter="url(#glow)"
                  />
                  {/* Animated flowing dot along path */}
                  <path id={pathId} d={flowPath} fill="none" stroke="none" />
                  <circle r="4" fill="#F8AB1D" filter="url(#glow)">
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${index * 0.8}s`}
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                  {/* Second dot for continuous flow effect */}
                  <circle r="3" fill="#F8AB1D" opacity="0.7">
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${index * 0.8 + 1.5}s`}
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}

            {/* Location Pins with Labels */}
            {locations.map((loc) => {
              const isHarare = loc.id === "harare";
              const isDubai = loc.id === "dubai";
              const isMumbai = loc.id === "india";
              const isNY = loc.id === "usa";

              // Harare uses distinctive green color and larger size
              const pinColor = isHarare
                ? "#22c55e"
                : isDubai
                  ? "#F8AB1D"
                  : "#1C5244";
              const pinScale = isHarare ? 1.3 : isDubai ? 1 : 0.7;
              const glowColor = isHarare
                ? "rgba(34, 197, 94, 0.6)"
                : "rgba(248, 171, 29, 0.5)";

              // Pin shape path (centered at bottom tip 0,0)
              const pinPath =
                "M0 0 C -2 -10, -10 -15, -10 -22 A 10 10 0 1 1 10 -22 C 10 -15, 2 -10, 0 0 Z";

              return (
                <g
                  key={loc.id}
                  className="location-pin"
                  style={{ transform: `translate(${loc.x}px, ${loc.y}px)` }}
                >
                  {/* Pulse ring for Harare (destination) */}
                  {isHarare && (
                    <>
                      <circle
                        className="harare-pulse"
                        cx="0"
                        cy="-22"
                        r="15"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        opacity="0.6"
                      />
                      <circle
                        cx="0"
                        cy="-22"
                        r="20"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    </>
                  )}

                  {/* Pin Body */}
                  <path
                    d={pinPath}
                    fill={pinColor}
                    stroke={pinColor}
                    strokeWidth="1"
                    style={{
                      filter: `drop-shadow(0 0 10px ${glowColor})`,
                      transform: `scale(${pinScale})`,
                      transformOrigin: "0px -22px",
                    }}
                  />

                  {/* Inner dot */}
                  <circle
                    cx="0"
                    cy="-22"
                    r={isHarare ? 5 : isDubai ? 4 : 3}
                    fill="white"
                  />

                  {/* Label above pin */}
                  <g className="location-label">
                    {/* HQ badge only for Dubai */}
                    {isDubai && (
                      <>
                        {/* <rect
                                                    x="-15"
                                                    y="-58"
                                                    width="30"
                                                    height="14"
                                                    rx="7"
                                                    fill="#F8AB1D"
                                                /> */}
                        <text
                          x="0"
                          y="-48"
                          textAnchor="middle"
                          fill="#333"
                          fontSize="8"
                          // fontWeight="bold"
                        >
                          {/* HQ */}
                        </text>
                      </>
                    )}
                    {/* City name label */}
                    <text
                      x={isDubai ? "-15" : isMumbai ? "25" : isNY ? "-22" : 0}
                      y={isDubai ? "-5" : isMumbai ? "-5" : isNY ? "2" : "-48"}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="600"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                    >
                      {loc.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex items-center gap-6 text-white/60 text-sm">
            {/* <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#F8AB1D]" />
                            <span>Headquarters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#22c55e]" />
                            <span>Operations Hub</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#1C5244]" />
                            <span>Regional Office</span>
                        </div> */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-[#F8AB1D]" />
              <span>Capital Flow</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
