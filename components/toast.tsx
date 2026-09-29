"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed right-5 top-5 z-[100] animate-[fadeIn_200ms_ease-out]">
      <div
        className={`min-w-[280px] rounded-xl border px-4 py-3 shadow-xl backdrop-blur-xl ${
          type === "success"
            ? "border-green-500/20 bg-white text-black"
            : "border-red-500/20 bg-white text-black"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-1 h-2 w-2 rounded-full ${
              type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

          <p className="text-[13px] font-medium leading-5">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}