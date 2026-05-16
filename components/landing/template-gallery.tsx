"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TemplateCard } from "@/components/templates/template-card";
import { content } from "@/lib/content/he";
import { getAllTemplates } from "@/lib/templates";
import type { TemplateCategory } from "@/lib/templates/types";
import { TEMPLATE_CATEGORIES } from "@/lib/templates/types";

type FilterKey = "all" | TemplateCategory;

export function TemplateGallery() {
  const { gallery } = content;
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const templates = useMemo(() => {
    const all = getAllTemplates();
    if (activeFilter === "all") return all;
    return all.filter((t) => t.category === activeFilter);
  }, [activeFilter]);

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: gallery.filters.all },
    ...TEMPLATE_CATEGORIES.map((category) => ({
      key: category,
      label: gallery.filters[category],
    })),
  ];

  return (
    <Section id="templates" className="relative overflow-hidden border-t border-border bg-surface/20">
      <div
        aria-hidden
        className="soft-grid pointer-events-none absolute inset-0 opacity-35"
      />
      <Container>
        <SectionHeading
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          description={gallery.description}
        />

        <div
          className="relative mb-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mb-10 sm:flex-wrap sm:justify-center sm:gap-2.5 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={gallery.filterLabel}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;

            return (
              <button
                key={filter.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter.key)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 sm:text-sm ${
                  isActive
                    ? "gradient-accent-bg border-transparent text-background shadow-[0_0_24px_-6px_rgba(167,139,250,0.5)]"
                    : "border-border bg-white/[0.045] text-muted backdrop-blur-sm hover:border-border-strong hover:bg-white/[0.07] hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <ul className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <li key={template.id}>
              <TemplateCard
                template={template}
                categoryLabel={gallery.categoryLabels[template.category]}
                useTemplateLabel={gallery.useTemplate}
                premiumLabel={gallery.premium}
              />
            </li>
          ))}
        </ul>

        {templates.length === 0 && (
          <p className="text-center text-sm text-muted">{gallery.empty}</p>
        )}
      </Container>
    </Section>
  );
}
