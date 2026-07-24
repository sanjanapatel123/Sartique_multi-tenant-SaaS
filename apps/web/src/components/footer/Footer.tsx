import Link from "next/link";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-[var(--text-light)]">
      <div className="container flex min-h-[200px] flex-col items-center justify-center px-4 py-16 md:py-10">
        {/* Footer Links */}
        <nav
          aria-label="Footer Navigation"
          className="flex max-w-[900px] flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-[16px] transition-colors duration-300 hover:text-[var(--primary)] md:text-[16px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="mt-12 flex items-center justify-center gap-7 md:mt-10">
          {/* LinkedIn */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-all duration-300 hover:-translate-y-1 hover:text-[var(--primary)]"
          >
            <svg
              width="29"
              height="29"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16 8C19.3137 8 22 10.6863 22 14V21H18V14C18 12.8954 17.1046 12 16 12C14.8954 12 14 12.8954 14 14V21H10V9H14V10.5C14.9122 8.973 15.9479 8 16 8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 9H2V21H6V9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[var(--text)] transition-all duration-300 hover:-translate-y-1 hover:text-[var(--primary-light)]"
          >
            <svg
              width="29"
              height="29"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="currentColor"
                strokeWidth="2"
              />

              <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
              />

              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-center font-sans text-[16px] italic md:text-[16px]">
          Built quietly, so your brand can shine loudly.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
