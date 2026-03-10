"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface MineralData {
  name: string;
  description: string;
}

interface EconomicPoint {
  title: string;
  numericValue: number;
  suffix: string;
  description: string;
}

const mineralData: MineralData[] = [
  {
    name: "Gold",
    description: "Highest gold reserve density globally (4,000+ deposits)",
  },
  {
    name: "Platinum (PGMs)",
    description: "#3 globally by production (~8% of global supply)",
  },
  {
    name: "Lithium",
    description: "Largest reserves in Africa; top 5–7 globally for EV batteries",
  },
  {
    name: "Chrome",
    description: "2nd largest high-grade chrome reserves worldwide",
  },
];

const economicPoints: EconomicPoint[] = [
  {
    title: "High GDP Growth",
    numericValue: 6.6,
    suffix: "%",
    description: "Among the highest growing countries of Africa",
  },
  {
    title: "Real Estate Boom",
    numericValue: 80,
    suffix: "%+",
    description: "Harare home prices growth over 5 years",
  },
  {
    title: "Macroeconomic Stability",
    numericValue: 4,
    suffix: "-5%",
    description: "Cooling inflation and tighter fiscal discipline",
  },
  {
    title: "Export Growth Momentum",
    numericValue: 2,
    suffix: "-3x",
    description: "Doubled over recent years, driven by increased global demand",
  },
];

export default function WhyZimbabwe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mineralContainerRef = useRef<HTMLDivElement>(null);
  const econContainerRef = useRef<HTMLDivElement>(null);
  const mineralProgressRef = useRef<HTMLDivElement>(null);
  const econProgressRef = useRef<HTMLDivElement>(null);
  const mineralWrapperRef = useRef<HTMLDivElement>(null);
  const econWrapperRef = useRef<HTMLDivElement>(null);

  const initCarousel = useCallback(
    (
      containerRef: React.RefObject<HTMLDivElement | null>,
      progressRef: React.RefObject<HTMLDivElement | null>,
      wrapperRef: React.RefObject<HTMLDivElement | null>
    ) => {
      const container = containerRef.current;
      const progressBar = progressRef.current;
      const wrapper = wrapperRef.current;

      if (!container || !progressBar || !wrapper) return;

      const slides = gsap.utils.toArray<HTMLElement>(container.children);
      const totalSlides = slides.length;

      if (totalSlides === 0) return;

      const stayDuration = 3.5;

      // Create Master Timeline
      const masterTl = gsap.timeline({ repeat: -1 });

      slides.forEach((slide) => {
        const tl = gsap.timeline();
        tl.set(slide, { xPercent: 50, autoAlpha: 0 });
        tl.to(slide, {
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
        });
        tl.to(slide, { xPercent: 0, duration: stayDuration });
        tl.to(slide, {
          xPercent: -50,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.in",
        });
        masterTl.add(tl);
      });

      // Progress Bar Animation
      const oneCycleDuration = (1.2 + stayDuration) * totalSlides;
      const progressTween = gsap.fromTo(
        progressBar,
        { width: "0%" },
        { width: "100%", duration: oneCycleDuration, ease: "none", repeat: -1 }
      );

      // Hover Listeners
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

      // Cleanup function
      return () => {
        wrapper.removeEventListener("mouseenter", handleMouseEnter);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
        masterTl.kill();
        progressTween.kill();
      };
    },
    []
  );

  useEffect(() => {
    const cleanupMineral = initCarousel(
      mineralContainerRef,
      mineralProgressRef,
      mineralWrapperRef
    );

    // Delay second carousel for visual offset
    const timeoutId = setTimeout(() => {
      initCarousel(econContainerRef, econProgressRef, econWrapperRef);
    }, 1000);

    return () => {
      cleanupMineral?.();
      clearTimeout(timeoutId);
    };
  }, [initCarousel]);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          {/* <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
            The Opportunity
          </span> */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mt-3 mb-4">
            Why Zimbabwe{" "}
            {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1C5244] to-[#F8AB1D]">
              (Now)
            </span> */}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Africa faces a structural capital gap across MSMEs, mining, land,
            and real estate. Zimbabwe offers unique opportunities for strategic
            investors.
          </p>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mineral Reserves Carousel */}
          <div
            ref={mineralWrapperRef}
            className="relative group cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-[#333333] mb-4 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F8AB1D]"></span>
              Mineral Reserves
            </h3>

            {/* Carousel Container with Fade Mask */}
            <div
              className="w-full h-36 relative overflow-hidden bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300 group-hover:border-[#F8AB1D]/50 group-hover:shadow-lg"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div
                ref={mineralContainerRef}
                className="w-full h-full p-6 grid"
                style={{ gridTemplateAreas: '"stack"' }}
              >
                {mineralData.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col items-center justify-center text-center"
                    style={{
                      gridArea: "stack",
                      opacity: 0,
                      visibility: "hidden",
                    }}
                  >
                    <h4 className="text-2xl font-bold text-[#F8AB1D] mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[#333333] leading-snug text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 mt-3 rounded-full overflow-hidden">
              <div
                ref={mineralProgressRef}
                className="h-full bg-[#F8AB1D] w-0 rounded-full"
              ></div>
            </div>
          </div>

          {/* Economic Growth Carousel */}
          <div ref={econWrapperRef} className="relative group cursor-pointer">
            <h3 className="text-xl font-semibold text-[#333333] mb-4 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#1C5244]"></span>
              Economic Growth
            </h3>

            {/* Carousel Container with Fade Mask */}
            <div
              className="w-full h-36 relative overflow-hidden bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300 group-hover:border-[#1C5244]/50 group-hover:shadow-lg"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div
                ref={econContainerRef}
                className="w-full h-full p-6 grid"
                style={{ gridTemplateAreas: '"stack"' }}
              >
                {economicPoints.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col items-center justify-center text-center"
                    style={{
                      gridArea: "stack",
                      opacity: 0,
                      visibility: "hidden",
                    }}
                  >
                    <div className="flex justify-center items-baseline gap-1 mb-1 text-[#1C5244]">
                      <span className="text-3xl font-bold">
                        {item.numericValue}
                      </span>
                      <span className="text-xl font-semibold">{item.suffix}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#333333] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 mt-3 rounded-full overflow-hidden">
              <div
                ref={econProgressRef}
                className="h-full bg-[#1C5244] w-0 rounded-full"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
