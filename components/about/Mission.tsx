"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Mission Stats
      gsap.fromTo(
        ".mission-stat",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".mission-stat",
            start: "top 80%",
            once: true,
          },
        },
      );

      // Mission Grid Images
      gsap.fromTo(
        ".mission-image",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mission-grid",
            start: "top 70%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );
  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-3 mb-6">
              Unlocking Value Where Others See Risk
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Africa faces a structural capital gap across MSMEs, mining, land,
              and real estate. Local banks lend at 30–40%+ USD, or avoid SMEs
              entirely. Businesses are cash generating but under-capitalised.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We bridge this gap by providing structured financing solutions
              with proper risk assessment, collateral backing, and insurance
              protection – creating win-win outcomes for investors and local
              businesses alike.
            </p>
            <div className="flex gap-4">
              <div className="text-center mission-stat opacity-0">
                <div className="text-4xl font-bold text-[#1C5244]">$15M+</div>
                <div className="text-gray-500 text-sm">Portfolio Value</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center mission-stat opacity-0">
                <div className="text-4xl font-bold text-[#1C5244]">5+</div>
                <div className="text-gray-500 text-sm">Countries</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center mission-stat opacity-0">
                <div className="text-4xl font-bold text-[#1C5244]">20+</div>
                <div className="text-gray-500 text-sm">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4 mission-grid">
            <div className="relative h-48 rounded-2xl overflow-hidden mission-image opacity-0">
              <Image
                src="/images/about/mining.jpg"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden mt-8 mission-image opacity-0">
              <Image
                alt="Business meeting"
                src="/images/about/vendor.webp"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden -mt-8 mission-image opacity-0">
              <Image
                src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=400&q=80"
                alt="Mining site"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden mission-image opacity-0">
              <Image
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=400&q=80"
                alt="Office building"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
