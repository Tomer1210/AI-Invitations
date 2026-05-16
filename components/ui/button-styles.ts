export const buttonVariantStyles = {
  primary:
    "gradient-accent-bg text-background font-semibold shadow-[0_16px_45px_-18px_rgba(167,139,250,0.85)] hover:shadow-[0_22px_70px_-22px_rgba(249,168,212,0.85)] hover:brightness-110 focus-visible:ring-accent-from/45",
  secondary:
    "border border-border-strong bg-white/[0.055] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl hover:border-white/25 hover:bg-white/[0.09] focus-visible:ring-white/20",
  whatsapp:
    "border border-emerald-300/20 bg-gradient-to-l from-emerald-400 via-green-300 to-lime-300 text-background font-semibold shadow-[0_16px_45px_-18px_rgba(74,222,128,0.75)] hover:shadow-[0_22px_70px_-22px_rgba(74,222,128,0.85)] hover:brightness-110 focus-visible:ring-emerald-300/45",
  ghost:
    "text-muted hover:text-foreground hover:bg-white/[0.04] focus-visible:ring-white/15",
} as const;

export const buttonSizeStyles = {
  sm: "px-4 py-2.5 text-sm rounded-full min-h-10",
  md: "px-6 py-3 text-sm sm:text-base rounded-full min-h-11",
  lg: "px-7 py-3.5 sm:px-8 sm:py-4 text-base rounded-full min-h-12",
} as const;

export type ButtonVariant = keyof typeof buttonVariantStyles;
export type ButtonSize = keyof typeof buttonSizeStyles;

export function getButtonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) {
  return `inline-flex items-center justify-center gap-2 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${buttonVariantStyles[variant]} ${buttonSizeStyles[size]} ${className}`;
}
