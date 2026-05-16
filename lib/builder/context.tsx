"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { InvitationTemplate } from "@/lib/templates/types";
import { getSavedInvitation } from "@/lib/saved-invitations/storage";
import { getDefaultFormData } from "./defaults";
import type {
  InvitationFormData,
  InvitationFormField,
  SavedInvitation,
} from "./types";

type BuilderContextValue = {
  template: InvitationTemplate;
  formData: InvitationFormData;
  uploadedImage: string | null;
  currentSavedInvitationId: string | null;
  saveStatus: "idle" | "saved";
  exportRef: RefObject<HTMLDivElement | null>;
  updateField: (field: InvitationFormField, value: string) => void;
  setUploadedImage: (dataUrl: string | null) => void;
  setCurrentSavedInvitation: (invitation: SavedInvitation) => void;
  markSaved: () => void;
};

const BuilderContext = createContext<BuilderContextValue | null>(null);

type BuilderProviderProps = {
  template: InvitationTemplate;
  initialSavedInvitationId?: string | null;
  children: ReactNode;
};

export function BuilderProvider({
  template,
  initialSavedInvitationId = null,
  children,
}: BuilderProviderProps) {
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<InvitationFormData>(() =>
    getDefaultFormData(template),
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [currentSavedInvitationId, setCurrentSavedInvitationId] = useState<
    string | null
  >(initialSavedInvitationId);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  useEffect(() => {
    if (!initialSavedInvitationId) return;

    const savedInvitation = getSavedInvitation(initialSavedInvitationId);
    if (!savedInvitation || savedInvitation.templateId !== template.id) return;

    setFormData(savedInvitation.formData);
    setUploadedImage(savedInvitation.uploadedImage);
    setCurrentSavedInvitationId(savedInvitation.id);
    setSaveStatus("saved");
  }, [initialSavedInvitationId, template.id]);

  const updateField = useCallback(
    (field: InvitationFormField, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setSaveStatus("idle");
    },
    [],
  );

  const setUploadedImageAndMarkDirty = useCallback((dataUrl: string | null) => {
    setUploadedImage(dataUrl);
    setSaveStatus("idle");
  }, []);

  const setCurrentSavedInvitation = useCallback((invitation: SavedInvitation) => {
    setCurrentSavedInvitationId(invitation.id);
    setSaveStatus("saved");
  }, []);

  const markSaved = useCallback(() => {
    setSaveStatus("saved");
  }, []);

  const value = useMemo(
    () => ({
      template,
      formData,
      uploadedImage,
      currentSavedInvitationId,
      saveStatus,
      exportRef,
      updateField,
      setUploadedImage: setUploadedImageAndMarkDirty,
      setCurrentSavedInvitation,
      markSaved,
    }),
    [
      template,
      formData,
      uploadedImage,
      currentSavedInvitationId,
      saveStatus,
      updateField,
      setUploadedImageAndMarkDirty,
      setCurrentSavedInvitation,
      markSaved,
    ],
  );

  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within BuilderProvider");
  }
  return context;
}
