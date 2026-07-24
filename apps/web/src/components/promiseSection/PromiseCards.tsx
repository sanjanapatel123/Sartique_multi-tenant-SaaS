"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    label: "ORDERS",
    title: "Every order, clearly organized.",
    description:
      "Keep client requests, measurements, references, and timelines together from the very first conversation.",
  },
  {
    label: "INVENTORY",
    title: "Know what you have. Before you need it.",
    description:
      "Track fabrics, materials, and essentials in one place so your team can plan ahead without unnecessary delays.",
  },
  {
    label: "WORKFLOW",
    title: "Every stage moves with purpose.",
    description:
      "From confirmation to completion, each step follows a clear path that keeps your entire team in sync.",
  },
  {
    label: "TEAM",
    title: "The right work. With the right person.",
    description:
      "Assign responsibilities clearly and give everyone the context they need to move work forward confidently.",
  },
  {
    label: "PARTNERS",
    title: "Outside partners. One connected process.",
    description:
      "Coordinate external specialists and vendors without losing visibility over progress, quality, or deadlines.",
  },
  {
    label: "CLIENTS",
    title: "A better experience from start to finish.",
    description:
      "Bring every client interaction into a thoughtful workflow that feels personal, organized, and effortless.",
  },
];

const TOTAL_STEPS = cards.length - 1; // 5 positions

