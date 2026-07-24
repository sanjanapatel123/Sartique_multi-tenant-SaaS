"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FinalCTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const buttonsContainer = buttonsRef.current;

    if (!section || !heading || !description || !buttonsContainer) return;

    const ctx = gsap.context(() => {
      const buttons = gsap.utils.toArray<HTMLElement>(".final-cta-button");

      /* Heading Initial State */
      gsap.set(heading, {
        opacity: 0.15,
        y: 90,
        scale: 0.95,
      });

      /* Description Initial State */
      gsap.set(description, {
        opacity: 0,
        scale: 1.08,
      });

      /* Buttons Initial State */
      gsap.set(buttons, {
        opacity: 0,
        scale: 1.08,
      });

      /* Animation Timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      // Heading
      tl.to(heading, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.25,
        ease: "power3.out",
      })

        // Description
        .to(
          description,
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6",
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
          "-=0.5",
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
        py-20
        md:py-28
      "
    >
      <div
        className="
          container
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        {/* Heading */}
        <div ref={headingRef}>
          <h2
            className="
              font-playfair
              text-[38px]
              font-medium
              leading-[1]
              tracking-[-0.03em]
              text-[var(--heading)]
              sm:text-[40px]
              md:text-[50px]
              lg:text-[50px]
            "
          >
            Ready to Bring Everything Together?
          </h2>

          {/* Italic Second Line */}
          <p
            className="
              mt-2
              font-playfair
              text-[36px]
              italic
              leading-[1]
              tracking-[-0.03em]
              text-[var(--heading)]
              sm:text-[40px]
              md:text-[50px]
              lg:text-[50px]
            "
          >
            See How Simple It Can Feel.
          </p>
        </div>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="
            mt-5
            max-w-[650px]
            text-[15px]
            leading-[1.6]
            text-[var(--text)]
            md:text-[16px]
          "
        >
          Sartique brings your orders, team, production, and clients into one
          seamless flow — so your brand can grow without the operational chaos.
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-center
            gap-4
            sm:flex-row
          "
        >
          {/* Primary Button */}
          <Link
            href="/demo"
            className="
              final-cta-button
              inline-flex
              h-14
              min-w-[250px]
              items-center
              justify-center
              rounded-full
              bg-[var(--primary)]
              px-6
              text-[15px]
              font-medium
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:opacity-90
            "
          >
            See Sartique in Action
          </Link>

          {/* Secondary Button */}
          <Link
            href="/contact"
            className="
              final-cta-button
              inline-flex
              h-14
              min-w-[170px]
              items-center
              justify-center
              rounded-full
              border
              border-[var(--border)]
              bg-transparent
              px-6
              text-[15px]
              font-medium
              text-[var(--heading)]
              transition-all
              duration-300
              hover:scale-105
              hover:border-[var(--text-light)]
              hover:bg-white/40
            "
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
