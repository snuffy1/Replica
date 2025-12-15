"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.14, // ✅ quicker response (0.12–0.18)
      smoothWheel: true,
      wheelMultiplier: 1.35, // ✅ faster wheel distance (1.2–1.6)
      syncTouch: true,
      touchMultiplier: 1.1,
    });

    // keep ScrollTrigger synced
    lenis.on("scroll", ScrollTrigger.update);

    // ✅ GSAP ticker uses seconds; Lenis wants milliseconds
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
