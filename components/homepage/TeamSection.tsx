"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  title: string;
  subtitle: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rahul Jain",
    title: "General Partner",
    subtitle: "Global Investor & Tech-Finance Strategist",
    image: "/images/team/Rahul_Jain.jpeg",
  },
  {
    name: "Vivek Modi",
    title: "Director, India",
    subtitle: "Finance & Strategy",
    image: "/images/team/Vivek_Modi.jpeg",
  },
  {
    name: "Jayesh Jesalpura",
    title: "Director, USA",
    subtitle: "Global Investor | Enterprise Transformation Leader",
    image: "/images/team/Jayesh_Jesalpura.jpeg",
  },
  {
    name: "Abhishek Jain",
    title: "Manager, India",
    subtitle: "",
    image: "/images/team/Abhishek_Jain.jpeg",
  }
  // {
  //     name: "Simbarashe Jerahuni",
  //     title: "Director",
  //     subtitle: "",
  //     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  // },
  // {
  //     name: "Vivek Modi",
  //     title: "Director, India",
  //     subtitle: "",
  //     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  // },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play for mobile slider
  useEffect(() => {
    if (isMobile) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isMobile]);

  // Reset auto-play timer on manual navigation
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    }, 4000);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const goToPrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
    );
    resetAutoPlay();
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    resetAutoPlay();
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".team-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
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

  // Team card component - Desktop has hover animation, Mobile shows content always
  const TeamCard = ({
    member,
    index,
    isDesktop = false,
  }: {
    member: TeamMember;
    index: number;
    isDesktop?: boolean;
  }) => (
    <div
      className={`team-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#F8AB1D]/50 transition-all duration-300 ${isDesktop ? "w-full" : "w-70 sm:w-[320px] mx-auto"}`}
    >
      {/* Image */}
      <div className="relative aspect-3/4 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay - Desktop: appears on hover, Mobile: always visible */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent transition-opacity duration-300 ${isDesktop ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
        />

        {/* Content overlay - Desktop: animates in on hover, Mobile: always visible */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 lg:p-5 transition-all duration-300 ${isDesktop
              ? "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              : "translate-y-0 opacity-100"
            }`}
        >
          <h3 className="text-base lg:text-lg font-bold text-white leading-tight">
            {member.name}
          </h3>
          {member.title && (
            <p className="text-[#F8AB1D] text-sm font-medium mt-1">
              {member.title}
            </p>
          )}
          {member.subtitle && (
            <p className="text-white/60 text-xs mt-1 line-clamp-1">
              {member.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="team-header text-center mb-10 lg:mb-14">
          <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Our Team
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm lg:text-base">
            A global team of experts driving investment excellence across
            emerging markets
          </p>
        </div>
      </div>

      {/* Desktop: Static Grid */}
      {!isMobile && (
        <div className="hidden lg:grid grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              index={index}
              isDesktop={true}
            />
          ))}
        </div>
      )}

      {/* Mobile: Auto-playing Slider with Arrows */}
      {isMobile && (
        <div className="lg:hidden relative px-4">
          {/* Slider Container */}
          <div ref={sliderRef} className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="w-full shrink-0 flex justify-center px-4"
                >
                  <TeamCard member={member} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Positioned in middle */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1C5244] hover:bg-[#1C5244]/80 flex items-center justify-center text-white shadow-lg transition-all duration-300"
            aria-label="Previous team member"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1C5244] hover:bg-[#1C5244]/80 flex items-center justify-center text-white shadow-lg transition-all duration-300"
            aria-label="Next team member"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                    ? "bg-[#F8AB1D] w-6"
                    : "bg-white/30 hover:bg-white/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* View All Team Link */}
      <div className="text-center mt-10 lg:mt-14 px-4">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C5244] hover:bg-[#1C5244]/80 text-white font-semibold rounded-full transition-all duration-300 group"
        >
          <span>Meet the Full Team</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
