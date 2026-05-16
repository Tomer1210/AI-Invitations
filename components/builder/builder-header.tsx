import Link from "next/link";
import { Container } from "@/components/ui/container";
import { content } from "@/lib/content/he";
import type { InvitationTemplate } from "@/lib/templates/types";

type BuilderHeaderProps = {
  template: InvitationTemplate;
};

export function BuilderHeader({ template }: BuilderHeaderProps) {
  const { builder, brand } = content;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/72 shadow-[0_14px_55px_-42px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
      <Container className="flex h-14 items-center justify-between gap-3 sm:h-16">
        <Link
          href="/#templates"
          className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-white/[0.035] px-3 py-1.5 text-xs text-muted transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-white/[0.06] hover:text-foreground sm:text-sm"
        >
          <span aria-hidden className="text-base">
            →
          </span>
          {builder.backToTemplates}
        </Link>

        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-sm font-semibold text-foreground sm:text-base">
            {builder.pageTitle}
          </p>
          <p className="truncate text-xs text-muted">{template.name}</p>
        </div>

        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
        >
          <span
            aria-hidden
            className="gradient-accent-br flex h-7 w-7 items-center justify-center rounded-lg text-[10px] text-background"
          >
            ✦
          </span>
          <span className="hidden sm:inline">{brand}</span>
        </Link>
      </Container>
    </header>
  );
}
