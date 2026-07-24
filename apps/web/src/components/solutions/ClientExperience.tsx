"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ExperienceItem = {
  icon: string;
  text: string;
};

const experienceItems: ExperienceItem[] = [
  {
    icon: "📋",
    text: "Every order organized from the very first detail",
  },
  {
    icon: "💰",
    text: "Pricing decisions made with greater confidence",
  },
  {
    icon: "⚙️",
    text: "Production that moves with clarity and control",
  },
  {
    icon: "🤝",
    text: "Teams and partners always working in sync",
  },
  {
    icon: "📈",
    text: "Sustainable growth without operational complexity",
  },
];

const ClientExperience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      timeline
        // Label
        .from(".experience-label", {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: "power3.out",
        })

        // Heading
        .from(
          ".experience-title",
          {
            opacity: 0,
            y: 45,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.3",
        )

        // Cards
        .from(
          ".experience-card",
          {
            opacity: 0,
            y: 45,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.35",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        px-5 py-16
        md:px-10 md:py-20
        lg:py-24
      "
    >
      <div className="mx-auto max-w-[1320px]">
        {/* ==============================
            Heading
        ============================== */}

        <div className="text-center">
          <p
            className="
              experience-label
              text-[12px] font-medium uppercase
              tracking-[0.24em]
              text-[var(--text)]
              md:text-[13px]
            "
          >
            Built for Better Business
          </p>

          <div className="mt-5 overflow-hidden">
            <h2
              className="
                experience-title
                font-playfair
                text-[34px] leading-[1.05]
                tracking-[-0.02em]
                text-[var(--heading)]
                md:text-[48px]
                lg:text-[55px]
              "
            >
              What Every Sartique Client{" "}
              <em className="font-normal italic">Experiences</em>
            </h2>
          </div>
        </div>

        {/* ==============================
            Cards
        ============================== */}

        <div
          className="
            mt-10
            grid grid-cols-1 gap-4
            md:mt-12 md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {experienceItems.map((item, index) => (
            <div
              key={index}
              className="
                experience-card
                flex min-h-[110px]
                items-center gap-5
                rounded-[18px]
                border border-[var(--border)]
                bg-white
                px-6 py-5
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]
                md:px-7
              "
            >
              {/* Emoji */}
              <span className="shrink-0 text-[24px]">{item.icon}</span>

              {/* Text */}
              <p
                className="
                  max-w-[330px]
                  font-[var(--font-body)]
                  text-[15px] leading-[1.55]
                  text-[var(--heading)]
                  md:text-[16px]
                "
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientExperience;
