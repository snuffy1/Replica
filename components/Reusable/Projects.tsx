"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type ProjectItem = {
  title: string;
  img: string;
  bigImg: string;
};

type ProjectsProps = {
  projects: ProjectItem[];
  title?: string;
  reverse?: boolean;
};

export default function Projects({
  projects,
  title = "PROJETS",
  reverse = false,
}: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bigImgAnimRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = projects[activeIndex]?.bigImg;

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-item", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useGSAP(() => {
    if (!bigImgAnimRef.current) return;

    gsap.fromTo(
      bigImgAnimRef.current,
      { opacity: 0.4, scale: 1.03 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
    );
  }, [activeIndex]);

  if (!projects?.length) return null;

  // ✅ Reverse only on lg+ using order (mobile and tablet stay clean)
  const bigOrder = reverse ? "order-1 lg:order-2" : "order-1 lg:order-1";
  const gridOrder = reverse ? "order-2 lg:order-1" : "order-2 lg:order-2";

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-8 py-16 sm:py-24 bg-white max-w-7xl mx-auto min-h-screen"
    >
      {/* Heading */}
      <div className="absolute z-10 mb-8 lg:mb-12">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-wide ">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* BIG IMAGE */}
        <div
          className={`project-item overflow-hidden ${bigOrder} lg:col-span-7`}
        >
          <div ref={bigImgAnimRef}>
            <Image
              src={activeImage}
              alt="Active Project"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* SMALL GRID */}
        <div
          className={`project-item ${gridOrder} lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8`}
          onMouseLeave={() => setActiveIndex(0)}
        >
          {projects.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setActiveIndex(i)}
            >
              <div className="overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <p className="mt-3 text-xs tracking-widest relative inline-block">
                {item.title}
                <span
                  className={`absolute left-0 -bottom-1 h-px bg-red-500 transition-all duration-300
                  ${
                    i === activeIndex ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
