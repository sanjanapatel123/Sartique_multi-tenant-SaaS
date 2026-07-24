"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SolutionsCTA = () => {
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
        // Label
        .from(".cta-label", {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: "power3.out",
        })

        // Heading lines
        .from(
          ".cta-title-line",
          {
            opacity: 0,
            y: 55,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.3",
        )

        // Decorative divider
        .from(
          ".cta-divider",
          {
            opacity: 0,
            scaleX: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.35",
        )

        .from(
          ".cta-dot",
          {
            opacity: 0,
            scale: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        )

        // Description
        .from(
          ".cta-description",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.25",
        )

        // Buttons
        .from(
          ".cta-button",
          {
            opacity: 0,
            y: 25,
            duration: 0.6,
            stagger: 0.12,
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
        border-t border-[var(--border)]
        bg-[var(--background)]
        px-5 py-16
        md:px-10 md:py-20
        lg:py-24
      "
    >
      <div className="mx-auto max-w-[1100px] text-center">
        {/* Label */}
        <p
          className="
            cta-label
            text-[12px] font-medium uppercase
            tracking-[0.25em]
            text-[var(--text)]
            md:text-[13px]
          "
        >
          Crafted Around Your Business
        </p>

        {/* Heading */}
        <div className="mt-5">
          <div className="overflow-hidden">
            <h2
              className="
                cta-title-line
                font-playfair
                text-[38px] leading-[1.05]
                tracking-[-0.02em]
                text-[var(--heading)]
                md:text-[48px]
                lg:text-[58px]
              "
            >
              However You Create,
            </h2>
          </div>

          <div className="mt-1 overflow-hidden">
            <h3
              className="
                cta-title-line
                font-playfair
                text-[38px] leading-[1.05]
                tracking-[-0.02em]
                text-[var(--heading)]
                md:text-[48px]
                lg:text-[58px]
              "
            >
              Sartique <em className="font-normal italic">Fits In.</em>
            </h3>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span
            className="
              cta-divider
              h-px w-[70px]
              origin-right
              bg-[var(--text-light)]
            "
          />

          <span
            className="
              cta-dot
              h-[8px] w-[8px]
              rounded-full
              bg-[var(--text-light)]
            "
          />

          <span
            className="
              cta-divider
              h-px w-[70px]
              origin-left
              bg-[var(--text-light)]
            "
          />
        </div>

        {/* Description */}
        <p
          className="
            cta-description
            mx-auto mt-8
            max-w-[650px]
            font-[var(--font-body)]
            text-[16px] leading-[1.6]
            text-[var(--text)]
            md:text-[18px]
          "
        >
          Your craft has its own rhythm. Your tools should support it, not stand
          in the way.
        </p>

        {/* Buttons */}
        <div
          className="
            mt-10
            flex flex-col
            items-center justify-center
            gap-3
            sm:flex-row
          "
        >
          {/* Primary Button */}
          <button
            type="button"
            className="
              cta-button
              min-h-[54px]
              w-full
              rounded-full
              bg-[var(--primary)]
              px-8
              font-[var(--font-body)]
              text-[15px] font-medium
              text-white
              transition-all duration-300
              hover:opacity-90
              sm:w-auto
              sm:min-w-[310px]
            "
          >
            See How Sartique Works for You
          </button>

          {/* Secondary Button */}
          <button
            type="button"
            className="
              cta-button
              flex min-h-[54px]
              w-full
              items-center justify-center
              gap-3
              rounded-full
              border border-[var(--border)]
              bg-white
              px-8
              font-[var(--font-body)]
              text-[15px] font-medium
              text-[var(--heading)]
              transition-all duration-300
              hover:border-[var(--primary)]
              sm:w-auto
              sm:min-w-[190px]
            "
          >
            Talk to Us
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsCTA;
