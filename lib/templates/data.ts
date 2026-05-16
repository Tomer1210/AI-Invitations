import type { EditorBlock, EditorState } from "@/lib/builder/types";
import type {
  InvitationTemplate,
  TemplateCategory,
  TemplatePreviewStyle,
  TemplateStyle,
} from "./types";

type TemplateInput = Omit<InvitationTemplate, "editorPreset"> & {
  settings: EditorState["settings"];
  blocks: EditorBlock[];
};

const fonts = {
  heebo: "var(--font-heebo)",
  serif: "serif",
  sans: "system-ui, sans-serif",
};

function block(
  data: Omit<EditorBlock, "fontFamily" | "fontSize" | "color" | "align"> &
    Partial<Pick<EditorBlock, "fontFamily" | "fontSize" | "color" | "align">>,
): EditorBlock {
  return {
    fontFamily: fonts.heebo,
    fontSize: 13,
    color: "#ffffff",
    align: "center",
    ...data,
  };
}

function createTemplate({
  settings,
  blocks,
  ...template
}: TemplateInput): InvitationTemplate {
  return {
    ...template,
    editorPreset: {
      settings,
      blocks,
    },
  };
}

const baseSettings = {
  fontFamily: fonts.heebo,
  overlayOpacity: 0.18,
  sectionSpacing: 16,
  aspectRatio: "portrait" as const,
  watermarkEnabled: true,
};

function paperPreview(
  preview: Omit<TemplatePreviewStyle, "paper"> & { paper?: string },
): TemplatePreviewStyle {
  return {
    paper: "ivory",
    ...preview,
  };
}

function luxuryWedding(
  id: string,
  name: string,
  layout: TemplatePreviewStyle["layout"],
  sampleTitle: string,
  variant: "silk" | "wax" | "editorial" | "asymmetric",
): InvitationTemplate {
  const dark = variant === "wax";
  const background = dark
    ? "linear-gradient(145deg, #020202 0%, #13100a 48%, #4a2f0a 100%)"
    : "radial-gradient(circle at 15% 20%, rgba(255,255,255,.45), transparent 18%), linear-gradient(150deg, #f6f0e4 0%, #fffaf0 48%, #d8c8a9 100%)";

  return createTemplate({
    id,
    category: "wedding",
    name,
    collection: "Luxury Editorial Wedding",
    style: "luxury-editorial",
    tags: ["silk", "wax seal", "pearls", "editorial"],
    description:
      "סצנת נייר יוקרתית עם משי, עומק ריאליסטי, טיפוגרפיה אלגנטית ותחושת סטודיו מודפסת.",
    isPremium: true,
    preview: paperPreview({
      gradient: dark
        ? "from-black via-stone-950 to-amber-950"
        : "from-stone-100 via-white to-amber-100",
      overlay: dark
        ? "from-amber-200/14 via-transparent to-black/30"
        : "from-white/70 via-transparent to-stone-300/30",
      accent: dark ? "text-amber-200" : "text-stone-950",
      ornament: variant === "wax" ? "wax" : variant === "silk" ? "pearls" : "ribbon",
      scene: "stationery",
      layout,
      paper: dark ? "black-gold" : "ivory",
      sampleTitle,
      sampleSubtitle: "Save the Date",
    }),
    settings: {
      ...baseSettings,
      background,
      backgroundLabel: dark ? "שחור זהב קולנועי" : "משי שנהב",
      overlayOpacity: dark ? 0.3 : 0.08,
      aspectRatio: layout === "square" ? "square" : "portrait",
    },
    blocks: [
      block({ id: "image", kind: "image", label: "תמונה", x: variant === "asymmetric" ? 8 : 18, y: variant === "editorial" ? 12 : 44, width: variant === "asymmetric" ? 38 : 64, height: variant === "editorial" ? 30 : 24 }),
      block({ id: "title", kind: "text", field: "celebrantNames", label: "שמות", x: variant === "asymmetric" ? 48 : 12, y: dark ? 16 : 18, width: variant === "asymmetric" ? 42 : 76, height: 14, fontFamily: fonts.serif, fontSize: 31, color: dark ? "#fde68a" : "#2f2a24", weight: "bold" }),
      block({ id: "subtitle", kind: "text", field: "eventTitle", label: "כותרת", x: variant === "asymmetric" ? 50 : 16, y: dark ? 34 : 35, width: variant === "asymmetric" ? 40 : 68, height: 9, fontSize: 13, color: dark ? "#f8e7bd" : "#776b5d", weight: "medium" }),
      block({ id: "details", kind: "details", label: "פרטים", x: 14, y: 78, width: 72, height: 13, fontSize: 11, color: dark ? "#f5deb3" : "#4b453c" }),
    ],
  });
}

