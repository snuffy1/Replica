"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!section || !frame || !video) return;

    const NAV_SELECTOR = "header";

    // ✅ scale value that visually matches ~78vw / 72vh
    const END_SCALE = 0.78;

    gsap.set(frame, {
      scale: 1,
      transformOrigin: "center center",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=1200",
        markers: false,
        scrub: 1, // smooth scrub
        pin: true, // pin main container
        anticipatePin: 1,
      },
    });

    // Phase 1 — fade navbar
    tl.to(
      NAV_SELECTOR,
      {
        autoAlpha: 0,
        y: -12,
        ease: "none",
        pointerEvents: "none",
      },
      0
    );
    // play video once resizing starts
    tl.call(
      () => {
        video.play().catch(() => {});
      },
      [],
      0.1
    );
    // Phase 2 — smooth scale down (NO layout reflow)
    tl.to(
      frame,
      {
        scale: END_SCALE,
        duration: 2,
        ease: "none",
        delay: 1,
      },
      0.2
    );

    return () => {
      tl.scrollTrigger?.kill();
      gsap.set(NAV_SELECTOR, { clearProps: "all" });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-brand-dark"
    >
      {/* CENTERED FRAME — NEVER MOVES */}
      <div
        ref={frameRef}
        className="
          absolute
          left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-screen h-screen
          overflow-hidden
        "
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/videos/video-cuisiniste-lyon-italian-kitchen.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
};

export default LandingPage;
