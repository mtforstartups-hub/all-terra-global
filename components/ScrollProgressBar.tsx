"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation"; // 1. Import usePathname

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollProgressBar() {
  const progressBar = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // 2. Get current route

  useGSAP(() => {
    // 3. Kill old triggers to prevent memory leaks or conflicts before creating new ones
    // (useGSAP handles cleanup automatically, but explicit logic helps clarity)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Only run if the page is actually scrollable
      if (totalHeight > 0 && progressBar.current) {
        ScrollTrigger.create({
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          // 4. Force a refresh to account for any layout shifts/pins from other components
          onRefresh: (self) => {
            // Optional: Recalculate if needed, but usually automatic
          },
          animation: gsap.fromTo(
            progressBar.current,
            { scaleX: 0 },
            { scaleX: 1, ease: "none" },
          ),
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]); // 5. RE-RUN this hook whenever the path changes

  return (
    // 6. Changed 'absolute' to 'fixed' and added z-index
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10">
      <div
        ref={progressBar}
        className="h-full bg-[#F8AB1D] origin-left scale-x-0"
      />
    </div>
  );
}
