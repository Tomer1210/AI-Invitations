import { invitationTemplates } from "./data";
import type { InvitationTemplate, TemplateCategory } from "./types";

export { invitationTemplates };
export type { InvitationTemplate, TemplateCategory };
export { TEMPLATE_CATEGORIES } from "./types";

export function getAllTemplates(): InvitationTemplate[] {
  return invitationTemplates;
}

export function getTemplatesByCategory(
  category: TemplateCategory,
): InvitationTemplate[] {
  return invitationTemplates.filter((t) => t.category === category);
}

export function getTemplateById(id: string): InvitationTemplate | undefined {
  return invitationTemplates.find((t) => t.id === id);
}

export {
  getBuilderPath,
  resolveTemplateFromParam,
  getDefaultTemplateForCategory,
  CONTENT_CATEGORY_TO_TEMPLATE,
} from "./routes";
