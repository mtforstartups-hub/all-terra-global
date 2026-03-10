"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
    label: string;
    title: string;
    description: string;
    backgroundImage: string;
    imageAlt: string;
}

export default function PageHero({
    label,
    title,
    description,
    backgroundImage,
    imageAlt,
}: PageHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Hero Text Reveal
            const tl = gsap.timeline();
            tl.fromTo(
                ".hero-text",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                },
            );

            // Hero Parallax
            gsap.to(".hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <section
            ref={containerRef}
            className="hero-section relative pt-32 pb-20 overflow-hidden h-[60vh] flex items-center"
        >
            <div className="absolute inset-0 z-0 hero-bg">
                <Image
                    src={backgroundImage}
                    alt={imageAlt}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1C5244]/95 to-[#333333]/90" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                    <span className="hero-text opacity-0 text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider block">
                        {label}
                    </span>
                    <h1 className="hero-text opacity-0 text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                        {title}
                    </h1>
                    <p className="hero-text opacity-0 text-xl text-white/80 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}
