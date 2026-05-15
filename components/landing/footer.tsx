import Link from "next/link";
import { Container } from "@/components/ui/container";
import { content } from "@/lib/content/he";

const footerGroups = [
  content.footer.groups.product,
  content.footer.groups.company,
  content.footer.groups.legal,
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 pt-14 pb-8 sm:pt-16">
      <Container>
        <div className="grid gap-10 text-start sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              <span
                aria-hidden
                className="gradient-accent-br flex h-8 w-8 items-center justify-center rounded-lg text-xs text-background"
              >
                ✦
              </span>
              {content.brand}
            </Link>
            <p className="text-hebrew-body mt-4 max-w-xs text-sm text-muted">
              {content.footer.tagline}
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="eyebrow-label text-foreground">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row-reverse sm:items-center">
          <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
            {content.footer.social.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-xs text-muted transition-colors hover:text-foreground sm:text-sm"
              >
                {social.label}
              </Link>
            ))}
          </div>
          <p className="text-center text-xs text-muted sm:text-start sm:text-sm">
            © {new Date().getFullYear()} {content.brand}. {content.footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
