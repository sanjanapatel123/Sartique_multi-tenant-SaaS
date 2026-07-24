"use client";

type SolutionCardProps = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  challenges: string[];
  solutions: string[];
  footerText: string;
};

const SolutionCard = ({
  id,
  icon,
  title,
  subtitle,
  description,
  challenges,
  solutions,
  footerText,
}: SolutionCardProps) => {
  return (
    <article
      id={id}
      className="
        solution-card
        scroll-mt-[100px]
        w-full
        overflow-hidden
        rounded-[20px]
        border border-[var(--text-light)]
        bg-white
      "
    >
      {/* ==============================
          Header
      ============================== */}

      <div className="px-5 py-6 md:px-8 md:py-7 lg:px-10 lg:py-8">
        <div className="flex items-start gap-4 md:gap-5">
          {/* Icon */}
          <div
            className="
              flex h-[58px] w-[58px]
              shrink-0 items-center justify-center
              rounded-[14px]
              bg-[var(--section)]
              md:h-[64px] md:w-[64px]
            "
          >
            <span className="text-[25px] md:text-[28px]">{icon}</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2
              className="
                font-playfair
                text-[24px] leading-[1.15]
                tracking-[-0.02em]
                text-[var(--heading)]
                md:text-[28px]
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-1
                font-[var(--font-body)]
                text-[14px] leading-[1.5]
                text-[var(--text)]
                md:text-[15px]
              "
            >
              {subtitle}
            </p>

            <p
              className="
                mt-5
                max-w-[850px]
                font-[var(--font-body)]
                text-[14px] leading-[1.6]
                text-[var(--heading)]
                md:text-[15px]
              "
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* ==============================
          Reality + Sartique Helps
      ============================== */}

      <div className="grid grid-cols-1 bg-white border-t border-[var(--border)] md:grid-cols-2">
        {/* Their Reality */}
        <div className="px-5 py-6 md:px-8 md:py-7 lg:px-10">
          <p
            className="
              mb-5
              text-[11px] font-medium uppercase
              tracking-[0.22em]
              text-[var(--primary)]
              md:text-[12px]
            "
          >
            Their Reality
          </p>

          <div className="space-y-4">
            {challenges.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span
                  className="
                    mt-[7px]
                    h-[6px] w-[6px]
                    shrink-0 rounded-full
                    bg-[var(--primary-light)]
                  "
                />

                <p
                  className="
                    font-[var(--font-body)]
                    text-[14px] leading-[1.5]
                    text-[var(--text)]
                    md:text-[15px]
                  "
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How Sartique Helps */}
        <div
          className="
            border-t border-[var(--border)]
            px-5 py-6
            md:border-l md:border-t-0
            md:px-8 md:py-7
            lg:px-10
          "
        >
          <p
            className="
              mb-5
              text-[11px] font-medium uppercase
              tracking-[0.22em]
              text-[var(--primary)]
              md:text-[12px]
            "
          >
            How Sartique Helps
          </p>

          <div className="space-y-4">
            {solutions.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span
                  className="
                    mt-[1px]
                    flex h-[20px] w-[20px]
                    shrink-0 items-center justify-center
                    rounded-full
                    bg-[var(--section)]
                    text-[10px]
                    text-[var(--primary)]
                  "
                >
                  ✓
                </span>

                <p
                  className="
                    font-[var(--font-body)]
                    text-[14px] leading-[1.5]
                    text-[var(--heading)]
                    md:text-[15px]
                  "
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==============================
          Green Footer
      ============================== */}

      <div
        className="
          border-t border-[var(--text-light)]
          bg-[var(--background)]
          px-5 py-4
          md:px-8
          lg:px-10
        "
      >
        <p
          className="
            font-[var(--font-heading)]
            text-[17px] italic
            leading-[1.4]
            text-black
            md:text-[19px]
          "
        >
          {footerText}
        </p>
      </div>
    </article>
  );
};

export default SolutionCard;
