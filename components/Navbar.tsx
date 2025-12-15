"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger fade out after 50px of scrolling
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-in-out bg-white ${
          isScrolled
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0 bg-transparent py-6 md:py-10"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-center items-center relative">
          {/* Logo Centered */}
          <div className="flex flex-col items-center group cursor-pointer">
            <Image
              src="/logo/logo.png"
              alt="Italian Kitchen Logo"
              width={200}
              height={56}
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>

          {/* Hamburger Menu - Right Aligned */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="absolute right-6 md:right-12 p-3 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6 md:w-8 md:h-8 text-gray-800 stroke-[1.5]" />
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-60 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-8 md:right-12 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-8 h-8 text-gray-800" />
        </button>
        <nav className="h-full flex flex-col items-center justify-center space-y-8">
          {["Collections", "Projects", "Designers", "Showrooms", "Contact"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="text-4xl md:text-6xl font-serif text-gray-900 hover:text-brand-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            )
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
