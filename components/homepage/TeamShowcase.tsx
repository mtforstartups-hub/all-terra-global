"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
    id: number;
    name: string;
    title: string;
    subtitle: string;
    image: string;
    location: string;
    bio: string[];
    achievements: Achievement[];
    sectors: string[];
}

interface Achievement {
    icon: React.ReactNode;
    value: string;
    label: string;
}

export default function TeamShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showNav, setShowNav] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const teamMembers: TeamMember[] = [
        {
            id: 1,
            name: "Rahul Jain",
            title: "General Partner",
            subtitle: "Global Investor & Tech-Finance Strategist",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
            location: "Dubai",
            bio: [
                "Multidisciplinary leader bridging data-driven technology and high-impact financial decision-making across global markets.",
                "Over two decades of experience with Fortune 500 companies and large conglomerates in technology and finance sectors.",
                "Core competencies span investment analysis, systems architecture, digital transformation, and strategic capital deployment.",
                "Led global capital deployment initiatives with portfolio valuation exceeding $15 million across emerging markets.",
            ],
            achievements: [
                {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    value: "$15M+",
                    label: "Portfolio Value",
                },
                {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                    value: "20+",
                    label: "Years Experience",
                },
                {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>,
                    value: "5+",
                    label: "Countries",
                },
            ],
            sectors: ["Agribusiness", "Mining & Resources", "Real Estate", "Trade Finance"],
        },
        {
            id: 2,
            name: "Jayesh Jesalpura",
            title: "Director",
            subtitle: "US Operations & Investor Relations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
            location: "USA",
            bio: [
                "Leads US-based investor relations and strategic partnerships, bringing deep expertise in capital markets.",
                "Extensive background in financial services and cross-border investment structuring.",
                "Key liaison between North American investors and African market opportunities.",
                "Track record of building lasting relationships with family offices and institutional investors.",
            ],
            achievements: [
                {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                    value: "50+",
                    label: "Investors Onboarded",
                },
                {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    value: "100%",
                    label: "Client Retention",
                },
                {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
                    value: "15+",
                    label: "Years in Finance",
                },
            ],
            sectors: ["Capital Markets", "Investor Relations", "Strategy"],
        },
        {
            id: 3,
            name: "Simbarashe Jerahuni",
            title: "Director",
            subtitle: "Zimbabwe Operations Lead",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
            location: "Zimbabwe",
            bio: [
                "Leads on-ground operations in Zimbabwe, managing local partnerships and project execution.",
                "Deep understanding of Zimbabwe's regulatory landscape, mining sector, and real estate market.",
                "Builds and maintains relationships with local stakeholders, government entities, and project partners.",
                "Ensures compliance with local regulations and oversees due diligence processes.",
            ],
            achievements: [
                {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                    value: "12+",
                    label: "Projects Managed",
                },
                {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>,
                    value: "Local",
                    label: "On-Ground Presence",
                },
                {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                    value: "100%",
                    label: "Compliance Rate",
                },
            ],
            sectors: ["Mining", "Real Estate", "Regulatory Compliance"],
        },
    ];

    useGSAP(
        () => {
            // Use matchMedia to handle desktop vs mobile differently
            const mm = gsap.matchMedia();

            // Desktop: Full pinned experience
            mm.add("(min-width: 1024px)", () => {
                teamMembers.forEach((member, memberIndex) => {
                    // Pin each member section
                    ScrollTrigger.create({
                        trigger: `.member-section-${member.id}`,
                        start: "top top",
                        end: "+=150%",
                        pin: true,
                        scrub: 0.5,
                        onEnter: () => {
                            setActiveIndex(memberIndex);
                            setShowNav(true);
                        },
                        onLeave: () => {
                            // Only hide if it's the last member
                            if (memberIndex === teamMembers.length - 1) {
                                setShowNav(false);
                            }
                        },
                        onEnterBack: () => {
                            setActiveIndex(memberIndex);
                            setShowNav(true);
                        },
                        onLeaveBack: () => {
                            // Only hide if it's the first member
                            if (memberIndex === 0) {
                                setShowNav(false);
                            }
                        },
                    });

                    // Create a timeline for content animations
                    const contentTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: `.member-section-${member.id}`,
                            start: "top top",
                            end: "+=150%",
                            scrub: 0.5,
                        },
                    });

                    // Animate bio items staggered
                    contentTl.fromTo(
                        `.member-${member.id} .bio-item`,
                        { opacity: 0, x: 60 },
                        { opacity: 1, x: 0, stagger: 0.15, duration: 0.3 },
                        0
                    );

                    // Animate achievement cards
                    contentTl.fromTo(
                        `.member-${member.id} .achievement-card`,
                        { opacity: 0, y: 40, scale: 0.8 },
                        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.3 },
                        0.4
                    );

                    // Animate sectors
                    contentTl.fromTo(
                        `.member-${member.id} .sectors-container`,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.3 },
                        0.7
                    );
                });

                return () => {
                    // Cleanup when breakpoint changes
                    ScrollTrigger.getAll().forEach(st => st.kill());
                };
            });

            // Mobile/Tablet: Simple scroll-triggered fade in (no pinning)
            mm.add("(max-width: 1023px)", () => {
                teamMembers.forEach((member) => {
                    // Simple fade in when section enters viewport
                    gsap.fromTo(
                        `.member-${member.id} .bio-item`,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            stagger: 0.1,
                            duration: 0.6,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: `.member-section-${member.id}`,
                                start: "top 80%",
                                once: true,
                            },
                        }
                    );

                    gsap.fromTo(
                        `.member-${member.id} .achievement-card`,
                        { opacity: 0, y: 20, scale: 0.9 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            stagger: 0.1,
                            duration: 0.5,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: `.member-section-${member.id}`,
                                start: "top 60%",
                                once: true,
                            },
                        }
                    );

                    gsap.fromTo(
                        `.member-${member.id} .sectors-container`,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: `.member-section-${member.id}`,
                                start: "top 50%",
                                once: true,
                            },
                        }
                    );
                });

                return () => {
                    ScrollTrigger.getAll().forEach(st => st.kill());
                };
            });

            return () => {
                mm.revert();
            };
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section ref={sectionRef} className="bg-[#0a0a0a]">
            {/* Fixed Navigation Dots - Desktop only, visible when section in view */}
            {showNav && (
                <div className="hidden lg:flex fixed top-1/2 right-8 -translate-y-1/2 z-50 flex-col gap-3 animate-fade-in">
                    {teamMembers.map((member, index) => (
                        <button
                            key={member.id}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index
                                ? "bg-[#F8AB1D] scale-150"
                                : "bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={`View ${member.name}`}
                        />
                    ))}
                </div>
            )}

            {/* Section Header */}
            <div className="py-16 lg:py-24 text-center px-4">
                <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
                    Our People
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
                    Meet The Team
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto text-sm lg:text-base">
                    {isMobile
                        ? "Our leadership team brings decades of combined experience"
                        : "Scroll to explore our leadership team's backgrounds and achievements"
                    }
                </p>
            </div>

            {/* Team Member Sections */}
            {teamMembers.map((member) => (
                <div
                    key={member.id}
                    className={`member-section-${member.id} ${isMobile ? 'py-12' : 'min-h-screen'} relative`}
                >
                    <div className={`${isMobile ? '' : 'h-screen'} flex items-center`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            {/* Mobile: Stacked layout */}
                            {/* Desktop: Side-by-side grid */}
                            <div className={`member-${member.id} flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center`}>

                                {/* Photo */}
                                <div className="relative w-full">
                                    <div className="relative aspect-[4/3] lg:aspect-[3/4] lg:max-h-[70vh] rounded-2xl lg:rounded-3xl overflow-hidden">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

                                        {/* Name and title overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
                                            <span className="px-2 py-1 lg:px-3 bg-[#F8AB1D] text-[#333333] rounded-full text-xs lg:text-sm font-bold">
                                                {member.location}
                                            </span>
                                            <h3 className="text-2xl lg:text-4xl font-bold text-white mt-2 lg:mt-4">
                                                {member.name}
                                            </h3>
                                            <p className="text-[#F8AB1D] font-medium text-sm lg:text-base mt-1">{member.title}</p>
                                            <p className="text-white/70 text-xs lg:text-sm mt-1">{member.subtitle}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 lg:space-y-6 w-full">
                                    {/* Bio Items */}
                                    <div className="space-y-2 lg:space-y-3">
                                        {member.bio.map((item, index) => (
                                            <div
                                                key={index}
                                                className="bio-item opacity-0 flex items-start gap-3 lg:gap-4 p-3 lg:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                                            >
                                                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[#1C5244] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-white font-bold text-xs lg:text-sm">{index + 1}</span>
                                                </div>
                                                <p className="text-white/80 leading-relaxed text-xs lg:text-sm">{item}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Achievements */}
                                    <div className="grid grid-cols-3 gap-2 lg:gap-3">
                                        {member.achievements.map((achievement, index) => (
                                            <div
                                                key={index}
                                                className="achievement-card opacity-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl lg:rounded-2xl p-2 lg:p-4 text-center"
                                            >
                                                <div className="w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-1 lg:mb-2 rounded-full bg-[#F8AB1D]/20 flex items-center justify-center text-[#F8AB1D]">
                                                    {achievement.icon}
                                                </div>
                                                <div className="text-base lg:text-2xl font-bold text-[#F8AB1D]">{achievement.value}</div>
                                                <div className="text-white/50 text-[10px] lg:text-xs mt-0.5 lg:mt-1">{achievement.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Sectors */}
                                    <div className="sectors-container opacity-0">
                                        <p className="text-white/50 text-xs lg:text-sm mb-2 lg:mb-3">Key Sectors:</p>
                                        <div className="flex flex-wrap gap-1.5 lg:gap-2">
                                            {member.sectors.map((sector) => (
                                                <span
                                                    key={sector}
                                                    className="px-2 lg:px-4 py-1 lg:py-2 bg-[#1C5244]/30 text-white/80 border border-[#1C5244]/50 rounded-full text-xs lg:text-sm font-medium"
                                                >
                                                    {sector}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
