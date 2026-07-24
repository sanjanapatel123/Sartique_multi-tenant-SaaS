import FlowSection from "@/components/flowSection/FlowSection";
import Footer from "@/components/footer/Footer";
import FutureSection from "@/components/futureSection/FutureSection";
import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/manifesto/Manifesto";
import Navbar from "@/components/navbar/Navbar";
import PromiseCards from "@/components/promiseSection/PromiseCards";
import PromiseSection from "@/components/promiseSection/PromiseSection";
import TransformationSection from "@/components/transformationSection/TransformationSection";
import WhoItsFor from "@/components/whoItsFor/WhoItsFor";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <Manifesto />
      <FlowSection />
      <PromiseSection />
      <PromiseCards />
      <TransformationSection />
      <WhoItsFor />
      <FutureSection />
    </div>
  );
}
