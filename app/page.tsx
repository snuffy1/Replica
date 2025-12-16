import LandingPage from "@/components/sections/landing/LandingPage";
import Description from "@/components/sections/description/Description";
import Projects from "@/components/Reusable/Projects";
import { CAROUSEL_SLIDES, PROJECTS, PROJECTS2 } from "@/constants/constants";
import AllOurAcheivments from "@/components/sections/achievements/AllOurAcheivments";
import Series from "@/components/sections/Series/Series";
import BrandsGrid from "@/components/sections/brands/BrandsGrid";
import Process from "@/components/sections/process/Process";
import Carousel from "@/components/ui/Carousel";

const page = () => {
  return (
    <div>
      <LandingPage />
      <Description />
      <Projects projects={PROJECTS} title="PROJETS" />
      <Projects projects={PROJECTS2} title="" reverse />
      <AllOurAcheivments href="/achievements" label="ALL OUR ACHIEVEMENTS" />
      <Carousel slides={CAROUSEL_SLIDES} />
      <Series />
      <BrandsGrid />
      <Process />
    </div>
  );
};

export default page;