function floralTemplate(
  id: string,
  category: TemplateCategory,
  name: string,
  sampleTitle: string,
  variant: "corners" | "border" | "gold" | "modern" | "pearls",
): InvitationTemplate {
  return createTemplate({
    id,
    category,
    name,
    collection: "Romantic Floral Luxury",
    style: "romantic-floral",
    tags: ["floral", "botanical", "pearls", "gold"],
    description:
      "קומפוזיציית פרחים יוקרתית עם שכבות עדינות, מסגרות דקורטיביות ותחושת נייר פרימיום.",
    isPremium: true,
    preview: paperPreview({
      gradient:
        variant === "gold"
          ? "from-amber-50 via-stone-100 to-rose-100"
          : "from-rose-100 via-stone-50 to-pink-200",
      overlay: "from-pink-100/40 via-transparent to-rose-200/25",
      accent: "text-stone-800",
      ornament: variant === "pearls" ? "pearls" : "floral",
      scene: "floral",
      layout: variant === "border" ? "centered" : "asymmetric",
      paper: "embossed-floral",
      sampleTitle,
      sampleSubtitle: "נשמח לחגוג איתכם",
    }),
    settings: {
      ...baseSettings,
      background:
        "radial-gradient(circle at 20% 12%, rgba(251,207,232,.34), transparent 20%), radial-gradient(circle at 88% 86%, rgba(253,186,116,.2), transparent 24%), linear-gradient(145deg, #fff7ed 0%, #fdf2f8 52%, #d6c5b4 100%)",
      backgroundLabel: "פרחים ומשי",
      overlayOpacity: 0.1,
      aspectRatio: variant === "pearls" ? "square" : "portrait",
    },
    blocks: [
      block({ id: "title", kind: "text", field: "celebrantNames", label: "שמות", x: 12, y: 25, width: 76, height: 13, fontFamily: fonts.serif, fontSize: 29, color: "#6b4e3d", weight: "bold" }),
      block({ id: "subtitle", kind: "text", field: "eventTitle", label: "כותרת", x: 18, y: 42, width: 64, height: 9, fontSize: 13, color: "#8a6b5a" }),
      block({ id: "image", kind: "image", label: "תמונה", x: variant === "modern" ? 52 : 14, y: variant === "modern" ? 54 : 52, width: variant === "modern" ? 34 : 72, height: 20 }),
      block({ id: "details", kind: "details", label: "פרטים", x: 12, y: 80, width: 76, height: 12, fontSize: 11, color: "#6b4e3d" }),
    ],
  });
}

function hebrewLuxury(
  id: string,
  category: TemplateCategory,
  name: string,
  sampleTitle: string,
  style: TemplateStyle = "hebrew-luxury",
): InvitationTemplate {
  return createTemplate({
    id,
    category,
    name,
    collection: style === "bar-mitzvah-luxury" ? "Bar Mitzvah Luxury" : "Premium Hebrew Wedding",
    style,
    tags: ["hebrew", "cream paper", "gold", "embossed"],
    description:
      "היררכיית עברית מוקפדת, נייר קרם יוקרתי, סמלים עדינים ומרווחים ישראליים אלגנטיים.",
    isPremium: true,
    preview: paperPreview({
      gradient: "from-stone-100 via-amber-50 to-zinc-200",
      overlay: "from-white/60 via-transparent to-amber-200/20",
      accent: "text-stone-700",
      ornament: style === "bar-mitzvah-luxury" ? "torah" : "elegant",
      scene: "ceremony",
      layout: "centered",
      paper: "cream-embossed",
      sampleTitle,
      sampleSubtitle: style === "bar-mitzvah-luxury" ? "בר מצווה" : "שמחים להזמינכם",
    }),
    settings: {
      ...baseSettings,
      background:
        "linear-gradient(160deg, #f8f4e8 0%, #fffdf7 50%, #d9ccb4 100%)",
      backgroundLabel: "קרם עברי יוקרתי",
      overlayOpacity: 0.08,
      sectionSpacing: 22,
    },
    blocks: [
      block({ id: "subtitle", kind: "text", field: "eventTitle", label: "פתיח", x: 14, y: 14, width: 72, height: 11, fontSize: 13, color: "#7c6f60", weight: "medium" }),
      block({ id: "title", kind: "text", field: "celebrantNames", label: "שם", x: 12, y: 32, width: 76, height: 15, fontFamily: fonts.serif, fontSize: 34, color: "#8a7a5f", weight: "bold" }),
      block({ id: "image", kind: "image", label: "תמונה", x: 34, y: 52, width: 32, height: 16 }),
      block({ id: "details", kind: "details", label: "פרטים", x: 12, y: 72, width: 76, height: 17, fontSize: 12, color: "#6f6255" }),
    ],
  });
}

