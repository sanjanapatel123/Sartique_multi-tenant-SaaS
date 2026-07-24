"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  "Retail",
  "Fashion",
  "Manufacturing",
  "Wholesale",
  "Custom Orders",
];

const BiggerVision = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

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

      /* ---------------- Content ---------------- */

      gsap.set(content, {
        opacity: 0,
        filter: "blur(10px)",
      });

      ScrollTrigger.create({
        trigger: content,
        start: "top 90%",
        once: true,

        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power2.out",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--background)]"
    >
      <div className="container pb-20 text-center md:pb-24">
        {/* Label */}

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
          THE BIGGER VISION
        </p>

        {/* Heading */}

        <div ref={headingRef} className="mx-auto mt-6 max-w-[980px]">
          <h2
            className="
              font-playfair
              text-[38px]
              font-medium
              leading-[1.05]
              tracking-[-0.04em]
              text-[var(--heading)]
              sm:text-[44px]
              md:text-[50px]
              lg:text-[54px]
            "
          >
            Building the Connected Platform
          </h2>

          <p
            className="
              mt-2
              font-playfair
              text-[36px]
              italic
              leading-[1.05]
              tracking-[-0.04em]
              text-[var(--text)]
              sm:text-[42px]
              md:text-[54px]
              lg:text-[52px]
            "
          >
            for Modern Brands.
          </p>
        </div>

        {/* Content */}

        <div
          ref={contentRef}
          className="
            mx-auto
            mt-10
            max-w-[760px]
            text-[16px]
            leading-[1.75]
            text-[var(--text)]
            md:text-[18px]
          "
        >
          <p>
            Sartique brings customers, operations, production, inventory,
            communication, and workflows together into one connected platform.
          </p>

          <p className="mt-8">
            Instead of switching between disconnected tools, every team works
            from a single source of truth that keeps information organized,
            processes streamlined, and collaboration effortless.
          </p>

          <p
            className="
              mt-8
              text-[var(--heading)]
              font-medium
            "
          >
            Our vision is to become the operational foundation for ambitious
            businesses that want to scale without sacrificing quality, speed, or
            control.
          </p>

          <p className="mt-8 text-[var(--heading)]/80">
            Built to simplify operations. Designed to support growth.
          </p>

          {/* Industries */}

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {industries.map((item) => (
              <span
                key={item}
                className="
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--section)]
                  px-6
                  py-3
                  text-[15px]
                  text-[var(--text)]
                  transition-all
                  duration-300
                  hover:border-[var(--primary)]
                  hover:bg-[var(--primary)]
                  hover:text-white
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiggerVision;
