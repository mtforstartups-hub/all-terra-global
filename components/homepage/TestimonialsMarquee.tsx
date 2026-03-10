"use client";

import { useRef } from "react";
import Image from "next/image";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    image?: string;
}

interface PressLogo {
    name: string;
    logo: string;
}

export default function TestimonialsMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    const testimonials: Testimonial[] = [
        {
            quote: "All Terra has consistently delivered on their promise of structured, secure returns. Their understanding of the Zimbabwe market is unparalleled.",
            author: "Michael Chen",
            role: "Managing Partner",
            company: "Pacific Capital Partners",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        },
        {
            quote: "The due diligence process gave us complete confidence. Every investment is backed by tangible assets and robust legal structures.",
            author: "Sarah Al-Rashid",
            role: "Investment Director",
            company: "Gulf Wealth Management",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        },
        {
            quote: "What sets All Terra apart is their on-ground presence. They don't just invest — they actively manage and monitor every project.",
            author: "David Okonkwo",
            role: "CEO",
            company: "Pan-African Investment Group",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        },
        {
            quote: "The 13-20% returns in USD with full repatriation capability — it's a game-changer for portfolio diversification.",
            author: "Priya Sharma",
            role: "Chief Investment Officer",
            company: "Horizon Asset Management",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
        },
        {
            quote: "Their UAE-based structure provides the perfect balance of access to African opportunities with international legal protection.",
            author: "James Richardson",
            role: "Family Office Principal",
            company: "Richardson Holdings",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        },
    ];

    const pressLogos: PressLogo[] = [
        { name: "Bloomberg", logo: "/press/bloomberg.svg" },
        { name: "Reuters", logo: "/press/reuters.svg" },
        { name: "Financial Times", logo: "/press/ft.svg" },
        { name: "CNBC Africa", logo: "/press/cnbc.svg" },
        { name: "The Economist", logo: "/press/economist.svg" },
    ];

    // Duplicate testimonials for seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-24 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center">
                    {/* <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
                        Trusted By Investors
                    </span> */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
                        Trusted By Investors
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Join a growing network of sophisticated investors accessing Africa&apos;s most promising opportunities
                    </p>
                </div>
            </div>
            {/* Embedded keyframes for marquee animation */}
            {/* <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .marquee-track {
                    animation: marquee 40s linear infinite;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center">
                    <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
                        Trusted By Investors
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
                        What Our Partners Say
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Join a growing network of sophisticated investors accessing Africa&apos;s most promising opportunities
                    </p>
                </div>
            </div>

            <div
                ref={marqueeRef}
                className="relative group"
            >
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                <div className="marquee-track flex gap-8">
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <div
                            key={`${testimonial.author}-${index}`}
                            className="flex-shrink-0 w-[400px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#F8AB1D]/30 transition-all duration-300"
                        >
                            <svg
                                className="w-10 h-10 text-[#F8AB1D]/30 mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>

                            <p className="text-white/80 leading-relaxed mb-6">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#1C5244]">
                                    {testimonial.image ? (
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.author}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white font-bold">
                                            {testimonial.author.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="text-white font-semibold">{testimonial.author}</div>
                                    <div className="text-white/50 text-sm">
                                        {testimonial.role}, {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Press Logos */}
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="text-center mb-10">
                    <span className="text-white/40 text-sm uppercase tracking-wider">
                        Featured In
                    </span>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-12">
                    {pressLogos.map((press) => (
                        <div
                            key={press.name}
                            className="text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                        >
                            <span className="text-2xl font-bold tracking-tight">{press.name}</span>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Stats Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#F8AB1D]">$15M+</div>
                        <div className="text-white/50 text-sm mt-1">Capital Deployed</div>
                    </div>
                    {/* <div className="text-center">
                        <div className="text-4xl font-bold text-[#F8AB1D]">50+</div>
                        <div className="text-white/50 text-sm mt-1">Active Investors</div>
                    </div> */}
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#F8AB1D]">100%</div>
                        <div className="text-white/50 text-sm mt-1">Repayment Track Record</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#F8AB1D]">0</div>
                        <div className="text-white/50 text-sm mt-1">Defaults to Date</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
