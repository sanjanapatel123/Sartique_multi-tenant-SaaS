"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TermsHero = () => {
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
      /* ---------------- Heading ---------------- */
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

      /* ---------------- Description ---------------- */
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

      /* ---------------- Bottom Text ---------------- */
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--background)]"
    >
      <div
        className="
          container
          flex
          flex-col
          items-center
          justify-center
          px-5
          pt-20
          text-center
          md:pt-35
        "
      >
        {/* Small Label */}
        <p
          className="
            text-[11px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[var(--text)]
            md:text-[12px]
          "
        >
          Legal
        </p>

        {/* Main Heading */}
        <div ref={headingRef} className="mt-8">
          <h1
            className="
              font-playfair
              text-[46px]
              font-medium
              leading-[0.95]
              tracking-[-0.04em]
              text-[var(--heading)]
              sm:text-[52px]
              md:text-[60px]
              lg:text-[64px]
            "
          >
            Terms of
          </h1>

          <p
            className="
              mt-1
              font-playfair
              text-[44px]
              italic
              leading-[0.95]
              tracking-[-0.04em]
              text-[var(--text)]
              sm:text-[50px]
              md:text-[58px]
              lg:text-[62px]
            "
          >
            Service
          </p>
        </div>

        {/* Main Description */}
        <p
          ref={descriptionRef}
          className="
            mt-8
            max-w-[780px]
            text-[16px]
            font-normal
            leading-[1.7]
            text-[var(--text)]
            md:text-[18px]
          "
        >
          These Terms of Service outline the rules and conditions for accessing
          and using Sartique, including our platform, tools, features,
          integrations, and related services.
        </p>

        {/* Bottom Text */}
        <p
          ref={bottomTextRef}
          className="
            mt-6
            max-w-[850px]
            text-[13px]
            font-normal
            leading-relaxed
            text-[var(--text)]
            md:text-[14px]
          "
        >
          By accessing or using Sartique, you agree to these Terms. If you do
          not agree, please discontinue use of the Platform.
        </p>

        {/* Bottom Decoration */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-[70px] bg-[var(--text-light)]" />

          <span className="h-[8px] w-[8px] rounded-full bg-[var(--text-light)]" />

          <span className="h-px w-[70px] bg-[var(--text-light)]" />
        </div>
      </div>
    </section>
  );
};

export default TermsHero;
