"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CoreIdeaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !label || !heading || !content) return;

    const ctx = gsap.context(() => {
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

      // Paragraphs
      // Page ke andar se bahar aane wala feel
      gsap.set(content, {
        opacity: 0,
        scale: 0.7,
        y: 40,
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

      // The Core Idea
      tl.to(label, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })

        // Main Heading
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

        // Paragraphs - Coming out from page
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
      "
    >
      <div className="container flex flex-col items-center text-center">
        {/* Small Label */}
        <p
          ref={labelRef}
          className="
    text-[12px]
    font-medium
    uppercase
    tracking-[0.28em]
    text-[var(--text)]
    md:text-[14px]
  "
        >
          The Sartique Way
        </p>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="
    mt-8
    font-playfair
    text-[40px]
    font-medium
    leading-[1.05]
    tracking-[-0.03em]
    text-[var(--heading)]
    sm:text-[38px]
    md:text-[48px]
    lg:text-[50px]
  "
        >
          One Brand. One <span className="italic">Seamless Flow.</span>
        </h2>

        {/* Content */}
        <div
          ref={contentRef}
          className="
    mt-10
    flex
    max-w-[1050px]
    flex-col
    items-center
    text-[16px]
    font-normal
    leading-[1.6]
    text-[var(--text)]
    md:text-[18px]
  "
        >
          <p>
            From the first client request to the final delivery, every detail
            stays connected in one clear and effortless workflow.
          </p>

          <p className="mt-4 md:mt-6">
            As your business moves forward, Sartique keeps your team, orders,
            and operations perfectly in sync. <br className="hidden sm:block" />
            So you can focus on creating, not coordinating.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoreIdeaSection;