function partyTemplate(
  id: string,
  category: TemplateCategory,
  name: string,
  sampleTitle: string,
  social = false,
): InvitationTemplate {
  return createTemplate({
    id,
    category,
    name,
    collection: social ? "Instagram Story Style" : "Modern Party Collection",
    style: social ? "social-story" : "modern-party",
    tags: ["neon", "nightlife", "bold", "social"],
    description:
      "הזמנה אנרגטית עם זוהר מודרני, קומפוזיציה של חיי לילה וטיפוגרפיה חזקה.",
    isPremium: true,
    preview: paperPreview({
      gradient: "from-fuchsia-700 via-violet-950 to-cyan-950",
      overlay: "from-cyan-400/20 via-fuchsia-400/15 to-transparent",
      accent: "text-fuchsia-100",
      ornament: "celebration",
      scene: "neon",
      layout: social ? "story" : "asymmetric",
      paper: "glossy-neon",
      sampleTitle,
      sampleSubtitle: "Let’s Celebrate",
    }),
    settings: {
      ...baseSettings,
      background:
        "radial-gradient(circle at 25% 15%, rgba(34,211,238,.45), transparent 24%), radial-gradient(circle at 80% 75%, rgba(217,70,239,.5), transparent 28%), linear-gradient(145deg, #130023 0%, #2d064f 52%, #040312 100%)",
      backgroundLabel: "ניאון לילה",
      overlayOpacity: 0.2,
      aspectRatio: social ? "story" : "portrait",
    },
    blocks: [
      block({ id: "title", kind: "text", field: "eventTitle", label: "כותרת", x: 8, y: 12, width: 84, height: 16, fontSize: 31, color: "#f0abfc", weight: "bold" }),
      block({ id: "image", kind: "image", label: "תמונה", x: social ? 12 : 18, y: social ? 32 : 36, width: social ? 76 : 64, height: social ? 34 : 26 }),
      block({ id: "subtitle", kind: "text", field: "celebrantNames", label: "שמות", x: 12, y: social ? 70 : 66, width: 76, height: 9, fontSize: 16, color: "#67e8f9", weight: "semibold" }),
      block({ id: "details", kind: "details", label: "פרטים", x: 12, y: 84, width: 76, height: 10, fontSize: 11, color: "#f5d0fe" }),
    ],
  });
}

function corporateTemplate(id: string, name: string, sampleTitle: string): InvitationTemplate {
  return createTemplate({
    id,
    category: "business",
    name,
    collection: "Corporate Business Event",
    style: "corporate-premium",
    tags: ["business", "geometric", "conference", "launch"],
    description:
      "אסתטיקה עסקית יוקרתית, גריד גיאומטרי ומבנה אלגנטי להשקות, כנסים וגאלות.",
    isPremium: true,
    preview: paperPreview({
      gradient: "from-slate-950 via-blue-950 to-zinc-950",
      overlay: "from-sky-300/12 via-transparent to-white/5",
      accent: "text-sky-100",
      ornament: "minimal",
      scene: "corporate",
      layout: "editorial",
      paper: "deep-blue",
      sampleTitle,
      sampleSubtitle: "Premium Event",
    }),
    settings: {
      ...baseSettings,
      background: "linear-gradient(135deg, #020617 0%, #0f172a 45%, #1e3a8a 100%)",
      backgroundLabel: "עסקי כחול עמוק",
      overlayOpacity: 0.22,
    },
    blocks: [
      block({ id: "title", kind: "text", field: "eventTitle", label: "כותרת", x: 10, y: 12, width: 80, height: 15, fontSize: 28, color: "#e0f2fe", align: "right", weight: "bold" }),
      block({ id: "subtitle", kind: "text", field: "celebrantNames", label: "שם/מותג", x: 10, y: 31, width: 66, height: 8, fontSize: 14, color: "#93c5fd", align: "right" }),
      block({ id: "image", kind: "image", label: "תמונה", x: 10, y: 44, width: 80, height: 24 }),
      block({ id: "details", kind: "details", label: "פרטים", x: 10, y: 76, width: 80, height: 14, fontSize: 12, color: "#bfdbfe", align: "right" }),
    ],
  });
}

