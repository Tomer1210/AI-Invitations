export const TEMPLATE_CATEGORIES = [
  "wedding",
  "birthday",
  "bar-mitzvah",
  "business",
] as const;

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

export type TemplatePreviewStyle = {
  gradient: string;
  overlay: string;
  accent: string;
  ornament: "floral" | "confetti" | "torah" | "minimal" | "celebration" | "elegant";
  sampleTitle: string;
  sampleSubtitle: string;
};

export type InvitationTemplate = {
  id: string;
  category: TemplateCategory;
  name: string;
  description: string;
  isPremium: boolean;
  preview: TemplatePreviewStyle;
};
