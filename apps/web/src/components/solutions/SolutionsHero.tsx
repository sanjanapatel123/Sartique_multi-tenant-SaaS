"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------
   Types
-------------------------------- */

type SolutionCategory = {
  label: string;
  icon: string;
  target: string;
};

/* --------------------------------
   Category Data
-------------------------------- */

const categories: SolutionCategory[] = [
  {
    label: "Womenswear",
    icon: "👗",
    target: "womenswear",
  },
  {
    label: "Menswear",
    icon: "👔",
    target: "menswear",
  },
  {
    label: "Shoes & Footwear",
    icon: "👞",
    target: "footwear",
  },
  {
    label: "Bags & Accessories",
    icon: "👜",
    target: "bags",
  },
  {
    label: "Jewellery",
    icon: "💍",
    target: "jewellery",
  },
];

/* --------------------------------
   Component
-------------------------------- */

const SolutionsHero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  /* --------------------------------
     Smooth Scroll
  -------------------------------- */

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* --------------------------------
     GSAP Animation
  -------------------------------- */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      timeline
        .from(".solutions-label", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".solutions-title-line",
          {
            opacity: 0,
            y: 70,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .from(
          ".solutions-description",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".solutions-divider",
          {
            scaleX: 0,
            transformOrigin: "center",
            duration: 1,
            ease: "power3.inOut",
          },
          "-=0.4",
        )
        .from(
          ".solution-category",
          {
            opacity: 0,
            y: 25,
            scale: 0.95,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--background)] px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-30 lg:pb-24 lg:pt-34"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* --------------------------------
            Top Content
        -------------------------------- */}

        <div className="text-center">
          {/* Label */}
          <p className="solutions-label mb-6 text-[13px] font-medium uppercase tracking-[0.20em] text-[var(--text)] md:text-[14px]">
            Solutions
          </p>

          {/* Heading */}
          <div className="overflow-hidden">
            <h1 className="solutions-title-line font-[var(--font-heading)] font-playfair text-[40px] leading-[0.95] tracking-[-0.0em] text-[var(--heading)] md:text-[40px] lg:text-[60px]">
              Crafted for Every Vision.
            </h1>
          </div>

          <div className="overflow-hidden">
            <h2 className="solutions-title-line font-[var(--font-heading)] font-playfair text-[40px] italic leading-[1] tracking-[-0.0em] text-[var(--heading)] md:text-[40px] lg:text-[60px]">
              Built for Every Detail.
            </h2>
          </div>

          {/* Description */}
          <p className="solutions-description mx-auto mt-5 max-w-[780px] text-[16px] leading-[1.65] text-[var(--text)] md:text-[20px] lg:text-[20px]">
            From fashion and footwear to accessories and fine jewellery,
            Sartique brings your creative process, client conversations, and
            everyday operations into one seamless flow.
          </p>
        </div>

        <div className="solutions-divider mx-auto mt-8 h-px w-full max-w-[440px] bg-[var(--text-light)] md:mt-8" />

        {/* --------------------------------
            Category Buttons
        -------------------------------- */}
        {/* Category Buttons */}
        <div className="mt-5 w-full overflow-hidden py-5">
          <div
            className="
      flex w-full items-center gap-3
      overflow-x-auto
      px-2 py-3
      md:justify-center
      md:overflow-visible
      [&::-webkit-scrollbar]:hidden
      [-ms-overflow-style:none]
      [scrollbar-width:none]
    "
          >
            {categories.map((category) => (
              <button
                key={category.target}
                type="button"
                onClick={() => scrollToSection(category.target)}
                className="
  solution-category group
  flex min-h-[50px] shrink-0
  items-center justify-center gap-3
  whitespace-nowrap rounded-full
  border border-[var(--border)]
  bg-white px-5
  text-[14px] text-[var(--heading)]
  shadow-[0_5px_25px_rgba(0,0,0,0.05)]
  transition-all duration-300
  hover:border-[var(--border)]
  hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
  md:px-4 md:text-[16px]
"
              >
                <span className="text-[16px] transition-transform duration-300 group-hover:scale-110">
                  {category.icon}
                </span>

                <span className="text-[16px]">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHero;
