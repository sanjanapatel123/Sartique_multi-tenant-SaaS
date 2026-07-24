"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const buttonsContainer = buttonsRef.current;
    const scrollIndicator = scrollRef.current;

    if (
      !section ||
      !heading ||
      !paragraph ||
      !buttonsContainer ||
      !scrollIndicator
    )
      return;

    const ctx = gsap.context(() => {
      const buttons = gsap.utils.toArray<HTMLButtonElement>(".hero-button");

      /*
      ---------------------------------
      Initial States
      ---------------------------------
      */

      // Heading - Bottom to Top
      gsap.set(heading, {
        opacity: 0.15,
        y: 90,
        scale: 0.95,
      });

      // Paragraph - Opacity + Zoom
      gsap.set(paragraph, {
        opacity: 0,
        scale: 1.08,
      });

      // Buttons - Opacity + Zoom
      gsap.set(buttons, {
        opacity: 0,
        scale: 1.08,
      });

      // Scroll Indicator
      gsap.set(scrollIndicator, {
        opacity: 0,
      });

      /*
      ---------------------------------
      Animation Timeline
      ---------------------------------
      */

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Heading
      tl.to(heading, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.25,
      })

        // Paragraph
        .to(
          paragraph,
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.65",
        )

        // Buttons
        .to(
          buttons,
          {
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.55",
        )

        // Scroll Indicator
        .to(
          scrollIndicator,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3",
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero.png')",
        }}
      />

      {/* Overall Dark Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Left Blur + Gradient */}
      <div
        className="absolute inset-y-0 left-0 w-[45%]"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          background:
            "linear-gradient(to right, rgba(0,0,0,.55), rgba(0,0,0,.30), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container flex h-full items-center">
        <div className="max-w-[760px]">
          {/* Heading */}
          <h1
            ref={headingRef}
            style={{
              fontFamily: "var(--font-playfair)",
            }}
            className="text-4xl -mt-3 font-medium leading-[1.05] text-white md:mt-16 md:text-5xl xl:text-[66px]"
          >
            Build Bespoke
            <br />
            Brands With
            <br />
            <span className="italic">Smarter Operations.</span>
          </h1>

          {/* Paragraph */}
          <p
            ref={paragraphRef}
            className="mt-8 max-w-[650px] text-[17px] leading-6 text-white/75 md:text-xl"
          >
            Manage orders, clients, production, inventory and team collaboration
            from one intelligent platform designed for bespoke fashion and
            lifestyle brands.
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="mt-12 flex flex-wrap gap-5">
            {/* Primary Button */}
            <button
              className="
                hero-button
                inline-flex
                h-12
                items-center
                justify-center
                rounded-full
                bg-[var(--primary)]
                px-8
                text-sm
                font-medium
                text-white
                transition-transform
                duration-300
                hover:scale-105
              "
            >
              Start Free Trial
            </button>

            {/* Secondary Button */}
            <button
              className="
                hero-button
                inline-flex
                h-12
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-transparent
                px-8
                text-sm
                font-medium
                text-white
                backdrop-blur-md
                transition-transform
                duration-300
                hover:scale-105
                hover:bg-white/10
              "
            >
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-11 w-7 justify-center rounded-full border border-white/40">
            <div className="scroll-wheel mt-2 h-3 w-1 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
