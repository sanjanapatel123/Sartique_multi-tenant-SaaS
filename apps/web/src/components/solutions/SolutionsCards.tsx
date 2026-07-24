"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SolutionCard from "./SolutionCard";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    id: "womenswear",
    icon: "👗",
    title: "Modern Womenswear",
    subtitle: "For expressive design and personalized client experiences.",
    description:
      "For studios shaping made-to-measure collections, occasion pieces, and distinctive silhouettes.",
    challenges: [
      "Creative direction changes throughout the journey",
      "Client requests and revisions keep evolving",
      "Timelines become harder to coordinate",
    ],
    solutions: [
      "Every client conversation stays connected to the order",
      "Design changes remain clear across the workflow",
      "Teams stay aligned from concept through delivery",
    ],
    footerText: "Creative expression, without the operational complexity.",
  },

  {
    id: "menswear",
    icon: "👔",
    title: "Tailored Menswear",
    subtitle: "For precision, personalization, and a flawless fit.",
    description:
      "For tailoring studios creating custom suits and made-to-measure pieces with attention to every detail.",
    challenges: [
      "Measurements and fitting notes are scattered",
      "Multiple alterations become difficult to track",
      "Delivery dates require constant coordination",
    ],
    solutions: [
      "Measurements and fitting details stay organized",
      "Alterations remain connected to each order",
      "Progress stays visible from fitting to delivery",
    ],
    footerText: "Precision in every detail, clarity at every stage.",
  },

  {
    id: "footwear",
    icon: "👞",
    title: "Custom Footwear",
    subtitle: "For craftsmanship built around comfort and individuality.",
    description:
      "For footwear makers balancing custom sizing, materials, design preferences, and handcrafted production.",
    challenges: [
      "Custom sizing requires careful documentation",
      "Material choices vary between clients",
      "Production involves multiple detailed stages",
    ],
    solutions: [
      "Sizing stays attached to every order",
      "Materials and options remain clearly documented",
      "Production stages are easy to follow",
    ],
    footerText: "Every step of the craft, beautifully organized.",
  },

  {
    id: "bags",
    icon: "👜",
    title: "Bags & Accessories",
    subtitle: "For thoughtful details and truly personal creations.",
    description:
      "For makers creating custom bags and accessories where materials, finishes, and personalization define the piece.",
    challenges: [
      "Personalization creates endless combinations",
      "Material selections change during the process",
      "Small details get lost between teams",
    ],
    solutions: [
      "Preferences stay connected to every project",
      "Material selections remain easy to reference",
      "Everyone works from updated information",
    ],
    footerText: "Beautiful details, managed with effortless clarity.",
  },

  {
    id: "jewellery",
    icon: "💍",
    title: "Fine Jewellery",
    subtitle: "For meaningful pieces crafted with extraordinary care.",
    description:
      "For jewellery studios managing custom designs, intricate revisions, and one-of-a-kind creations.",
    challenges: [
      "Design revisions require careful communication",
      "Custom specifications contain intricate details",
      "Approvals can slow down the process",
    ],
    solutions: [
      "Design discussions stay connected to each piece",
      "Revisions remain clearly documented",
      "Approvals move smoothly from concept to creation",
    ],
    footerText: "Exceptional craftsmanship deserves exceptional organization.",
  },
];

const SolutionsCards = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".solution-card-wrapper");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 70,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-5 pb-14 md:px-10 md:pb-20"
    >
      <div className="mx-auto max-w-[1320px]">
        {solutions.map((solution) => (
          <div
            key={solution.id}
            className="solution-card-wrapper mb-12 last:mb-0 md:mb-16"
          >
            <SolutionCard {...solution} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolutionsCards;
