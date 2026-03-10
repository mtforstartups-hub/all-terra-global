"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillars = [
    {
      title: "Assets are Tangible",
      description: "Asset-backed investments with real, physical collateral",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      title: "Access is Restricted",
      description: "Off-market deals unavailable to traditional investors",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Risk is Calculated",
      description: "Rigorous due diligence and structured deal-making",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Returns are Assured",
      description: "Guaranteed minimums with insurance-backed protection",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  useGSAP(
    () => {
      // Animate Header
      gsap.fromTo(
        ".what-we-do-header",
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
        },
      );

      // Animate Thesis Banner
      gsap.fromTo(
        ".thesis-banner",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );

      // Animate Pillars
      gsap.fromTo(
        ".pillar-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pillars-grid",
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="what-we-do-header text-center mb-16 opacity-0">
          <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-6">
            Alternative Investment & Financing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            All Terra is an alternative investment and financing platform focused on
            deploying structured capital into asset-backed, high-yield
            opportunities in Zimbabwe.
          </p>
        </div>

        {/* Core Thesis - Infographic Style */}
        <div className="thesis-banner opacity-0 mb-16">
          <p className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider mb-6 text-center">
            Core Thesis
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Thesis Card 1 - Downside Protected */}
            <div className="thesis-card group relative bg-gradient-to-br from-[#1C5244] to-[#143d32] rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1C5244]/30">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="#F8AB1D" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid1)" />
                </svg>
              </div>

              {/* Icon Container */}
              <div className="relative z-10 flex justify-center mb-6">
                <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {/* Shield with Downward Arrow - Protection Icon */}
                  <svg
                    className="w-14 h-14 text-[#F8AB1D]"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    {/* Shield */}
                    <path
                      d="M32 4L8 14v18c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V14L32 4z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      className="animate-pulse"
                      style={{ animationDuration: '3s' }}
                    />
                    {/* Inner Shield Glow */}
                    <path
                      d="M32 10L14 18v12c0 10.8 7.68 20.88 18 24 10.32-3.12 18-13.2 18-24V18L32 10z"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    {/* Downward Arrow - Protection */}
                    <g className="group-hover:translate-y-1 transition-transform duration-300">
                      <path
                        d="M32 24v16"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M24 34l8 8 8-8"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    {/* Shield Base */}
                    <ellipse
                      cx="32"
                      cy="52"
                      rx="12"
                      ry="4"
                      fill="currentColor"
                      opacity="0.3"
                      className="animate-pulse"
                      style={{ animationDuration: '2s' }}
                    />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 leading-tight">
                  Downside Protected
                  <span className="block text-[#F8AB1D]">Capital Deployment</span>
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Structured investments with asset-backed security ensuring principal protection
                </p>
              </div>

              {/* Animated Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F8AB1D] to-transparent group-hover:opacity-100 opacity-50 transition-opacity" />
            </div>

            {/* Thesis Card 2 - High Yield Cash Flow */}
            <div className="thesis-card group relative bg-gradient-to-br from-[#333333] to-[#1a1a1a] rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F8AB1D]/20">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <pattern id="grid2" width="25" height="25" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="25" x2="25" y2="0" stroke="#F8AB1D" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid2)" />
                </svg>
              </div>

              {/* Icon Container */}
              <div className="relative z-10 flex justify-center mb-6">
                <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {/* Chart with Upward Trend - High Yield Icon */}
                  <svg
                    className="w-14 h-14 text-[#F8AB1D]"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    {/* Background Circle */}
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                    />

                    {/* Bar Chart - Animated on hover */}
                    <g className="origin-bottom">
                      {/* Bar 1 */}
                      <rect
                        x="14"
                        y="38"
                        width="8"
                        height="14"
                        rx="2"
                        fill="currentColor"
                        opacity="0.5"
                        className="group-hover:animate-pulse"
                      />
                      {/* Bar 2 */}
                      <rect
                        x="28"
                        y="30"
                        width="8"
                        height="22"
                        rx="2"
                        fill="currentColor"
                        opacity="0.7"
                        className="group-hover:animate-pulse"
                        style={{ animationDelay: '0.1s' }}
                      />
                      {/* Bar 3 - Tallest */}
                      <rect
                        x="42"
                        y="18"
                        width="8"
                        height="34"
                        rx="2"
                        fill="currentColor"
                        className="group-hover:animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </g>

                    {/* Upward Trend Arrow */}
                    <g className="group-hover:-translate-y-1 transition-transform duration-300">
                      <path
                        d="M16 42L30 28L42 34L52 16"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <path
                        d="M44 16h10v10"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </g>

                    {/* Dollar Sign Accent */}
                    <text
                      x="32"
                      y="58"
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="8"
                      fontWeight="bold"
                      opacity="0.6"
                    >
                      $$$
                    </text>
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 leading-tight">
                  Investing in High Yield
                  <span className="block text-[#F8AB1D]">Cash Flow Business</span>
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Targeting consistent, above-market returns through proven revenue-generating ventures
                </p>
              </div>

              {/* Animated Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F8AB1D] to-transparent group-hover:opacity-100 opacity-50 transition-opacity" />
            </div>
          </div>

          {/* Connecting Visual Element */}
          <div className="hidden md:flex justify-center mt-8">
            <div className="flex items-center gap-4 bg-gray-50 rounded-full px-6 py-3 border border-gray-200">
              <span className="w-3 h-3 rounded-full bg-[#1C5244] animate-pulse" />
              <span className="text-gray-600 text-sm font-medium">Protected Capital</span>
              <svg className="w-6 h-6 text-[#F8AB1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span className="text-gray-600 text-sm font-medium">Maximum Returns</span>
              <span className="w-3 h-3 rounded-full bg-[#F8AB1D] animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-secondary">
            We Back Opportunities Where...
          </h3>
        </div>

        <div className="pillars-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="pillar-card opacity-0 group bg-gray-50 hover:bg-[#1C5244] rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-[#1C5244]"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-[#1C5244]/10 group-hover:bg-white/20 flex items-center justify-center text-[#1C5244] group-hover:text-white transition-colors">
                {pillar.icon}
              </div>
              <h4 className="text-lg font-bold text-secondary group-hover:text-white mb-3 transition-colors">
                {pillar.title}
              </h4>
              <p className="text-gray-600 group-hover:text-white/80 text-sm leading-relaxed transition-colors">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
