"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/lib/auth";
import Toast from "@/components/toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);


  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);


    const { data, error } = await login(
  email,
  password
);

    setLoading(false);


    if (error) {

      setToast({
        message: error.message,
        type: "error",
      });

      return;
    }


    setToast({
      message:
        "Login successful. Redirecting...",
      type: "success",
    });


    setTimeout(() => {

      router.refresh();

      router.push("/dashboard");

    }, 800);

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
              Welcome back
            </h1>


            <p className="mt-2 text-[13px] text-black/45">
              Login to continue managing your PDF documents.
            </p>



            <form
              onSubmit={handleLogin}
              className="mt-7 space-y-4"
            >


              <div>

                <label className="mb-1.5 block text-[12px] font-medium">
                  Email
                </label>


                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Your password"
                  className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none transition focus:border-black"
                />


                <div className="mt-2 text-right">

                  <Link
                    href="/forgot-password"
                    className="text-[12px] font-medium text-black underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>

                </div>

              </div>



              <button
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-black/85 disabled:opacity-50"
              >

                {
                  loading
                  ? "Logging in..."
                  : "Login"
                }

              </button>


            </form>



            <p className="mt-6 text-center text-[12px] text-black/45">

              Don't have an account?{" "}

              <Link
                href="/signup"
                className="font-semibold text-black underline underline-offset-4"
              >
                Sign up
              </Link>

            </p>


          </div>


        </div>

      </div>


    </main>
  );
}