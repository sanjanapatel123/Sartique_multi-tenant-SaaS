"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PricingHero = () => {
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
          Pricing
        </p>

        {/* Heading */}
        <h2 className="pricing-title max-w-[850px] font-playfair text-[38px] leading-[0.95] tracking-[-0.04em] text-[var(--heading)] md:text-[72px] lg:text-[62px]">
          Simple pricing for
          <span className="block font-normal italic">every atelier</span>
        </h2>

        {/* Description */}
        <p className="pricing-description mt-6 max-w-[800px] font-[var(--font-body)] text-[18px] leading-[1.5] text-[var(--text)] md:text-[20px]">
          Start with what you need, scale when you&apos;re ready. Every plan
          <span className="block md:inline"> includes the full platform.</span>
        </p>

        {/* Limited Offer */}
        <div className="pricing-offer mt-10 w-full max-w-[870px] md:mt-9">
          <div className="flex flex-col items-center justify-center gap-4 rounded-[24px] border border-[var(--border)] px-3 py-4 md:flex-row md:gap-3 md:px-9 bg-[var(--text-light)]">
            {/* Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[var(--background)]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3L13.4 7.6L18 9L13.4 10.4L12 15L10.6 10.4L6 9L10.6 7.6L12 3Z"
                  stroke="#4e7b58"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 3L19.1 5L21 5.6L19.1 6.2L18.5 8L17.9 6.2L16 5.6L17.9 5L18.5 3Z"
                  stroke="#4e7b58"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 13L5.8 15.7L8.5 16.5L5.8 17.3L5 20L4.2 17.3L1.5 16.5L4.2 15.7L5 13Z"
                  stroke="#4e7b58"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
              <p className="font-[var(--font-body)] text-[15px] text-[var(--heading)] md:text-[18px]">
                Limited Offer —{" "}
                <span className="font-semibold text-[var(--text)]">₹99/month</span>{" "}
                for the first month
              </p>

              <div className="hidden h-6 w-px bg-[var(--border)] md:block" />

              <p className="font-[var(--font-body)] text-[14px] text-[var(--text)] md:text-[15px]">
                No lock-in. Cancel anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom subtle line */}
        <div className="mt-14 h-px w-[260px] bg-gradient-to-r from-transparent via-[var(--text-light)] to-transparent md:w-[420px]" />
      </div>
    </section>
  );
};

export default PricingHero;
