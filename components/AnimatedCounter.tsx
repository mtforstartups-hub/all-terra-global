"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedCounter({
  targetValue = 1000,
  duration = 3,
  startValue = 0,
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Set initial value
      if (spanRef.current) {
        spanRef.current.innerText = String(startValue);

        gsap.to(spanRef.current, {
          innerText: targetValue,
          duration: duration,
          snap: { innerText: 1 }, // Snap to whole numbers
          scrollTrigger: {
            trigger: spanRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: spanRef, dependencies: [targetValue, duration, startValue] }, // Re-run if props change
  );

  return (
    // 'tabular-nums' prevents layout jitter as numbers change width
    <span ref={spanRef} className="tabular-nums">
      {startValue}
    </span>
  );
}
