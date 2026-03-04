"use client";
import { useToast } from "@/context/toast";
import { X } from "lucide-react";

export function ToastDisplay() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-in slide-in-from-bottom-4 flex items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
                ? "bg-red-900"
                : "bg-blue-500"
          }`}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="hover:opacity-80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
