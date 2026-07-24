"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PromiseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: "◆", label: "Orders" },
    { icon: "◇", label: "Inventory" },
    { icon: "▫", label: "Production" },
    { icon: "○", label: "Clients" },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      // Initial state
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
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div
        className="
          relative z-10
          mx-auto
          flex
          max-w-[1400px]
          flex-col
          items-center
          px-5
          pb-7
          pt-0
          text-center
          md:px-10
          md:pt-11
        "
      >
        {/* Small heading */}
        <p className="text-[12px] font-medium uppercase tracking-[0.42em] text-[var(--text-light)] md:text-[14px]">
          The Promise
        </p>

        {/* Main Heading - Both lines animate together */}
        <div
          ref={headingRef}
          className="mt-6 md:mt-6"
        >
          <h2
            className="
              font-playfair
              text-[34px]
              font-medium
              leading-[1.05]
              tracking-[-0.03em]
              text-[#181818]
              sm:text-[46px]
              md:text-[52px]
              lg:text-[52px]
            "
          >
            One platform. Every detail.
          </h2>

          <p
            className="
              mt-2
              font-playfair
              text-[32px]
              italic
              leading-[1.1]
              tracking-[-0.03em]
              sm:text-[44px]
              md:text-[50px]
              lg:text-[46px]
            "
          >
            Beautifully connected.
          </p>
        </div>

        {/* Divider */}
        <div className="mt-7 flex items-center justify-center gap-4 md:mt-12">
          <span className="h-px w-[90px] bg-[var(--text-light)]" />

          <span className="h-[9px] w-[9px] rounded-full bg-[var(--text-light)]" />

          <span className="h-px w-[90px] bg-[var(--text-light)]" />
        </div>

        {/* Description */}
        <p
          className="
            mt-10
            max-w-[760px]
            text-[18px]
            font-normal
            leading-[1.45]
            md:text-[20px]
          "
        >
          Sartique brings orders, inventory, production,
          <br className="hidden md:block" />
          and clients together in one seamless workflow.
        </p>

        {/* Feature Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-5">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="
                flex
                items-center
                gap-3
                rounded-full
                border
                border-[var(--text-light)]
                bg-white/20
                px-3
                py-2
                text-[15px]
                hover:border-[var(--text)]
                md:px-3
                md:py-3
                md:text-[16px]
              "
            >
              <span className="text-[11px]">
                {feature.icon}
              </span>

              <span>{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <p
          className="
            pt-10
            text-[11px]
            font-medium
            uppercase
            tracking-[0.12em]
            opacity-60
            sm:text-[10px]
            md:text-[13px]
          "
        >
          No scattered tools · No complex workflows · No unnecessary stress
        </p>
      </div>
    </section>
  );
};

export default PromiseSection;