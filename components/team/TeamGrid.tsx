"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
    // {
    //     name: "Michael Masimba",
    //     title: "Manager",
    //     location: "Zimbabwe",
    //     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    // },
    // {
    //     name: "Allen Daura",
    //     title: "Manager",
    //     location: "Zimbabwe",
    //     image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    // },
    {
        name: "Abhishek Jain",
        title: "Associate",
        location: "Dubai",
        image: "/images/team/Abhishek_Jain.png",
    },
];

export default function TeamGrid() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".team-card",
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
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
                        Operations Team
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mt-3">
                        Management & Associates
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl mx-auto">
                    {team.map((member) => (
                        <div
                            key={member.name}
                            className="group text-center team-card opacity-0"
                        >
                            <div className="relative h-56 w-56 mx-auto rounded-full overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <h4 className="font-bold text-[#333333] text-lg mb-1">
                                {member.name}
                            </h4>
                            <p className="text-[#1C5244] font-medium text-sm mb-1">{member.title}</p>
                            <p className="text-gray-500 text-sm">{member.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
