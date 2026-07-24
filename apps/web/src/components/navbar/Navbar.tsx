// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import clsx from "clsx";
// import { usePathname } from "next/navigation";
// import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
// import { navLinks } from "@/constants/navlinks";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const pathname = usePathname();

//   // Check if current page is Home
//   const isHomePage = pathname === "/";

//   const isTransparentStyle = isHomePage && !scrolled;

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "auto";

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [menuOpen]);

//   return (
//     <>
//       <header
//         className={clsx(
//           "fixed top-0 left-0 z-50 w-full transition-all duration-500",
//           scrolled
//             ? "bg-white/80 backdrop-blur-xl shadow-sm py-2"
//             : "bg-transparent py-2",
//         )}
//       >
//         <div className="container flex h-16 items-center justify-between">
//           {/* Logo */}

//           <Link href="/" className="shrink-0">
//             <Image
//               src={scrolled ? "/logo2.png" : "/logo.png"}
//               alt="Sartique"
//               width={160}
//               height={40}
//               priority
//               className={clsx(
//                 "h-12 w-auto transition-all duration-300",
//                 !scrolled && "h-36 brightness-0 invert",
//               )}
//             />
//           </Link>

//           {/* Desktop Nav */}

//           <nav className="hidden lg:flex items-center gap-12">
//             {navLinks.map((item) => (
//               <Link
//                 key={item.title}
//                 href={item.href}
//                 className={clsx(
//                   "text-[16px] font-medium transition-colors duration-300",
//                   scrolled
//                     ? "text-[var(--heading)] hover:text-[var(--primary)]"
//                     : "text-white hover:text-[var(--primary-light)]",
//                 )}
//               >
//                 {item.title}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Button */}

//           <div className="hidden lg:block">
//             <Link
//               href="https://calendly.com/hello-bespokible/demo-call"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="
//       hidden
//       lg:inline-flex
//       items-center
//       justify-center
//       h-10
//       px-6
//       rounded-full
//       bg-[var(--primary)]
//       text-white
//       text-sm
//       font-medium
//       transition-all
//       duration-300
//       hover:opacity-90

//     "
//             >
//               Get Started
//             </Link>
//           </div>
//           {/* Mobile Button */}

//           <button
//             onClick={() => setMenuOpen((prev) => !prev)}
//             className={clsx(
//               "lg:hidden text-3xl transition-all duration-300",
//               scrolled ? "text-[var(--heading)]" : "text-white",
//             )}
//           >
//             {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
//           </button>
//         </div>
//       </header>

//       {/* Overlay */}

//       {/* Mobile Dropdown */}
//       <div
//         className={clsx(
//           "fixed top-20 left-0 right-0 z-[60] origin-top overflow-hidden bg-white shadow-xl transition-all duration-500 ease-in-out",
//           menuOpen
//             ? "max-h-[500px] opacity-100"
//             : "max-h-0 opacity-0 pointer-events-none",
//         )}
//       >
//         <div className="container py-6">
//           {/* Close Button */}

//           {/* Nav Links */}
//           <nav className="flex flex-col gap-6">
//             {navLinks.map((item) => (
//               <Link
//                 key={item.title}
//                 href={item.href}
//                 onClick={() => setMenuOpen(false)}
//                 className="text-lg font-medium text-[var(--heading)] hover:text-[var(--primary)] transition-colors"
//               >
//                 {item.title}
//               </Link>
//             ))}

//             {/* Button */}
//             <Link
//               href="https://calendly.com/hello-bespokible/demo-call"
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={() => setMenuOpen(false)}
//               className="
//     self-start
//     inline-flex
//     items-center
//     justify-center
//     h-10
//     px-6
//     rounded-full
//     bg-[var(--primary)]
//     text-white
//     text-sm
//     font-medium
//     transition-all
//     duration-300
//     hover:opacity-90
//   "
//             >
//               Get Started
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { navLinks } from "@/constants/navlinks";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  // Check if current page is Home
  const isHomePage = pathname === "/";

  // White style only when:
  // Home page + not scrolled
  const isTransparentStyle = isHomePage && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 z-50 w-full transition-all duration-500",

          scrolled
            ? "border-b border-[var(--border)] bg-white/80 py-2 shadow-sm backdrop-blur-xl"
            : "bg-transparent py-2",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={isTransparentStyle ? "/logo.png" : "/logo2.png"}
              alt="Sartique"
              width={160}
              height={40}
              priority
              className={clsx(
                "w-auto transition-all duration-300",

                isTransparentStyle ? "h-36 brightness-0 invert" : "h-12",
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-12 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={clsx(
                  "text-[16px] font-medium transition-colors duration-300",

                  isTransparentStyle
                    ? "text-white hover:text-[var(--primary-light)]"
                    : "text-[var(--heading)] hover:text-[var(--primary)]",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Desktop Button */}
          <div className="hidden lg:block">
            <Link
              href="https://calendly.com/hello-bespokible/demo-call"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                h-10
                items-center
                justify-center
                rounded-full
                bg-[var(--primary)]
                px-6
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:opacity-90
              "
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={clsx(
              "text-3xl transition-all duration-300 lg:hidden",

              isTransparentStyle ? "text-white" : "text-[var(--heading)]",
            )}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      <div
        className={clsx(
          "fixed top-20 left-0 right-0 z-[60] origin-top overflow-hidden bg-white shadow-xl transition-all duration-500 ease-in-out",

          menuOpen
            ? "max-h-[500px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="container py-6">
          <nav className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  text-lg
                  font-medium
                  text-[var(--heading)]
                  transition-colors
                  hover:text-[var(--primary)]
                "
              >
                {item.title}
              </Link>
            ))}

            <Link
              href="https://calendly.com/hello-bespokible/demo-call"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="
                inline-flex
                h-10
                self-start
                items-center
                justify-center
                rounded-full
                bg-[var(--primary)]
                px-6
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:opacity-90
              "
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
