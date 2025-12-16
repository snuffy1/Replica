"use client";

import Image from "next/image";

export default function BrandsGrid() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl tracking-[0.25em] uppercase mb-16">
          NOS MARQUES
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT BIG IMAGE */}
          <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden group">
            <Image
              src="/brands/zecchinon-cuisines-italiennes.jpg"
              alt="Zecchinon"
              fill
              priority
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-120
              "
            />
          </div>

          {/* RIGHT GRID */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-10">
            {[
              "/brands/Aster.jpg",
              "/brands/Armony.jpg",
              "/brands/ronda-design.jpg",
              "/brands/colico.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden group"
              >
                <Image
                  src={src}
                  alt="Brand"
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-120
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
