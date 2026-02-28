import React from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary)]/90 shadow-lg shadow-[var(--color-primary)]/20",
    secondary:
      "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary)]/90 shadow-lg shadow-[var(--color-secondary)]/20",
    outline:
      "border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-surface)] text-[var(--color-text-primary)]",
    ghost: "hover:bg-[var(--color-surface)] text-[var(--color-text-primary)]",
    danger: "bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
