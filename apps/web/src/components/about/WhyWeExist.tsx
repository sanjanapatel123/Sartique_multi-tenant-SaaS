"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyWeExist = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

    const ctx = gsap.context(() => {
      /* ---------------- Heading Animation ---------------- */

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

      /* ---------------- Paragraph Animation ---------------- */
      /*
        No Y movement
        No Scale
        Exact same position
        Only opacity + blur reveal
      */

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
            duration: 1.4,
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
      <div className="container pb-20 text-center md:pb-24">
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
          Why We Exist
        </p>

        {/* Heading */}
        <div ref={headingRef} className="mx-auto mt-6 max-w-[950px]">
          <h2
            className="
              font-playfair
              text-[38px]
              font-medium
              leading-[1.08]
              tracking-[-0.04em]
              text-[var(--heading)]
              sm:text-[42px]
              md:text-[48px]
              lg:text-[52px]
            "
          >
            Remove Operational Chaos —
          </h2>

          <p
            className="
              mt-2
              font-playfair
              text-[36px]
              font-medium
              leading-[1.08]
              tracking-[-0.04em]
              text-[var(--heading)]
              sm:text-[40px]
              md:text-[46px]
              lg:text-[50px]
            "
          >
            Without Losing{" "}
            <span className="italic text-[var(--text)]">Creativity.</span>
          </p>
        </div>

        {/* Paragraph Content */}
        <div
          ref={contentRef}
          className="
            mx-auto
            mt-12
            max-w-[650px]
            space-y-7
            text-[15px]
            font-normal
            leading-[1.7]
            text-[var(--text)]
            md:text-[17px]
          "
        >
          <p>
            Sartique was built on a simple belief: growing a great brand
            shouldn&apos;t require more spreadsheets, more manual work, or more
            operational stress.
          </p>

          <p>
            We created Sartique as a connected operational backbone — bringing
            customers, orders, workflows, production, and teams together in one
            seamless system.
          </p>

          <p className="text-[var(--heading)]/80">
            So founders can focus on vision.
            <br />
            Teams can focus on creating.
            <br />
            And businesses can grow with confidence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyWeExist;
