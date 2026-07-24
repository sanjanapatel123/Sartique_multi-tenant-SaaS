"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Plan = {
  name: string;
  description: string;
  price: string;
  afterPrice: string;
  revenueShare: string;
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Indie Start",
    description: "Trying Sartique with real orders",
    price: "99",
    afterPrice: "₹999/mo + 3% rev share",
    revenueShare: "3% REV SHARE",
  },
  {
    name: "Indie Atelier",
    description: "Growing ateliers seeking control",
    price: "99",
    afterPrice: "₹5,999/mo + 2.5% rev share",
    revenueShare: "2.5% REV SHARE",
    popular: true,
  },
  {
    name: "Atelier Pro",
    description: "Scaling brands with complexity",
    price: "99",
    afterPrice: "₹9,999/mo + 2% rev share",
    revenueShare: "2% REV SHARE",
  },
  {
    name: "Master Atelier",
    description: "Established studios & export houses",
    price: "99",
    afterPrice: "₹14,999/mo + 1.5% rev share",
    revenueShare: "1.5% REV SHARE",
  },
];

const PricingCards = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        {
          opacity: 0,
          y: 100,
          scale: 1.12,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
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
      className="overflow-hidden bg-[var(--background)] px-5 py-16 md:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card relative flex min-h-[400px] flex-col rounded-[22px] border p-8 transition-transform duration-300 md:min-h-[400px] lg:p-9 ${
              plan.popular
                ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_20px_50px_rgba(46,56,43,0.22)]"
                : "border-[var(--border)] bg-[var(--section)]"
            }`}
          >
            {/* Most Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-5 right-0 flex items-center gap-2 rounded-full bg-[var(--section)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)] shadow-sm">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>

                <span>
                  Most
                  <br />
                  Popular
                </span>
              </div>
            )}

            {/* Top Content */}
            <div>
              <h3
                className={`font-playfair text-[24px] leading-tight ${
                  plan.popular ? "text-white" : "text-[var(--heading)]"
                }`}
              >
                {plan.name}
              </h3>

              <p
                className={`mt-2 min-h-[48px] text-[15px] leading-[1.5] ${
                  plan.popular
                    ? "text-[var(--text-light)]"
                    : "text-[var(--text)]"
                }`}
              >
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-5">
                <div className="flex items-end gap-1">
                  <span
                    className={`mb-1 text-[16px] ${
                      plan.popular ? "text-white" : "text-[var(--heading)]"
                    }`}
                  >
                    ₹
                  </span>

                  <span
                    className={`text-[40px] font-semibold leading-none ${
                      plan.popular ? "text-white" : "text-[var(--heading)]"
                    }`}
                  >
                    {plan.price}
                  </span>

                  <span
                    className={`mb-1 text-[17px] ${
                      plan.popular ? "text-white/60" : "text-[var(--text)]"
                    }`}
                  >
                    /mo
                  </span>
                </div>

                <p
                  className={`mt-3 text-[13px] ${
                    plan.popular ? "text-white/60" : "text-[var(--text)]"
                  }`}
                >
                  First month
                </p>

                <p
                  className={`mt-2 text-[14px] ${
                    plan.popular ? "text-white/70" : "text-[var(--text)]"
                  }`}
                >
                  then{" "}
                  <strong
                    className={
                      plan.popular ? "text-white" : "text-[var(--heading)]"
                    }
                  >
                    {plan.afterPrice}
                  </strong>
                </p>

                <p
                  className={`mt-1 text-[13px] ${
                    plan.popular ? "text-white/50" : "text-[var(--text)]/70"
                  }`}
                >
                  billed yearly
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              className={`mt-auto w-full rounded-full px-6 py-4 text-[15px] font-semibold transition-all duration-300 ${
                plan.popular
                  ? "bg-[var(--background)] text-[var(--primary)] hover:scale-[1.02]"
                  : "bg-[var(--primary)] text-white hover:bg-[var(--primary-light)] hover:scale-[1.02]"
              }`}
            >
              Start Free Trial
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingCards;
