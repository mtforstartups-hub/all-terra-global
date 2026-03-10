"use client"

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const edges = [
    {
        title: "On-ground Presence",
        description: "Local teams in Zimbabwe ensuring real-time deal sourcing and execution",
    },
    {
        title: "Credible Partnerships",
        description: "Institutional relationships with key players across sectors",
    },
    {
        title: "Secured Exposure",
        description: "Focus on collateral-backed investments with tangible assets",
    },
    {
        title: "Watertight Structuring",
        description: "Sophisticated deal structures that protect investor capital",
    },
    {
        title: "Due Diligence",
        description: "Independent verification and comprehensive risk assessment",
    },
    {
        title: "Collateral Backed",
        description: "First charge over assets, equipment, and cashflows",
    },
    {
        title: "Insurance Protected",
        description: "Credit insurance covering interest and principal repayment",
    },
    {
        title: "Curated Access",
        description: "Off-market, relationship-led deal flow unavailable elsewhere",
    },
];

const AllTerrasEdge = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Autoplay logic
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % edges.length);
        }, 3500); // Slightly slower (3.5s) to allow reading the text

        return () => clearInterval(timer);
    }, [activeIndex]);

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section className="py-20 bg-gray-50 overflow-hidden font-sans">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center px-4 mb-16">
                <h4 className="text-[#f8ab1d] font-bold uppercase tracking-widest text-sm mb-3">
                    Why Choose Us
                </h4>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#1c5244] mb-6">
                    All Terra's Edge
                </h2>
                <p className="text-[#333333] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    We tap into Zimbabwe's vast potential through our unique advantages that set us apart from traditional investment approaches.
                </p>
            </div>

            {/* Symmetric 3D Carousel */}
            <div className="relative w-full h-[400px] flex justify-center items-center perspective-1000">
                {edges.map((edge, index) => {
                    // Calculate relative position to the active card
                    const total = edges.length;
                    const relativeIndex = (index - activeIndex + total) % total;

                    let animateProps: { x: number; scale: number; zIndex: number; opacity: number } = { x: 0, scale: 0.5, zIndex: 0, opacity: 0 };

                    // Symmetric positioning logic
                    if (relativeIndex === 0) {
                        // Center (Active)
                        animateProps = { x: 0, scale: 1, zIndex: 40, opacity: 1 };
                    } else if (relativeIndex === 1) {
                        // Right 1
                        animateProps = { x: 180, scale: 0.85, zIndex: 30, opacity: 0.8 };
                    } else if (relativeIndex === total - 1) {
                        // Left 1
                        animateProps = { x: -180, scale: 0.85, zIndex: 30, opacity: 0.8 };
                    } else if (relativeIndex === 2) {
                        // Right 2
                        animateProps = { x: 320, scale: 0.7, zIndex: 20, opacity: 0.4 };
                    } else if (relativeIndex === total - 2) {
                        // Left 2
                        animateProps = { x: -320, scale: 0.7, zIndex: 20, opacity: 0.4 };
                    }
                    // else: keeps the default values (hidden in the back center)

                    return (
                        <motion.div
                            key={index}
                            className="absolute w-72 h-80 rounded-2xl shadow-2xl cursor-pointer p-8 flex flex-col justify-center text-center border-t-4 border-[#f8ab1d] bg-[#1c5244]"
                            initial={false}
                            animate={animateProps}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 25,
                                mass: 1,
                            }}
                            onClick={() => handleCardClick(index)}
                            whileHover={{
                                scale: relativeIndex === 0 ? 1.02 : animateProps.scale + 0.05
                            }}
                        >
                            <h3 className="text-[#f8ab1d] text-2xl font-bold mb-4 leading-tight">
                                {edge.title}
                            </h3>
                            <p className="text-white/90 text-sm leading-relaxed">
                                {edge.description}
                            </p>

                            {/* Subtle background decorative element */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default AllTerrasEdge;