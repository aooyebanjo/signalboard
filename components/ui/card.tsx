import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

// The children prop is not used in this component, and because it is part of the HTMLAttribute it does not have to be explicitly defined, 
// It is a generic component that can be used to display any content in a card format.

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white",
        className
      )}
      {...props}
    />
  );
};

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    />
  );
};

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold text-slate-950",
        className
      )}
      {...props}
    />
  );
};

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mt-2 text-sm text-slate-600",
        className
      )}
      {...props}
    />
  );
};

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 pb-6", className)}
      {...props}
    />
  );
};