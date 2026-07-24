import BehindScenesSection from "@/components/behindScenesSection/BehindScenesSection";
import CoreIdeaCards from "@/components/coreIdeaSection/CoreIdeaCards";
import CoreIdeaSection from "@/components/coreIdeaSection/CoreIdeaSection";
import FinalCTASection from "@/components/coreIdeaSection/FinalCTASection";
import WhyDifferentSection from "@/components/coreIdeaSection/WhyDifferentSection";
import HowItWorks from "@/components/howItWorks/HowItWorks";

const page = () => {
  return (
    <>
      <HowItWorks />
      <CoreIdeaSection />
      <CoreIdeaCards />
      <BehindScenesSection />
      <WhyDifferentSection />
      <FinalCTASection />
    </>
  );
};

export default page;
