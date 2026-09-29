"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type IconProps = {
  className?: string;
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const faqs = [
  {
    question: "What is SmartForm?",
    answer:
      "SmartForm turns ordinary PDF forms into easy-to-fill digital documents. Upload your PDF, let SmartForm detect the fields, enter your information, and download the completed document.",
  },
  {
    question: "Do I need to edit the PDF manually?",
    answer:
      "No. SmartForm is designed to handle the field placement for you. You simply review the detected fields and provide the required information.",
  },
  {
    question: "Can SmartForm extract information from PDFs?",
    answer:
      "Yes. SmartForm can extract structured information from supported PDF documents so you can work with the information without manually copying everything.",
  },
  {
    question: "Is my document secure?",
    answer:
      "Documents are processed through the application workflow and are handled according to your account and storage settings. Sensitive documents should always be reviewed before uploading.",
  },
  {
    question: "Can I use SmartForm without a subscription?",
    answer:
      "Yes. The free plan includes a limited number of PDF generations and extractions each month.",
  },
];

const features = [
  {
    number: "01",
    title: "Automatic field detection",
    description:
      "SmartForm analyzes your PDF and identifies areas that need information.",
    icon: "scan",
  },
  {
    number: "02",
    title: "Fill once, generate instantly",
    description:
      "Enter your information and let SmartForm place it into the right locations.",
    icon: "edit",
  },
  {
    number: "03",
    title: "Ready-to-use documents",
    description:
      "Download a completed PDF that is ready to save, print, or send.",
    icon: "file",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For trying SmartForm",
    features: [
      "3 PDF generations / month",
      "5 PDF extractions / month",
      "Basic field detection",
      "Download generated PDFs",
    ],
    button: "Get started",
    featured: false,
  },
  {
    name: "Starter",
    price: "$19",
    description: "For regular document work",
    features: [
      "50 PDF generations / month",
      "100 PDF extractions / month",
      "Advanced field detection",
      "25 MB file size",
      "Priority processing",
    ],
    button: "Start Starter",
    featured: true,
  },
  {
    name: "Professional",
    price: "$39",
    description: "For heavier document workflows",
    features: [
      "200 PDF generations / month",
      "500 PDF extractions / month",
      "Advanced field detection",
      "50 MB file size",
      "Priority processing",
      "Priority support",
    ],
    button: "Start Professional",
    featured: false,
  },
];

function ArrowRightIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function XIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function SunIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.42 1.42" />
      <path d="m17.65 17.65 1.42 1.42" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.35 17.65-1.42 1.42" />
      <path d="m19.07 4.93-1.42 1.42" />
    </svg>
  );
}

function MoonIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function SparklesIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3-1.1 3.4a4 4 0 0 1-2.5 2.5L5 10l3.4 1.1a4 4 0 0 1 2.5 2.5L12 17l1.1-3.4a4 4 0 0 1 2.5-2.5L19 10l-3.4-1.1a4 4 0 0 1-2.5-2.5L12 3Z" />
      <path d="m19 16-.5 1.5a2 2 0 0 1-1.3 1.3l-1.5.5 1.5.5a2 2 0 0 1 1.3 1.3L19 22l.5-1.5a2 2 0 0 1 1.3-1.3l1.5-.5-1.5-.5a2 2 0 0 1-1.3-1.3L19 16Z" />
    </svg>
  );
}

function FileTextIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
      <path d="M8 9h2" />
    </svg>
  );
}

function FileCheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="m8 16 2.2 2L16 12" />
    </svg>
  );
}

function ScanIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 8h10" />
      <path d="M7 12h10" />
      <path d="M7 16h6" />
    </svg>
  );
}

function EditIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? "reveal-visible" : "reveal-hidden"} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    setMobileOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleTheme = () => {
    setDark((current) => !current);
  };

  return (
    <main
      className={
        dark
          ? "min-h-screen bg-[#0a0a0a] text-white transition-colors duration-500"
          : "min-h-screen bg-white text-[#111111] transition-colors duration-500"
      }
    >
      {/* NAVBAR */}

      <header
        className={
          dark
            ? "sticky top-0 z-50 border-b border-white/[0.08] bg-[#0a0a0a]/90 backdrop-blur-xl"
            : "sticky top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl"
        }
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="group flex items-center gap-2.5"
          >
            <span
              className={
                dark
                  ? "flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 group-hover:scale-105"
                  : "flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white transition-transform duration-300 group-hover:scale-105"
              }
            >
              <FileCheckIcon className="h-[19px] w-[19px]" />
            </span>

            <span className="text-[17px] font-semibold tracking-[-0.02em]">
              SmartForm
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <button
              type="button"
              onClick={() => scrollTo("how-it-works")}
              className="text-sm font-medium opacity-65 transition-opacity duration-200 hover:opacity-100"
            >
              How it works
            </button>

            <button
              type="button"
              onClick={() => scrollTo("features")}
              className="text-sm font-medium opacity-65 transition-opacity duration-200 hover:opacity-100"
            >
              Features
            </button>

            <button
              type="button"
              onClick={() => scrollTo("pricing")}
              className="text-sm font-medium opacity-65 transition-opacity duration-200 hover:opacity-100"
            >
              Pricing
            </button>

            <button
              type="button"
              onClick={() => scrollTo("faq")}
              className="text-sm font-medium opacity-65 transition-opacity duration-200 hover:opacity-100"
            >
              FAQ
            </button>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={
                dark
                  ? "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  : "flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-black/60 transition-all duration-300 hover:border-black/20 hover:bg-black/[0.04] hover:text-black"
              }
            >
              <span
                className="transition-transform duration-500"
                style={{
                  transform: dark ? "rotate(-18deg)" : "rotate(0deg)",
                }}
              >
                {dark ? (
                  <SunIcon className="h-[17px] w-[17px]" />
                ) : (
                  <MoonIcon className="h-[17px] w-[17px]" />
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => (window.location.href = "/signup")}
              className={
                dark
                  ? "rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                  : "rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85"
              }
            >
              Get started
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={
                dark
                  ? "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
                  : "flex h-10 w-10 items-center justify-center rounded-xl border border-black/10"
              }
            >
              {dark ? (
                <SunIcon className="h-[17px] w-[17px]" />
              ) : (
                <MoonIcon className="h-[17px] w-[17px]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Open menu"
              className={
                dark
                  ? "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
                  : "flex h-10 w-10 items-center justify-center rounded-xl border border-black/10"
              }
            >
              {mobileOpen ? (
                <XIcon className="h-[18px] w-[18px]" />
              ) : (
                <MenuIcon className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
            mobileOpen
              ? "max-h-[360px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={
              dark
                ? "border-t border-white/[0.08] px-5 py-4"
                : "border-t border-black/[0.06] px-5 py-4"
            }
          >
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => scrollTo("how-it-works")}
                className="rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                How it works
              </button>

              <button
                type="button"
                onClick={() => scrollTo("features")}
                className="rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                Features
              </button>

              <button
                type="button"
                onClick={() => scrollTo("pricing")}
                className="rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                Pricing
              </button>

              <button
                type="button"
                onClick={() => scrollTo("faq")}
                className="rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                FAQ
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = "/signup")}
                className={
                  dark
                    ? "mt-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black"
                    : "mt-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white"
                }
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-32">
          <div>
            <div
              className="animate-[fadeUp_700ms_ease-out_both]"
              style={{ animationDelay: "50ms" }}
            >
              <div
                className={
                  dark
                    ? "mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/75"
                    : "mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.025] px-3.5 py-2 text-xs font-medium text-black/70"
                }
              >
                <SparklesIcon className="h-3.5 w-3.5" />
                AI-powered PDF automation
              </div>
            </div>

            <h1
              className="max-w-[760px] text-[clamp(42px,6vw,78px)] font-semibold leading-[0.98] tracking-[-0.055em] animate-[fadeUp_800ms_ease-out_both]"
              style={{ animationDelay: "140ms" }}
            >
              Turn Any PDF Form Into a{" "}
              <span className={dark ? "text-white/45" : "text-black/40"}>
                Fillable Document
              </span>
            </h1>

            <p
              className={
                dark
                  ? "mt-7 max-w-[600px] text-[17px] leading-8 text-white/55 animate-[fadeUp_800ms_ease-out_both] sm:text-[18px]"
                  : "mt-7 max-w-[600px] text-[17px] leading-8 text-black/55 animate-[fadeUp_800ms_ease-out_both] sm:text-[18px]"
              }
              style={{ animationDelay: "230ms" }}
            >
              Upload a PDF, let AI detect the fields, fill in your
              information, and download the completed document in seconds.
            </p>

            <div
              className="mt-9 flex flex-col gap-3 animate-[fadeUp_800ms_ease-out_both] sm:flex-row"
              style={{ animationDelay: "320ms" }}
            >
              <button
                type="button"
                onClick={() => (window.location.href = "/signup")}
                className={
                  dark
                    ? "group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white/90"
                    : "group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black/85"
                }
              >
                Try for free
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("how-it-works")}
                className={
                  dark
                    ? "inline-flex h-12 items-center justify-center rounded-xl border border-white/10 px-6 text-sm font-semibold text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
                    : "inline-flex h-12 items-center justify-center rounded-xl border border-black/10 px-6 text-sm font-semibold text-black/75 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-black/[0.025]"
                }
              >
                See how it works
              </button>
            </div>

            <div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs animate-[fadeUp_800ms_ease-out_both]"
              style={{ animationDelay: "400ms" }}
            >
              <span
                className={
                  dark
                    ? "flex items-center gap-2 text-white/50"
                    : "flex items-center gap-2 text-black/50"
                }
              >
                <CheckIcon className="h-3.5 w-3.5" />
                No credit card required
              </span>

              <span
                className={
                  dark
                    ? "flex items-center gap-2 text-white/50"
                    : "flex items-center gap-2 text-black/50"
                }
              >
                <CheckIcon className="h-3.5 w-3.5" />
                Free monthly usage
              </span>
            </div>
          </div>

          {/* HERO PRODUCT VISUAL */}

          <div
            className="relative mx-auto w-full max-w-[590px] animate-[fadeUp_900ms_ease-out_both]"
            style={{ animationDelay: "250ms" }}
          >
            <div
              className={
                dark
                  ? "relative rounded-[30px] border border-white/[0.09] bg-[#101010] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
                  : "relative rounded-[30px] border border-black/[0.08] bg-[#fafafa] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.10)]"
              }
            >
              <div
                className={
                  dark
                    ? "relative overflow-hidden rounded-[23px] border border-white/[0.07] bg-[#151515]"
                    : "relative overflow-hidden rounded-[23px] border border-black/[0.07] bg-white"
                }
              >
                <div
                  className={
                    dark
                      ? "flex h-12 items-center justify-between border-b border-white/[0.07] px-5"
                      : "flex h-12 items-center justify-between border-b border-black/[0.07] px-5"
                  }
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={
                        dark
                          ? "h-2 w-2 rounded-full bg-white/50"
                          : "h-2 w-2 rounded-full bg-black/40"
                      }
                    />
                    <span
                      className={
                        dark
                          ? "text-[11px] font-medium text-white/40"
                          : "text-[11px] font-medium text-black/40"
                      }
                    >
                      SmartForm
                    </span>
                  </div>

                  <span
                    className={
                      dark
                        ? "text-[10px] text-white/30"
                        : "text-[10px] text-black/30"
                    }
                  >
                    New document
                  </span>
                </div>

                <div className="p-5 sm:p-7">
                  <div
                    className={
                      dark
                        ? "mb-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.025] p-5"
                        : "mb-5 rounded-2xl border border-dashed border-black/10 bg-black/[0.015] p-5"
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={
                          dark
                            ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-black"
                            : "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white"
                        }
                      >
                        <FileTextIcon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          application-form.pdf
                        </p>

                        <p
                          className={
                            dark
                              ? "mt-1 text-xs text-white/35"
                              : "mt-1 text-xs text-black/40"
                          }
                        >
                          2.4 MB · 4 pages
                        </p>
                      </div>

                      <div
                        className={
                          dark
                            ? "ml-auto hidden rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] text-white/50 sm:block"
                            : "ml-auto hidden rounded-lg border border-black/10 px-2.5 py-1.5 text-[10px] text-black/50 sm:block"
                        }
                      >
                        PDF
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      dark
                        ? "rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-5"
                        : "rounded-2xl border border-black/[0.07] bg-[#fafafa] p-5"
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">
                          Detecting fields
                        </p>

                        <p
                          className={
                            dark
                              ? "mt-1 text-xs text-white/35"
                              : "mt-1 text-xs text-black/40"
                          }
                        >
                          AI is analyzing your document
                        </p>
                      </div>

                      <div
                        className={
                          dark
                            ? "flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
                            : "flex h-9 w-9 items-center justify-center rounded-full border border-black/10"
                        }
                      >
                        <SparklesIcon className="h-4 w-4" />
                      </div>
                    </div>

                    <div
                      className={
                        dark
                          ? "mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"
                          : "mt-5 h-1.5 overflow-hidden rounded-full bg-black/10"
                      }
                    >
                      <div
                        className={
                          dark
                            ? "h-full rounded-full bg-white animate-[progress_3.2s_ease-in-out_infinite]"
                            : "h-full rounded-full bg-black animate-[progress_3.2s_ease-in-out_infinite]"
                        }
                      />
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {["Name", "Address", "Date"].map((field) => (
                        <div
                          key={field}
                          className={
                            dark
                              ? "rounded-lg border border-white/[0.07] px-3 py-2"
                              : "rounded-lg border border-black/[0.07] bg-white px-3 py-2"
                          }
                        >
                          <span
                            className={
                              dark
                                ? "text-[10px] text-white/35"
                                : "text-[10px] text-black/40"
                            }
                          >
                            {field}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  dark
                    ? "absolute -bottom-7 -left-7 hidden w-[205px] animate-[float_5s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-[#111111] p-4 shadow-2xl sm:block"
                    : "absolute -bottom-7 -left-7 hidden w-[205px] animate-[float_5s_ease-in-out_infinite] rounded-2xl border border-black/10 bg-white p-4 shadow-2xl sm:block"
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={
                      dark
                        ? "flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black"
                        : "flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white"
                    }
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Fields detected
                    </p>
                    <p
                      className={
                        dark
                          ? "mt-0.5 text-[10px] text-white/35"
                          : "mt-0.5 text-[10px] text-black/40"
                      }
                    >
                      12 fields ready
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={
                  dark
                    ? "absolute -right-5 -top-5 hidden animate-[float_6s_ease-in-out_infinite] rounded-xl border border-white/10 bg-[#111111] px-4 py-3 shadow-2xl sm:block"
                    : "absolute -right-5 -top-5 hidden animate-[float_6s_ease-in-out_infinite] rounded-xl border border-black/10 bg-white px-4 py-3 shadow-2xl sm:block"
                }
                style={{ animationDelay: "700ms" }}
              >
                <div className="flex items-center gap-2">
                  <SparklesIcon className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-semibold">
                    AI processing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className={
          dark
            ? "border-y border-white/[0.07] bg-[#0d0d0d]"
            : "border-y border-black/[0.06] bg-[#fafafa]"
        }
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <Reveal>
            <div className="max-w-2xl">
              <p
                className={
                  dark
                    ? "text-xs font-semibold uppercase tracking-[0.18em] text-white/40"
                    : "text-xs font-semibold uppercase tracking-[0.18em] text-black/40"
                }
              >
                How it works
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                From blank PDF to finished document.
              </h2>

              <p
                className={
                  dark
                    ? "mt-5 text-base leading-7 text-white/50"
                    : "mt-5 text-base leading-7 text-black/50"
                }
              >
                A simple workflow designed to remove repetitive PDF work.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Upload",
                description:
                  "Upload the PDF form you need to complete.",
              },
              {
                number: "02",
                title: "Detect",
                description:
                  "SmartForm analyzes the document and identifies fields.",
              },
              {
                number: "03",
                title: "Fill",
                description:
                  "Enter your information into the detected fields.",
              },
              {
                number: "04",
                title: "Download",
                description:
                  "Generate and download your completed PDF.",
              },
            ].map((step, index) => (
              <Reveal key={step.number} delay={index * 90}>
                <div
                  className={
                    dark
                      ? "group h-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04]"
                      : "group h-full rounded-2xl border border-black/[0.07] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.13] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
                  }
                >
                  <span
                    className={
                      dark
                        ? "text-xs font-semibold text-white/30"
                        : "text-xs font-semibold text-black/30"
                    }
                  >
                    {step.number}
                  </span>

                  <h3 className="mt-12 text-lg font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>

                  <p
                    className={
                      dark
                        ? "mt-3 text-sm leading-6 text-white/45"
                        : "mt-3 text-sm leading-6 text-black/50"
                    }
                  >
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section id="features">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p
                className={
                  dark
                    ? "text-xs font-semibold uppercase tracking-[0.18em] text-white/40"
                    : "text-xs font-semibold uppercase tracking-[0.18em] text-black/40"
                }
              >
                Features
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Less paperwork. More progress.
              </h2>

              <p
                className={
                  dark
                    ? "mt-5 text-base leading-7 text-white/50"
                    : "mt-5 text-base leading-7 text-black/50"
                }
              >
                Everything you need for a faster PDF workflow.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Reveal key={feature.number} delay={index * 100}>
                <div
                  className={
                    dark
                      ? "group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16]"
                      : "group relative h-full overflow-hidden rounded-2xl border border-black/[0.07] bg-[#fafafa] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.13] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                  }
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={
                        dark
                          ? "flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                          : "flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white"
                      }
                    >
                      {feature.icon === "scan" && (
                        <ScanIcon className="h-5 w-5" />
                      )}

                      {feature.icon === "edit" && (
                        <EditIcon className="h-5 w-5" />
                      )}

                      {feature.icon === "file" && (
                        <FileCheckIcon className="h-5 w-5" />
                      )}
                    </div>

                    <span
                      className={
                        dark
                          ? "text-xs font-semibold text-white/25"
                          : "text-xs font-semibold text-black/25"
                      }
                    >
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-16 text-xl font-semibold tracking-[-0.025em]">
                    {feature.title}
                  </h3>

                  <p
                    className={
                      dark
                        ? "mt-3 max-w-sm text-sm leading-6 text-white/45"
                        : "mt-3 max-w-sm text-sm leading-6 text-black/50"
                    }
                  >
                    {feature.description}
                  </p>

                  <div
                    className={
                      dark
                        ? "absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white/30 transition-transform duration-500 group-hover:scale-x-100"
                        : "absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-black/30 transition-transform duration-500 group-hover:scale-x-100"
                    }
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT FLOW */}

      <section
        className={
          dark
            ? "border-y border-white/[0.07] bg-[#0d0d0d]"
            : "border-y border-black/[0.06] bg-[#fafafa]"
        }
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
          <Reveal>
            <div>
              <p
                className={
                  dark
                    ? "text-xs font-semibold uppercase tracking-[0.18em] text-white/40"
                    : "text-xs font-semibold uppercase tracking-[0.18em] text-black/40"
                }
              >
                Built for speed
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Your document should not be the bottleneck.
              </h2>

              <p
                className={
                  dark
                    ? "mt-6 max-w-xl text-base leading-7 text-white/50"
                    : "mt-6 max-w-xl text-base leading-7 text-black/50"
                }
              >
                SmartForm removes the repetitive work between receiving a
                PDF and having a completed document ready to use.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Upload the original document",
                  "Let AI identify the required fields",
                  "Enter your information once",
                  "Download the finished PDF",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <div
                      className={
                        dark
                          ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black"
                          : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white"
                      }
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </div>

                    <span
                      className={
                        dark
                          ? "text-sm text-white/65"
                          : "text-sm text-black/65"
                      }
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className={
                dark
                  ? "rounded-3xl border border-white/[0.08] bg-[#101010] p-4 shadow-2xl"
                  : "rounded-3xl border border-black/[0.07] bg-white p-4 shadow-[0_25px_70px_rgba(0,0,0,0.08)]"
              }
            >
              <div
                className={
                  dark
                    ? "rounded-2xl border border-white/[0.07] bg-[#151515] p-6"
                    : "rounded-2xl border border-black/[0.07] bg-[#fafafa] p-6"
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      Completed document
                    </p>

                    <p
                      className={
                        dark
                          ? "mt-1 text-xs text-white/35"
                          : "mt-1 text-xs text-black/40"
                      }
                    >
                      application-form-filled.pdf
                    </p>
                  </div>

                  <div
                    className={
                      dark
                        ? "flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"
                        : "flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white"
                    }
                  >
                    <FileCheckIcon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    ["Full name", "Alex Morgan"],
                    ["Email address", "alex@example.com"],
                    ["Phone", "+1 555 204 8190"],
                    ["Date", "September 28, 2026"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className={
                        dark
                          ? "rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
                          : "rounded-xl border border-black/[0.06] bg-white p-4"
                      }
                    >
                      <p
                        className={
                          dark
                            ? "text-[10px] font-medium uppercase tracking-wider text-white/30"
                            : "text-[10px] font-medium uppercase tracking-wider text-black/35"
                        }
                      >
                        {label}
                      </p>

                      <p className="mt-1 text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className={
                    dark
                      ? "mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                      : "mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85"
                  }
                >
                  Download completed PDF
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}

      <section id="pricing">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p
                className={
                  dark
                    ? "text-xs font-semibold uppercase tracking-[0.18em] text-white/40"
                    : "text-xs font-semibold uppercase tracking-[0.18em] text-black/40"
                }
              >
                Pricing
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Simple plans. Clear limits.
              </h2>

              <p
                className={
                  dark
                    ? "mt-5 text-base leading-7 text-white/50"
                    : "mt-5 text-base leading-7 text-black/50"
                }
              >
                Start free and upgrade when your document workflow grows.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 100}>
                <div
                  className={
                    plan.featured
                      ? dark
                        ? "relative h-full rounded-2xl border border-white/20 bg-white/[0.06] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                        : "relative h-full rounded-2xl border border-black/15 bg-[#fafafa] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                      : dark
                        ? "relative h-full rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15]"
                        : "relative h-full rounded-2xl border border-black/[0.07] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.13] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                  }
                >
                  {plan.featured && (
                    <div
                      className={
                        dark
                          ? "absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black"
                          : "absolute right-5 top-5 rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
                      }
                    >
                      Popular
                    </div>
                  )}

                  <p
                    className={
                      dark
                        ? "text-sm font-semibold text-white/65"
                        : "text-sm font-semibold text-black/65"
                    }
                  >
                    {plan.name}
                  </p>

                  <div className="mt-5 flex items-end gap-1">
                    <span className="text-5xl font-semibold tracking-[-0.05em]">
                      {plan.price}
                    </span>

                    <span
                      className={
                        dark
                          ? "pb-2 text-sm text-white/35"
                          : "pb-2 text-sm text-black/40"
                      }
                    >
                      /month
                    </span>
                  </div>

                  <p
                    className={
                      dark
                        ? "mt-3 min-h-[40px] text-sm text-white/40"
                        : "mt-3 min-h-[40px] text-sm text-black/45"
                    }
                  >
                    {plan.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => (window.location.href = "/signup")}
                    className={
                      plan.featured
                        ? dark
                          ? "mt-7 h-11 w-full rounded-xl bg-white text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                          : "mt-7 h-11 w-full rounded-xl bg-black text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85"
                        : dark
                          ? "mt-7 h-11 w-full rounded-xl border border-white/10 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
                          : "mt-7 h-11 w-full rounded-xl border border-black/10 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/[0.03]"
                    }
                  >
                    {plan.button}
                  </button>

                  <div
                    className={
                      dark
                        ? "my-7 h-px bg-white/[0.07]"
                        : "my-7 h-px bg-black/[0.07]"
                    }
                  />

                  <ul className="space-y-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={
                          dark
                            ? "flex items-start gap-3 text-sm text-white/55"
                            : "flex items-start gap-3 text-sm text-black/60"
                        }
                      >
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={180}>
            <div
              className={
                dark
                  ? "mx-auto mt-6 max-w-6xl rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-6"
                  : "mx-auto mt-6 max-w-6xl rounded-2xl border border-black/[0.07] bg-[#fafafa] p-6"
              }
            >
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">Need a one-time boost?</p>

                  <p
                    className={
                      dark
                        ? "mt-1 text-sm text-white/40"
                        : "mt-1 text-sm text-black/45"
                    }
                  >
                    Get 10 PDF generations for $5. Credits never renew.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => (window.location.href = "/signup")}
                  className={
                    dark
                      ? "rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                      : "rounded-xl border border-black/10 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:border-black/20 hover:bg-black/[0.03]"
                  }
                >
                  Get one-time pack
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}

      <section
        id="faq"
        className={
          dark
            ? "border-t border-white/[0.07] bg-[#0d0d0d]"
            : "border-t border-black/[0.06] bg-[#fafafa]"
        }
      >
        <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 lg:py-32">
          <Reveal>
            <div className="text-center">
              <p
                className={
                  dark
                    ? "text-xs font-semibold uppercase tracking-[0.18em] text-white/40"
                    : "text-xs font-semibold uppercase tracking-[0.18em] text-black/40"
                }
              >
                FAQ
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Questions, answered.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <Reveal key={faq.question} delay={index * 60}>
                  <div
                    className={
                      dark
                        ? "border-b border-white/[0.08]"
                        : "border-b border-black/[0.08]"
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base font-semibold tracking-[-0.015em] sm:text-lg">
                        {faq.question}
                      </span>

                      <span
                        className="shrink-0 transition-transform duration-300"
                        style={{
                          transform: isOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        <ChevronDownIcon className="h-5 w-5" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={
                            dark
                              ? "max-w-3xl pb-6 text-sm leading-7 text-white/45"
                              : "max-w-3xl pb-6 text-sm leading-7 text-black/50"
                          }
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <Reveal>
            <div
              className={
                dark
                  ? "relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#111111] px-6 py-16 text-center sm:px-12"
                  : "relative overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#f7f7f7] px-6 py-16 text-center sm:px-12"
              }
            >
              <div className="relative z-10 mx-auto max-w-3xl">
                <div
                  className={
                    dark
                      ? "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black"
                      : "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"
                  }
                >
                  <SparklesIcon className="h-5 w-5" />
                </div>

                <h2 className="mt-7 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Stop filling PDFs the hard way.
                </h2>

                <p
                  className={
                    dark
                      ? "mx-auto mt-5 max-w-xl text-base leading-7 text-white/45"
                      : "mx-auto mt-5 max-w-xl text-base leading-7 text-black/50"
                  }
                >
                  Upload your first document and see how much simpler the
                  process can be.
                </p>

                <button
                  type="button"
                  onClick={() => (window.location.href = "/signup")}
                  className={
                    dark
                      ? "group mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white/90"
                      : "group mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-black px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black/85"
                  }
                >
                  Get started for free
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        className={
          dark
            ? "border-t border-white/[0.07]"
            : "border-t border-black/[0.07]"
        }
      >
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <div
                className={
                  dark
                    ? "flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black"
                    : "flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white"
                }
              >
                <FileCheckIcon className="h-4 w-4" />
              </div>

              <span className="text-sm font-semibold">SmartForm</span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={() => scrollTo("pricing")}
                className={
                  dark
                    ? "text-xs text-white/40 transition-colors hover:text-white"
                    : "text-xs text-black/45 transition-colors hover:text-black"
                }
              >
                Pricing
              </button>

              <button
                type="button"
                onClick={() => scrollTo("faq")}
                className={
                  dark
                    ? "text-xs text-white/40 transition-colors hover:text-white"
                    : "text-xs text-black/45 transition-colors hover:text-black"
                }
              >
                FAQ
              </button>

              <button
                type="button"
                className={
                  dark
                    ? "text-xs text-white/40 transition-colors hover:text-white"
                    : "text-xs text-black/45 transition-colors hover:text-black"
                }
              >
                Privacy
              </button>

              <button
                type="button"
                className={
                  dark
                    ? "text-xs text-white/40 transition-colors hover:text-white"
                    : "text-xs text-black/45 transition-colors hover:text-black"
                }
              >
                Terms
              </button>
            </div>
          </div>

          <div
            className={
              dark
                ? "mt-8 border-t border-white/[0.07] pt-6 text-xs text-white/25"
                : "mt-8 border-t border-black/[0.07] pt-6 text-xs text-black/30"
            }
          >
            © 2026 SmartForm. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}