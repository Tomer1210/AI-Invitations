"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TemplateCard } from "@/components/templates/template-card";
import { content } from "@/lib/content/he";
import { getAllTemplates } from "@/lib/templates";
import type { TemplateCategory, TemplateStyle } from "@/lib/templates/types";
import { TEMPLATE_CATEGORIES, TEMPLATE_STYLES } from "@/lib/templates/types";

type FilterKey = "all" | TemplateStyle;

const FAVORITES_KEY = "inviteai.favoriteTemplates.v1";

export function TemplateGallery() {
  const { gallery } = content;
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("wedding");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(FAVORITES_KEY);
      setFavoriteIds(saved ? JSON.parse(saved) : []);
    } catch {
      setFavoriteIds([]);
    }
  }, []);

  const toggleFavorite = (templateId: string) => {
    setFavoriteIds((current) => {
      const next = current.includes(templateId)
        ? current.filter((id) => id !== templateId)
        : [...current, templateId];
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const allTemplates = useMemo(() => getAllTemplates(), []);

  const templatesByCategory = useMemo(
    () =>
      TEMPLATE_CATEGORIES.map((category) => ({
        category,
        templates: allTemplates.filter((template) => template.category === category),
      })).filter((section) => section.templates.length > 0),
    [allTemplates],
  );

  const activeTemplates = useMemo(() => {
    const categoryTemplates = allTemplates.filter(
      (template) => template.category === activeCategory,
    );
    if (activeFilter === "all") return categoryTemplates;
    return categoryTemplates.filter((template) => template.style === activeFilter);
  }, [activeCategory, activeFilter, allTemplates]);

  const favoriteTemplates = useMemo(
    () =>
      allTemplates.filter((template) => favoriteIds.includes(template.id)),
    [allTemplates, favoriteIds],
  );

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: gallery.filters.all },
    ...TEMPLATE_STYLES.map((style) => ({
      key: style,
      label: gallery.filters[style],
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

        <div className="relative mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {templatesByCategory.map(({ category, templates }) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setActiveFilter("all");
                }}
                className={`group overflow-hidden rounded-3xl border p-4 text-start transition-all duration-300 hover:-translate-y-1 ${
                  isActive
                    ? "border-accent-via/45 bg-white/[0.08] shadow-[0_22px_70px_-44px_rgba(167,139,250,0.65)]"
                    : "border-border bg-white/[0.035] hover:border-border-strong hover:bg-white/[0.055]"
                }`}
              >
                <div className="mb-4 flex -space-x-5 space-x-reverse">
                  {templates.slice(0, 3).map((template, index) => (
                    <div
                      key={template.id}
                      className={`h-16 w-12 rounded-xl border border-white/15 bg-gradient-to-br ${template.preview.gradient} shadow-xl transition-transform group-hover:-translate-y-1`}
                      style={{ transform: `rotate(${(index - 1) * 5}deg)` }}
                    />
                  ))}
                </div>
                <p className="text-base font-semibold text-foreground">
                  {gallery.categoryLabels[category]}
                </p>
                <p className="text-hebrew-body mt-1 line-clamp-2 text-xs text-muted">
                  {gallery.categoryDescriptions[category]}
                </p>
                <p className="mt-3 text-xs text-accent-via">
                  {templates.length} קולקציות
                </p>
              </button>
            );
          })}
        </div>

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

        {favoriteTemplates.length > 0 && (
          <div className="relative mb-10 rounded-[2rem] border border-gold/20 bg-gold/10 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow-label text-gold">Favorites</p>
                <h3 className="text-xl font-semibold text-foreground">
                  תבניות שאהבתם
                </h3>
              </div>
              <span className="rounded-full border border-gold/25 px-3 py-1 text-xs text-gold">
                {favoriteTemplates.length}
              </span>
            </div>
            <ul className="grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 lg:grid-cols-3">
              {favoriteTemplates.slice(0, 3).map((template) => (
                <li key={template.id}>
                  <TemplateCard
                    template={template}
                    categoryLabel={gallery.categoryLabels[template.category]}
                    useTemplateLabel={gallery.useTemplate}
                    premiumLabel={gallery.premium}
                    isFavorite={favoriteIds.includes(template.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="relative mb-5">
          <p className="eyebrow-label text-accent-via">
            {gallery.categoryLabels[activeCategory]}
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
            קולקציות מעוצבות לפי קטגוריה
          </h3>
          <p className="text-hebrew-body mt-2 max-w-2xl text-sm text-muted">
            {gallery.categoryDescriptions[activeCategory]}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {activeTemplates.map((template) => (
            <li key={template.id}>
              <TemplateCard
                template={template}
                categoryLabel={gallery.categoryLabels[template.category]}
                useTemplateLabel={gallery.useTemplate}
                premiumLabel={gallery.premium}
                isFavorite={favoriteIds.includes(template.id)}
                onToggleFavorite={toggleFavorite}
              />
            </li>
          ))}
        </ul>

        {activeTemplates.length === 0 && (
          <p className="text-center text-sm text-muted">{gallery.empty}</p>
        )}
      </Container>
    </Section>
  );
}