function babyTemplate(id: string, name: string, sampleTitle: string): InvitationTemplate {
  return createTemplate({
    id,
    category: "brit-baby",
    name,
    collection: "Brit / Baby Soft Luxury",
    style: "baby-soft",
    tags: ["baby", "soft", "cream", "minimal"],
    description: "פלטת שמנת רכה, מרקם נייר עדין וקומפוזיציה נקייה לאירועי תינוקות.",
    isPremium: true,
    preview: paperPreview({
      gradient: "from-sky-50 via-white to-amber-50",
      overlay: "from-white/70 via-transparent to-sky-100/35",
      accent: "text-slate-700",
      ornament: "pearls",
      scene: "silk",
      layout: "centered",
      sampleTitle,
      sampleSubtitle: "ברית / אירוע תינוק",
    }),
    settings: {
      ...baseSettings,
      background: "linear-gradient(150deg, #eff6ff 0%, #fffdf6 52%, #e7dcc8 100%)",
      backgroundLabel: "תינוקות שמנת",
      overlayOpacity: 0.06,
    },
    blocks: [
      block({ id: "title", kind: "text", field: "celebrantNames", label: "שם", x: 14, y: 20, width: 72, height: 14, fontFamily: fonts.serif, fontSize: 32, color: "#475569", weight: "bold" }),
      block({ id: "subtitle", kind: "text", field: "eventTitle", label: "כותרת", x: 16, y: 39, width: 68, height: 9, color: "#64748b" }),
      block({ id: "image", kind: "image", label: "תמונה", x: 24, y: 53, width: 52, height: 20 }),
      block({ id: "details", kind: "details", label: "פרטים", x: 12, y: 79, width: 76, height: 12, color: "#475569" }),
    ],
  });
}

export const invitationTemplates: InvitationTemplate[] = [
  luxuryWedding("luxury-editorial-portrait", "Editorial Ivory Portrait", "portrait", "T&B", "silk"),
  luxuryWedding("luxury-wax-centered", "Black Wax Seal Luxury", "centered", "BAR & TOMER", "wax"),
  luxuryWedding("luxury-editorial-vertical", "Magazine Vertical Wedding", "editorial", "LIRAZ & DOR", "editorial"),
  luxuryWedding("luxury-asymmetric-paper", "Asymmetric Stationery", "asymmetric", "SHANY & SHAY", "asymmetric"),
  floralTemplate("floral-corners-wedding", "wedding", "Minimal Floral Corners", "S&S", "corners"),
  floralTemplate("full-floral-border", "wedding", "Full Floral Border", "BAR & TOMER", "border"),
  floralTemplate("gold-floral-wedding", "engagement", "Luxury Gold Floral", "TOMER & BAR", "gold"),
  floralTemplate("pearl-floral-engagement", "engagement", "Pearl Floral Composition", "B&T", "pearls"),
  hebrewLuxury("hebrew-ultra-minimal-wedding", "wedding", "עברית יוקרתית מינימלית", "בר ותומר"),
  hebrewLuxury("hebrew-embossed-wedding", "wedding", "הזמנה עברית מובלטת", "לירז ודור"),
  hebrewLuxury("bar-mitzvah-modern-luxury", "bar-mitzvah", "בר מצווה Modern Luxury", "יגל", "bar-mitzvah-luxury"),
  hebrewLuxury("bar-mitzvah-ceremonial", "bar-mitzvah", "Ceremonial Cream Gold", "יונתן", "bar-mitzvah-luxury"),
  babyTemplate("brit-soft-cream", "ברית שמנת רכה", "נועם"),
  babyTemplate("baby-pearl-announcement", "Baby Pearl Announcement", "אלה"),
  partyTemplate("neon-birthday-party", "birthday", "Neon Birthday Party", "מסיבת 30"),
  partyTemplate("bachelorette-red-rose", "bachelor", "Bride-to-be Red Rose", "BAR"),
  partyTemplate("henna-luxury-night", "henna", "Henna Luxury Night", "חינה"),
  partyTemplate("engagement-story-glow", "engagement", "Engagement Story Glow", "SAVE THE DATE", true),
  partyTemplate("instagram-story-style", "birthday", "Instagram Story Style", "STORY", true),
  corporateTemplate("corporate-business-event", "Corporate Premium Launch", "השקת מוצר"),
  corporateTemplate("business-gala-geometric", "Geometric Gala Invitation", "ערב גאלה"),
];
