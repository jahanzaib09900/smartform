"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useWorkspace } from "@/lib/use-workspace";
import Toast from "@/components/toast";

export default function SettingsPage() {
  const { user, profile } = useWorkspace();
  const [fullName, setFullName] = useState("");
  const [dark, setDark] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    setDark(localStorage.getItem("smartform-theme") === "dark");
  }, []);

  useEffect(() => {
    setFullName(profile?.full_name || "");
  }, [profile?.full_name]);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("smartform-theme", dark ? "dark" : "light");
  }, [dark]);

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || !fullName.trim()) return;

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() })
      .eq("user_id", user.id);
    setSaving(false);

    setToast(error
      ? { message: "Profile could not be saved. Apply the database migration and try again.", type: "error" }
      : { message: "Profile updated.", type: "success" });
  }

  return (
    <main className={`min-h-screen ${dark ? "bg-[#090909] text-white" : "bg-[#fafafa] text-[#111]"}`}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <header className={`flex h-[76px] items-center justify-between border-b px-5 sm:px-8 ${dark ? "border-white/10 bg-[#0d0d0d]" : "border-black/[0.07] bg-white"}`}>
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <span className={`flex h-8 w-8 items-center justify-center rounded-[9px] text-[13px] font-bold ${dark ? "bg-white text-black" : "bg-black text-white"}`}>S</span>
          <span className="text-[16px] font-semibold">SmartForm</span>
        </Link>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setDark((value) => !value)} aria-label="Toggle theme" className={`h-9 w-9 rounded-full border ${dark ? "border-white/10" : "border-black/10"}`}>{dark ? "☼" : "☾"}</button>
          <Link href="/dashboard" className={`rounded-lg px-3 py-2 text-[12px] font-medium ${dark ? "hover:bg-white/10" : "hover:bg-black/5"}`}>Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-[760px] px-5 py-10 sm:px-8">
        <p className={`text-[12px] ${dark ? "text-white/40" : "text-black/40"}`}>Account</p>
        <h1 className="mt-1 text-[28px] font-semibold tracking-[-0.04em]">Settings</h1>
        <p className={`mt-2 text-[13px] ${dark ? "text-white/50" : "text-black/50"}`}>Manage your profile and account details.</p>

        <form onSubmit={saveProfile} className={`mt-8 rounded-2xl border p-6 ${dark ? "border-white/10 bg-white/[0.025]" : "border-black/[0.07] bg-white"}`}>
          <h2 className="text-[14px] font-semibold">Profile</h2>
          <label className="mt-5 block text-[11px] font-medium" htmlFor="full-name">Full name</label>
          <input id="full-name" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required className={`mt-1.5 h-10 w-full rounded-lg border px-3 text-[12px] outline-none ${dark ? "border-white/10 bg-black/20" : "border-black/10 bg-white"}`} />
          <label className="mt-4 block text-[11px] font-medium" htmlFor="email">Email</label>
          <input id="email" value={profile?.email || ""} readOnly className={`mt-1.5 h-10 w-full rounded-lg border px-3 text-[12px] opacity-60 ${dark ? "border-white/10 bg-black/20" : "border-black/10 bg-white"}`} />
          <p className={`mt-4 text-[11px] ${dark ? "text-white/45" : "text-black/45"}`}>Current plan: {profile?.plan || "Free"}</p>
          <button type="submit" disabled={saving || !user} className={`mt-5 h-10 rounded-[9px] px-4 text-[12px] font-semibold disabled:opacity-50 ${dark ? "bg-white text-black" : "bg-black text-white"}`}>{saving ? "Saving..." : "Save changes"}</button>
        </form>

        <div className={`mt-5 flex items-center justify-between rounded-2xl border p-5 ${dark ? "border-white/10" : "border-black/[0.07] bg-white"}`}>
          <div>
            <h2 className="text-[13px] font-semibold">Subscription</h2>
            <p className={`mt-1 text-[11px] ${dark ? "text-white/45" : "text-black/45"}`}>{profile?.plan || "Free"} plan</p>
          </div>
          <Link href="/pricing" className={`text-[11px] font-semibold underline underline-offset-4 ${dark ? "text-white" : "text-black"}`}>View plans</Link>
        </div>
      </section>
    </main>
  );
}
