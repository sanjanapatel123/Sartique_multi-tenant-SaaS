"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "./AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      words.forEach((word) => {
        tl.to(word, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.2,
          ease: "none",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="container flex flex-col justify-center py-32">
        {/* Section Label */}
        <div className="flex items-center gap-6">
          <span className="h-[0.5px] w-12 bg-[var(--text)]" />

          <span className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--text)]">
            Our Vision
          </span>
        </div>

        {/* Content */}
        <div className="mt-11 max-w-[1450px]">
          <AnimatedText className="text-[18px] leading-[1.2] text-[var(--heading)] md:text-[24px]">
            At <strong className="font-semibold">Sartique</strong>, we're{" "}
            <em className="font-semibold italic">reimagining</em> how modern
            bespoke brands manage every client journey.
          </AnimatedText>

          <AnimatedText className="mt-8 text-[18px] leading-[1.2] text-[var(--heading)] md:text-[24px]">
            From the very first consultation to the final delivery, every{" "}
            <em className="font-semibold italic">measurement</em>, design
            update, production milestone, payment and approval stays connected
            inside one intelligent workspace.
          </AnimatedText>

          <AnimatedText className="mt-8 text-[18px] leading-[1.2] text-[var(--heading)] md:text-[24px]">
            So your team can focus on creating exceptional experiences—
            <br />
            <em className="font-semibold italic">
              not managing scattered tools and conversations.
            </em>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
