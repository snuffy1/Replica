import LandingPage from "@/components/LandingPage";
import Description from "@/components/Description";
import React from "react";
import Projects from "@/components/Reusable/Projects";
import { PROJECTS, PROJECTS2 } from "@/constants/constants";
import AllOurAcheivments from "@/components/AllOurAcheivments";
import Series from "@/components/Series";
import BrandsGrid from "@/components/BrandsGrid";
import Process from "@/components/Process";

const page = () => {
  return (
    <div>
      <LandingPage />
      <Description />
      <Projects projects={PROJECTS} title="PROJETS" />

      {/* Reversed layout (matches second screenshot) */}
      <Projects projects={PROJECTS2} title="" reverse />
      <AllOurAcheivments href="/achievements" label="ALL OUR ACHIEVEMENTS" />
      <Series />
      <BrandsGrid />
      <Process />
    </div>
  );
};

export default page;
