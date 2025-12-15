"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initial state
    video.pause();

    let hasStartedPlaying = false;
    const VIDEO_PLAY_THRESHOLD = 150; // Video starts playing at 150px (after navbar is fully faded)

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Only start video after navbar has completely faded out
      if (!hasStartedPlaying && scrollY > VIDEO_PLAY_THRESHOLD) {
        hasStartedPlaying = true;
        video.play().catch(console.error);
      }
    };

    // Pin the video section during the navbar fade phase
    const pinTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".video-section",
        start: "top top",
        end: `+=${VIDEO_PLAY_THRESHOLD}`,
        pin: true,
        pinSpacing: false,
        scrub: false,
        markers: false,
      },
    });

    // ScrollTrigger for play / pause based on visibility after pinning
    const scrollTrigger = ScrollTrigger.create({
      trigger: video,
      start: "top bottom",
      end: "bottom top",
      markers: false,
      onEnter: () => {
        // Only play if we've scrolled past the video threshold
        if (window.scrollY > VIDEO_PLAY_THRESHOLD) {
          hasStartedPlaying = true;
          video.play().catch(console.error);
        }
      },
      onLeave: () => hasStartedPlaying && video.pause(),
      onEnterBack: () => hasStartedPlaying && video.play().catch(console.error),
      onLeaveBack: () => hasStartedPlaying && video.pause(),
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      pinTimeline.kill();
      scrollTrigger.kill();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-brand-dark video-section">
      {/* Full Screen Video Section */}
      <div className="absolute inset-0 w-full h-full group">
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-transform duration-3000 ease-out group-hover:scale-105"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/videos/video-cuisiniste-lyon-italian-kitchen.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-700"></div>
      </div>
      {/* Scroll Indicator - Centered Absolute */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 text-white drop-shadow-md pointer-events-none">
        <div className="w-5 h-9 border-2 border-white/80 rounded-full flex justify-center p-1 mb-2 backdrop-blur-[2px]">
          <div className="w-0.5 h-2 bg-white rounded-full animate-bounce mt-1"></div>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] font-medium opacity-90 text-shadow-sm">
          Scroll
        </span>
      </div>
    </section>
  );
};

export default LandingPage;
