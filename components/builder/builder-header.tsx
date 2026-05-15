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
    <header className="border-b border-border bg-background/80 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="/#templates"
          className="flex shrink-0 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
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
          className="flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground"
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
