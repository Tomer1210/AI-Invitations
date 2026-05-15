export const buttonVariantStyles = {
  primary:
    "gradient-accent-bg text-background font-semibold shadow-[0_0_40px_-8px_rgba(167,139,250,0.55)] hover:shadow-[0_0_48px_-6px_rgba(167,139,250,0.7)] hover:brightness-110",
  secondary:
    "border border-border-strong bg-surface-elevated/80 text-foreground backdrop-blur-sm hover:border-white/25 hover:bg-surface-elevated",
  ghost: "text-muted hover:text-foreground",
} as const;

export const buttonSizeStyles = {
  sm: "px-4 py-2.5 text-sm rounded-full min-h-10",
  md: "px-6 py-3 text-sm sm:text-base rounded-full min-h-11",
  lg: "px-8 py-3.5 sm:py-4 text-base rounded-full min-h-12",
} as const;

export type ButtonVariant = keyof typeof buttonVariantStyles;
export type ButtonSize = keyof typeof buttonSizeStyles;

export function getButtonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) {
  return `inline-flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] ${buttonVariantStyles[variant]} ${buttonSizeStyles[size]} ${className}`;
}
