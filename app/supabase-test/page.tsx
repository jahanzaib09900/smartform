"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SupabaseTestPage() {
  const [status, setStatus] = useState("Testing...");

  useEffect(() => {
    const test = async () => {
      const { error } = await supabase.auth.getSession();

      setStatus(
        error
          ? `Error: ${error.message}`
          : "Supabase connected successfully!"
      );
    };

    test();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <h1 className="text-xl font-semibold text-[#111111]">
        {status}
      </h1>
    </main>
  );
}