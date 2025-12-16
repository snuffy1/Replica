"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { seriesData } from "@/constants/constants";

gsap.registerPlugin(ScrollTrigger);

const Series = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Grid items animation
      const gridItems = gridRef.current?.children;
      if (gridItems) {
        gsap.fromTo(
          Array.from(gridItems),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Navigation animation
      gsap.fromTo(
        navigationRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.8,
          scrollTrigger: {
            trigger: navigationRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="relative z-10 -mb-4">
          <h2 className="text-6xl font-semibold tracking-wide">Series</h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {seriesData.map((series) => (
            <div key={series.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-3/4 overflow-hidden rounded-sm mb-6 bg-gray-200">
                <Image
                  src={series.image}
                  alt={series.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-120"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h3 className="text-sm md:text-base font-medium text-gray-800 tracking-wider uppercase group-hover:text-gray-600 transition-colors duration-300">
                  {series.title}
                </h3>

                <div className="w-0 h-px bg-gray-400 group-hover:w-24 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Series;
