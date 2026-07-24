"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Built for modern business workflows",
  "Designed around real collaboration",
  "Complete visibility across operations",
  "Automation without complexity",
  "Scales as your business grows",
];

const WhatMakesDifferent = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const list = listRef.current;
    const bottom = bottomRef.current;

    if (!section || !heading || !list || !bottom) return;

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

      /* ---------------- Feature Cards ---------------- */

      const items = gsap.utils.toArray<HTMLElement>(".feature-item");

      gsap.set(items, {
        opacity: 0,
        x: -35,
      });

      ScrollTrigger.create({
        trigger: list,
        start: "top 88%",
        once: true,

        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "power2.out",
          });
        },
      });

      /* ---------------- Bottom Text ---------------- */

      gsap.set(bottom, {
        opacity: 0,
        filter: "blur(8px)",
      });

      ScrollTrigger.create({
        trigger: bottom,
        start: "top 92%",
        once: true,

        onEnter: () => {
          gsap.to(bottom, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
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
      className="relative overflow-hidden bg-[var(--background)] pb-20 md:pb-24"
    >
      <div className="container">
        {/* Label */}

        <p
          className="
            text-center
            text-[11px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-[var(--text)]
            md:text-[12px]
          "
        >
          WHAT MAKES US DIFFERENT
        </p>

        {/* Heading */}

        <div
          ref={headingRef}
          className="mx-auto mt-5 max-w-[900px] text-center"
        >
          <h2
            className="
              font-playfair
              text-[38px]
              font-medium
              leading-[1.08]
              tracking-[-0.04em]
              text-[var(--heading)]
              sm:text-[44px]
              md:text-[50px]
            "
          >
            More Than Just
            <span className="italic text-[var(--text)]">
              {" "}
              Business Software.
            </span>
          </h2>
        </div>

        {/* Feature List */}

        <div
          ref={listRef}
          className="mx-auto mt-12 flex max-w-[660px] flex-col gap-4"
        >
          {features.map((item) => (
            <div
              key={item}
              className="
                feature-item
                flex
                items-center
                gap-5
                rounded-[18px]
                border
                border-[var(--border)]
                bg-[var(--section)]
                px-4
                py-4
              "
            >
              <div
                className="
                  flex
                  h-1
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                "
              >
                <Check
                  size={18}
                  className="text-[var(--primary)]"
                  strokeWidth={2.4}
                />
              </div>

              <p
                className="
                  text-[16px]
                  font-medium
                  text-[var(--heading)]
                  md:text-[17px]
                "
              >
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Text */}

        <div
          ref={bottomRef}
          className="mx-auto mt-12 max-w-[700px] text-center"
        >
          <p
            className="
              text-[17px]
              leading-relaxed
              text-[var(--text)]
              md:text-[18px]
            "
          >
            Sartique isn't another tool added to your workflow.
          </p>

          <p
            className="
              mt-2
              font-playfair
              text-[18px]
              italic
              text-[var(--heading)]
              md:text-[20px]
            "
          >
            It's the foundation that brings everything together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatMakesDifferent;
