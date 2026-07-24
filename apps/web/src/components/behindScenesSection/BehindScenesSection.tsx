"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BehindScenesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const pills = [
    "Smart Decisions",
    "Resource Planning",
    "Production Flow",
    "Teams & Deadlines",
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const pillsContainer = pillsRef.current;

    if (!section || !label || !heading || !content || !pillsContainer) return;

    const ctx = gsap.context(() => {
      const pills = gsap.utils.toArray<HTMLDivElement>(".behind-scenes-pill");

      /*
      -------------------------------
      Initial States
      -------------------------------
      */

      // Small Label
      gsap.set(label, {
        opacity: 0,
      });

      // Heading
      gsap.set(heading, {
        opacity: 0.15,
        y: 90,
        scale: 0.95,
      });

      // Description
      gsap.set(content, {
        opacity: 0,
        scale: 0.7,
        y: 40,
      });

      // Pills
      gsap.set(pills, {
        opacity: 0,
        scale: 0.9,
      });

      /*
      -------------------------------
      Animation Timeline
      -------------------------------
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      // Label Fade In
      tl.to(label, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })

        // Heading Animation
        .to(
          heading,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
          },
          "-=0.4",
        )

        // Content Zoom Out
        .to(
          content,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.55",
        )

        // Pills Fade In
        .to(
          pills,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.7",
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
       pt-10
      "
    >
      <div className="container flex flex-col items-center text-center">
        {/* Small Label */}
        <p
          ref={labelRef}
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-[var(--text)]
            md:text-[12px]
          "
        >
          Behind The Scenes
        </p>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="
            mt-5
            font-playfair
            text-[36px]
            font-medium
            leading-[1.05]
            tracking-[-0.03em]
            text-[var(--heading)]
            sm:text-[40px]
            md:text-[48px]
            lg:text-[50px]
          "
        >
          Smart Systems Keep Every Detail{" "}
          <span className="italic">In Sync.</span>
        </h2>

        {/* Content */}
        <div
          ref={contentRef}
          className="
            mt-6
            flex
            max-w-[1350px]
            flex-col
            items-center
            text-[16px]
            font-normal
            leading-[1.6]
            text-[var(--text)]
            md:text-[17px]
          "
        >
          <p>
            Behind every seamless experience, Sartique connects your orders,
            resources, production progress, team responsibilities, and
            deadlines.
          </p>

          <p className="mt-5 md:mt-7">
            Everything stays aligned automatically, giving you the clarity to
            make better decisions without managing every detail yourself.
          </p>
        </div>

        {/* Pills */}
        <div
          ref={pillsRef}
          className="
            mt-10
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
            md:gap-4
          "
        >
          {pills.map((pill) => (
            <div
              key={pill}
              className="
                behind-scenes-pill
                flex
                min-w-[150px]
                items-center
                justify-center
                rounded-full
                border
                border-[var(--border)]
                bg-white/40
                px-5
                py-3
                text-[15px]
                text-[var(--text)]
                transition-colors
                duration-300
                hover:border-[var(--text-light)]
                md:text-[16px]
              "
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BehindScenesSection;
