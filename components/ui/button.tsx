import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 gap-2 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-slate-900 text-white hover:bg-slate-800",
        variant === "secondary" &&
          "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
        variant === "ghost" &&
          "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};