const PromiseCards = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeStep, setActiveStep] = useState(0);


  const goToStep = useCallback((step: number) => {
    const trigger = triggerRef.current;

    if (!trigger) return;

    const safeStep = Math.max(0, Math.min(step, TOTAL_STEPS - 1));

    const progress = safeStep / (TOTAL_STEPS - 1);

    const targetScroll =
      trigger.start + (trigger.end - trigger.start) * progress;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();


      mm.add("(min-width: 768px)", () => {
        const getStepWidth = () => {
          const firstCard = track.children[0] as HTMLElement;

          const secondCard = track.children[1] as HTMLElement;

          if (!firstCard || !secondCard) return 0;

          return secondCard.offsetLeft - firstCard.offsetLeft;
        };

        const trigger = ScrollTrigger.create({
          trigger: section,

          start: "top top",

          end: `+=${TOTAL_STEPS * 450}`,

          pin: true,

          scrub: 0.8,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const rawStep = self.progress * (TOTAL_STEPS - 1);

            const step = Math.min(TOTAL_STEPS - 1, Math.round(rawStep));

            setActiveStep(step);

            gsap.to(track, {
              x: -step * getStepWidth(),

              duration: 0.9,

              ease: "power3.out",

              overwrite: "auto",
            });
          },
        });

        triggerRef.current = trigger;

        return () => {
          trigger.kill();

          triggerRef.current = null;
        };
      });

      mm.add("(max-width: 767px)", () => {
        const getStepHeight = () => {
          const firstCard = track.children[0] as HTMLElement;

          const secondCard = track.children[1] as HTMLElement;

          if (!firstCard || !secondCard) return 0;

          return secondCard.offsetTop - firstCard.offsetTop;
        };

        gsap.set(track, {
          x: 0,
          y: 0,
        });

        const trigger = ScrollTrigger.create({
          trigger: section,

          start: "top top",

          end: `+=${TOTAL_STEPS * 400}`,

          pin: true,

          scrub: 0.8,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const rawStep = self.progress * (TOTAL_STEPS - 1);

            const step = Math.min(TOTAL_STEPS - 1, Math.round(rawStep));

            setActiveStep(step);

            gsap.to(track, {
              y: -step * getStepHeight(),

              duration: 0.9,

              ease: "power3.out",

              overwrite: "auto",
            });
          },
        });

        triggerRef.current = trigger;

        return () => {
          trigger.kill();

          triggerRef.current = null;
        };
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);


  useLayoutEffect(() => {
    const startAutoPlay = () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
      }

      autoTimerRef.current = setInterval(() => {
        const trigger = triggerRef.current;

        // Auto slide only when section is visible/pinned
        if (!trigger || !trigger.isActive) {
          return;
        }

        setActiveStep((current) => {
          // Last slide par auto scroll stop
          if (current >= TOTAL_STEPS - 1) {
            return current;
          }

          const next = current + 1;

          const progress = next / (TOTAL_STEPS - 1);

          const targetScroll =
            trigger.start + (trigger.end - trigger.start) * progress;

          window.scrollTo({
            top: targetScroll,

            behavior: "smooth",
          });

          return next;
        });
      }, 4000); // 8 seconds
    };

    /*
    | User manually interact kare to
    | timer dobara reset hoga.
    */

    const resetAutoPlay = () => {
      startAutoPlay();
    };

    startAutoPlay();

    window.addEventListener("wheel", resetAutoPlay, {
      passive: true,
    });

    window.addEventListener("touchstart", resetAutoPlay, {
      passive: true,
    });

    return () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
      }

      window.removeEventListener("wheel", resetAutoPlay);

      window.removeEventListener("touchstart", resetAutoPlay);
    };
  }, []);


  const progress = TOTAL_STEPS > 1 ? activeStep / (TOTAL_STEPS - 1) : 0;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-[var(--background)]
      "
    >
      <div
        className="
          flex
          h-full
          w-full
          flex-col
          justify-center
          py-5
          md:py-8
        "
      >
        {/* =========================================
            CARDS VIEWPORT
        ========================================== */}

        <div
          className="
            mx-auto
            h-[66vh]
            w-[92%]
            overflow-hidden

            md:h-auto
            md:w-[92%]
          "
        >
          {/* =========================================
              TRACK
          ========================================== */}

          <div
            ref={trackRef}
            className="
              flex
              flex-col
              gap-4

              md:flex-row
              md:gap-6

              lg:gap-8
            "
          >
            {cards.map((card, index) => (
              <article
                key={card.label}
                className="
    relative
    min-h-[180px]
    w-[90%]
    shrink-0
    self-center

    overflow-hidden
    rounded-[22px]

    border
    border-[var(--primary)]/15

    bg-white/25

    px-6
    py-7

    md:h-[320px]
    md:min-h-0
    md:w-[calc((100%-1.5rem)/2)]
    md:self-auto
    md:px-9
    md:py-9

    lg:h-[310px]
    lg:w-[calc((100%-2rem)/2)]
    lg:px-10
    lg:py-10
  "
              >
                {/* Top Left Corner */}

                <div
                  className="
                    absolute
                    left-[18px]
                    top-[18px]

                    h-[25px]
                    w-[25px]

                    rounded-md

                    border-l
                    border-t

                    border-[var(--primary)]/15
                  "
                />

                {/* Bottom Right Corner */}

                <div
                  className="
                    absolute
                    bottom-[18px]
                    right-[18px]

                    rounded-md

                    h-[25px]
                    w-[25px]

                    border-b
                    border-r

                    border-[var(--primary)]/15
                  "
                />

                {/* Content */}

                <div className="relative z-10">
                  <p
                    className="
                      text-[13px]
                      font-medium

                      tracking-[0.28em]

                      text-[var(--text)]

                      md:text-[14px]
                      pl-4
                    "
                  >
                    {card.label}
                  </p>

                  <h3
                    className="
                      mt-2

                      max-w-[650px]

                      font-playfair

                      text-[20px]
                      font-medium

                      leading-[1.1]

                      tracking-[-0.025em]

                      text-[var(--heading)]

                      md:mt-5
                      md:text-[30px]

                      lg:text-[30px]
                    "
                  >
                    {card.title}
                  </h3>

                  <p
                    className="
                      mt-3

                      max-w-[620px]

                      text-[14px]

                      leading-[1.55]

                      text-[var(--text)]

                      md:mt-5
                      md:text-[16px]

                      lg:text-[16px]
                    "
                  >
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="
            mt-7

            flex
            flex-col

            items-center
            justify-center

            md:mt-10
          "
        >
          {/* =========================================
              CLICKABLE DOTS
          ========================================== */}

          <div
            className="
              flex
              h-[14px]
              items-center
              gap-[9px]
            "
          >
            {Array.from({
              length: TOTAL_STEPS,
            }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to position ${index + 1}`}
                onClick={() => goToStep(index)}
                className={`
                  cursor-pointer

                  rounded-full

                  transition-all
                  duration-500
                  ease-out

                  ${
                    activeStep === index
                      ? `
                        h-[9px]
                        w-[48px]
                        bg-[var(--primary)]
                      `
                      : `
                        h-[9px]
                        w-[9px]
                        bg-[var(--primary)]/20

                        hover:bg-[var(--primary)]/40
                      `
                  }
                `}
              />
            ))}
          </div>

          {/* =========================================
              COUNTER + PROGRESS BAR
          ========================================== */}

          <div
            className="
              mt-7

              flex

              items-center

              gap-4
            "
          >
            {/* Current */}

            <span
              className="
                min-w-[24px]

                text-right

                text-[14px]
                font-medium

                tabular-nums

                text-[var(--heading)]

                md:text-[16px]
              "
            >
              {String(activeStep + 1).padStart(2, "0")}
            </span>

            {/* Progress Bar */}

            <div
              className="
                relative

                h-[2px]
                w-[50px]

                overflow-hidden

                bg-[var(--primary)]/15

                md:w-[70px]
              "
            >
              {/* Filled Progress */}

              <div
                className="
                  absolute
                  left-0
                  top-0

                  h-full

                  bg-[var(--primary)]

                  transition-[width]
                  duration-700
                  ease-out
                "
                style={{
                  width: `${progress * 100}%`,
                }}
              />
            </div>

            {/* Total */}

            <span
              className="
                min-w-[24px]

                text-[14px]

                tabular-nums

                text-[var(--primary)]/50

                md:text-[16px]
              "
            >
              {String(TOTAL_STEPS).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseCards;
