"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ModelType = "grow" | "fixed";
type BillingType = "yearly" | "monthly";

const PricingModel = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const [model, setModel] = useState<ModelType>("grow");
  const [billing, setBilling] = useState<BillingType>("yearly");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-model-content",
        {
          opacity: 0,
          scale: 1.35,
          y: 100, // start neeche se
        },
        {
          opacity: 1,
          scale: 1,
          y: 0, // animate hoke upar apni position par
          duration: 1.4,
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
      className="overflow-hidden bg-[var(--background)] px-5"
    >
      <div className="pricing-model-content mx-auto flex max-w-[760px] flex-col items-center">
        {/* Label */}
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--text)] md:text-[13px]">
          Choose Your Model
        </p>

        {/* Model Selection */}
        <div className="flex w-full max-w-[540px] flex-col gap-3 sm:flex-row">
          {/* Pay As You Grow */}
          <button
            onClick={() => setModel("grow")}
            className={`relative flex flex-1 items-center gap-4 rounded-[18px] border px-5 py-5 text-left transition-all duration-300 ${
              model === "grow"
                ? "border-[var(--text)] bg-white shadow-[0_8px_25px_rgba(80,65,50,0.12)]"
                : "border-[var(--border)] bg-transparent"
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] transition-colors ${
                model === "grow"
                  ? "bg-[var(--text)] text-white"
                  : "bg-[#efedea] text-[var(--text)]"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 17L9 11L13 15L21 7" />
                <path d="M15 7H21V13" />
              </svg>
            </div>

            <div>
              <p className="text-[15px] font-semibold text-[var(--heading)] md:text-[16px]">
                Pay As You Grow
              </p>
              <p className="mt-1 text-[12px] text-[var(--text)] md:text-[13px]">
                Base fee + % on sales
              </p>
            </div>

            {model === "grow" && (
              <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-[var(--text)]" />
            )}
          </button>

          {/* Fixed Price */}
          <button
            onClick={() => setModel("fixed")}
            className={`relative flex flex-1 items-center gap-4 rounded-[18px] border px-5 py-5 text-left transition-all duration-300 ${
              model === "fixed"
                ? "border-[var(--text)] bg-white shadow-[0_8px_25px_rgba(80,65,50,0.12)]"
                : "border-[var(--border)] bg-transparent"
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] transition-colors ${
                model === "fixed"
                  ? "bg-[var(--background)] text-white"
                  : "bg-[#ddf3e2] text-[var(--text)]"
              }`}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4e7b58"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </div>

            <div>
              <p className="text-[15px] font-semibold text-[var(--heading)] md:text-[16px]">
                Fixed Price
              </p>
              <p className="mt-1 text-[12px] text-[var(--text)] md:text-[13px]">
                One flat monthly fee
              </p>
            </div>

            {model === "fixed" && (
              <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-[#806b55]" />
            )}
          </button>
        </div>

        {/* Description */}
        <p className="mt-7 max-w-[570px] text-center text-[14px] leading-[1.6] text-[var(--text)] md:text-[15px]">
          {model === "grow"
            ? "Lower base fee with a small percentage on sales. Great when you're starting out or have variable revenue."
            : "One predictable monthly fee with no percentage on sales. Perfect for established businesses with consistent revenue."}
        </p>

        {/* Billing Selector */}
        <div className="mt-10 flex items-center gap-5 rounded-[18px] border border-[var(--border)] px-5 py-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--text)] md:text-[12px]">
            Billing
          </span>

          <div className="flex rounded-full bg-[var(--background)] p-1">
            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-6 py-2 text-[13px] font-medium transition-all duration-300 md:text-[14px] ${
                billing === "yearly"
                  ? "bg-[var(--text)] text-white shadow-sm"
                  : "text-[var(--text)]"
              }`}
            >
              Yearly{" "}
              <span
                className={
                  billing === "yearly" ? "text-white/70" : "text-[var(--text)]"
                }
              >
                −20%
              </span>
            </button>

            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-6 py-2 text-[13px] font-medium transition-all duration-300 md:text-[14px] ${
                billing === "monthly"
                  ? "bg-[var(--text)] text-white shadow-sm"
                  : "text-[var(--text)]"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingModel;
