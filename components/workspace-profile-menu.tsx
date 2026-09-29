"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getInitials, type WorkspaceProfile } from "@/lib/use-workspace";

type WorkspaceProfileMenuProps = {
  profile: WorkspaceProfile | null;
  dark: boolean;
};

export default function WorkspaceProfileMenu({
  profile,
  dark,
}: WorkspaceProfileMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function handleSignOut() {
    setError("");
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError("Could not sign out. Please try again.");
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  const secondary = dark ? "text-white/45" : "text-black/45";
  const hover = dark
    ? "text-white/75 hover:bg-white/[0.06] hover:text-white"
    : "text-black/65 hover:bg-black/[0.04] hover:text-black";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open account menu"
        aria-expanded={open}
        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-transform hover:scale-105 ${
          dark ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        {getInitials(profile?.full_name || "SmartForm")}
      </button>

      {open && (
        <div
          className={`absolute right-0 top-12 z-50 w-64 origin-top-right animate-[fadeIn_160ms_ease-out] rounded-xl border p-1.5 shadow-2xl ${
            dark ? "border-white/10 bg-[#151515]" : "border-black/[0.08] bg-white"
          }`}
        >
          <div className="px-3 py-2">
            <p className="truncate text-[12px] font-semibold">
              {profile?.full_name || "Loading account"}
            </p>
            <p className={`mt-0.5 truncate text-[10px] ${secondary}`}>
              {profile?.email || ""}
            </p>
            <p className={`mt-2 text-[10px] font-medium ${secondary}`}>
              {profile?.plan || "Free"} plan
            </p>
          </div>
          <div className={`my-1 h-px ${dark ? "bg-white/10" : "bg-black/[0.07]"}`} />
          <Link href="/pricing" onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-2 text-[12px] transition-colors ${hover}`}>
            Subscription
          </Link>
          <Link href="/settings" onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-2 text-[12px] transition-colors ${hover}`}>
            Settings
          </Link>
          {error && <p className="px-3 py-1 text-[10px] text-red-500">{error}</p>}
          <button
            type="button"
            onClick={handleSignOut}
            className={`w-full rounded-lg px-3 py-2 text-left text-[12px] transition-colors ${hover}`}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}