import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { content } from "@/lib/content/he";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between gap-3 sm:h-16">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground sm:text-base"
        >
          <span
            aria-hidden
            className="gradient-accent-br flex h-8 w-8 items-center justify-center rounded-lg text-xs text-background"
          >
            ✦
          </span>
          {content.brand}
        </Link>

        <nav
          aria-label={content.header.navLabel}
          className="hidden items-center gap-6 md:flex lg:gap-8"
        >
          {content.header.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/#templates" size="sm" className="shrink-0">
          {content.header.cta}
        </ButtonLink>
      </Container>

      <nav
        aria-label={content.header.navLabel}
        className="flex gap-2 overflow-x-auto border-t border-border/60 px-5 py-2.5 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {content.header.nav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
