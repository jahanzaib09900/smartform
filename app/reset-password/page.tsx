"use client";

import { useState } from "react";
import Link from "next/link";
import { updatePassword } from "@/lib/auth";
import Toast from "@/components/toast";
import { useRouter } from "next/navigation";


export default function ResetPasswordPage() {

  const router = useRouter();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);



  async function handleReset(
    e: React.FormEvent
  ) {

    e.preventDefault();


    setLoading(true);


    const { error } =
      await updatePassword(password);


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
        "Password updated successfully. Redirecting...",
      type: "success",
    });



    setTimeout(() => {

      router.push("/login");

    }, 1200);


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
              Reset password
            </h1>



            <p className="mt-2 text-[13px] text-black/45">
              Create a new password for your account.
            </p>





            <form
              onSubmit={handleReset}
              className="mt-7 space-y-4"
            >


              <div>

                <label className="mb-1.5 block text-[12px] font-medium">
                  New password
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

                className="flex h-11 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-black/85 disabled:opacity-50"

              >

                {
                  loading
                  ? "Updating..."
                  : "Update password"
                }


              </button>



            </form>



          </div>



        </div>



      </div>



    </main>

  );

}