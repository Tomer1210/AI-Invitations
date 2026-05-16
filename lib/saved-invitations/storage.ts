"use client";

import type {
  EditorState,
  InvitationFormData,
  SavedInvitation,
} from "@/lib/builder/types";
import type { InvitationTemplate } from "@/lib/templates/types";

const STORAGE_KEY = "inviteai.savedInvitations.v1";

type SaveInvitationInput = {
  id?: string | null;
  template: InvitationTemplate;
  formData: InvitationFormData;
  uploadedImage: string | null;
  editorState?: EditorState;
};

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `inv_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function parseInvitations(value: string | null): SavedInvitation[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeInvitations(invitations: SavedInvitation[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(invitations));
}

export function getSavedInvitations(): SavedInvitation[] {
  if (!canUseStorage()) return [];
  return parseInvitations(window.localStorage.getItem(STORAGE_KEY)).sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getSavedInvitation(id: string): SavedInvitation | null {
  return getSavedInvitations().find((invitation) => invitation.id === id) ?? null;
}

export function saveInvitation({
  id,
  template,
  formData,
  uploadedImage,
  editorState,
}: SaveInvitationInput): SavedInvitation {
  const invitations = getSavedInvitations();
  const existing = id
    ? invitations.find((invitation) => invitation.id === id)
    : undefined;
  const now = new Date().toISOString();

  const invitation: SavedInvitation = {
    id: existing?.id ?? createId(),
    templateId: template.id,
    templateName: template.name,
    templateCategory: template.category,
    formData,
    uploadedImage,
    editorState,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  writeInvitations([
    invitation,
    ...invitations.filter((item) => item.id !== invitation.id),
  ]);

  return invitation;
}

export function deleteSavedInvitation(id: string) {
  writeInvitations(
    getSavedInvitations().filter((invitation) => invitation.id !== id),
  );
}
