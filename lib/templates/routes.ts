import { getTemplateById, getTemplatesByCategory } from "./index";
import type { TemplateCategory } from "./types";

export function getBuilderPath(templateId: string): string {
  return `/builder/${encodeURIComponent(templateId)}`;
}

export function getDefaultTemplateForCategory(
  category: TemplateCategory,
) {
  const templates = getTemplatesByCategory(category);
  return templates[0] ?? null;
}

export function resolveTemplateFromParam(templateId: string) {
  const decoded = decodeURIComponent(templateId);
  return getTemplateById(decoded);
}

/** Maps landing-page category ids to template data categories */
export const CONTENT_CATEGORY_TO_TEMPLATE: Record<string, TemplateCategory> =
  {
    weddings: "wedding",
    birthdays: "birthday",
    "bar-mitzvahs": "bar-mitzvah",
    business: "business",
  };
