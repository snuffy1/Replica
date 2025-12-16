"use client";

import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type NewsSlide = {
  id: number | string;
  image: string;
  title: string;
  subtitle?: string;
};

type Props = {
  slides: NewsSlide[];
  className?: string;
  heading?: string;
};

export default function Carousel({ slides }: Props) {
  const [active, setActive] = useState(0);
  const isAnimating = useRef(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const current = slides[active];

  const nextIndex = useMemo(() => {
    if (!slides.length) return 0;
    return (active + 1) % slides.length;
  }, [active, slides.length]);

  const nextSlide = slides[nextIndex];

  const goNext = () => {
    if (isAnimating.current || slides.length <= 1) return;
    isAnimating.current = true;

    const curr = currRef.current;
    const next = nextRef.current;
    const track = trackRef.current;
    if (!curr || !next || !track) {
      isAnimating.current = false;
      return;
    }

    // Set starting positions
    gsap.set(next, { xPercent: 15, opacity: 0 }); // comes from right
    gsap.set(curr, { xPercent: 0, opacity: 1 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        setActive(nextIndex);
        gsap.set(curr, { clearProps: "all" });
        gsap.set(next, { clearProps: "all" });
        isAnimating.current = false;
      },
    });

    tl.to(curr, { xPercent: -15, opacity: 0, duration: 0.55 }, 0);
    tl.to(next, { xPercent: 0, opacity: 1, duration: 0.55 }, 0);
  };

  if (!slides?.length) return null;

  return (
    <section className="bg-white hidden lg:block">
      <div className="max-w-7xl mx-auto px-6 pt-10 relative">
        <h2 className="text-6xl md:text-7xl tracking-[0.08em] uppercase absolute top-0 left-6 md:left-10 lg:left-16 z-40 font-semibold">
          News
        </h2>
      </div>

      <div className="relative mt-4">
        {/* slide viewport */}
        <div className="relative max-w-7xl mx-auto h-[80vh] min-h-[70vh] overflow-hidden">
          <div ref={trackRef} className="absolute inset-0">
            {/* CURRENT */}
            <div ref={currRef} className="absolute inset-0">
              <Image
                src={current.image}
                alt={current.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />

              {/* Caption card */}
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div className="bg-white/85 backdrop-blur-sm px-10 py-8 text-center">
                  <p className="text-xl md:text-2xl tracking-[0.18em] uppercase text-gray-900">
                    “{current.title}”
                  </p>
                  {current.subtitle && (
                    <p className="mt-2 text-sm tracking-wide text-gray-600">
                      {current.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* NEXT (pre-rendered for smooth animation) */}
            <div ref={nextRef} className="absolute inset-0 pointer-events-none">
              <Image
                src={nextSlide.image}
                alt={nextSlide.title}
                fill
                className="object-cover"
                sizes="100vw"
              />

              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div className="bg-white/50 px-10 py-8 text-center">
                  <p className="text-xl md:text-2xl tracking-[0.18em] uppercase text-gray-900">
                    “{nextSlide.title}”
                  </p>
                  {nextSlide.subtitle && (
                    <p className="mt-2 text-sm tracking-wide text-gray-600">
                      {nextSlide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom right buttons */}
          <div className="absolute bottom-6 right-6">
            <div className="flex overflow-hidden bg-white/70 backdrop-blur-sm shadow-sm">
              {/* Button 1 */}
              <button className="group flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-800 hover:bg-[#BA384A] hover:text-white transition-colors">
                <span className="text-gray-500 group-hover:text-white transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <span>Discover the project</span>
              </button>

              {/* Divider */}
              <div className="w-px bg-gray-300" />

              {/* Button 2 */}
              <button className="group flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-800 hover:bg-[#BA384A] hover:text-white transition-colors">
                <span className="text-gray-500 group-hover:text-white transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </span>
                <span>Read an excerpt</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right arrow button */}
        <button
          onClick={goNext}
          aria-label="Next news"
          className="
          cursor-pointer
    absolute right-10 top-1/2 -translate-y-1/2
    h-16 w-16
    bg-white
    flex items-center justify-center
    transition
    hover:bg-gray-50
  "
        >
          <span className="text-5xl leading-none text-gray-300 select-none">
            ›
          </span>
        </button>
      </div>
    </section>
  );
}
