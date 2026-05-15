import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { content } from "@/lib/content/he";
import { getAllTemplates } from "@/lib/templates";
import { getBuilderPath } from "@/lib/templates/routes";

export function CtaBanner() {
  const { cta } = content;
  const featuredTemplate = getAllTemplates()[0];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated px-5 py-12 text-center sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <GradientOrb className="top-0 start-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-accent-from/30" />
          <GradientOrb className="end-0 bottom-0 h-48 w-48 translate-x-1/4 translate-y-1/4 bg-accent-to/25" />

          <div className="relative">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
              {cta.title}
            </h2>
            <p className="text-hebrew-body mx-auto mt-4 max-w-lg text-sm text-muted sm:text-base">
              {cta.description}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <ButtonLink
                href={getBuilderPath(featuredTemplate.id)}
                size="lg"
                className="w-full sm:w-auto"
              >
                {cta.button}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
