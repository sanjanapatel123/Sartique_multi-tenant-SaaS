"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { apps } from "./data";
import FlowLines from "./FlowLines";

gsap.registerPlugin(ScrollTrigger);

export default function FlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const positions = [0, 138, 276, 414, 552, 690];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      // Initial State
      gsap.set(heading, {
        opacity: 0.15,
        y: 90,
        scale: 0.95,
      });

      // Scroll Animation
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
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f3f8f4] pt-28 pb-10"
    >
      <div className="container relative z-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            ref={headingRef}
            className="font-playfair text-[40px] font-semibold leading-tight text-[var(--heading)] md:text-[40px]"
          >
            Every Process Connected Beautifully.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-6 text-[var(--text)]">
            Orders, production, inventory and communication flowing together
            inside one intelligent platform.
          </p>
        </div>

        {/* Icons */}
        <div className="relative mx-auto mt-14 h-16 w-[754px] max-w-full">
          {apps.map((item, index) => (
            <div
              key={index}
              className="absolute top-0 h-16 w-16"
              style={{ left: positions[index] }}
            >
              {/* Animated Border */}
              <div
                className="liquid-border"
                style={
                  {
                    "--liquid": item.color,
                  } as CSSProperties
                }
              />

              {/* Card */}
              <div className="absolute inset-[2px] flex items-center justify-center rounded-2xl bg-white shadow-sm">
                <Image
                  src={item.icon}
                  alt=""
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* SVG */}
        <div className="relative z-10 mx-auto mt-2 w-[754px] max-w-full">
          <FlowLines positions={positions} />
        </div>

        {/* Phone */}
        <div className="relative -mt-5 flex justify-center">
          {/* Phone Glow */}
          <div className="absolute bottom-10 left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[var(--primary)] opacity-20 blur-[160px]" />

          <Image
            src="/phone-flow.png"
            alt="Dashboard"
            width={950}
            height={900}
            priority
            className="relative z-10 w-full max-w-[920px]"
          />
        </div>
      </div>
    </section>
  );
}
