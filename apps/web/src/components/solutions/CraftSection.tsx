"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const craftTypes = [
  "Fabric & Leather",
  "Stones & Metals",
  "Stitches & Settings",
];

const CraftSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        .from(".craft-label", {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".craft-title-line",
          {
            opacity: 0,
            y: 50,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          ".craft-description",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".craft-pill",
          {
            opacity: 0,
            y: 18,
            scale: 0.96,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        border-b border-[var(--border)]
        bg-[var(--background)]
        px-5 py-10
        md:px-10 md:py-20
        lg:py-14
      "
    >
      <div className="mx-auto max-w-[1100px] text-center">
        {/* Label */}
        <p
          className="
            craft-label
            text-[12px] font-medium uppercase
            tracking-[0.18em]
            text-[var(--text)]
            md:text-[13px]
          "
        >
          Designed Around Your Craft
        </p>

        {/* Heading */}
        <div className="mt-5">
          <div className="overflow-hidden">
            <h2
              className="
                craft-title-line
                font-playfair
                text-[38px] leading-[1.05]
                tracking-[-0.02em]
                text-[var(--heading)]
                md:text-[48px]
                lg:text-[60px]
              "
            >
              Different Crafts.
            </h2>
          </div>

          <div className="mt-1 overflow-hidden">
            <h3
              className="
                craft-title-line
                font-[var(--font-heading)]
                text-[38px] leading-[1.05]
                tracking-[-0.02em]
                text-[var(--heading)]
                md:text-[48px]
                lg:text-[58px]
              "
            >
              One Smarter <em className="font-normal italic">Workflow.</em>
            </h3>
          </div>
        </div>

        {/* Description */}
        <p
          className="
            craft-description
            mx-auto mt-6
            max-w-[650px]
            font-[var(--font-body)]
            text-[15px] leading-[1.7]
            text-[var(--text)]
            md:text-[17px]
          "
        >
          Whether your work begins with fabric, leather, precious stones, or
          fine metals, Sartique keeps every detail connected while giving your
          craft the flexibility it deserves.
        </p>

        {/* Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {craftTypes.map((item) => (
            <div
              key={item}
              className="
                craft-pill
                flex min-h-[48px]
                items-center justify-center
                rounded-full
                border border-[var(--border)]
                bg-white
                px-6
                font-[var(--font-body)]
                text-[14px]
                text-[var(--text)]
                shadow-[0_4px_18px_rgba(0,0,0,0.025)]
                md:px-7 md:text-[15px]
              "
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftSection;
