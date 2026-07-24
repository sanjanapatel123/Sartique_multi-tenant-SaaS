"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  "Scattered conversations",
  "Complex spreadsheets",
  "Manual tracking",
  "Endless follow-ups",
];

const RealProblem = () => {
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

      /* ---------------- Content Animation ---------------- */
      /* Only Zoom Out - No Up / Down Movement */

      gsap.set(content, {
        opacity: 0,
        scale: 1.08,
      });

      ScrollTrigger.create({
        trigger: content,
        start: "top 90%",
        once: true,

        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
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
      <div className="container py-16 md:py-20">
        <div className="mx-auto max-w-[850px]">
          {/* ---------------- Label ---------------- */}

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
            The Real Challenge
          </p>

          {/* ---------------- Heading ---------------- */}

          <div ref={headingRef} className="mt-5 text-center">
            <h2
              className="
                font-playfair
                text-[38px]
                font-medium
                leading-[1.05]
                tracking-[-0.04em]
                text-[var(--heading)]
                sm:text-[42px]
                md:text-[48px]
              "
            >
              Business Moved Forward.
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
                sm:text-[40px]
                md:text-[46px]
              "
            >
              Operations Fell Behind.
            </p>
          </div>

          {/* ---------------- Remaining Content ---------------- */}

          <div ref={contentRef}>
            {/* Intro */}

            <p
              className="
                mt-10
                text-[15px]
                leading-[1.7]
                text-[var(--text)]
                md:text-[17px]
              "
            >
              Commerce evolved. Customer expectations grew. Businesses became
              faster and more connected.
            </p>

            <p
              className="
                mt-5
                text-[15px]
                leading-[1.7]
                text-[var(--text)]
                md:text-[17px]
              "
            >
              Yet growing brands still find themselves managing everyday
              operations through disconnected tools and manual processes:
            </p>

            {/* ---------------- Problem Cards ---------------- */}

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {problems.map((problem) => (
                <div
                  key={problem}
                  className="
                    flex
                    min-h-[58px]
                    items-center
                    gap-4
                    rounded-[14px]
                    border
                    border-[var(--border)]
                    bg-[var(--section)]
                    px-5
                    py-4
                  "
                >
                  <span
                    className="
                      h-[7px]
                      w-[7px]
                      shrink-0
                      rounded-full
                      bg-[var(--text-light)]
                    "
                  />

                  <span
                    className="
                      text-[14px]
                      font-normal
                      text-[var(--text)]
                      md:text-[15px]
                    "
                  >
                    {problem}
                  </span>
                </div>
              ))}
            </div>

            {/* ---------------- Bottom Content ---------------- */}

            <div className="mt-9">
              <p
                className="
                  text-[14px]
                  leading-[1.7]
                  text-[var(--text)]
                  md:text-[16px]
                "
              >
                Not because businesses resisted technology. But because{" "}
                <span className="italic text-[var(--heading)]">
                  technology never truly understood how they work.
                </span>
              </p>

              <div
                className="
                  mt-5
                  space-y-1
                  text-[14px]
                  leading-[1.6]
                  text-[var(--text)]
                  md:text-[15px]
                "
              >
                <p>Generic tools weren&apos;t built for evolving workflows.</p>
                <p>Spreadsheets weren&apos;t built for connected operations.</p>
                <p>Manual processes weren&apos;t built to scale.</p>
              </div>

              {/* Final Line */}

              <p
                className="
                  mt-6
                  text-[15px]
                  font-medium
                  text-[var(--heading)]
                  md:text-[17px]
                "
              >
                Growth was never the problem. The systems were.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealProblem;
