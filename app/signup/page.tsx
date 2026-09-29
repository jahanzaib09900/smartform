"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/auth";
import Toast from "@/components/toast";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);


  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await signUp(
      email,
      password,
      fullName,
    );

    setLoading(false);


    // Supabase error
    if (error) {
      setToast({
        message: error.message,
        type: "error",
      });

      return;
    }


    // Existing registered email check
    if (
      data?.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      setToast({
        message:
          "This email is already registered. Please login instead.",
        type: "error",
      });

      return;
    }


    // New user confirmation email
    if (data?.user) {
      setToast({
        message:
          "Confirmation email has been sent. Please check your inbox.",
        type: "success",
      });

      return;
    }


    // fallback
    setToast({
      message:
        "Something went wrong. Please try again.",
      type: "error",
    });
  }


  return (
    <main className="min-h-screen bg-[#fafafa] text-[#111111]">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}


      <div className="flex min-h-screen items-center justify-center px-5">

        <div className="w-full max-w-[380px]">


          <Link
            href="/"
            className="mb-10 flex items-center justify-center gap-2.5"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-black text-sm font-bold text-white">
              S
            </div>

            <span className="text-lg font-semibold tracking-[-0.03em]">
              SmartForm
            </span>

          </Link>



          <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm">


            <h1 className="text-[24px] font-semibold tracking-[-0.04em]">
              Create your account
            </h1>


            <p className="mt-2 text-[13px] text-black/45">
              Start converting PDF forms into smart documents.
            </p>



            <form
              onSubmit={handleSignup}
              className="mt-7 space-y-4"
            >

              <div>

                <label className="mb-1.5 block text-[12px] font-medium">
                  Full name
                </label>

                <input
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none transition focus:border-black"
                />

              </div>


              <div>

                <label className="mb-1.5 block text-[12px] font-medium">
                  Email
                </label>


                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e)=>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none transition focus:border-black"
                />

              </div>



              <div>

                <label className="mb-1.5 block text-[12px] font-medium">
                  Password
                </label>


                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e)=>
                    setPassword(e.target.value)
                  }
                  placeholder="Minimum 6 characters"
                  className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none transition focus:border-black"
                />

              </div>



              <button
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-black/85 disabled:opacity-50"
              >

                {
                  loading
                  ? "Creating account..."
                  : "Create account"
                }

              </button>


            </form>



            <p className="mt-6 text-center text-[12px] text-black/45">

              Already have an account?{" "}

              <Link
                href="/login"
                className="font-semibold text-black underline underline-offset-4"
              >
                Login
              </Link>

            </p>


          </div>


        </div>

      </div>


    </main>
  );
}