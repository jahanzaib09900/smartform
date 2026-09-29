"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/lib/use-workspace";
import WorkspaceProfileMenu from "@/components/workspace-profile-menu";
import Toast from "@/components/toast";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For trying SmartForm.",
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
    description: "For individuals who use SmartForm regularly.",
    features: [
      "50 PDF generations / month",
      "100 PDF extractions / month",
      "Advanced field detection",
      "25 MB file size",
      "Priority processing",
    ],
    button: "Upgrade to Starter",
    featured: true,
  },
  {
    name: "Professional",
    price: "$39",
    description: "For teams and heavier document workflows.",
    features: [
      "200 PDF generations / month",
      "500 PDF extractions / month",
      "Advanced field detection",
      "50 MB file size",
      "Priority processing",
      "Priority support",
    ],
    button: "Choose Professional",
    featured: false,
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.4 5.6L5 10l5.6 1.4L12 17l1.4-5.6L19 10l-5.6-1.4L12 3Z" />
      <path d="m19 16-.6 2.4L16 19l2.4.6L19 22l.6-2.4L22 19l-2.4-.6L19 16Z" />
    </svg>
  );
}

export default function PricingPage() {
  const router = useRouter();
  const { user, profile } = useWorkspace();
  const [dark, setDark] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    setDark(localStorage.getItem("smartform-theme") === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("smartform-theme", dark ? "dark" : "light");
  }, [dark]);

  async function choosePlan(planName: string) {
    if (planName === "Free") {
      router.push(user ? "/dashboard" : "/signup");
      return;
    }
    if (!user) {
      router.push("/login?next=/pricing");
      return;
    }

    setLoadingPlan(planName);
    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not start checkout.");
      if (result.checkout_url) window.location.assign(result.checkout_url);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Could not start checkout.",
        type: "error",
      });
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        dark
          ? "bg-[#090909] text-white"
          : "bg-[#fafafa] text-[#111111]"
      }`}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* HEADER */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
          dark
            ? "border-white/10 bg-[#090909]/90"
            : "border-black/[0.07] bg-white/90"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-[9px] text-[13px] font-bold ${
                dark
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              S
            </div>

            <span className="text-[17px] font-semibold tracking-[-0.02em]">
              SmartForm
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className={`hidden items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium transition-all duration-200 hover:-translate-x-0.5 sm:flex ${
                dark
                  ? "text-white/60 hover:text-white"
                  : "text-black/55 hover:text-black"
              }`}
            >
              <ArrowLeftIcon />
              Dashboard
            </Link>

            <button
              onClick={() => setDark((value) => !value)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 ${
                dark
                  ? "border-white/10 bg-white/[0.05] text-white"
                  : "border-black/[0.08] bg-black/[0.02] text-black"
              }`}
            >
              {dark ? (
                <span className="text-[15px]">☀</span>
              ) : (
                <span className="text-[14px]">☾</span>
              )}
            </button>

              {profile ? (
                <WorkspaceProfileMenu profile={profile} dark={dark} />
              ) : (
                <Link href="/login" className={`text-[12px] font-medium ${dark ? "text-white/70" : "text-black/60"}`}>
                  Log in
                </Link>
              )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-[1150px] px-5 py-14 sm:px-8 sm:py-20">
        {/* HEADING */}
        <div className="mx-auto max-w-[650px] text-center animate-[fadeUp_600ms_ease-out_both]">
          <div
            className={`mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${
              dark
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
          >
            <SparkleIcon />
          </div>

          <h1 className="text-[36px] font-semibold tracking-[-0.045em] sm:text-[48px]">
            Simple pricing.
            <br />
            Powerful documents.
          </h1>

          <p
            className={`mx-auto mt-5 max-w-[560px] text-[14px] leading-7 ${
              dark ? "text-white/45" : "text-black/45"
            }`}
          >
            Choose the plan that fits your workflow. Start free
            and upgrade whenever you need more.
          </p>
        </div>

        {/* PLANS */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 animate-[fadeUp_600ms_ease-out_both] ${
                index === 0
                  ? "[animation-delay:100ms]"
                  : index === 1
                    ? "[animation-delay:180ms]"
                    : "[animation-delay:260ms]"
              } ${
                plan.featured
                  ? dark
                    ? "border-white/25 bg-white text-black shadow-2xl shadow-black/20"
                    : "border-black bg-black text-white shadow-2xl shadow-black/10"
                  : dark
                    ? "border-white/10 bg-white/[0.025]"
                    : "border-black/[0.07] bg-white"
              }`}
            >
              {plan.featured && (
                <div
                  className={`absolute right-5 top-5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] ${
                    dark
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Most popular
                </div>
              )}

              <div>
                <h2 className="text-[17px] font-semibold">
                  {plan.name}
                </h2>

                <p
                  className={`mt-2 min-h-[42px] text-[11px] leading-5 ${
                    plan.featured
                      ? dark
                        ? "text-black/55"
                        : "text-white/55"
                      : dark
                        ? "text-white/40"
                        : "text-black/40"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-7 flex items-end gap-1">
                  <span className="text-[39px] font-semibold tracking-[-0.05em]">
                    {plan.price}
                  </span>

                  {plan.price !== "$0" && (
                    <span
                      className={`mb-2 text-[11px] ${
                        plan.featured
                          ? dark
                            ? "text-black/45"
                            : "text-white/45"
                          : dark
                            ? "text-white/35"
                            : "text-black/35"
                      }`}
                    >
                      / month
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => void choosePlan(plan.name)}
                disabled={loadingPlan !== null || profile?.plan === plan.name}
                className={`mt-7 flex h-10 w-full items-center justify-center rounded-[9px] text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                  plan.featured
                    ? dark
                      ? "bg-black text-white hover:bg-black/85"
                      : "bg-white text-black hover:bg-white/90"
                    : dark
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/85"
                }`}
              >
                {loadingPlan === plan.name
                  ? "Connecting..."
                  : profile?.plan === plan.name
                    ? "Current plan"
                    : plan.button}
              </button>

              <div
                className={`my-6 h-px ${
                  plan.featured
                    ? dark
                      ? "bg-black/10"
                      : "bg-white/10"
                    : dark
                      ? "bg-white/10"
                      : "bg-black/[0.07]"
                }`}
              />

              <p
                className={`mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  plan.featured
                    ? dark
                      ? "text-black/45"
                      : "text-white/45"
                    : dark
                      ? "text-white/35"
                      : "text-black/35"
                }`}
              >
                Includes
              </p>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2.5"
                  >
                    <span
                      className={`mt-0.5 ${
                        plan.featured
                          ? dark
                            ? "text-black"
                            : "text-white"
                          : dark
                            ? "text-white"
                            : "text-black"
                      }`}
                    >
                      <CheckIcon />
                    </span>

                    <span
                      className={`text-[11px] leading-5 ${
                        plan.featured
                          ? dark
                            ? "text-black/65"
                            : "text-white/65"
                          : dark
                            ? "text-white/55"
                            : "text-black/55"
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ONE TIME PACK */}
        <div
          className={`mx-auto mt-8 max-w-[760px] rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 animate-[fadeUp_700ms_350ms_ease-out_both] ${
            dark
              ? "border-white/10 bg-white/[0.025]"
              : "border-black/[0.07] bg-white"
          }`}
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-semibold">
                  One-Time Pack
                </h3>

                <span
                  className={`rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider ${
                    dark
                      ? "bg-white/10 text-white/60"
                      : "bg-black/[0.05] text-black/55"
                  }`}
                >
                  No subscription
                </span>
              </div>

              <p
                className={`mt-1.5 text-[11px] ${
                  dark
                    ? "text-white/40"
                    : "text-black/40"
                }`}
              >
                10 PDF generations · Credits never renew
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[22px] font-semibold">
                $5
              </span>

              <button
                type="button"
                disabled
                className={`h-9 rounded-[8px] border px-4 text-[11px] font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                  dark
                    ? "border-white/15 hover:bg-white hover:text-black"
                    : "border-black/10 hover:bg-black hover:text-white"
                }`}
              >
                Coming soon
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <p
          className={`mt-10 text-center text-[10px] ${
            dark ? "text-white/25" : "text-black/25"
          }`}
        >
          Cancel your subscription anytime. No hidden fees.
        </p>
      </section>
    </main>
  );
}