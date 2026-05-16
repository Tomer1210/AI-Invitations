import type { EditorState } from "@/lib/builder/types";

export const TEMPLATE_CATEGORIES = [
  "wedding",
  "bar-mitzvah",
  "brit-baby",
  "henna",
  "bachelor",
  "birthday",
  "business",
  "engagement",
] as const;

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

export const TEMPLATE_STYLES = [
  "luxury-editorial",
  "romantic-floral",
  "hebrew-luxury",
  "bar-mitzvah-luxury",
  "modern-party",
  "corporate-premium",
  "social-story",
  "baby-soft",
] as const;

export type TemplateStyle = (typeof TEMPLATE_STYLES)[number];

export type TemplatePreviewStyle = {
  gradient: string;
  overlay: string;
  accent: string;
  paper: string;
  scene: "silk" | "stationery" | "floral" | "neon" | "ceremony" | "corporate" | "social";
  layout: "portrait" | "square" | "editorial" | "centered" | "asymmetric" | "story";
  ornament:
    | "floral"
    | "confetti"
    | "torah"
    | "minimal"
    | "celebration"
    | "elegant"
    | "wax"
    | "pearls"
    | "ribbon";
  sampleTitle: string;
  sampleSubtitle: string;
};

export type InvitationTemplate = {
  id: string;
  category: TemplateCategory;
  name: string;
  description: string;
  isPremium: boolean;
  collection: string;
  style: TemplateStyle;
  tags: string[];
  preview: TemplatePreviewStyle;
  editorPreset: EditorState;
};
