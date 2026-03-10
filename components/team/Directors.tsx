"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const directors = [
    {
        name: "Jayesh Jesalpura",
        title: "Director",
        location: "USA",
        image: "/images/team/Jayesh_Jesalpura.png",
        expertise: "International Finance",
        bio: "Extensive experience in cross-border investment structures and US-Africa capital flows",
    },
    {
        name: "Vivek Modi",
        title: "Director",
        location: "India",
        image: "/images/team/Vivek_Modi.png",
        expertise: "Technology & Analytics",
        bio: "Technology strategist with deep expertise in fintech and data-driven investment analysis",
    },
];

export default function Directors() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".director-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
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
        <section ref={containerRef} className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
                        Board of Directors
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mt-3">
                        Executive Directors
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 place-items-center">
                    {directors.map((director) => (
                        <div key={director.name} className="max-w-sm bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group director-card opacity-0">
                            <div className="relative h-[500px] overflow-hidden">
                                <Image
                                    src={director.image}
                                    alt={director.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <span className="px-3 py-1 bg-[#F8AB1D] text-[#333333] rounded-full text-xs font-bold">
                                        {director.location}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#333333] mb-1">{director.name}</h3>
                                <p className="text-[#1C5244] font-medium mb-1">{director.title}</p>
                                <p className="text-sm text-gray-500 mb-4">{director.expertise}</p>
                                <p className="text-gray-600 text-sm">{director.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
