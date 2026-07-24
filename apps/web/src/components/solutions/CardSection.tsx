"use client";

import { useLayoutEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------
   Icons
-------------------------------- */

const WhatsAppIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 11.5A8 8 0 0 1 8.3 18.6L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 8.5c.3 2.5 2 4.2 4.5 5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />

    <path
      d="M12 8V16M8 12H16"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

/* --------------------------------
   Types
-------------------------------- */

type InfoCardProps = {
  icon: ReactNode;
  label: string;
  title: string;
  italicTitle?: string;
  description: string;
  side: "left" | "right";
};

/* --------------------------------
   Reusable Card
-------------------------------- */

const InfoCard = ({
  icon,
  label,
  title,
  italicTitle,
  description,
  side,
}: InfoCardProps) => {
  return (
    <div
      className={`
        relative
        h-full
        border
        border-[var(--text-light)]
        px-7 py-9
        sm:px-9
        md:px-10 md:py-10
        lg:px-12 lg:py-11

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
      {/* Icon */}
      <div
        className="
          mb-8
          flex h-[60px] w-[60px]
          items-center justify-center
          rounded-[15px]
          border border-[var(--border)]
          text-[var(--text)]
        "
      >
        {icon}
      </div>

      {/* Label */}
      <p
        className="
          text-[12px]
          font-medium
          uppercase
          tracking-[0.2em]
          text-[var(--text)]
        "
      >
        {label}
      </p>

      {/* Heading */}
      <h2
        className="
          mt-4
          max-w-[600px]
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
        {title}{" "}
        {italicTitle && (
          <span className="font-normal italic text-[var(--text)]">
            {italicTitle}
          </span>
        )}
      </h2>

      {/* Description */}
      <p
        className="
          mt-5
          max-w-[540px]
          text-[16px]
          leading-[1.55]
          text-[var(--text)]
        "
      >
        {description}
      </p>

      {/* Gradient Line */}
      <div
        className="
          mt-8
          h-px
          w-full
          bg-gradient-to-r
          from-[var(--text)]
          via-[var(--text-light)]
          to-transparent
          opacity-50
        "
      />
    </div>
  );
};

/* --------------------------------
   Main Section
-------------------------------- */

const CardSection = () => {
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
        gsap.set(leftCard, {
          x: -45,
          opacity: 0,
        });

        gsap.set(rightCard, {
          x: 45,
          opacity: 0,
        });

        gsap.to([leftCard, rightCard], {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",

          scrollTrigger: {
            trigger: cards,
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        py-10
        md:py-14
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
              icon={<WhatsAppIcon />}
              label="Conversation First"
              title="Every Creative Business Begins with"
              italicTitle="Conversations"
              description="The real work starts through everyday conversations. Sartique turns ideas, requests, and decisions into organized action — without changing how your team naturally communicates."
            />
          </div>

          {/* Right Card */}
          <div ref={rightCardRef}>
            <InfoCard
              side="right"
              icon={<PlusIcon />}
              label="Built Without Limits"
              title="One Platform That"
              italicTitle="Adapts to You"
              description="There is no rigid version for each type of business. Sartique adjusts to your workflow, your team, and your craft — giving you the freedom to work your way while everything stays connected."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
