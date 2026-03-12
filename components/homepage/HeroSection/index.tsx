"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Workaround for React's known bug where the `muted` prop is not forwarded
  // to the DOM element during SSR, causing browsers to block autoplay.
  // We directly set the property and call .play() as a fallback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch((error) => {
      // Autoplay was blocked even after muting — nothing we can do without a user gesture.
      console.error("Video autoplay failed:", error);
    });
  }, []);

  const heroImages = [
    {
      src: "/images/hero-right-img1.jpeg",
      alt: "Gold mining operation",
      number: "01",
      parallaxSpeed: 100, // Moves slower
    },
    {
      src: "https://images.unsplash.com/photo-1711012604128-8339024a3e12?auto=format&fit=crop&w=800&q=80",
      alt: "Mining equipment",
      number: "02",
      parallaxSpeed: 150, // Moves medium
    },
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      alt: "Modern buildings",
      number: "03",
      parallaxSpeed: 200, // Moves faster
    },
  ];

  useGSAP(
    () => {
      // Register timeline for entry animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Text lines reveal animation
      tl.to(".text-line span", {
        y: "0%",
        duration: 1.2,
        stagger: 0.15,
      })
        // 2. Subtitle and CTA fade in
        .to(
          [".hero-subtitle", ".hero-cta", ".hero-stats"],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
          },
          "<0.5",
        )
        // 3. Sector tags slide in
        .to(
          ".sector-tag",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "<0.3",
        )
        // 4. Image clip-path reveal
        .to(
          ".img-wrapper",
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.inOut",
          },
          "-=1",
        )
        // 5. Image zoom out and color fade
        .to(
          ".img-inner",
          {
            scale: 1,
            filter: "grayscale(0%)",
            duration: 1.8,
            stagger: 0.2,
          },
          "<",
        );
      // 6. Image numbers fade in
      // .to(
      //   ".img-number",
      //   {
      //     opacity: 1,
      //     duration: 0.5,
      //     stagger: 0.1,
      //   },
      //   "-=0.5",
      // );

      // Animate stat counters after stats become visible
      const statCounters =
        gsap.utils.toArray<HTMLElement>(".hero-stat-counter");
      statCounters.forEach((counter, index) => {
        const targetValue = parseFloat(counter.dataset.value || "0");
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            delay: 1.5 + index * 0.2,
          },
        );
      });

      // PARALLAX SCROLL EFFECTS
      // Text content moves up slower (creates depth)
      gsap.to(".hero-text-content", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Images move at different speeds (parallax layers)
      const parallaxImages = gsap.utils.toArray<HTMLElement>(".parallax-img");
      parallaxImages.forEach((img, index) => {
        const speed = (index + 1) * 50; // 50, 100, 150
        gsap.to(img, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Particles float at different speeds
      gsap.to(".parallax-particle-slow", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".parallax-particle-fast", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background gradient parallax
      gsap.to(".parallax-bg", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fade out hero content as you scroll
      gsap.to(".hero-fade-out", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Video Layer */}
      <div className="parallax-bg absolute inset-0">

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-video-poster.webp"
        >
          <source src="/compressed_videos/finance-hero_compressed.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Gradient overlay for additional depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C5244]/40 via-transparent to-[#333333]/30 z-10" />
      </div>

      {/* Animated Particles with Parallax */}
      <div className="absolute inset-0 opacity-30 z-10 pointer-events-none">
        <div className="parallax-particle-slow absolute top-1/4 left-1/4 w-3 h-3 bg-[#F8AB1D] rounded-full animate-pulse" />
        <div
          className="parallax-particle-fast absolute top-1/3 right-1/3 w-4 h-4 bg-[#F8AB1D] rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="parallax-particle-slow absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#1C5244] rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="parallax-particle-fast absolute bottom-1/3 right-1/4 w-5 h-5 bg-[#1C5244] rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Content */}
      <div className="hero-fade-out relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Text Section */}
          <div className="hero-text-content flex-1 lg:max-w-[50%]">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8 hero-subtitle opacity-0 translate-y-5">
              <span className="w-2 h-2 bg-[#F8AB1D] rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">
                Alternative Investment & Financing
              </span>
            </div> */}

            {/* Main Heading with Text Reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4.5vw] font-bold leading-[1.1] tracking-tight mb-8">
              <div className="text-line overflow-hidden relative block">
                <span className="block translate-y-full text-white">
                  Structured
                </span>
              </div>
              <div className="text-line overflow-hidden relative block">
                <span className="block translate-y-full text-white">
                  Private Credit
                </span>
              </div>
              <div className="text-line overflow-hidden relative block">
                <span className="block translate-y-full text-[#F8AB1D]">
                  For Africa
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg sm:text-xl text-white/70 max-w-md mb-8 leading-relaxed opacity-0 translate-y-5">
              Deploying structured capital into asset-backed, high-yield
              opportunities in Zimbabwe and beyond.
            </p>

            {/* Sector Tags */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                "Mining",
                "Real Estate",
                "Vendor Financing",
                "Micro Financing",
              ].map((sector) => (
                <span
                  key={sector}
                  className="sector-tag px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-sm font-medium hover:bg-white/10 hover:border-[#F8AB1D]/50 transition-all cursor-default opacity-0 translate-y-5"
                >
                  {sector}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-12 opacity-0 translate-y-5">
              <Link
                href="/opportunities"
                className="group bg-[#F8AB1D] text-[#333333] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#d99310] transition-all hover:-translate-y-1 shadow-lg hover:shadow-[#F8AB1D]/30 flex items-center justify-center gap-2"
              >
                Explore Opportunities
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              {/* <Link
                href="/about"
                className="group border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 hover:border-white/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Learn More
              </Link> */}
            </div>
          </div>

          {/* Image Gallery Section */}
          <div className="flex-1 lg:max-w-[45%] w-full">
            <div className="grid grid-cols-3 gap-4 lg:gap-5 h-[50vh] lg:h-[60vh]">
              {heroImages.map((img, index) => (
                <div
                  key={img.number}
                  className="parallax-img img-wrapper relative w-full h-full overflow-hidden rounded-2xl"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                    marginTop:
                      index === 1 ? "40px" : index === 2 ? "80px" : "0",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="img-inner object-cover scale-[1.6] grayscale"
                    style={{ filter: "grayscale(100%)" }}
                    quality={60}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1C5244]/40 to-transparent" />
                  {/* <span className="img-number absolute bottom-3 left-3 text-white/80 text-sm font-medium opacity-0">
                    {img.number}
                  </span> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <svg
          className="w-6 h-6 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>


    </section>
  );
}
