import type { ComponentPropsWithoutRef } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const VARIANT_CLASSES = {
  primary: [
    "bg-button-primary-background text-button-primary-text border-button-primary-border",
    "hover:bg-button-primary-background-hover hover:text-button-primary-text-hover hover:border-button-primary-border-hover",
    "[&_svg]:text-button-primary-icon hover:[&_svg]:text-button-primary-icon-hover",
  ].join(" "),
  secondary: [
    "bg-button-secondary-background text-button-secondary-text border-button-secondary-border",
    "hover:bg-button-secondary-background-hover hover:text-button-secondary-text-hover hover:border-button-secondary-border-hover",
    "[&_svg]:text-button-secondary-icon hover:[&_svg]:text-button-secondary-icon-hover",
  ].join(" "),
  tertiary: [
    "bg-button-tertiary-background text-button-tertiary-text border-button-tertiary-border",
    "hover:bg-button-tertiary-background-hover hover:text-button-tertiary-text-hover hover:border-button-tertiary-border-hover",
    "[&_svg]:text-button-tertiary-icon hover:[&_svg]:text-button-tertiary-icon-hover",
  ].join(" "),
} satisfies Record<ButtonVariant, string>;

const SIZE_CLASSES = {
  sm: "h-8 gap-1.5 rounded-lg px-3 text-sm",
  md: "h-10 gap-2 rounded-xl px-4 text-base",
  lg: "h-12 gap-2.5 rounded-xl px-5 text-base",
} satisfies Record<ButtonSize, string>;

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const renderIcon = () =>
    Icon ? <Icon className="size-4 shrink-0" strokeWidth={2} /> : null;

  return (
    <button
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center border font-medium outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-button-tertiary-border-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
        "disabled:pointer-events-none disabled:opacity-40",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {iconPosition === "left" && renderIcon()}
      {children}
      {iconPosition === "right" && renderIcon()}
    </button>
  );
}
