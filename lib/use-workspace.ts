"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type WorkspaceProfile = {
  full_name: string;
  email: string;
  plan: string;
  credits: number;
  credits_remaining: number;
  extractions_remaining: number;
  pdfs_generated: number;
  pdf_extractions: number;
};

function profileName(user: User) {
  const metadataName = user.user_metadata?.full_name;
  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  return user.email?.split("@")[0]?.replace(/[._-]+/g, " ") || "SmartForm user";
}

export function useWorkspace() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<WorkspaceProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProfile(currentUser: User | null) {
      if (!active) return;
      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select(
          "full_name, email, plan, credits, credits_remaining, extractions_remaining, pdfs_generated, pdf_extractions",
        )
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (!active) return;

      setProfile({
        full_name: data?.full_name || profileName(currentUser),
        email: currentUser.email || data?.email || "",
        plan: data?.plan || "Free",
        credits: data?.credits ?? 3,
        credits_remaining: data?.credits_remaining ?? 3,
        extractions_remaining: data?.extractions_remaining ?? 5,
        pdfs_generated: data?.pdfs_generated ?? 0,
        pdf_extractions: data?.pdf_extractions ?? 0,
      });
      setLoading(false);
    }

    void supabase.auth.getUser().then(({ data }) => loadProfile(data.user));

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        void loadProfile(session?.user ?? null);
      },
    );

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, profile, loading };
}

export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words.length > 1
    ? `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
    : (words[0]?.slice(0, 2) || "SF").toUpperCase();
}