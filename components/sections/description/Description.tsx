// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// const Description = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const titleRef = useRef<HTMLDivElement>(null);
//   const subtitleRef = useRef<HTMLParagraphElement>(null);
//   const descriptionRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);

//   useGSAP(() => {
//     const section = sectionRef.current;
//     const title = titleRef.current;
//     const subtitle = subtitleRef.current;
//     const description = descriptionRef.current;
//     const image = imageRef.current;

//     if (!section || !title || !subtitle || !description || !image) return;

//     // Set initial states
//     gsap.set([title, subtitle, description, image], {
//       opacity: 0,
//       y: 50,
//     });

//     // Create timeline for staggered animations
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: section,
//         start: "top 80%",
//         end: "bottom 20%",
//         toggleActions: "play none none reverse",
//       },
//     });

//     // Animate elements with stagger
//     tl.to(title, {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power2.out",
//     })
//       .to(
//         subtitle,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           ease: "power2.out",
//         },
//         "-=0.5"
//       )
//       .to(
//         description,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power2.out",
//         },
//         "-=0.3"
//       )
//       .to(
//         image,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1.2,
//           ease: "power2.out",
//           onComplete: () => {
//             // Add subtle floating animation to image
//             gsap.to(image, {
//               y: -10,
//               duration: 3,
//               ease: "sine.inOut",
//               yoyo: true,
//               repeat: -1,
//             });
//           },
//         },
//         "-=0.5"
//       );
//   }, []);

//   return (
//     <section ref={sectionRef} className="py-16 px-4">
//       <div className="max-w-4xl mx-auto text-center">
//         {/* Title Section */}
//         <div ref={titleRef} className="mb-12">
//           <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//             Italian Kitchen
//           </h1>
//           <p
//             ref={subtitleRef}
//             className="text-sm uppercase tracking-widest text-gray-500 font-sans"
//           >
//             CUISINISTE LYON
//           </p>
//         </div>

//         {/* Description Text */}
//         <div ref={descriptionRef} className="mb-16">
//           <p className="text-lg md:text-xl  text-gray-600 font-light max-w-2xl leading-loose mx-auto">
//             Italian Kitchen c&apos;est avant tout la passion pour
//             l&apos;aménagement sans compromis. Des projets intemporels avec un
//             accompagnement sur mesure. Nous sommes en challenge permanent pour
//             vous proposer un choix unique, le meilleur des cuisines italiennes,
//             une sélection en adéquation avec vos envies et votre environnement.
//           </p>
//         </div>

//         {/* Brand Logos */}
//         <div
//           ref={imageRef}
//           className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
//         >
//           <Image
//             src="/photos/four.png"
//             alt="Zecchinon"
//             width={640}
//             height={640}
//             className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Description;

"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Description = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { dependencies: [], scope: sectionRef }
  );
  return (
    <section ref={sectionRef} className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title  */}
        <div className="mb-12">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Italian Kitchen
          </h1>
          <p className="text-sm uppercase tracking-widest text-gray-500 font-sans">
            CUISINISTE LYON
          </p>
        </div>

        {/* Description */}
        <div className="mb-16">
          <p className="text-lg md:text-xl  text-gray-600 font-light max-w-2xl leading-loose mx-auto">
            Italian Kitchen c&apos;est avant tout la passion pour
            l&apos;aménagement sans compromis. Des projets intemporels avec un
            accompagnement sur mesure. Nous sommes en challenge permanent pour
            vous proposer un choix unique, le meilleur des cuisines italiennes,
            une sélection en adéquation avec vos envies et votre environnement.
          </p>
        </div>

        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          <Image
            src="/photos/four.png"
            alt="Zecchinon"
            width={640}
            height={640}
            className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Description;
