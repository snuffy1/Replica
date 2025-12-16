import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 py-24">
        {/* Logo */}
        <div className="flex justify-center mb-24">
          <Image
            src="/logo/logo.png"
            alt="Italian Kitchen"
            width={220}
            height={220}
            className="h-20 w-auto object-contain"
            priority
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* LEFT  */}
          <div className="md:col-span-4">
            <nav className="space-y-6 text-3xl md:text-4xl font-light text-gray-900">
              {[
                "Welcome",
                "Achievements",
                "Series",
                "Atmospheres",
                "Contact",
              ].map((item) => (
                <Link key={item} href="/" className="group block w-fit">
                  <span className="block">{item}</span>
                  <div className="mt-2 w-0 h-px bg-red-400 group-hover:w-24 transition-all duration-500" />
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT SIDE  */}
          <div className="md:col-span-8 mt-16 md:mt-0">
            {/* Row 1: 3 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-[15px] text-gray-900">
              {/* Col 1 */}
              <div className="sm:pl-10 sm:border-l sm:border-gray-300 space-y-4">
                {["Our brands", "About us", "Showrooms"].map((item) => (
                  <Link key={item} href="#" className="group block w-fit">
                    <span className="block">{item}</span>
                    <div className="mt-2 w-0 h-px bg-red-300 group-hover:w-16 transition-all duration-500" />
                  </Link>
                ))}
              </div>

              {/* col 2 */}
              <div className="sm:pl-10 sm:border-l sm:border-gray-300 space-y-4">
                {["Your project", "Customization", "Layout"].map((item) => (
                  <Link key={item} href="#" className="group block w-fit">
                    <span className="block">{item}</span>
                    <div className="mt-2 w-0 h-px bg-red-300 group-hover:w-16 transition-all duration-500" />
                  </Link>
                ))}
              </div>

              {/* Col 3 */}
              <div className="sm:pl-10 sm:border-l sm:border-gray-300 space-y-4">
                {["Instagram", "Facebook", "Houzz"].map((item) => (
                  <Link key={item} href="#" className="group block w-fit">
                    <span className="block">{item}</span>
                    <div className="mt-2 w-0 h-px bg-red-300 group-hover:w-16 transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Row 2: */}
            <div className="mt-16 flex justify-center md:justify-start">
              <Link
                href="mailto:bonjour@itkitchenlyon.com"
                className="text-red-600 text-3xl md:text-5xl font-light tracking-wide hover:opacity-80 transition"
              >
                bonjour@itkitchenlyon.com
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-20 flex justify-center text-xs md:text-sm text-gray-600">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#" className="hover:text-gray-900 transition">
              Legal notice
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:text-gray-900 transition">
              Terms of Use &amp; Personal Data
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:text-gray-900 transition">
              Website creation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
