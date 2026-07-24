import PricingCards from "@/components/pricing/PricingCards";
import PricingCTA from "@/components/pricing/PricingCTA";
import PricingHero from "@/components/pricing/PricingHero";
import PricingModel from "@/components/pricing/PricingModel";
import React from "react";

const page = () => {
  return (
    <>
      <PricingHero />
      <PricingModel />
      <PricingCards />
      <PricingCTA />
    </>
  );
};

export default page;
