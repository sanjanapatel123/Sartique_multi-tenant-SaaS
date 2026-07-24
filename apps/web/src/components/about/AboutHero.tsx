"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".pricing-label",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
      )
        .fromTo(
          ".pricing-title",
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".pricing-description",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .fromTo(
          ".pricing-offer",
          {
            opacity: 0,
            y: 30,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.45",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--background)] px-5 py-24 md:px-10 md:py-32 lg:pt-36 lg:pb-10"
    >
      <div className="mx-auto flex max-w-[1320px] flex-col items-center text-center">
        {/* Label */}
        <p className="pricing-label mb-3 text-[13px] font-medium uppercase tracking-[0.3em] text-[var(--text)] md:text-[15px]">
          About Us
        </p>

        {/* Heading */}
        <h2 className="pricing-title max-w-[850px] font-playfair text-[38px] leading-[0.95] tracking-[-0.04em] text-[var(--heading)] md:text-[72px] lg:text-[62px]">
          Great Brands Deserve
          <span className="block text-[var(--text)] font-playfair italic">
            Smarter Operations.
          </span>
        </h2>

        {/* Description */}
        <p className="pricing-description mt-6 max-w-[800px] font-[var(--font-body)] text-[18px] leading-[1.5] text-[var(--text)] md:text-[20px]">
          Growing a remarkable brand shouldn’t mean juggling scattered tools,
          endless
          <span className="block md:inline">
            {" "}
            spreadsheets, and manual follow-ups.
          </span>
        </p>

        <p className="pricing-description text-gray-600 mt-6 max-w-[800px] text-[18px] leading-[1.5] md:text-[20px]">
          We knew there was a smarter way. <br />
          <span className="block md:inline text-black"> So we created Sartique.</span>
        </p>
        {/* Bottom subtle line */}
        <div className="mt-14 h-px w-[260px] bg-gradient-to-r from-transparent via-[var(--text-light)] to-transparent md:w-[420px]" />
      </div>
    </section>
  );
};

export default AboutHero;
