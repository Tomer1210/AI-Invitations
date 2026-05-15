import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { content } from "@/lib/content/he";
import {
  CONTENT_CATEGORY_TO_TEMPLATE,
  getBuilderPath,
  getDefaultTemplateForCategory,
} from "@/lib/templates/routes";

const categoryStyles = [
  {
    gradient: "from-rose-500/20 via-fuchsia-500/10 to-violet-600/20",
    accent: "text-rose-300",
  },
  {
    gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
    accent: "text-amber-300",
  },
  {
    gradient: "from-blue-500/20 via-indigo-500/10 to-violet-600/20",
    accent: "text-blue-300",
  },
  {
    gradient: "from-slate-400/15 via-zinc-500/10 to-neutral-600/20",
    accent: "text-zinc-300",
  },
];

export function EventCategories() {
  const { categories } = content;

  return (
    <Section id="categories">
      <Container>
        <SectionHeading
          eyebrow={categories.eyebrow}
          title={categories.title}
          description={categories.description}
        />

        <ul className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {categories.items.map((category, index) => {
            const style = categoryStyles[index];
            const templateCategory = CONTENT_CATEGORY_TO_TEMPLATE[category.id];
            const defaultTemplate = templateCategory
              ? getDefaultTemplateForCategory(templateCategory)
              : null;
            const builderHref = defaultTemplate
              ? getBuilderPath(defaultTemplate.id)
              : "/#templates";

            return (
              <li
                key={category.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated transition-all hover:border-border-strong"
              >
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-80 transition-opacity group-hover:opacity-100`}
                />
                <div className="relative flex min-h-[200px] flex-col justify-between p-6 text-start sm:min-h-[220px] sm:p-8">
                  <div>
                    <p className={`eyebrow-label ${style.accent}`}>
                      {category.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                      {category.title}
                    </h3>
                    <p className="text-hebrew-body mt-3 max-w-sm text-sm text-muted sm:text-base">
                      {category.description}
                    </p>
                  </div>
                  <ButtonLink
                    href={builderHref}
                    variant="secondary"
                    size="sm"
                    className="mt-6 w-full sm:w-fit group-hover:border-white/30"
                  >
                    {category.cta}
                  </ButtonLink>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
