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
const termsData: PolicySection[] = [
  {
    title: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing or using Sartique, you agree to be bound by these Terms of Service. These Terms apply to all users who access or use our platform, tools, features, integrations, and related services.",
      "If you do not agree with any part of these Terms, you should not access or use the Sartique platform.",
    ],
  },

  {
    title: "2. Use of the Platform",
    subSections: [
      {
        title: "2.1 Eligibility",
        paragraphs: [
          "You must have the legal capacity to enter into a binding agreement and comply with all applicable laws and regulations when using the Platform.",
        ],
      },
      {
        title: "2.2 Permitted Use",
        paragraphs: [
          "Sartique is designed to help businesses manage their operations, workflows, customers, orders, production, and related activities.",
        ],
        bullets: [
          "Use the Platform only for lawful business purposes",
          "Provide accurate and complete information",
          "Comply with applicable laws and regulations",
          "Use Platform features in accordance with these Terms",
        ],
      },
    ],
  },

  {
    title: "3. Account Registration and Security",
    paragraphs: [
      "Certain features of Sartique may require you to create an account. You are responsible for maintaining the confidentiality and security of your account credentials.",
    ],
    subSections: [
      {
        title: "3.1 Account Responsibilities",
        bullets: [
          "Provide accurate registration information",
          "Keep your account information up to date",
          "Maintain the confidentiality of your password",
          "Notify us of any suspected unauthorized account access",
        ],
      },
      {
        title: "3.2 Account Activity",
        paragraphs: [
          "You are responsible for activities performed through your account unless unauthorized access has been reported to us in a timely manner.",
        ],
      },
    ],
  },

  {
    title: "4. Subscriptions, Fees and Payments",
    paragraphs: [
      "Some Sartique services may require a paid subscription. Pricing, billing periods, and applicable fees will be presented when you select a subscription plan.",
    ],
    subSections: [
      {
        title: "4.1 Billing",
        bullets: [
          "Subscription fees are billed according to your selected plan",
          "Applicable taxes may be added where required",
          "You are responsible for maintaining valid payment information",
          "Fees may change with reasonable prior notice",
        ],
      },
      {
        title: "4.2 Free Trials",
        paragraphs: [
          "Sartique may offer free trials or promotional pricing from time to time. Eligibility, duration, and conditions of such offers may vary.",
        ],
      },
    ],
  },

  {
    title: "5. User Content and Data",
    paragraphs: [
      "You retain ownership of the business information, content, and data that you submit to Sartique. You grant us the limited rights necessary to process and store this information for the purpose of providing our services.",
    ],
    subSections: [
      {
        title: "5.1 Your Responsibilities",
        paragraphs: [
          "You are responsible for ensuring that the information and content you upload to the Platform does not violate applicable laws or the rights of others.",
        ],
      },
    ],
  },

  {
    title: "6. Acceptable Use",
    paragraphs: [
      "You agree not to misuse Sartique or interfere with the normal operation, security, or availability of the Platform.",
    ],
    subSections: [
      {
        title: "6.1 Prohibited Activities",
        bullets: [
          "Attempting to gain unauthorized access to the Platform",
          "Using the Platform for unlawful or fraudulent activities",
          "Uploading malicious code, viruses, or harmful software",
          "Interfering with Platform security or infrastructure",
          "Copying or exploiting the Platform without authorization",
        ],
      },
    ],
  },

  {
    title: "7. Intellectual Property Rights",
    paragraphs: [
      "The Sartique platform, including its software, design, branding, interfaces, features, and related materials, is protected by applicable intellectual property laws.",
      "Except for the limited right to use the Platform under these Terms, no ownership rights are transferred to you.",
    ],
    subSections: [
      {
        title: "7.1 Restrictions",
        bullets: [
          "Do not copy or reproduce protected Platform materials",
          "Do not modify or distribute Sartique software without permission",
          "Do not use Sartique branding without authorization",
          "Do not attempt to reverse engineer restricted parts of the Platform",
        ],
      },
    ],
  },

  {
    title: "8. Third-Party Services and Integrations",
    paragraphs: [
      "Sartique may integrate with third-party applications, payment providers, APIs, or other external services to provide additional functionality.",
      "Your use of third-party services may be subject to separate terms and privacy policies established by those providers.",
    ],
    subSections: [
      {
        title: "8.1 Third-Party Availability",
        paragraphs: [
          "We are not responsible for the availability, performance, or practices of third-party services that operate independently from Sartique.",
        ],
      },
    ],
  },

  {
    title: "9. Suspension and Termination",
    paragraphs: [
      "You may stop using Sartique at any time. We may suspend or terminate access to the Platform when necessary to protect our users, services, or legal interests.",
    ],
    subSections: [
      {
        title: "9.1 Reasons for Suspension or Termination",
        bullets: [
          "Violation of these Terms of Service",
          "Fraudulent or unlawful activity",
          "Failure to pay applicable subscription fees",
          "Security risks or unauthorized Platform use",
          "Activities that may harm Sartique or other users",
        ],
      },
      {
        title: "9.2 Effect of Termination",
        paragraphs: [
          "Upon termination, your right to access certain Platform features may end. Some provisions of these Terms may continue to apply where legally or operationally necessary.",
        ],
      },
    ],
  },

  {
    title: "10. Limitation of Liability and Changes to Terms",
    paragraphs: [
      "Sartique is provided on an as-available basis. To the extent permitted by applicable law, we are not responsible for indirect, incidental, or consequential losses resulting from your use of or inability to use the Platform.",
      "We may update these Terms from time to time to reflect changes to our services, business practices, or applicable requirements.",
    ],
    subSections: [
      {
        title: "10.1 Updates to These Terms",
        paragraphs: [
          "When material changes are made, we may provide appropriate notice through the Platform or other available communication channels. Continued use of Sartique after updated Terms become effective constitutes acceptance of the revised Terms.",
        ],
      },
      {
        title: "10.2 Contact Us",
        paragraphs: [
          "If you have questions or concerns regarding these Terms of Service, please contact the Sartique team through our available support channels.",
        ],
      },
    ],
  },
];

/* --------------------------------
   Component
-------------------------------- */

const TermsContent = () => {
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
          {termsData.map((section, index) => (
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

export default TermsContent;
