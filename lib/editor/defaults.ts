import type {
  EditorBlock,
  EditorSettings,
  EditorState,
  InvitationFormData,
} from "@/lib/builder/types";
import type { InvitationTemplate } from "@/lib/templates/types";

export const fontOptions = [
  { label: "Heebo מודרני", value: "var(--font-heebo)" },
  { label: "Serif יוקרתי", value: "serif" },
  { label: "Sans נקי", value: "system-ui, sans-serif" },
] as const;

export const backgroundOptions = [
  {
    label: "שחור זהב קולנועי",
    value: "linear-gradient(145deg, #020202 0%, #13100a 48%, #4a2f0a 100%)",
  },
  {
    label: "לבן מגזיני",
    value: "linear-gradient(160deg, #f8f6ef 0%, #ffffff 52%, #dfd8cd 100%)",
  },
  {
    label: "ורדים רומנטי",
    value:
      "radial-gradient(circle at 20% 15%, rgba(251,207,232,.45), transparent 22%), linear-gradient(145deg, #4a1024 0%, #8a3656 50%, #241316 100%)",
  },
  {
    label: "ניאון לילה",
    value:
      "radial-gradient(circle at 25% 15%, rgba(34,211,238,.45), transparent 24%), radial-gradient(circle at 80% 75%, rgba(217,70,239,.5), transparent 28%), linear-gradient(145deg, #130023 0%, #2d064f 52%, #040312 100%)",
  },
  {
    label: "מינימל יפני",
    value:
      "radial-gradient(circle at 18% 18%, rgba(220,38,38,.18), transparent 15%), linear-gradient(160deg, #fafaf9 0%, #f5f1e8 100%)",
  },
  {
    label: "עסקי כחול עמוק",
    value: "linear-gradient(135deg, #020617 0%, #0f172a 45%, #1e3a8a 100%)",
  },
  {
    label: "סטורי גרדיאנט",
    value:
      "radial-gradient(circle at 20% 10%, rgba(255,255,255,.24), transparent 18%), linear-gradient(155deg, #db2777 0%, #f97316 42%, #6d28d9 100%)",
  },
] as const;

function cloneBlocks(blocks: EditorBlock[]): EditorBlock[] {
  return blocks.map((block) => ({ ...block }));
}

function cloneSettings(settings: EditorSettings): EditorSettings {
  return { ...settings };
}

export function getDefaultEditorState(template: InvitationTemplate): EditorState {
  return {
    settings: cloneSettings(template.editorPreset.settings),
    blocks: cloneBlocks(template.editorPreset.blocks),
  };
}

export function getBlockText(block: EditorBlock, formData: InvitationFormData) {
  if (block.content !== undefined) return block.content;
  if (block.field) return formData[block.field];
  return "";
}

export function getDetailsText(formData: InvitationFormData) {
  return [
    formData.date,
    formData.time,
    formData.location,
    formData.phone,
  ]
    .filter(Boolean)
    .join(" · ");
}
