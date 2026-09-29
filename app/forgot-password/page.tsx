"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/auth";
import Toast from "@/components/toast";


export default function ForgotPasswordPage() {

  const [email,setEmail] = useState("");

  const [loading,setLoading] = useState(false);


  const [toast,setToast] = useState<{
    message:string;
    type:"success"|"error";
  } | null>(null);



  async function handleForgot(
    e:React.FormEvent
  ){

    e.preventDefault();

    setLoading(true);


    const {error} = await forgotPassword(email);


    setLoading(false);



    if(error){

      setToast({
        message:error.message,
        type:"error"
      });

      return;
    }



    setToast({
      message:"Password reset email sent. Check your inbox.",
      type:"success"
    });

  }



  return (
    <main className="min-h-screen bg-[#fafafa] text-[#111111]">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={()=>setToast(null)}
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
              Forgot password?
            </h1>


            <p className="mt-2 text-[13px] text-black/45">
              Enter your email and we will send you a reset link.
            </p>



            <form
              onSubmit={handleForgot}
              className="mt-7 space-y-4"
            >

              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none focus:border-black"
              />


              <button
                disabled={loading}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white disabled:opacity-50"
              >

                {
                  loading
                  ? "Sending..."
                  : "Send reset link"
                }

              </button>


            </form>


          </div>


        </div>

      </div>


    </main>
  );
}