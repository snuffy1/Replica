import LandingPage from "@/components/LandingPage";
import Description from "@/components/Description";
import React from "react";
import Projects from "@/components/Reusable/Projects";
import { PROJECTS, PROJECTS2 } from "@/constants/constants";
import AllOurAcheivments from "@/components/AllOurAcheivments";
import Series from "@/components/Series";
import BrandsGrid from "@/components/BrandsGrid";
import Process from "@/components/Process";
import Carousel from "@/components/Carousel";

const page = () => {
  return (
    <div>
      <LandingPage />
      <Description />
      <Projects projects={PROJECTS} title="PROJETS" />
      <Projects projects={PROJECTS2} title="" reverse />
      <AllOurAcheivments href="/achievements" label="ALL OUR ACHIEVEMENTS" />

      <Carousel
        slides={[
          {
            id: 1,
            image: "/projects/project1.jpg",
            title: "NOUVEAU SHOWROOM À MILAN",
            subtitle:
              "Découvrez notre nouveau showroom à Milan, un espace dédié à l'élégance et au design italien.",
          },
          {
            id: 2,
            image: "/projects/project2.jpg",
            title: "COLLABORATION AVEC DESIGNERS LOCAUX",
            subtitle:
              "Nous sommes ravis d'annoncer notre collaboration avec des designers locaux pour créer des pièces uniques.",
          },
          {
            id: 3,
            image: "/projects/project3.jpg",
            title: "LANCEMENT DE LA NOUVELLE COLLECTION 2024",
            subtitle:
              "Explorez notre nouvelle collection 2024, alliant innovation et tradition artisanale.",
          },
        ]}
      />

      <Series />
      <BrandsGrid />
      <Process />
    </div>
  );
};

export default page;
