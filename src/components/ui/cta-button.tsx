"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaVariant = "primary" | "secondary" | "outline" | "whatsapp";
type CtaSize = "sm" | "md" | "lg";

type CtaButtonBase = {
  children: React.ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  showArrow?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

type CtaLinkProps = CtaButtonBase & {
  href: string;
  type?: never;
};

type CtaSubmitProps = CtaButtonBase & {
  href?: never;
  type: "submit" | "button";
};

export type CtaButtonProps = CtaLinkProps | CtaSubmitProps;

function isExternal(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function variantClasses(variant: CtaVariant) {
  switch (variant) {
    case "primary":
      return "border border-accent/80 bg-accent text-background shadow-[0_0_0_0_rgba(200,255,0,0)] hover:border-accent hover:bg-[#d4ff33] hover:shadow-[0_0_28px_rgba(200,255,0,0.22)]";
    case "secondary":
      return "border border-border bg-background text-foreground hover:border-accent/40 hover:bg-card";
    case "outline":
      return "border border-white/20 bg-transparent text-foreground hover:border-accent/50 hover:bg-white/[0.03]";
    case "whatsapp":
      return "border border-[#25D366]/35 bg-[#25D366]/8 text-foreground hover:border-[#25D366]/60 hover:bg-[#25D366]/12";
  }
}

export function CtaButton(props: CtaButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    showArrow = false,
    fullWidth = false,
    disabled,
    onClick,
  } = props;

  const sizeClass =
    size === "sm"
      ? "min-h-10 px-4 py-2 text-[11px] font-semibold tracking-wide sm:text-xs"
      : size === "lg"
        ? "min-h-[3.25rem] px-8 py-3.5 text-sm font-semibold tracking-wide sm:text-[15px]"
        : "min-h-11 px-6 py-3 text-xs font-semibold tracking-wide sm:text-sm";

  const widthClass = fullWidth ? "w-full" : "w-full sm:w-auto";

  const surface = cn(
    "group relative inline-flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99] motion-reduce:transform-none",
    widthClass,
    sizeClass,
    variantClasses(variant),
    disabled && "pointer-events-none opacity-50",
    className,
  );

  const label = (
    <span className="inline-flex items-center justify-center gap-2">
      {children}
      {showArrow && (
        <ArrowRight
          className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none sm:h-4 sm:w-4"
          aria-hidden
        />
      )}
    </span>
  );

  if (props.type === "submit" || props.type === "button") {
    return (
      <button
        type={props.type}
        disabled={disabled}
        onClick={onClick}
        className={surface}
      >
        {label}
      </button>
    );
  }

  if (!props.href) return null;

  const href = props.href;

  if (isExternal(href)) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={surface}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={surface}>
      {label}
    </Link>
  );
}

/** @deprecated Use CtaButton */
export function MovingBorderButton({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <CtaButton
      href={href}
      variant={variant}
      className={className}
      onClick={onClick}
    >
      {children}
    </CtaButton>
  );
}
