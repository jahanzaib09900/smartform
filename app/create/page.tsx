"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getInitials, useWorkspace } from "@/lib/use-workspace";
import WorkspaceProfileMenu from "@/components/workspace-profile-menu";
import Toast from "@/components/toast";

type DetectedField = {
  name: string;
  label: string;
  value: string;
  type?: string;
};

type IconProps = {
  size?: number;
  strokeWidth?: number;
};

function HomeIcon({ size = 20, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

function PlusIcon({ size = 20, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function FileIcon({ size = 20, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </svg>
  );
}

function CreditIcon({ size = 20, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M15 9.5c-.6-.8-1.6-1.2-3-1.2-1.6 0-2.6.7-2.6 1.8 0 2.8 5.6 1.2 5.6 4.2 0 1.1-1 1.9-2.8 1.9-1.3 0-2.4-.4-3.1-1.3" />
    </svg>
  );
}

function SunIcon({ size = 19 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ size = 19 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

function UploadIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function ArrowRightIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
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

function XIcon({ size = 17 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    label: "Create",
    href: "/create",
    icon: PlusIcon,
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FileIcon,
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: CreditIcon,
  },
];

export default function CreatePage() {
  const { profile } = useWorkspace();
  const [dark, setDark] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [detectedFields, setDetectedFields] = useState<DetectedField[]>([]);
  const [isSamplePreview, setIsSamplePreview] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [workflowError, setWorkflowError] = useState("");
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /*
   * Read the same theme used by Dashboard.
   * This prevents the theme from resetting when changing pages.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("smartform-theme");

    if (savedTheme === "dark") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  /*
   * Keep the exact same global theme state in localStorage.
   */
  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("smartform-theme", dark ? "dark" : "light");
  }, [dark]);

  function handleFile(selectedFile: File | undefined) {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setWorkflowError("Please choose a PDF file.");
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setWorkflowError("File size must be 25 MB or smaller.");
      return;
    }

    setFile(selectedFile);
    setProcessed(false);
    setProcessing(false);
    setDocumentId(null);
    setDetectedFields([]);
    setIsSamplePreview(false);
    setGeneratedUrl(null);
    setWorkflowError("");
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    handleFile(event.dataTransfer.files?.[0]);
  }

  async function startProcessing() {
    if (!file || processing) return;
    if ((profile?.extractions_remaining ?? 5) <= 0) {
      setUpgradeOpen(true);
      return;
    }

    setProcessing(true);
    setProcessed(false);
    setWorkflowError("");

    try {
      let currentDocumentId = documentId;

      if (!currentDocumentId) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadResponse = await fetch("/api/pdf/upload", {
          method: "POST",
          body: formData,
        });
        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadResult.error || "Upload failed.");
        currentDocumentId = uploadResult.document.id;
        setDocumentId(currentDocumentId);
      }

      const analysisResponse = await fetch("/api/pdf/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: currentDocumentId }),
      });
      const analysisResult = await analysisResponse.json();
      if (analysisResponse.status === 501) {
        setDetectedFields([
          { name: "full_name", label: "Full name", value: "" },
          { name: "email", label: "Email address", value: "", type: "email" },
          { name: "address", label: "Address", value: "" },
          { name: "date", label: "Date", value: "", type: "date" },
        ]);
        setIsSamplePreview(true);
        setProcessed(true);
        return;
      }
      if (!analysisResponse.ok) throw new Error(analysisResult.error || "Analysis failed.");

      const fields = Array.isArray(analysisResult.fields)
        ? analysisResult.fields as DetectedField[]
        : [];
      setDetectedFields(fields.map((field) => ({ ...field, value: field.value || "" })));
      setIsSamplePreview(false);
      setProcessed(true);
    } catch (error) {
      setWorkflowError(error instanceof Error ? error.message : "The PDF could not be analyzed.");
    } finally {
      setProcessing(false);
    }
  }

  async function generatePdf() {
    if (!documentId) return;
    if ((profile?.credits_remaining ?? 3) <= 0) {
      setUpgradeOpen(true);
      return;
    }

    setProcessing(true);
    setWorkflowError("");
    try {
      const response = await fetch("/api/pdf/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId,
          fields: detectedFields.map(({ name, value }) => ({ name, value })),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 402) setUpgradeOpen(true);
        throw new Error(result.error || "PDF generation failed.");
      }
      setGeneratedUrl(result.file_url || result.download_url || null);
    } catch (error) {
      setWorkflowError(error instanceof Error ? error.message : "The PDF could not be generated.");
    } finally {
      setProcessing(false);
    }
  }

  function resetUpload() {
    setFile(null);
    setProcessing(false);
    setProcessed(false);
    setDocumentId(null);
    setDetectedFields([]);
    setIsSamplePreview(false);
    setGeneratedUrl(null);
    setWorkflowError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
      {upgradeOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 px-5" role="dialog" aria-modal="true" aria-labelledby="upgrade-title">
          <div className={`w-full max-w-[400px] rounded-2xl border p-6 shadow-2xl ${dark ? "border-white/10 bg-[#151515]" : "border-black/[0.08] bg-white"}`}>
            <h2 id="upgrade-title" className="text-[18px] font-semibold">You’re out of credits</h2>
            <p className={`mt-2 text-[12px] leading-5 ${dark ? "text-white/50" : "text-black/50"}`}>Choose a plan with more monthly PDF generations and extractions.</p>
            <div className="mt-5 flex gap-3">
              <Link href="/pricing" className={`inline-flex h-10 items-center rounded-[9px] px-4 text-[12px] font-semibold ${dark ? "bg-white text-black" : "bg-black text-white"}`}>View plans</Link>
              <button type="button" onClick={() => setUpgradeOpen(false)} className={`h-10 rounded-[9px] border px-4 text-[12px] font-medium ${dark ? "border-white/15" : "border-black/10"}`}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex min-h-screen">
        {/* DESKTOP SIDEBAR */}
        <aside
          className={`hidden w-[250px] shrink-0 border-r lg:flex lg:flex-col ${
            dark
              ? "border-white/10 bg-[#0d0d0d]"
              : "border-black/[0.07] bg-white"
          }`}
        >
          {/* Logo */}
          <div className="flex h-[76px] items-center px-7">
            <Link
              href="/"
              className="group flex items-center gap-2.5"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-[9px] text-[13px] font-bold transition-transform duration-200 group-hover:scale-105 ${
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
          </div>

          {/* Navigation */}
          <div className="px-3 pt-5">
            <p
              className={`px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                dark ? "text-white/35" : "text-black/35"
              }`}
            >
              Workspace
            </p>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.label === "Create";

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group flex h-10 items-center gap-3 rounded-[9px] px-3 text-[13px] font-medium transition-all duration-200 ${
                      active
                        ? dark
                          ? "bg-white/[0.08] text-white"
                          : "bg-black/[0.055] text-black"
                        : dark
                          ? "text-white/50 hover:bg-white/[0.05] hover:text-white"
                          : "text-black/50 hover:bg-black/[0.04] hover:text-black"
                    }`}
                  >
                    <Icon size={18} />

                    <span>{item.label}</span>

                    {item.label === "Create" && (
                      <span
                        className={`ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                          dark
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        NEW
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom */}
          <div className="mt-auto px-4 pb-5">
            <div
              className={`mb-4 rounded-xl border p-4 ${
                dark
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-black/[0.07] bg-black/[0.02]"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`text-[11px] font-medium ${
                    dark ? "text-white/50" : "text-black/50"
                  }`}
                >
                  {profile?.plan || "Free"} plan
                </span>

                <span
                  className={`text-[11px] font-semibold ${
                    dark ? "text-white" : "text-black"
                  }`}
                >
                  {profile?.credits_remaining ?? 3} / {profile?.credits ?? 3}
                </span>
              </div>

              <div
                className={`h-1.5 overflow-hidden rounded-full ${
                  dark ? "bg-white/10" : "bg-black/10"
                }`}
              >
                <div
                  className={`h-full rounded-full ${
                    dark ? "bg-white" : "bg-black"
                  }`}
                  style={{ width: `${Math.min(100, ((profile?.credits_remaining ?? 3) / Math.max(1, profile?.credits ?? 3)) * 100)}%` }}
                />
              </div>

              <Link
                href="/pricing"
                className={`mt-3 block text-[11px] font-medium underline underline-offset-4 transition-opacity hover:opacity-60 ${
                  dark ? "text-white" : "text-black"
                }`}
              >
                Upgrade your plan
              </Link>
            </div>

            <div
              className={`flex items-center gap-3 border-t pt-4 ${
                dark ? "border-white/10" : "border-black/[0.07]"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  dark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                {getInitials(profile?.full_name || "SmartForm")}
              </div>

              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium">
                  {profile?.full_name || "Loading account"}
                </p>

                <p
                  className={`truncate text-[10px] ${
                    dark ? "text-white/40" : "text-black/40"
                  }`}
                >
                  {profile?.email || ""}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">
          {/* TOP BAR */}
          <header
            className={`flex h-[76px] items-center justify-between border-b px-5 sm:px-8 ${
              dark
                ? "border-white/10 bg-[#0d0d0d]"
                : "border-black/[0.07] bg-white"
            }`}
          >
            {/* Mobile Logo */}
            <div className="lg:hidden">
              <Link
                href="/"
                className="flex items-center gap-2"
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

                <span className="text-[16px] font-semibold">
                  SmartForm
                </span>
              </Link>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block">
              <p
                className={`text-[12px] ${
                  dark ? "text-white/40" : "text-black/40"
                }`}
              >
                Workspace
              </p>

              <h1 className="mt-0.5 text-[15px] font-semibold">
                Create
              </h1>
            </div>

            {/* Header Actions */}
            <div className="ml-auto flex items-center gap-2">
              {/* Theme */}
              <button
                onClick={() => setDark((value) => !value)}
                aria-label="Toggle theme"
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 ${
                  dark
                    ? "border-white/10 bg-white/[0.05] text-white/70 hover:bg-white/10 hover:text-white"
                    : "border-black/[0.08] bg-black/[0.02] text-black/60 hover:bg-black/[0.06] hover:text-black"
                }`}
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>

              {/* Profile */}
              <WorkspaceProfileMenu profile={profile} dark={dark} />
            </div>
          </header>

          {/* CONTENT */}
          <div className="mx-auto max-w-[1250px] px-5 pb-28 pt-8 sm:px-8 lg:px-10 lg:py-10 lg:pb-10">
            {/* Heading */}
            <div className="animate-[fadeUp_600ms_ease-out_both]">
              <p
                className={`text-[13px] ${
                  dark ? "text-white/45" : "text-black/45"
                }`}
              >
                New document
              </p>

              <div className="mt-1 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-[28px] font-semibold tracking-[-0.04em] sm:text-[32px]">
                    Fill a PDF form
                  </h2>

                  <p
                    className={`mt-2 max-w-[520px] text-[13px] leading-6 ${
                      dark ? "text-white/45" : "text-black/45"
                    }`}
                  >
                    Upload a blank PDF and let SmartForm detect
                    the fields automatically.
                  </p>
                </div>
              </div>
            </div>

            <ol className="mt-7 grid grid-cols-4 gap-2" aria-label="PDF workflow progress">
              {["Upload", "Analyze", "Fill", "Generate"].map((step, index) => {
                const activeStep = generatedUrl ? 3 : processed ? 2 : documentId ? 1 : 0;
                const active = index <= activeStep;
                return (
                  <li key={step} className={`border-t-2 pt-2 text-[10px] font-medium ${active ? dark ? "border-white text-white" : "border-black text-black" : dark ? "border-white/10 text-white/35" : "border-black/10 text-black/35"}`}>
                    {step}
                  </li>
                );
              })}
            </ol>

            {/* UPLOAD AREA */}
            <div className="mt-8">
              {!file ? (
                <div
                  onDragEnter={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setDragActive(false);
                  }}
                  onDrop={handleDrop}
                  className={`animate-[fadeUp_650ms_100ms_ease-out_both] rounded-2xl border transition-all duration-300 ${
                    dragActive
                      ? dark
                        ? "border-white/40 bg-white/[0.06]"
                        : "border-black/25 bg-black/[0.025]"
                      : dark
                        ? "border-white/10 bg-white/[0.025]"
                        : "border-black/[0.07] bg-white"
                  }`}
                >
                  <div className="flex min-h-[360px] flex-col items-center justify-center px-5 py-10 text-center sm:min-h-[420px] sm:px-10">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 ${
                        dragActive ? "scale-110" : ""
                      } ${
                        dark
                          ? "bg-white text-black"
                          : "bg-black text-white"
                      }`}
                    >
                      <UploadIcon size={22} />
                    </div>

                    <h3 className="mt-5 text-[17px] font-semibold">
                      Drop your PDF here
                    </h3>

                    <p
                      className={`mt-2 max-w-[420px] text-[12px] leading-5 ${
                        dark
                          ? "text-white/40"
                          : "text-black/40"
                      }`}
                    >
                      Upload a blank PDF form and SmartForm will
                      detect the fields automatically.
                    </p>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[9px] px-5 text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:w-auto ${
                        dark
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-black text-white hover:bg-black/85"
                      }`}
                    >
                      Browse files
                      <ArrowRightIcon size={15} />
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      onChange={(event) =>
                        handleFile(event.target.files?.[0])
                      }
                    />

                    <div
                      className={`mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] ${
                        dark
                          ? "text-white/30"
                          : "text-black/30"
                      }`}
                    >
                      <span>PDF only</span>
                      <span>·</span>
                      <span>Maximum 25 MB</span>
                      <span>·</span>
                      <span>Secure processing</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`animate-[fadeUp_600ms_ease-out_both] overflow-hidden rounded-2xl border ${
                    dark
                      ? "border-white/10 bg-white/[0.025]"
                      : "border-black/[0.07] bg-white"
                  }`}
                >
                  {/* Selected File */}
                  <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                    <div className="flex min-w-0 items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          dark
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        <FileIcon size={22} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold">
                          {file.name}
                        </p>

                        <p
                          className={`mt-1 text-[10px] ${
                            dark
                              ? "text-white/40"
                              : "text-black/40"
                          }`}
                        >
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetUpload}
                      disabled={processing}
                      className={`flex h-9 shrink-0 items-center justify-center gap-2 rounded-[9px] border px-3 text-[11px] font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                        dark
                          ? "border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white"
                          : "border-black/[0.08] text-black/55 hover:bg-black/[0.04] hover:text-black"
                      }`}
                    >
                      <XIcon size={14} />
                      Remove
                    </button>
                  </div>

                  {/* Divider */}
                  <div
                    className={`h-px ${
                      dark
                        ? "bg-white/10"
                        : "bg-black/[0.07]"
                    }`}
                  />

                  {/* Processing */}
                  {processing && (
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[13px] font-semibold">
                            {documentId ? "Analyzing your PDF" : "Uploading your PDF"}
                          </p>

                          <p
                            className={`mt-1 text-[10px] ${
                              dark
                                ? "text-white/35"
                                : "text-black/35"
                            }`}
                          >
                            {documentId ? "Detecting document fields..." : "Saving document details..."}
                          </p>
                        </div>

                        <span
                          className={`text-[10px] font-medium ${
                            dark
                              ? "text-white/40"
                              : "text-black/40"
                          }`}
                        >
                          Processing
                        </span>
                      </div>

                      <div
                        className={`mt-5 h-1.5 overflow-hidden rounded-full ${
                          dark
                            ? "bg-white/10"
                            : "bg-black/[0.08]"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full ${
                            dark ? "bg-white" : "bg-black"
                          }`}
                          style={{
                            animation:
                              "progress 1800ms ease-in-out forwards",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Success */}
                  {processed && !processing && (
                    <div className="p-6 sm:p-7">
                      <div
                        className={`flex items-start gap-3 rounded-xl border p-4 ${
                          dark
                            ? "border-white/10 bg-white/[0.03]"
                            : "border-black/[0.07] bg-black/[0.02]"
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            dark
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          }`}
                        >
                          <CheckIcon size={16} />
                        </div>

                        <div>
                          <p className="text-[12px] font-semibold">
                            {isSamplePreview ? "Sample field preview" : "Fields detected"}
                          </p>

                          <p
                            className={`mt-1 text-[10px] leading-5 ${
                              dark
                                ? "text-white/40"
                                : "text-black/40"
                            }`}
                          >
                            {isSamplePreview ? "Field detection is not connected. These example fields are for preview only." : "Review the detected values, then generate your completed PDF."}
                          </p>
                        </div>
                      </div>
                      {detectedFields.length > 0 && (
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          {detectedFields.map((field, index) => (
                            <label key={`${field.name}-${index}`} className="block text-[11px] font-medium">
                              {field.label}
                              <input
                                type={field.type === "date" ? "date" : "text"}
                                value={field.value}
                                onChange={(event) => setDetectedFields((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item))}
                                className={`mt-1.5 h-10 w-full rounded-lg border px-3 text-[12px] outline-none ${dark ? "border-white/10 bg-black/20 text-white" : "border-black/10 bg-white text-black"}`}
                              />
                            </label>
                          ))}
                        </div>
                      )}
                      {generatedUrl && (
                        <a href={generatedUrl} download className={`mt-5 inline-flex h-10 items-center justify-center rounded-[9px] px-4 text-[12px] font-semibold ${dark ? "bg-white text-black" : "bg-black text-white"}`}>
                          Download completed PDF
                        </a>
                      )}
                    </div>
                  )}

                  {workflowError && (
                    <p role="alert" className="px-6 pb-5 text-[11px] text-red-600 sm:px-7">
                      {workflowError}
                    </p>
                  )}

                  {/* Actions */}
                  <div
                    className={`flex flex-col gap-3 border-t p-6 sm:flex-row sm:p-7 ${
                      dark
                        ? "border-white/10"
                        : "border-black/[0.07]"
                    }`}
                  >
                    {!processed ? (
                      <button
                        type="button"
                        onClick={startProcessing}
                        disabled={processing}
                        className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[9px] px-4 text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${
                          dark
                            ? "bg-white text-black hover:bg-white/90"
                            : "bg-black text-white hover:bg-black/85"
                        }`}
                      >
                        {processing
                          ? "Analyzing..."
                          : "Analyze PDF"}
                        {!processing && <ArrowRightIcon size={15} />}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={generatePdf}
                        disabled={processing}
                        className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[9px] px-4 text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:w-auto ${
                          dark
                            ? "bg-white text-black hover:bg-white/90"
                            : "bg-black text-white hover:bg-black/85"
                        }`}
                      >
                        {processing ? "Generating..." : "Generate completed PDF"}
                        <ArrowRightIcon size={15} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={resetUpload}
                      disabled={processing}
                      className={`inline-flex h-10 w-full items-center justify-center rounded-[9px] border px-4 text-[12px] font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto ${
                        dark
                          ? "border-white/15 text-white hover:bg-white/[0.06]"
                          : "border-black/[0.10] text-black hover:bg-black/[0.04]"
                      }`}
                    >
                      Choose another
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* INFORMATION */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div
                className={`animate-[fadeUp_600ms_180ms_ease-out_both] rounded-2xl border p-5 ${
                  dark
                    ? "border-white/10 bg-white/[0.025]"
                    : "border-black/[0.07] bg-white"
                }`}
              >
                <p className="text-[12px] font-semibold">
                  Automatic detection
                </p>

                <p
                  className={`mt-2 text-[10px] leading-5 ${
                    dark
                      ? "text-white/35"
                      : "text-black/35"
                  }`}
                >
                  SmartForm identifies fields and document
                  structure automatically.
                </p>
              </div>

              <div
                className={`animate-[fadeUp_600ms_240ms_ease-out_both] rounded-2xl border p-5 ${
                  dark
                    ? "border-white/10 bg-white/[0.025]"
                    : "border-black/[0.07] bg-white"
                }`}
              >
                <p className="text-[12px] font-semibold">
                  Secure processing
                </p>

                <p
                  className={`mt-2 text-[10px] leading-5 ${
                    dark
                      ? "text-white/35"
                      : "text-black/35"
                  }`}
                >
                  Your PDF is only processed after you choose
                  to analyze it.
                </p>
              </div>

              <div
                className={`animate-[fadeUp_600ms_300ms_ease-out_both] rounded-2xl border p-5 ${
                  dark
                    ? "border-white/10 bg-white/[0.025]"
                    : "border-black/[0.07] bg-white"
                }`}
              >
                <p className="text-[12px] font-semibold">
                  Ready to fill
                </p>

                <p
                  className={`mt-2 text-[10px] leading-5 ${
                    dark
                      ? "text-white/35"
                      : "text-black/35"
                  }`}
                >
                  After detection, you can fill the fields and
                  generate your completed PDF.
                </p>
              </div>
            </div>

            {/* FOOT NOTE */}
            <div
              className={`mt-8 border-t pt-5 text-center text-[10px] ${
                dark
                  ? "border-white/10 text-white/25"
                  : "border-black/[0.07] text-black/25"
              }`}
            >
              SmartForm · Turn any PDF into a fillable document.
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav
        className={`fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-xl lg:hidden ${
          dark
            ? "border-white/10 bg-[#0d0d0d]/95"
            : "border-black/[0.08] bg-white/95"
        }`}
      >
        <div className="mx-auto grid h-[70px] max-w-[520px] grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.label === "Create";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  active
                    ? dark
                      ? "text-white"
                      : "text-black"
                    : dark
                      ? "text-white/40 hover:text-white/75"
                      : "text-black/40 hover:text-black/75"
                }`}
              >
                <div
                  className={`flex h-7 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
                    active
                      ? dark
                        ? "bg-white/10"
                        : "bg-black/[0.06]"
                      : ""
                  }`}
                >
                  <Icon size={18} />
                </div>

                <span className="text-[9px] font-medium">
                  {item.label}
                </span>

                {item.label === "Create" && (
                  <span
                    className={`absolute right-[calc(50%-20px)] top-[8px] h-1.5 w-1.5 rounded-full ${
                      dark ? "bg-white" : "bg-black"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}