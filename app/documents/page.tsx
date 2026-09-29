"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getInitials, useWorkspace } from "@/lib/use-workspace";
import WorkspaceProfileMenu from "@/components/workspace-profile-menu";
import Toast from "@/components/toast";

type WorkspaceDocument = {
  id: string;
  file_name: string;
  created_at: string;
  status: "processing" | "completed" | "failed";
  file_url: string | null;
  error_message: string | null;
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

function SearchIcon({ size = 18 }: IconProps) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
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

function MoreIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="5" cy="12" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="19" cy="12" r="1.4" />
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

export default function DocumentsPage() {
  const { profile } = useWorkspace();
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [documents, setDocuments] = useState<WorkspaceDocument[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("smartform-theme");

    if (savedTheme === "dark") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("smartform-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    let active = true;

    async function loadDocuments() {
      const { data, error } = await supabase
        .from("documents")
        .select("id, file_name, created_at, status, file_url, error_message")
        .order("created_at", { ascending: false });

      if (!active) return;
      setDocuments(error ? [] : data || []);
      setLoadingDocuments(false);
      if (error) {
        setToast({ message: "Documents are unavailable. Apply the database migration and try again.", type: "error" });
      }
    }

    void loadDocuments();
    return () => {
      active = false;
    };
  }, []);

  async function deleteDocument(id: string) {
    const response = await fetch(`/api/documents/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setToast({ message: "Could not delete this document.", type: "error" });
      return;
    }
    setDocuments((current) => current.filter((item) => item.id !== id));
    setMenuOpen(null);
    setToast({ message: "Document deleted.", type: "success" });
  }

  const filteredDocuments = documents.filter((document) =>
    document.file_name.toLowerCase().includes(search.toLowerCase())
  );

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
                const active = item.label === "Documents";

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
                Documents
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
                Workspace
              </p>

              <div className="mt-1 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-[28px] font-semibold tracking-[-0.04em] sm:text-[32px]">
                    Your documents
                  </h2>

                  <p
                    className={`mt-2 max-w-[520px] text-[13px] leading-6 ${
                      dark ? "text-white/45" : "text-black/45"
                    }`}
                  >
                    View and manage your generated PDF documents.
                  </p>
                </div>

                <Link
                  href="/create"
                  className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[9px] px-4 text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:w-auto ${
                    dark
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/85"
                  }`}
                >
                  <PlusIcon size={16} />
                  Create PDF
                  <ArrowRightIcon size={15} />
                </Link>
              </div>
            </div>

            {/* SEARCH + COUNT */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div
                className={`flex h-10 w-full items-center gap-2 rounded-[9px] border px-3 sm:max-w-[330px] ${
                  dark
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-black/[0.08] bg-white"
                }`}
              >
                <span
                  className={
                    dark ? "text-white/35" : "text-black/35"
                  }
                >
                  <SearchIcon size={17} />
                </span>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search documents..."
                  className={`min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:opacity-40 ${
                    dark ? "text-white" : "text-black"
                  }`}
                />
              </div>

              <p
                className={`text-[11px] ${
                  dark ? "text-white/35" : "text-black/35"
                }`}
              >
                {filteredDocuments.length}{" "}
                {filteredDocuments.length === 1
                  ? "document"
                  : "documents"}
              </p>
            </div>

            {/* DOCUMENT LIST */}
            <div className="mt-5">
              {loadingDocuments ? (
                <div className={`rounded-2xl border px-5 py-16 text-center text-[12px] ${dark ? "border-white/10 bg-white/[0.025] text-white/45" : "border-black/[0.07] bg-white text-black/45"}`}>
                  Loading documents...
                </div>
              ) : filteredDocuments.length > 0 ? (
                <div
                  className={`animate-[fadeUp_650ms_150ms_ease-out_both] overflow-hidden rounded-2xl border ${
                    dark
                      ? "border-white/10 bg-white/[0.02]"
                      : "border-black/[0.07] bg-white"
                  }`}
                >
                  {/* Desktop Heading */}
                  <div
                    className={`hidden grid-cols-[minmax(0,1fr)_170px_110px_45px] items-center gap-4 border-b px-5 py-3.5 sm:grid ${
                      dark
                        ? "border-white/[0.07]"
                        : "border-black/[0.06]"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${
                        dark
                          ? "text-white/30"
                          : "text-black/30"
                      }`}
                    >
                      Document
                    </span>

                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${
                        dark
                          ? "text-white/30"
                          : "text-black/30"
                      }`}
                    >
                      Date
                    </span>

                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${
                        dark
                          ? "text-white/30"
                          : "text-black/30"
                      }`}
                    >
                      Status
                    </span>

                    <span />
                  </div>

                  {filteredDocuments.map((document, index) => (
                    <div
                      key={document.id}
                      className={`relative flex min-w-0 flex-col gap-3 px-4 py-4 transition-colors duration-200 sm:grid sm:grid-cols-[minmax(0,1fr)_170px_110px_45px] sm:items-center sm:gap-4 sm:px-5 ${
                        index !== filteredDocuments.length - 1
                          ? dark
                            ? "border-b border-white/[0.07]"
                            : "border-b border-black/[0.06]"
                          : ""
                      } ${
                        dark
                          ? "hover:bg-white/[0.035]"
                          : "hover:bg-black/[0.018]"
                      }`}
                    >
                      {/* Name */}
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            dark
                              ? "bg-white/[0.08] text-white/70"
                              : "bg-black/[0.045] text-black/60"
                          }`}
                        >
                          <FileIcon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12px] font-medium">
                            {document.file_name}
                          </p>

                          <p
                            className={`mt-1 text-[10px] sm:hidden ${
                              dark
                                ? "text-white/35"
                                : "text-black/35"
                            }`}
                          >
                            {new Date(document.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <p
                        className={`hidden text-[10px] sm:block ${
                          dark
                            ? "text-white/40"
                            : "text-black/40"
                        }`}
                      >
                        {new Date(document.created_at).toLocaleString()}
                      </p>

                      {/* Status */}
                      <span
                        title={document.error_message || undefined}
                        className={`w-fit rounded-full px-2.5 py-1 text-[9px] font-semibold ${document.status === "completed" ? "bg-emerald-500/10 text-emerald-700" : document.status === "failed" ? "bg-red-500/10 text-red-700" : dark ? "bg-white/[0.08] text-white/60" : "bg-black/[0.045] text-black/55"}`}
                      >
                        {document.status[0].toUpperCase() + document.status.slice(1)}
                      </span>

                      {/* More */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 sm:static sm:translate-y-0">
                        <button
                          type="button"
                          aria-label={`More options for ${document.file_name}`}
                          onClick={() =>
                            setMenuOpen(
                              menuOpen === document.id
                                ? null
                                : document.id
                            )
                          }
                          className={`flex h-8 w-8 items-center justify-center rounded-lg opacity-50 transition-all duration-200 hover:opacity-100 ${
                            dark
                              ? "hover:bg-white/[0.08]"
                              : "hover:bg-black/[0.05]"
                          }`}
                        >
                          <MoreIcon size={17} />
                        </button>

                        {menuOpen === document.id && (
                          <div
                            className={`absolute right-0 top-9 z-20 w-32 origin-top-right animate-[fadeIn_160ms_ease-out] rounded-xl border p-1 shadow-xl ${
                              dark
                                ? "border-white/10 bg-[#151515]"
                                : "border-black/[0.08] bg-white"
                            }`}
                          >
                            {document.file_url ? (
                              <>
                                <a
                                  href={`/api/documents/${document.id}/download`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={`block rounded-lg px-3 py-2 text-[11px] transition-colors ${dark ? "text-white/65 hover:bg-white/[0.06] hover:text-white" : "text-black/60 hover:bg-black/[0.04] hover:text-black"}`}
                                >
                                  View
                                </a>
                                <a
                                  href={`/api/documents/${document.id}/download`}
                                  download={document.file_name}
                                  className={`block rounded-lg px-3 py-2 text-[11px] transition-colors ${dark ? "text-white/65 hover:bg-white/[0.06] hover:text-white" : "text-black/60 hover:bg-black/[0.04] hover:text-black"}`}
                                >
                                  Download
                                </a>
                              </>
                            ) : (
                              <p className={`px-3 py-2 text-[10px] ${dark ? "text-white/40" : "text-black/40"}`}>
                                File storage not connected
                              </p>
                            )}

                            <button
                              type="button"
                              onClick={() => void deleteDocument(document.id)}
                              className={`w-full rounded-lg px-3 py-2 text-left text-[11px] transition-colors ${
                                dark
                                  ? "text-white/65 hover:bg-white/[0.06] hover:text-white"
                                  : "text-black/60 hover:bg-black/[0.04] hover:text-black"
                              }`}
                            >
                              Download
                            </button>

                            <button
                              type="button"
                              className={`w-full rounded-lg px-3 py-2 text-left text-[11px] transition-colors ${
                                dark
                                  ? "text-white/65 hover:bg-white/[0.06] hover:text-white"
                                  : "text-black/60 hover:bg-black/[0.04] hover:text-black"
                              }`}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* EMPTY SEARCH STATE */
                <div
                  className={`animate-[fadeUp_600ms_ease-out_both] rounded-2xl border px-5 py-16 text-center ${
                    dark
                      ? "border-white/10 bg-white/[0.025]"
                      : "border-black/[0.07] bg-white"
                  }`}
                >
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
                      dark
                        ? "bg-white/[0.08] text-white/60"
                        : "bg-black/[0.045] text-black/50"
                    }`}
                  >
                    <SearchIcon size={20} />
                  </div>

                  <h3 className="mt-4 text-[14px] font-semibold">
                    {documents.length ? "No documents found" : "No documents yet"}
                  </h3>

                  <p
                    className={`mx-auto mt-2 max-w-[340px] text-[11px] leading-5 ${
                      dark
                        ? "text-white/35"
                        : "text-black/35"
                    }`}
                  >
                    {documents.length ? "Try a different search term or create a new PDF document." : "Your uploaded and generated PDFs will appear here."}
                  </p>

                  <Link
                    href="/create"
                    className={`mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-[9px] px-4 text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                      dark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    <PlusIcon size={15} />
                    Create PDF
                  </Link>
                </div>
              )}
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
            const active = item.label === "Documents";

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