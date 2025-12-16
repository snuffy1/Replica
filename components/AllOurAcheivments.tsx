"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";

type AllOurAcheivmentsProps = {
  href: string;
  label: string;
  className?: string;
  underlineWidthClassName?: string;
};

export default function AllOurAcheivments({
  href,
  label,
}: AllOurAcheivmentsProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const onEnter = () => {
    if (!lineRef.current) return;
    gsap.killTweensOf(lineRef.current);
  };

  const onLeave = () => {
    if (!lineRef.current) return;
    gsap.killTweensOf(lineRef.current);
    gsap.to(lineRef.current, {
      scaleX: 0,
      duration: 0.25,
      ease: "power2.out",
      transformOrigin: "right center",
    });
  };

  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group flex items-end justify-end gap-10 max-w-7xl mx-auto "
    >
      {/* Left: text + underline */}
      <span className="relative inline-block">
        <span className="block text-[28px] md:text-[34px] tracking-[0.18em] uppercase transition-colors duration-200 text-black group-hover:text-red-600">
          {label}
        </span>

        {/* underline (always black) */}
        {/* Underline */}
        <span
          className="
      mt-2 block h-px bg-black w-full
      origin-left
      scale-x-100
      transition-transform duration-300 ease-out
      group-hover:scale-x-50
    "
        />
      </span>

      <span className="relative text-red-600 text-2xl md:text-4xl leading-none">
        <span className="block transition-opacity duration-150 group-hover:opacity-0">
          ↗
        </span>
        <span className="absolute inset-0 block opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          →
        </span>
      </span>
    </Link>
  );
}
