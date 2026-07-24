import AboutHero from "@/components/about/AboutHero";
import BiggerVision from "@/components/about/BiggerVision";
import FinalCTA from "@/components/about/FinalCTA";
import RealProblem from "@/components/about/RealProblem";
import WhatMakesDifferent from "@/components/about/WhatMakesDifferent";
import WhyDifferentAbout from "@/components/about/WhyDifferentAbout";
import WhyWeExist from "@/components/about/WhyWeExist";
import React from "react";

const page = () => {
  return (
    <>
      <AboutHero />
      <RealProblem />
      <WhyWeExist />
      <WhyDifferentAbout />
      <BiggerVision />
      <WhatMakesDifferent />
      <FinalCTA />
    </>
  );
};

export default page;
