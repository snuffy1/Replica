import LandingPage from "@/components/LandingPage";
import Description from "@/components/Description";
import React from "react";
import Projects from "@/components/Projects";

const page = () => {
  return (
    <div>
      <LandingPage />
      <Description />
      <Projects />
      {/* <div className="h-screen"></div> */}
    </div>
  );
};

export default page;
