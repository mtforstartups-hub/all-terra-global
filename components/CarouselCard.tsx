"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CarouselCardProps<T> {
    title: string;
    accentColor: string; // Hex code for the dot and progress bar
    items: T[];
    delay?: number; // Optional start delay
    renderItem: (item: T) => React.ReactNode; // Function to render slide content
}

export function CarouselCard<T>({
    title,
    accentColor,
    items,
    delay = 0,
    renderItem,
}: CarouselCardProps<T>) {
    // Refs specific to this single card instance
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const progressBar = progressRef.current;
        const wrapper = wrapperRef.current;

        if (!container || !progressBar || !wrapper || items.length === 0) return;

        const slides = gsap.utils.toArray<HTMLElement>(container.children);
        const totalSlides = slides.length;
        const stayDuration = 3.5;

        // 1. Master Timeline (Slide Transitions)
        const masterTl = gsap.timeline({
            repeat: -1,
            delay: delay, // Apply the delay specific to this card
        });

        slides.forEach((slide) => {
            const tl = gsap.timeline();

            // Reset position
            tl.set(slide, { xPercent: 50, autoAlpha: 0 });

            // Animate In
            tl.to(slide, {
                xPercent: 0,
                autoAlpha: 1,
                duration: 0.6,
                ease: "power2.out",
            });

            // Stay
            tl.to(slide, { xPercent: 0, duration: stayDuration });

            // Animate Out
            tl.to(slide, {
                xPercent: -50,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.in",
            });

            masterTl.add(tl);
        });

        // 2. Progress Bar Animation
        const oneCycleDuration = (1.2 + stayDuration) * totalSlides;
        const progressTween = gsap.fromTo(
            progressBar,
            { width: "0%" },
            {
                width: "100%",
                duration: oneCycleDuration,
                ease: "none",
                repeat: -1,
                delay: delay, // Sync with master timeline
            }
        );

        // 3. Hover Interaction
        const handleMouseEnter = () => {
            masterTl.pause();
            progressTween.pause();
            gsap.to(wrapper, { scale: 1.02, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            masterTl.play();
            progressTween.play();
            gsap.to(wrapper, { scale: 1, duration: 0.3 });
        };

        wrapper.addEventListener("mouseenter", handleMouseEnter);
        wrapper.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            wrapper.removeEventListener("mouseenter", handleMouseEnter);
            wrapper.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: wrapperRef, dependencies: [items, delay] });

    return (
        <div ref={wrapperRef} className="relative group cursor-pointer">
            {/* Header */}
            <h3 className="text-xl font-semibold text-[#333333] mb-4 flex items-center gap-3">
                <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: accentColor }}
                ></span>
                {title}
            </h3>

            {/* Card Body */}
            <div
                className="w-full h-36 relative overflow-hidden bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg"
                style={{
                    borderColor: "inherit", // Will be overridden by hover
                    maskImage:
                        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
            >
                {/* Hover Border Effect (Manual style to use dynamic color) */}
                <div
                    className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
                    style={{ borderColor: accentColor }}
                />

                {/* Content Container */}
                <div
                    ref={containerRef}
                    className="w-full h-full p-6 grid"
                    style={{ gridTemplateAreas: '"stack"' }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="w-full flex flex-col items-center justify-center text-center"
                            style={{
                                gridArea: "stack",
                                opacity: 0,
                                visibility: "hidden",
                            }}
                        >
                            {/* Render the custom content for this slide */}
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 mt-3 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full w-0 rounded-full"
                    style={{ backgroundColor: accentColor }}
                ></div>
            </div>
        </div>
    );
}