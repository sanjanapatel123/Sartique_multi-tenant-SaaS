import CardSection from "@/components/solutions/CardSection";
import ClientExperience from "@/components/solutions/ClientExperience";
import CraftSection from "@/components/solutions/CraftSection";
import SolutionsCards from "@/components/solutions/SolutionsCards";
import SolutionsCTA from "@/components/solutions/SolutionsCTA";
import SolutionsHero from "@/components/solutions/SolutionsHero";

const page = () => {
  return (
    <>
      <SolutionsHero />
      <SolutionsCards />
      <CraftSection />
      <ClientExperience />
      <CardSection />
      <SolutionsCTA />
    </>
  );
};

export default page;
