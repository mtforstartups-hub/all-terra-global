"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalPresence() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Global Reach
      gsap.fromTo(
        ".reach-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".reach-section",
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
        <div className="text-center mb-16">
          <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
            Global Reach
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-3 mb-6">
            Our Presence
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              location: "Dubai, UAE",
              role: "Global HQ & Investor Relations",
              image:
                "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
            },
            {
              location: "Harare, Zimbabwe",
              role: "Operations & Deal Execution",
              image:
                "https://images.unsplash.com/photo-1650357519740-c888919621f8?auto=format&fit=crop&w=600&q=80",
            },
            {
              location: "New York, USA",
              role: "Technology & Analytics",
              image:
                "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=600&q=80",
            },
            {
              location: "Mumbai, India",
              role: "Technology & Analytics",
              image:
                "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=600&q=80",
            },
          ].map((office) => (
            <div
              key={office.location}
              className="group relative overflow-hidden rounded-3xl h-80 reach-card opacity-0"
            >
              <Image
                src={office.image}
                alt={office.location}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {office.location}
                </h3>
                {/* <p className="text-white/80">{office.role}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
