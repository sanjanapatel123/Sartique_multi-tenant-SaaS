"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------
   Types
-------------------------------- */

type InfoCardProps = {
  label: string;
  title: string;
  italicTitle?: string;
  description: string;
  secondDescription?: string;
  list?: string[];
  bottomText?: string;
  side: "left" | "right";
};

/* --------------------------------
   Reusable Card
-------------------------------- */

const InfoCard = ({
  label,
  title,
  italicTitle,
  description,
  secondDescription,
  list,
  bottomText,
  side,
}: InfoCardProps) => {
  return (
    <div
      className={`
        relative
        h-full
        border
        border-[var(--text-light)]
        px-7
        py-9
        sm:px-9
        md:px-10
        md:py-10
        lg:px-12
        lg:py-11

       ${
         side === "left"
           ? `
      rounded-t-[26px]
      md:rounded-l-[26px]
      md:rounded-tr-none
    `
           : `
      rounded-b-[26px]
      bg-white
      border-t-0
      md:-ml-px
      md:rounded-r-[26px]
      md:rounded-bl-none
      md:border-t
    `
       }
      `}
    >
      {/* Label */}
      <p
        className="
          text-[12px]
          font-medium
          uppercase
          tracking-[0.18em]
          text-[var(--text)]
        "
      >
        {label}
      </p>

      {/* Heading */}
      <h2
        className="
          mt-4
          max-w-[620px]
          font-playfair
          text-[28px]
          font-medium
          leading-[1.08]
          tracking-[-0.03em]
          text-[var(--heading)]
          sm:text-[30px]
          lg:text-[36px]
        "
      >
        {title} {italicTitle && <span className="italic">{italicTitle}</span>}
      </h2>

      {/* Description */}
      <p
        className="
          mt-5
          max-w-[600px]
          text-[16px]
          leading-[1.5]
        "
      >
        {description}
      </p>

      {/* Second Description */}
      {secondDescription && (
        <p
          className="
            mt-5
            max-w-[600px]
            text-[16px]
            leading-[1.5]
            text-[var(--text)]
          "
        >
          {secondDescription}
        </p>
      )}

      {/* List */}
      {list && (
        <ul className="mt-5 flex flex-col gap-3">
          {list.map((item) => (
            <li
              key={item}
              className="
                flex
                items-center
                gap-3
                text-[16px]
                text-[var(--heading)]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  shrink-0
                  rounded-full
                  bg-[var(--text-light)]
                "
              />

              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Bottom Text */}
      {bottomText && (
        <p
          className="
            mt-6
            text-[16px]
            font-medium
            text-[var(--text)]
          "
        >
          {bottomText}
        </p>
      )}
    </div>
  );
};

/* --------------------------------
   Main Section
-------------------------------- */

const WhyDifferentAbout = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !cards || !leftCard || !rightCard) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        /* Initial Position */
        gsap.set(leftCard, {
          x: -45,
        });

        gsap.set(rightCard, {
          x: 45,
        });

        /* Join Animation */
        gsap.to([leftCard, rightCard], {
          x: 0,
          duration: 1.4,
          ease: "power3.out",

          scrollTrigger: {
            trigger: cards,
            start: "top 85%",
            once: true,
          },
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
        overflow-hidden
        pb-15
        md:pb-20
      "
    >
      <div className="container">
        <div
          ref={cardsRef}
          className="
            mx-auto
            grid
            max-w-[1500px]
            grid-cols-1
            md:grid-cols-2
          "
        >
          {/* Left Card */}
          <div ref={leftCardRef}>
            <InfoCard
              side="left"
              label="OUR APPROACH"
              title="Technology That"
              italicTitle="Works Quietly."
              description="Sartique is designed to simplify operations without changing the way your team thinks or creates."
              list={[
                "Connect every workflow in one place",
                "Reduce repetitive manual tasks",
                "Give every team real-time visibility",
              ]}
              bottomText="Less administration. More time to build exceptional products."
            />
          </div>

          {/* Right Card */}
          <div ref={rightCardRef}>
            <InfoCard
              side="right"
              label="Getting Started"
              title="Start Quickly. Grow"
              italicTitle="Naturally."
              description="Your team can get comfortable with Sartique in days, not weeks."
              secondDescription="Because Sartique works alongside the way your business already runs — helping you improve operations without slowing everything down."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentAbout;
