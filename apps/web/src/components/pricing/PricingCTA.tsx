"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PricingCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-cta-content",
        {
          opacity: 0,
          scale: 1.2,
          y: 80,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[var(--background)] px-5 py-20 md:py-14"
    >
      <div className="pricing-cta-content mx-auto flex max-w-[900px] flex-col items-center text-center">
        {/* Heading */}
        <h2 className="font-playfair text-[36px] leading-tight tracking-[-0.02em] text-[var(--heading)] md:text-[46px]">
          Ready to begin?
        </h2>

        {/* Description */}
        <p className="mt-5 font-[var(--font-sans)] text-[16px] leading-relaxed text-[var(--text)] md:text-[19px]">
          Start your 14-day free trial. No credit card required.
        </p>

        {/* Button */}
        <button
          className="
            mt-10
            min-w-[210px]
            rounded-full
            bg-[var(--primary)]
            px-8
            py-4
            font-[var(--font-sans)]
            text-[15px]
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[var(--primary-light)]
            hover:shadow-[0_12px_30px_rgba(46,56,43,0.2)]
            md:mt-11
          "
        >
          Start Free Trial
        </button>
      </div>
    </section>
  );
};

export default PricingCTA;
