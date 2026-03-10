"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "../AnimatedCounter";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  isRange?: boolean;
  rangeEnd?: number;
}

export default function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    {
      numericValue: 15,
      prefix: "$",
      suffix: "M+",
      label: "Portfolio Valuation",
    },
    { numericValue: 5, suffix: "+", label: "Projects" },
    { numericValue: 13, suffix: "-20%", label: "Target Annual Returns" },
    { numericValue: 24, suffix: "-36", label: "Investment Tenure (Months)" },
  ];

  useGSAP(
    () => {
      // Animate each counter when section comes into view
      //   const counters = gsap.utils.toArray<HTMLElement>(".stat-counter");

      //   counters.forEach((counter, index) => {
      //     const targetValue = parseFloat(counter.dataset.value || "0");

      //     gsap.fromTo(
      //       counter,
      //       { innerText: 0 },
      //       {
      //         innerText: targetValue,
      //         duration: 2.5,
      //         ease: "power2.out",
      //         snap: { innerText: 1 },
      //         scrollTrigger: {
      //           trigger: sectionRef.current,
      //           start: "top 80%",
      //           once: true,
      //         },
      //         delay: index * 0.15,
      //       },
      //     );
      //   });

      // Fade in the labels and containers
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-20 bg-[#1C5244] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center opacity-0">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8AB1D] mb-2">
                {stat.prefix && <span>{stat.prefix}</span>}
                {/* <span className="stat-counter" data-value={stat.numericValue}>
                  0
                </span> */}
                <AnimatedCounter targetValue={stat.numericValue} />
                {stat.suffix && (
                  <span className="text-3xl lg:text-4xl">{stat.suffix}</span>
                )}
              </div>
              <div className="text-white/80 text-sm sm:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
