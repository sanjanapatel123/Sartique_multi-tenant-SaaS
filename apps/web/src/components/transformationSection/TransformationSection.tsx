"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const beforeItems = [
  "Details scattered across conversations",
  "Pricing finalized after decisions",
  "Progress tracked through constant follow-ups",
  "External work managed separately",
  "Clients waiting for manual updates",
];

const afterItems = [
  "Every detail stays connected to the order",
  "Pricing updates alongside every decision",
  "Progress follows one visible workflow",
  "External partners stay connected",
  "Clients remain informed at every stage",
];

const TransformationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const pinAreaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const beforeCardRef = useRef<HTMLDivElement>(null);
  const afterCardRef = useRef<HTMLDivElement>(null);

  const buttonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const pinArea = pinAreaRef.current;
    const beforeCard = beforeCardRef.current;
    const afterCard = afterCardRef.current;
    const button = buttonRef.current;

    if (
      !section ||
      !heading ||
      !pinArea ||
      !beforeCard ||
      !afterCard ||
      !button
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initial state
      let hasHeadingAnimated = false;

      gsap.set(heading, {
        opacity: 0.2,
        y: 70,
        scale: 0.97,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",

        onEnter: () => {
          if (hasHeadingAnimated) return;

          hasHeadingAnimated = true;

          gsap.to(heading, {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 1.2,
            ease: "power3.out",
          });
        },
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(beforeCard, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
        });

        gsap.set(afterCard, {
          xPercent: 0,
          scale: 1,
        });

        gsap.set(button, {
          opacity: 0,
          y: 20,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: pinArea,

            start: "top top",

            end: "+=1500",

            pin: true,

            scrub: 0.8,

            anticipatePin: 1,

            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          {},
          {
            duration: 0.25,
          },
        );

        timeline.to(beforeCard, {
          xPercent: 105,
          scale: 0.96,
          duration: 1,
          ease: "power2.inOut",
        });
        timeline.to(beforeCard, {
          xPercent: 175,
          opacity: 0,
          scale: 0.92,
          duration: 0.8,
          ease: "power2.in",
        });

        timeline.to(
          afterCard,
          {
            xPercent: -53,
            scale: 1.02,
            duration: 1,
            ease: "power3.inOut",
          },
          "-=0.65",
        );

        timeline.to(button, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        timeline.to(
          {},
          {
            duration: 0.35,
          },
        );

        return () => {
          timeline.kill();

          gsap.set([beforeCard, afterCard, button], {
            clearProps: "all",
          });
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(beforeCard, {
          clearProps: "all",
        });

        gsap.set(afterCard, {
          clearProps: "all",
        });

        gsap.set(button, {
          opacity: 1,
          y: 0,
        });
      });

      return () => {
        mm.revert();
      };
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
        w-full
        overflow-hidden
        bg-[var(--background)]
      "
    >
      <div
        className="
          mx-auto
          w-[92%]
          max-w-[1100px]
          pb-10
          pt-20
          text-center

          md:pb-14
          md:pt-24

          lg:pb-16
        "
      >
        {/* No animation */}

        <p
          className="
            text-[11px]
            font-medium
            uppercase
            tracking-[0.12em]
            text-[var(--text-light)]

            md:text-[13px]
          "
        >
          The Transformation
        </p>

        {/* One time subtle animation */}

        <h2
          ref={headingRef}
          className="
            mt-4

            font-playfair

            text-[40px]
            font-semibold

            leading-[0.98]

            tracking-[-0.035em]

            text-[var(--heading)]

            md:text-[58px]

            lg:text-[68px]
          "
        >
          Same Process.
          <br />
          <span className="text-[var(--text)]">A Smarter Reality.</span>
        </h2>
      </div>
      <div
        ref={pinAreaRef}
        className="
          relative
          mx-auto
          w-full
          px-5
          pb-16
          md:flex
          md:h-screen
          md:items-center
          md:justify-center
          md:px-8
          md:pb-0
        "
      >
        <div
          className="
            w-full
            max-w-[1100px]
          "
        >
          <div
            ref={cardsRef}
            className="
                 relative
    flex
    flex-col
    gap-6

    md:flex-row
    md:items-stretch
    md:justify-center
    md:gap-7
            "
          >
            <div
              ref={beforeCardRef}
              className="
                relative

                z-10

                w-full

                shrink-0
               md:w-[38%]
              "
            >
              <div
                className="
    relative

    h-[480px]

    overflow-hidden

    rounded-[18px]

    border
    border-[var(--primary)]/15

    bg-white/70

    p-7

    shadow-lg
    shadow-black/[0.04]

    md:h-[500px]
    md:p-9

    lg:h-[470px]
    lg:p-10
  "
              >
                {/* Gradient */}

                <div
                  className="
                    pointer-events-none

                    absolute
                    right-0
                    top-0

                    h-32
                    w-32

                    rounded-bl-full

                    bg-gradient-to-bl
                    from-red-100/50
                    to-transparent
                  "
                />

                <div className="relative z-10">
                  {/* Label */}

                  <div className="mb-7 flex items-center gap-3">
                    <span
                      className="
                        h-2
                        w-2

                        animate-pulse

                        rounded-full

                        bg-red-300
                      "
                    />

                    <p
                      className="
                        text-[11px]

                        font-medium

                        uppercase

                        tracking-[0.28em]

                        text-[var(--text)]
                      "
                    >
                      Before
                    </p>
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      mb-8

                      font-playfair

                      text-[24px]
                      font-semibold

                      leading-[1.15]

                      text-[var(--heading)]

                      md:text-[28px]

                      lg:text-[30px]
                    "
                  >
                    Work feels scattered.
                  </h3>

                  {/* Items */}

                  <ul className="space-y-5">
                    {beforeItems.map((item) => (
                      <li
                        key={item}
                        className="
                          flex
                          items-start

                          gap-3

                          text-[15px]

                          leading-[1.55]

                          text-[var(--heading)]/70

                          md:text-[16px]
                        "
                      >
                        <svg
                          className="
                            mt-[4px]

                            h-4
                            w-4

                            shrink-0

                            text-red-300
                          "
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 4L12 12M12 4L4 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p
                    className="
                      mt-9

                      font-[var(--font-playfair)]

                      text-[17px]

                      font-semibold
                      italic

                      text-red-300
                    "
                  >
                    Growth feels complicated.
                  </p>
                </div>
              </div>
            </div>

            <div
              ref={afterCardRef}
              className="
                relative

                z-20

                w-full

                shrink-0
               md:w-[38%]
              "
            >
              <div
                className="
    relative

    h-[480px]

    overflow-hidden

    rounded-[18px]

    border
    border-[var(--primary)]/20

    bg-white/70

    p-7

    shadow-lg
    shadow-black/[0.04]

    md:h-[500px]
    md:p-9

    lg:h-[470px]
    lg:p-10
  "
              >
                {/* Gradient */}

                <div
                  className="
                    pointer-events-none

                    absolute
                    right-0
                    top-0

                    h-32
                    w-32

                    rounded-bl-full

                    bg-gradient-to-bl
                    from-[var(--text-light)]/20
                    to-transparent
                  "
                />

                <div className="relative z-10">
                  {/* Label */}

                  <div className="mb-7 flex items-center gap-3">
                    <span
                      className="
                        h-2
                        w-2

                        rounded-full

                        bg-[var(--primary)]
                      "
                    />

                    <p
                      className="
                        text-[11px]

                        font-medium

                        uppercase

                        tracking-[0.28em]

                        text-[var(--text)]
                      "
                    >
                      After
                    </p>
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      mb-8

                      font-playfair

                      text-[24px]

                      font-semibold

                      leading-[1.15]

                      text-[var(--heading)]

                      md:text-[28px]

                      lg:text-[30px]
                    "
                  >
                    Everything moves together.
                  </h3>

                  {/* Items */}

                  <ul className="space-y-5">
                    {afterItems.map((item) => (
                      <li
                        key={item}
                        className="
                          flex
                          items-start

                          gap-3

                          text-[15px]

                          leading-[1.55]

                          text-[var(--heading)]/70

                          md:text-[16px]
                        "
                      >
                        <svg
                          className="
                            mt-[4px]

                            h-4
                            w-4

                            shrink-0

                            text-[var(--primary)]
                          "
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3 8L6.5 11.5L13 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p
                    className="
                      mt-9

                      font-[var(--font-playfair)]

                      text-[17px]

                      font-semibold

                      text-[var(--primary)]
                    "
                  >
                    Growth feels effortless.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={buttonRef}
            className="
              mt-8

              flex

              justify-center
            "
          >
            <button
              type="button"
              className="
                rounded-full

                bg-[var(--primary)]

                px-9
                py-4

                text-[14px]

                font-medium

                tracking-[0.04em]

                text-white

                transition-transform

                duration-300

                hover:scale-[1.03]
              "
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
