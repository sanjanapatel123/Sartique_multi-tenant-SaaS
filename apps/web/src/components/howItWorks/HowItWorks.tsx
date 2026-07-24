"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const bottomTextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const bottomText = bottomTextRef.current;

    if (!section || !heading || !description || !bottomText) return;

    const ctx = gsap.context(() => {
      /* Heading */
      gsap.set(heading, {
        opacity: 0.15,
        y: 90,
        scale: 0.95,
      });

      ScrollTrigger.create({
        trigger: heading,
        start: "top 88%",
        once: true,

        onEnter: () => {
          gsap.to(heading, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
          });
        },
      });

      /* Description */
      gsap.set(description, {
        opacity: 0,
        scale: 1.08,
      });

      ScrollTrigger.create({
        trigger: description,
        start: "top 92%",
        once: true,

        onEnter: () => {
          gsap.to(description, {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
          });
        },
      });

      /* Bottom Text */
      gsap.set(bottomText, {
        opacity: 0,
        scale: 1.08,
      });

      ScrollTrigger.create({
        trigger: bottomText,
        start: "top 95%",
        once: true,

        onEnter: () => {
          gsap.to(bottomText, {
            opacity: 0.6,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          });
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div
        className="
          container
          flex
          min-h-[640px]
          flex-col
          items-center
          justify-center
          px-5
          py-24
          text-center
          md:py-32
        "
      >
        {/* Small Label */}
        <div
          className="
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-[var(--border)]
            bg-white/50
            px-6
            py-2.5
          "
        >
          <span className="h-2 w-2 rounded-full bg-[var(--text)]" />

          <span
            className="
              text-[12px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-[var(--text)]
              md:text-[14px]
            "
          >
            How It Works
          </span>
        </div>

        {/* Main Heading */}
        <div ref={headingRef} className="mt-8 md:mt-10">
          <h2
            className="
              font-playfair
              text-[40px]
              font-medium
              leading-[1]
              tracking-[-0.04em]
              text-[var(--heading)]
              sm:text-[42px]
              md:text-[50px]
              lg:text-[52px]
            "
          >
            Everything Moves Forward.
          </h2>

          <p
            className="
              mt-3
              font-playfair
              text-[38px]
              italic
              leading-[1]
              tracking-[-0.04em]
              text-[var(--text)]
              sm:text-[42px]
              md:text-[50px]
              lg:text-[52px]
            "
          >
            Nothing Falls Through.
          </p>
        </div>

        {/* Divider */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-[90px] bg-[var(--text-light)]" />

          <span className="h-[9px] w-[9px] rounded-full bg-[var(--text-light)]" />

          <span className="h-px w-[90px] bg-[var(--text-light)]" />
        </div>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="
            mt-5
            max-w-[850px]
            text-[18px]
            font-normal
            leading-[1.5]
            text-[var(--text)]
            md:text-[21px]
          "
        >
          Sartique connects your everyday work — conversations, decisions,
          production, people — into one continuous flow.
        </p>

        {/* Bottom Text */}
        <p
          ref={bottomTextRef}
          className="
            mt-4
            text-[11px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-[var(--text)]
            sm:text-[12px]
            md:text-[13px]
          "
        >
          No new habits · No complex setup · Just flow
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
