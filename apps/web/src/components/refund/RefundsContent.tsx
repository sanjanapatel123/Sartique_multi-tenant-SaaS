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
const refundData: PolicySection[] = [
  {
    title: "1. Overview",
    paragraphs: [
      "This Refund Policy explains the terms and conditions under which refunds may be requested for payments made for Sartique subscriptions and related services.",
      "By purchasing or subscribing to a Sartique plan, you acknowledge and agree to the terms described in this Refund Policy.",
    ],
  },

  {
    title: "2. Subscription Payments",
    subSections: [
      {
        title: "2.1 Paid Subscriptions",
        paragraphs: [
          "Sartique offers subscription plans that may be billed on a monthly, yearly, or other agreed billing cycle. Subscription fees are charged according to the plan and billing option selected at the time of purchase.",
        ],
      },
      {
        title: "2.2 Automatic Renewals",
        paragraphs: [
          "Where automatic renewal is enabled, your subscription may renew at the end of each billing cycle unless you cancel it before the applicable renewal date.",
        ],
      },
    ],
  },

  {
    title: "3. Free Trials and Promotional Offers",
    paragraphs: [
      "Sartique may offer free trials, introductory pricing, discounts, or promotional offers from time to time. The duration and eligibility requirements of these offers will be communicated when the offer is made available.",
    ],
    subSections: [
      {
        title: "3.1 Trial Cancellation",
        paragraphs: [
          "If payment information is required for a free trial, you should cancel before the trial period ends if you do not wish to continue with a paid subscription.",
        ],
      },
      {
        title: "3.2 Promotional Pricing",
        paragraphs: [
          "Payments made under promotional or introductory offers may be subject to specific refund conditions communicated as part of the applicable offer.",
        ],
      },
    ],
  },

  {
    title: "4. Refund Eligibility",
    paragraphs: [
      "Refund requests may be considered in certain circumstances. Eligibility will depend on the reason for the request, the subscription status, and the applicable billing transaction.",
    ],
    subSections: [
      {
        title: "4.1 Eligible Circumstances",
        bullets: [
          "An accidental duplicate payment was processed",
          "You were incorrectly charged due to a verified billing error",
          "A payment was processed after a confirmed subscription cancellation",
          "A technical issue prevented access to paid services for a significant period and could not be resolved",
          "A refund is required under applicable consumer protection laws",
        ],
      },
    ],
  },

  {
    title: "5. Non-Refundable Payments",
    paragraphs: [
      "Except where required by applicable law or specifically approved by Sartique, certain payments may not be eligible for a refund.",
    ],
    subSections: [
      {
        title: "5.1 Non-Refundable Circumstances",
        bullets: [
          "Partial use of a monthly or yearly subscription period",
          "Failure to cancel a subscription before its renewal date",
          "Unused features or services included in your selected plan",
          "Account suspension or termination resulting from a violation of our Terms of Service",
          "Changes in business requirements or a decision to stop using the Platform after the billing period has started",
        ],
      },
    ],
  },

  {
    title: "6. Subscription Cancellations",
    paragraphs: [
      "You may cancel your Sartique subscription according to the cancellation options available through your account or by contacting our support team.",
    ],
    subSections: [
      {
        title: "6.1 Effect of Cancellation",
        paragraphs: [
          "Unless otherwise stated, cancelling your subscription prevents future renewals. You may continue to access eligible paid features until the end of your current billing period.",
        ],
      },
      {
        title: "6.2 Cancellation and Refunds",
        paragraphs: [
          "Cancelling a subscription does not automatically result in a refund for payments already processed. Any refund request will be evaluated separately under this Refund Policy.",
        ],
      },
    ],
  },

  {
    title: "7. How to Request a Refund",
    paragraphs: [
      "If you believe you are eligible for a refund, you may submit a request to the Sartique support team with sufficient information to help us review the transaction.",
    ],
    subSections: [
      {
        title: "7.1 Information Required",
        bullets: [
          "Your registered name and email address",
          "Account or business information",
          "Transaction or payment reference",
          "Date and amount of the payment",
          "Reason for requesting the refund",
          "Any supporting information relevant to your request",
        ],
      },
    ],
  },

  {
    title: "8. Refund Review and Processing",
    paragraphs: [
      "After receiving a refund request, our team will review the information provided and may contact you if additional details are required.",
    ],
    subSections: [
      {
        title: "8.1 Approved Refunds",
        paragraphs: [
          "If a refund is approved, it will generally be issued to the original payment method used for the transaction, where possible.",
        ],
      },
      {
        title: "8.2 Processing Time",
        paragraphs: [
          "The time required for an approved refund to appear in your account may vary depending on your bank, payment provider, and payment method.",
        ],
      },
    ],
  },

  {
    title: "9. Payment Disputes and Chargebacks",
    paragraphs: [
      "If you believe a payment has been processed incorrectly, we encourage you to contact the Sartique support team before initiating a payment dispute or chargeback.",
      "This allows us an opportunity to investigate the transaction and attempt to resolve the issue directly.",
    ],
  },

  {
    title: "10. Changes to This Refund Policy",
    paragraphs: [
      "We may update this Refund Policy from time to time to reflect changes to our subscription plans, billing practices, services, or applicable requirements.",
      "Any updated Refund Policy will become effective when published or on the effective date specified in the updated policy.",
    ],
    subSections: [
      {
        title: "10.1 Contact Us",
        paragraphs: [
          "If you have questions about cancellations, billing, or refund eligibility, please contact the Sartique support team through our available support channels.",
        ],
      },
    ],
  },
];

/* --------------------------------
   Component
-------------------------------- */

const RefundsContent = () => {
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
          {refundData.map((section, index) => (
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

export default RefundsContent;
