"use client";

import React, { useRef } from "react";
import {
  SlidersHorizontal,
  PencilRuler,
  PackageOpen,
  Home,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ProcessItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ITEMS: ProcessItem[] = [
  {
    icon: <SlidersHorizontal className="h-4 w-4" />,
    title: "PROJECT DEFINITION",
    description:
      "We believe that a quality project begins with attentive listening. Before proposing an exclusive design, we take the time to discuss your specific needs, tastes, and constraints. This allows us to define together a comprehensive set of specifications, the foundation of your future kitchen or home layout.",
  },
  {
    icon: <PencilRuler className="h-4 w-4" />,
    title: "PROPOSALS & PLANS",
    description:
      "To bring your project to life, we offer a multi-stage presentation: plans on a drawing board, a 3D simulation, and a guided tour of our showroom. This will allow you to visualize every detail of the layout, experience the space, and adjust the elements together before making your dream a reality.",
  },
  {
    icon: <PackageOpen className="h-4 w-4" />,
    title: "HOME SAMPLES",
    description:
      "In this stage, we refine the details of your project by exploring materials in-store and creating a custom mood board. To help you make the best decision, we can also send you the selected samples to your home, allowing you to see and touch the materials before finalizing your choice.",
  },
  {
    icon: <Home className="h-4 w-4" />,
    title: "CONSTRUCTION SITE MANAGEMENT",
    description:
      "We pride ourselves on managing every detail with professionalism: precise measurements taken at your home, meticulous order preparation, and perfectly orchestrated delivery. Installation is carried out by our top professionals to guarantee optimal quality. Furthermore, we offer support throughout the entire project, including plumbing, tiling, plasterwork, electrical work, and painting, ensuring a worry-free project delivered in perfect condition.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ animate rows one-by-one on scroll
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const rows = gsap.utils.toArray<HTMLElement>(".process-row");

      gsap.fromTo(
        rows,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-semibold tracking-[0.18em] uppercase">
          PROCESS
        </h2>

        {/* Top divider */}
        <div className="mt-10 border-t border-gray-200" />

        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="process-row grid grid-cols-1 md:grid-cols-12 gap-8 py-12 items-start"
            >
              {/* Icon */}
              <div className="md:col-span-1">
                <div className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600">
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="text-sm md:text-xl font-semibold tracking-[0.18em] uppercase text-gray-900">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-7">
                <p className="text-[13px] md:font-semibold leading-6 text-gray-500 max-w-3xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="border-t border-gray-200" />
      </div>
    </section>
  );
}
