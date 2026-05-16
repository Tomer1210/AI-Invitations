export type InvitationFormData = {
  eventTitle: string;
  celebrantNames: string;
  date: string;
  time: string;
  location: string;
  description: string;
  phone: string;
};

export type InvitationFormField = keyof InvitationFormData;

export type EditorAspectRatio = "portrait" | "story" | "square";

export type EditorBlockKind = "text" | "details" | "image";

export type EditorBlock = {
  id: string;
  kind: EditorBlockKind;
  field?: InvitationFormField;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontFamily: string;
  fontSize: number;
  color: string;
  align: "right" | "center" | "left";
  weight?: "normal" | "medium" | "semibold" | "bold";
  letterSpacing?: number;
  content?: string;
};

export type EditorSettings = {
  fontFamily: string;
  background: string;
  backgroundLabel: string;
  overlayOpacity: number;
  sectionSpacing: number;
  aspectRatio: EditorAspectRatio;
  watermarkEnabled: boolean;
};

export type EditorState = {
  settings: EditorSettings;
  blocks: EditorBlock[];
};

export type SavedInvitation = {
  id: string;
  templateId: string;
  templateName: string;
  templateCategory: string;
  formData: InvitationFormData;
  uploadedImage: string | null;
  editorState?: EditorState;
  createdAt: string;
  updatedAt: string;
};
