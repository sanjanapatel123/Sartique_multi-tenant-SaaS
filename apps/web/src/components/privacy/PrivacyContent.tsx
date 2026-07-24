"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------
   Types
-------------------------------- */

type SubSection = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
};

type PolicySection = {
  title: string;
  paragraphs?: string[];
  subSections?: SubSection[];
};

/* --------------------------------
   Privacy Policy Data
-------------------------------- */

const policyData: PolicySection[] = [
  {
    title: "1. Who We Are",
    paragraphs: [
      "Sartique is a modern operating platform built for bespoke fashion, lifestyle, and made-to-order brands. Our platform helps businesses simplify design collaboration, customer management, order workflows, production planning, and day-to-day operations.",
      "This Privacy Policy explains how Sartique collects, uses, stores, and protects information when you interact with or use our platform and services.",
    ],
  },

  {
    title: "2. Information We Collect",
    subSections: [
      {
        title: "2.1 Information You Provide Directly",
        paragraphs: [
          "When you create an account, contact us, or use the Platform, we may collect information that you provide directly to us, including:",
        ],
        bullets: [
          "Name, email address, and phone number",
          "Business or brand information",
          "Account credentials",
          "Billing and subscription information",
          "Information submitted through forms or support requests",
        ],
      },
      {
        title: "2.2 Information Collected Automatically",
        paragraphs: [
          "When you access or interact with the Platform, certain technical information may be collected automatically to help us understand usage and improve the experience.",
        ],
        bullets: [
          "Device and browser information",
          "IP address and approximate location",
          "Pages and features accessed",
          "Login activity and usage patterns",
        ],
      },
    ],
  },

  {
    title: "3. How We Use Your Information",
    paragraphs: [
      "We use the information we collect to operate, maintain, and improve Sartique and to provide a reliable experience for our users.",
    ],
    subSections: [
      {
        title: "3.1 Platform Operations",
        bullets: [
          "Create and manage user accounts",
          "Provide access to platform features",
          "Process subscriptions and payments",
          "Maintain security and prevent unauthorized access",
        ],
      },
      {
        title: "3.2 Communication",
        paragraphs: [
          "We may use your contact information to send important service updates, respond to support requests, and communicate information related to your account.",
        ],
      },
    ],
  },

  {
    title: "4. How We Share Information",
    paragraphs: [
      "We do not sell or rent your personal information. Information may only be shared when necessary to operate our services, comply with legal requirements, or protect our users and platform.",
    ],
    subSections: [
      {
        title: "4.1 Service Providers",
        paragraphs: [
          "We may work with trusted service providers that assist us with hosting, payment processing, analytics, communications, and other essential platform operations.",
        ],
      },
    ],
  },

  {
    title: "5. Data Storage and Security",
    paragraphs: [
      "We take reasonable technical and organizational measures to protect your information against unauthorized access, loss, misuse, alteration, or disclosure.",
      "While we work to maintain strong security practices, no digital platform or method of electronic storage can guarantee absolute security.",
    ],
  },

  {
    title: "6. Data Retention",
    paragraphs: [
      "We retain personal information only for as long as necessary to provide our services, meet operational requirements, resolve disputes, and comply with applicable legal obligations.",
      "When information is no longer required, we may securely delete or anonymize it.",
    ],
  },

  {
    title: "7. Your Rights and Choices",
    paragraphs: [
      "Depending on your location and applicable law, you may have certain rights regarding your personal information.",
    ],
    subSections: [
      {
        title: "7.1 Your Choices",
        bullets: [
          "Request access to your personal information",
          "Request correction of inaccurate information",
          "Request deletion of eligible personal information",
          "Update your account information",
          "Manage certain communication preferences",
        ],
      },
    ],
  },

  {
    title: "8. Cookies and Similar Technologies",
    paragraphs: [
      "Sartique may use cookies and similar technologies to maintain sessions, remember preferences, understand platform usage, and improve performance.",
      "You may manage cookie preferences through your browser settings. Disabling certain cookies may affect some platform functionality.",
    ],
  },

  {
    title: "9. Third-Party Services",
    paragraphs: [
      "Our Platform may integrate with or contain links to third-party services. These services operate independently and may have their own privacy practices.",
      "We encourage you to review the privacy policies of third-party services before providing personal information to them.",
    ],
  },

  {
    title: "10. Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes to our services, business practices, or applicable requirements.",
      "When significant changes are made, we may provide appropriate notice through the Platform or other communication channels.",
    ],
    subSections: [
      {
        title: "10.1 Contact Us",
        paragraphs: [
          "If you have questions, concerns, or requests regarding this Privacy Policy or how your information is handled, please contact the Sartique team.",
        ],
      },
    ],
  },
];

/* --------------------------------
   Component
-------------------------------- */

const PrivacyContent = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".policy-item");

      items.forEach((item) => {
        gsap.set(item, {
          opacity: 0,
          y: 80,
        });

        ScrollTrigger.create({
          trigger: item,
          start: "top 88%",
          once: true,

          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
            });
          },
        });
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
        <div className="mx-auto max-w-[1200px]">
          {policyData.map((section, index) => (
            <article
              key={section.title}
              className={`
                policy-item
                ${index !== 0 ? "mt-10 md:mt-10" : ""}
              `}
            >
              {/* Main Heading */}
              <h2
                className="
                  font-playfair
                  text-[25px]
                  font-semibold
                  leading-[1.3]
                  tracking-[-0.02em]
                  text-[var(--heading)]
                  md:text-[29px]
                "
              >
                {section.title}
              </h2>

              {/* Main Paragraphs */}
              {section.paragraphs && (
                <div className="mt-6 space-y-5">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="
                        text-[15px]
                        font-normal
                        leading-[1.8]
                        text-[var(--text)]
                        md:text-[17px]
                      "
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Sub Sections */}
              {section.subSections && (
                <div className="mt-7 space-y-10">
                  {section.subSections.map((subSection, subIndex) => (
                    <div key={subIndex}>
                      {/* Sub Heading */}
                      {subSection.title && (
                        <h3
                          className="
                            text-[16px]
                            font-medium
                            leading-[1.5]
                            text-[var(--text)]
                            md:text-[18px]
                          "
                        >
                          {subSection.title}
                        </h3>
                      )}

                      {/* Sub Paragraphs */}
                      {subSection.paragraphs && (
                        <div className="mt-5 space-y-4">
                          {subSection.paragraphs.map(
                            (paragraph, paragraphIndex) => (
                              <p
                                key={paragraphIndex}
                                className="
                                  text-[15px]
                                  leading-[1.8]
                                  text-[var(--text)]
                                  md:text-[17px]
                                "
                              >
                                {paragraph}
                              </p>
                            ),
                          )}
                        </div>
                      )}

                      {/* Bullets */}
                      {subSection.bullets && (
                        <ul className="mt-5 space-y-3">
                          {subSection.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="
                                flex
                                items-start
                                gap-4
                                text-[15px]
                                leading-[1.7]
                                text-[var(--text)]
                                md:text-[16px]
                              "
                            >
                              <span
                                className="
                                  mt-[10px]
                                  h-[6px]
                                  w-[6px]
                                  shrink-0
                                  rounded-full
                                  bg-[var(--text-light)]
                                "
                              />

                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyContent;
