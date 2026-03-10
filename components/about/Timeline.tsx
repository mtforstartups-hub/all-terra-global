"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Timeline Line
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 60%",
            once: true,
          },
        },
      );

      // Timeline Items
      const timelineItems = gsap.utils.toArray<HTMLElement>(".timeline-item");
      timelineItems.forEach((item, i) => {
        const isLeft = item.classList.contains("timeline-item-left");
        gsap.fromTo(
          item,
          { opacity: 0, x: isLeft ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              once: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );
  const milestones = [
    {
      year: "2020",
      title: "Foundation",
      description: "All Terra established with focus on African markets",
    },
    {
      year: "2021",
      title: "First Investments",
      description: "Initial deployment into Zimbabwe mining sector",
    },
    {
      year: "2022",
      title: "Dubai Operations",
      description: "Established UAE jurisdiction for investor protection",
    },
    {
      year: "2023",
      title: "Portfolio Growth",
      description: "Expanded into real estate and vendor financing",
    },
    {
      year: "2024",
      title: "$15M+ Portfolio",
      description: "Reached significant portfolio valuation milestone",
    },
  ];
  return (
    <section ref={containerRef} className="py-24 bg-secondary timeline-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Key Milestones
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#1C5244] timeline-line origin-top" />

          <div className="space-y-12 lg:space-y-0">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`lg:flex items-center timeline-item opacity-0 ${
                  index % 2 === 0
                    ? "lg:flex-row timeline-item-left"
                    : "lg:flex-row-reverse timeline-item-right"
                }`}
              >
                <div
                  className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <span className="text-[#F8AB1D] font-bold text-2xl">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-white/70">{milestone.description}</p>
                  </div>
                </div>
                <div className="hidden lg:flex w-12 h-12 rounded-full bg-[#1C5244] border-4 border-secondary items-center justify-center absolute left-1/2 -translate-x-1/2">
                  <div className="w-3 h-3 rounded-full bg-[#F8AB1D]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
