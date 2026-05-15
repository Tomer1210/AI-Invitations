import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { content } from "@/lib/content/he";

export function Features() {
  const { features } = content;

  return (
    <Section id="features" className="border-t border-border bg-surface/30">
      <Container>
        <SectionHeading
          eyebrow={features.eyebrow}
          title={features.title}
          description={features.description}
        />

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {features.items.map((feature) => (
            <li
              key={feature.title}
              className="group rounded-2xl border border-border bg-surface-elevated/50 p-6 text-start transition-colors hover:border-border-strong hover:bg-surface-elevated sm:p-7"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-lg transition-transform group-hover:scale-105"
              >
                {feature.icon}
              </span>
              <h3 className="mt-5 text-lg font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="text-hebrew-body mt-2 text-sm text-muted sm:text-base">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
