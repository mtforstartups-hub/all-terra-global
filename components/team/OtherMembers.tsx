"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Vivek Modi",
    title: "Director, India",
    subtitle: "Finance & Strategy",
    image: "/images/team/Vivek_Modi.jpeg",
    bio: [
      "Two decades+ experience across corporate finance, leadership, and governance.",
      "Corporate finance strategy, banking relations, and compliance.",
      "Capital structuring, project finance, and debt management driving sustainable performance.",
    ],
    sectors: [
      "Banking & Financial Institutions",
      "Corporate Finance & Governance",
      "Strategic Performance",
    ],
  },
  {
    name: "Jayesh Jesalpura",
    title: "Director, USA",
    subtitle: "Global Investor | Enterprise Transformation Leader",
    image: "/images/team/Jayesh_Jesalpura.jpeg",
    bio: [
      "Two decades+ experience leading global enterprise transformation across multinational consumer and retail organizations.",
      "Enterprise transformation, financial strategy, and M&A.",
      "Scaling businesses through capital deployment, operational excellence, and valuation growth.",
    ],
    sectors: ["Enterprise Transformation", "Investments & M&A", "Real Estate"],
  },
  {
    name: "Abhishek Jain",
    title: "Manager, India",
    subtitle: "Startup Investments & Deal Execution",
    image: "/images/team/Abhishek_Jain.jpeg",
    bio: [
      "Built and scaled an Angel Network Platform, managing end-to-end investment operations and investor engagement.",
      "Startup investing, deal execution, and investor network management.",
      "Led and closed investment transactions exceeding $10 million across India's startup ecosystem.",
    ],
    sectors: [
      "Startup Investments",
      "Investor Network Development",
      "Strategic Leadership",
    ],
  },
];

export default function OtherMembers() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".member-row");

      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const image = item.querySelector(".gp-image");
        const content = item.querySelector(".gp-content");

        gsap.fromTo(
          image,
          { opacity: 0, x: isEven ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          content,
          { opacity: 0, x: isEven ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              once: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {teamMembers.map((member, index) => {
          const isEven = index % 2 !== 0;

          return (
            <div
              key={member.name}
              className={`member-row grid lg:grid-cols-2 gap-16 items-center`}
            >
              {/* Image Section */}
              <div
                className={`relative gp-image opacity-0 ${!isEven ? "lg:order-last" : ""}`}
              >
                <div className="relative h-[600px] rounded-3xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#F8AB1D]/20 rounded-3xl -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#1C5244]/20 rounded-3xl -z-10" />
              </div>

              {/* Content Section */}
              <div className="gp-content opacity-0">
                <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
                  {member.title}
                </span>
                <h2 className="text-4xl font-bold text-[#333333] mt-2 mb-2">
                  {member.name}
                </h2>
                <p className="text-[#1C5244] font-medium text-lg mb-6">
                  {member.subtitle}
                </p>

                <ul className="space-y-4 mb-8">
                  {member.bio.map((item, bioIndex) => (
                    <li
                      key={bioIndex}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <svg
                        className="w-6 h-6 text-[#1C5244] mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-3">
                    Key Sectors / Focus Areas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.sectors.map((sector, sectorIndex) => (
                      <span
                        key={sectorIndex}
                        className="px-4 py-2 bg-[#1C5244]/10 text-[#1C5244] rounded-full text-sm font-medium"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#F8AB1D] text-[#333333] px-6 py-3 rounded-xl font-semibold hover:bg-[#d99310] transition-all hover:-translate-y-1"
                >
                  Connect with {member.name.split(" ")[0]}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
