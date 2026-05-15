import Link from "next/link";
import { getButtonClassName } from "@/components/ui/button-styles";
import type { InvitationTemplate } from "@/lib/templates/types";
import { getBuilderPath } from "@/lib/templates/routes";
import { TemplatePreview } from "./template-preview";

const categoryAccent: Record<InvitationTemplate["category"], string> = {
  wedding: "text-rose-300 bg-rose-500/10 border-rose-500/20",
  birthday: "text-amber-300 bg-amber-500/10 border-amber-500/20",
  "bar-mitzvah": "text-sky-300 bg-sky-500/10 border-sky-500/20",
  business: "text-zinc-300 bg-zinc-500/10 border-zinc-500/20",
};

type TemplateCardProps = {
  template: InvitationTemplate;
  categoryLabel: string;
  useTemplateLabel: string;
  premiumLabel: string;
};

export function TemplateCard({
  template,
  categoryLabel,
  useTemplateLabel,
  premiumLabel,
}: TemplateCardProps) {
  const builderHref = getBuilderPath(template.id);

  return (
    <Link
      href={builderHref}
      className="group block rounded-2xl text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-from/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-2 transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-border-strong group-hover:shadow-[0_20px_60px_-20px_rgba(167,139,250,0.35)]">
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative overflow-hidden rounded-xl">
          <TemplatePreview preview={template.preview} />

          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-background/70 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100 md:flex">
            <span
              className={getButtonClassName(
                "primary",
                "sm",
                "translate-y-2 shadow-lg transition-transform duration-500 group-hover:translate-y-0",
              )}
            >
              {useTemplateLabel}
            </span>
          </div>
        </div>

        <div className="relative px-3 pb-3 pt-4 sm:px-4 sm:pb-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium sm:text-xs ${categoryAccent[template.category]}`}
            >
              {categoryLabel}
            </span>
            {template.isPremium && (
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold sm:text-xs">
                <span aria-hidden>✦</span>
                {premiumLabel}
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold text-foreground sm:text-lg">
            {template.name}
          </h3>
          <p className="text-hebrew-body mt-1.5 line-clamp-2 text-sm text-muted">
            {template.description}
          </p>

          <span
            className={getButtonClassName(
              "primary",
              "sm",
              "mt-4 w-full md:hidden",
            )}
          >
            {useTemplateLabel}
          </span>
        </div>
      </article>
    </Link>
  );
}
