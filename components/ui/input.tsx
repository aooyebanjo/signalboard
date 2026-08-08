import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950",
        "placeholder:text-slate-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
        "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};