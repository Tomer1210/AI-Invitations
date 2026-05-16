import { invitationTemplates } from "./data";
import type { TemplateCategory } from "./types";

export function getBuilderPath(templateId: string): string {
  return `/builder/${encodeURIComponent(templateId)}`;
}

export function getDefaultTemplateForCategory(
  category: TemplateCategory,
) {
  return (
    invitationTemplates.find((template) => template.category === category) ??
    null
  );
}

export function resolveTemplateFromParam(templateId: string) {
  const decoded = decodeURIComponent(templateId);
  return invitationTemplates.find((template) => template.id === decoded);
}

/** Maps landing-page category ids to template data categories */
export const CONTENT_CATEGORY_TO_TEMPLATE: Record<string, TemplateCategory> =
  {
    weddings: "wedding",
    birthdays: "birthday",
    "bar-mitzvahs": "bar-mitzvah",
    business: "business",
    engagement: "engagement",
    henna: "henna",
    bachelor: "bachelor",
    "brit-baby": "brit-baby",
  };
