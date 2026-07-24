"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FutureSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

    const ctx = gsap.context(() => {
      /*
      ==========================================================
      HEADING
      Strong one-time animation
      ==========================================================
      */

      gsap.set(heading, {
        opacity: 0.15,
        y: 80,
        scale: 0.96,
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
            duration: 1.2,
            ease: "power3.out",
          });
        },
      });

      /*
      ==========================================================
      DESCRIPTION + BUTTONS
      Initially invisible
      Scroll par fade in
      ==========================================================
      */

      gsap.set(content, {
        opacity: 0,
        y: 35,
      });

      ScrollTrigger.create({
        trigger: content,
        start: "top 90%",
        once: true,

        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 1,
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
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        overflow-hidden
        py-20

        md:py-24
        lg:py-28
      "
    >
      {/* Subtle background glow */}
      <div className="container relative z-10">
        <div
          className="
            mx-auto
            max-w-[1100px]
            text-center
          "
        >
          {/* ======================================
              EYEBROW - NO ANIMATION
          ====================================== */}

          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.38em]
              text-[var(--text-light)]

              sm:text-[11px]
              md:text-[12px]
            "
          >
            The Future of Fashion Operations
          </p>

          {/* ======================================
              MAIN HEADING
          ====================================== */}

          <h2
            ref={headingRef}
            className="
              mt-8

              font-playfair

              text-[40px]
              font-medium

              leading-[0.95]

              tracking-[-0.045em]

              text-[var(--heading)]

              sm:text-[40px]

              md:text-[55px]

              lg:text-[55px]
            "
          >
            Control is the new
            <br />
            <span
              className="
                font-normal
                italic
                text-[var(--text)]
              "
            >
              confidence.
            </span>
          </h2>

          {/* ======================================
              DIVIDER
          ====================================== */}

          <div
            className="
              mx-auto
              mt-9
              flex
              items-center
              justify-center
              gap-4

              md:mt-10
            "
          >
            <span
              className="
                h-px
                w-14
                bg-[var(--text-light)]

                md:w-20
              "
            />

            <span
              className="
                h-[7px]
                w-[7px]
                rounded-full
                bg-[var(--text-light)]
              "
            />

            <span
              className="
                h-px
                w-14
                bg-[var(--text-light)]

                md:w-20
              "
            />
          </div>

          {/* ======================================
              FADE-IN CONTENT
          ====================================== */}

          <div ref={contentRef}>
            {/* Description */}

            <p
              className="
                mx-auto
                mt-9
                max-w-[700px]

                text-[18px]

                leading-relaxed

                text-[var(--text)]/70

                sm:text-[20px]
                md:mt-10
                md:text-[20px]
              "
            >
              Leave scattered workflows behind. Build every order with clarity,
              precision, and control.
            </p>

            {/* ====================================
                BUTTONS
            ==================================== */}

            <div
              className="
                mt-10
                flex
                flex-col
                items-center
                justify-center
                gap-4

                sm:flex-row

                md:mt-12
                md:gap-5
              "
            >
              {/* Primary */}

              <button
                type="button"
                className="
                  min-w-[230px]

                  rounded-full

                  bg-[var(--primary)]

                  px-4
                  py-[15px]

                  text-[15px]
                  font-medium

                  text-white

                  transition-all
                  duration-300

                  hover:scale-[1.03]
                  hover:bg-[var(--primary-light)]

                  md:min-w-[230px]
                  md:text-[16px]
                "
              >
                Experience Sartique
              </button>

              {/* Secondary */}

              <button
                type="button"
                className="
                  group

                  flex
                  min-w-[230px]

                  items-center
                  justify-center

                  gap-4

                  rounded-full

                  border
                  border-[var(--primary)]/10

                  bg-transparent

                  px-8
                  py-[15px]

                  text-[15px]
                  font-medium

                  text-[var(--heading)]

                  transition-all
                  duration-300

                  hover:border-[var(--primary)]/25
                  hover:bg-white/30

                  md:min-w-[180px]
                  md:text-[16px]
                "
              >
                Talk to Us
                <span
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
