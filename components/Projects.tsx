"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "MARBRE / VERT",
    img: "/projects/project1.jpg",
    bigImg: "/projects/project1.jpg",
  },
  {
    title: "INTÉRIEUR COMPLET",
    img: "/projects/project2.jpg",
    bigImg: "/projects/project2.jpg",
  },
  {
    title: "WHITE & WOOD",
    img: "/projects/project3.jpg",
    bigImg: "/projects/project3.jpg",
  },
  {
    title: "BLACK & WOOD",
    img: "/projects/project4.jpg",
    bigImg: "/projects/project4.jpg",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bigImgAnimRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = PROJECTS[activeIndex].bigImg;

  // Scroll animation
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

  // Fade + zoom (clipped)
  useGSAP(() => {
    if (!bigImgAnimRef.current) return;

    gsap.fromTo(
      bigImgAnimRef.current,
      { opacity: 0.4, scale: 1.03 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
    );
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="px-8 py-20 bg-white max-w-5xl mx-auto">
      {/* Heading */}
      <div className="relative z-10 -mb-8">
        <h2 className="text-6xl font-semibold tracking-wide">PROJETS</h2>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* LEFT BIG IMAGE */}
        <div className="col-span-7 project-item overflow-hidden">
          <div ref={bigImgAnimRef}>
            <Image
              src={activeImage}
              alt="Active Project"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* RIGHT GRID */}
        <div
          className="col-span-5 grid grid-cols-2 gap-8"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {PROJECTS.map((item, i) => (
            <div
              key={i}
              className="project-item cursor-pointer"
              onMouseEnter={() => setActiveIndex(i)}
            >
              <Image
                src={item.img}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />

              {/* TITLE + RED LINE */}
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
