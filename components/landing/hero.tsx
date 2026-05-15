import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { content } from "@/lib/content/he";
import { getAllTemplates } from "@/lib/templates";
import { getBuilderPath } from "@/lib/templates/routes";

const previewGradients = [
  "from-rose-400/30 to-violet-600/30",
  "from-amber-400/30 to-orange-600/30",
  "from-sky-400/30 to-indigo-600/30",
];

export function Hero() {
  const { hero } = content;
  const featuredTemplate = getAllTemplates()[0];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-24 lg:pb-36">
      <GradientOrb className="-top-24 start-1/2 h-72 w-72 -translate-x-1/2 bg-accent-from/25 sm:h-96 sm:w-96" />
      <GradientOrb className="top-1/3 -end-16 h-56 w-56 bg-accent-to/20 sm:h-80 sm:w-80" />
      <GradientOrb className="bottom-0 -start-12 h-48 w-48 bg-gold/10 sm:h-64 sm:w-64" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(167,139,250,0.18),transparent)]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-medium text-muted backdrop-blur-sm sm:text-sm">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            {hero.badge}
          </p>

          <h1 className="text-[2rem] font-semibold leading-[1.3] text-foreground sm:text-5xl sm:leading-[1.25] lg:text-6xl xl:text-7xl">
            {hero.headline}{" "}
            <span className="gradient-accent-text">{hero.headlineAccent}</span>
          </h1>

          <p className="text-hebrew-body mx-auto mt-6 max-w-xl text-base text-muted sm:mt-8 sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <ButtonLink
              href={getBuilderPath(featuredTemplate.id)}
              size="lg"
              className="w-full sm:w-auto"
            >
              {hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              href="/#templates"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {hero.ctaSecondary}
            </ButtonLink>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted/80 sm:text-sm">
            {hero.trust}
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl sm:mt-20">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60 sm:rounded-3xl" />
          <div
            className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated/80 p-1 shadow-2xl shadow-black/50 backdrop-blur sm:rounded-3xl"
            aria-hidden
          >
            <div className="grid gap-3 rounded-xl bg-surface p-4 sm:grid-cols-3 sm:gap-4 sm:p-6">
              {hero.previews.map((preview, index) => (
                <InvitationPreview
                  key={preview.label}
                  label={preview.label}
                  invited={preview.invited}
                  gradient={previewGradients[index]}
                  className={index === 1 ? "sm:translate-y-4" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InvitationPreview({
  label,
  invited,
  gradient,
  className = "",
}: {
  label: string;
  invited: string;
  gradient: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-[3/4] flex-col justify-between rounded-lg border border-border bg-surface-elevated p-4 text-start sm:rounded-xl sm:p-5 ${className}`}
    >
      <div
        className={`h-24 flex-1 rounded-md bg-gradient-to-br ${gradient} sm:h-28`}
      />
      <div>
        <p className="text-[11px] font-medium text-muted sm:text-xs">{label}</p>
        <p className="mt-1 text-sm font-medium text-foreground sm:text-base">
          {invited}
        </p>
      </div>
    </div>
  );
}
