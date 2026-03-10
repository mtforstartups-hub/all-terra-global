"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Small timeout ensures GSAP ScrollTrigger has released scroll control
        // before we force scroll to top on route change
        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 0);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
