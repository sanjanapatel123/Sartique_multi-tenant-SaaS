"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    title: "Custom Fashion Studios",
    description: "Personalized orders. Constant design changes.",
    result: "Keep every detail organized from request to delivery.",
    icon: "check",
  },
  {
    title: "Growing Fashion Brands",
    description: "More customers. More orders. More moving parts.",
    result: "Scale operations without adding unnecessary complexity.",
    icon: "layers",
  },
  {
    title: "Bespoke & Couture Labels",
    description: "Detailed craftsmanship. Unique client expectations.",
    result: "Protect precision across every stage of production.",
    icon: "pin",
  },
  {
    title: "Multi-Channel Brands",
    description: "Online, studio and direct orders in one business.",
    result: "Bring every order into one connected workflow.",
    icon: "users",
  },
];

const CardIcon = ({ type }: { type: string }) => {
  if (type === "check") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <rect
          x="5"
          y="5"
          width="30"
          height="30"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M13 20L18 25L28 15"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "layers") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path
          d="M20 4L26 15H14L20 4Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <rect
          x="8"
          y="19"
          width="24"
          height="17"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  if (type === "pin") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path
          d="M20 36C20 36 29 27 29 17C29 12 25 8 20 8C15 8 11 12 11 17C11 27 20 36 20 36Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle
          cx="20"
          cy="17"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9" aria-hidden="true">
      <circle cx="13" cy="14" r="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="27" cy="14" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 34C4 27.5 8 23 14 23C17 23 19 24 20 25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M36 34C36 27.5 32 23 26 23C23 23 21 24 20 25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
};

const WhoItsFor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cardsContainer = cardsRef.current;
    const bottomText = bottomTextRef.current;

    if (!section || !heading || !cardsContainer || !bottomText) return;

    const ctx = gsap.context(() => {

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


      const cards = gsap.utils.toArray<HTMLElement>(
        ".who-for-card",
        cardsContainer,
      );

      gsap.set(cards, {
        opacity: 0,
        y: 55,
      });

      ScrollTrigger.create({
        trigger: cardsContainer,
        start: "top 82%",
        once: true,

        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,

            duration: 0.85,

            stagger: 0.12,

            ease: "power3.out",
          });
        },
      });


      gsap.set(bottomText, {
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: bottomText,
        start: "top 92%",
        once: true,

        onEnter: () => {
          gsap.to(bottomText, {
            opacity: 1,
            duration: 1.1,
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
      className="
        relative
        w-full
        overflow-hidden
        bg-[var(--background)]
        py-20
        md:py-24
        lg:py-28
      "
    >
      <div className="container">

        <div className="mx-auto max-w-[1050px] text-center">
          {/* Normal - no animation */}

          <p
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-[var(--text-light)]
              md:text-[13px]
            "
          >
            Who It&apos;s For
          </p>

          {/* Animated Heading */}

          <h2
            ref={headingRef}
            className="
              mt-7
              font-playfair
              text-[38px]
              font-medium
              leading-[1.05]
              tracking-[-0.035em]
              text-[var(--heading)]

              sm:text-[46px]
              md:text-[48px]
              lg:text-[50px]
            "
          >
            Built for brands ready to grow
            <br className="hidden sm:block" />{" "}
            <span className="font-normal italic text-[var(--text)]">
              without losing their craft.
            </span>
          </h2>

          {/* Decorative Divider */}

          <div
            className="
              mx-auto
              mt-10
              flex
              items-center
              justify-center
              gap-4
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
                bg-[var(--text)]/40
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
        </div>

        {/* =========================================
            CARDS
        ========================================= */}

        <div
          ref={cardsRef}
          className="
            mt-7
            grid
            grid-cols-1
            gap-5

            md:mt-16
            md:grid-cols-2
            md:gap-6

            lg:mt-10
          "
        >
          {audiences.map((item) => (
            <article
              key={item.title}
              className="
                who-for-card

                relative
                flex
                min-h-[20px]
                flex-col
                justify-between

                overflow-hidden

                rounded-[20px]

                border
                border-[var(--primary)]/10

                bg-white/20

                p-7

                transition-colors
                duration-500

                hover:bg-white/35

                sm:min-h-[150px]
                sm:p-9

                md:min-h-[190px]

                lg:min-h-[190px]
                lg:p-9
              "
            >
              {/* Icon */}

              <div
                className="
                  text-[var(--text)]/35
                  transition-colors
                  duration-300

                  group-hover:text-[var(--text)]
                "
              >
                <CardIcon type={item.icon} />
              </div>

              {/* Content */}

              <div className="mt-6">
                <h3
                  className="
                    font-playfair
                    text-[17px]
                    font-medium
                    leading-tight
                    text-[var(--heading)]

                    md:text-[20px]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-[14px]
                    leading-relaxed
                    text-[var(--text)]/55

                    md:text-[15px]
                  "
                >
                  {item.description}
                </p>

                <p
                  className="
                    mt-2
                    text-[14px]
                    font-medium
                    leading-relaxed
                    text-[var(--primary)]/85

                    md:text-[15px]
                  "
                >
                  {item.result}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* =========================================
            BOTTOM TEXT
        ========================================= */}

        <p
          ref={bottomTextRef}
          className="
            mt-12
            text-center
            text-[11px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[var(--text)]/45

            sm:text-[12px]

            md:mt-14
            md:text-[13px]
            md:tracking-[0.2em]
          "
        >
          If every order has its own story — Sartique is built for you
        </p>
      </div>
    </section>
  );
};

export default WhoItsFor;
