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
import { getDefaultEditorState } from "@/lib/editor/defaults";
import { getDefaultFormData } from "./defaults";
import type {
  EditorBlock,
  EditorSettings,
  EditorState,
  InvitationFormData,
  InvitationFormField,
  SavedInvitation,
} from "./types";

type BuilderContextValue = {
  template: InvitationTemplate;
  formData: InvitationFormData;
  uploadedImage: string | null;
  editorState: EditorState;
  selectedBlockId: string | null;
  currentSavedInvitationId: string | null;
  saveStatus: "idle" | "saved";
  exportRef: RefObject<HTMLDivElement | null>;
  updateField: (field: InvitationFormField, value: string) => void;
  setUploadedImage: (dataUrl: string | null) => void;
  selectBlock: (blockId: string | null) => void;
  updateBlock: (blockId: string, updates: Partial<EditorBlock>) => void;
  updateSelectedBlock: (updates: Partial<EditorBlock>) => void;
  updateEditorSettings: (updates: Partial<EditorSettings>) => void;
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
  const [editorState, setEditorState] = useState<EditorState>(() =>
    getDefaultEditorState(template),
  );
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>("title");
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
    if (savedInvitation.editorState) {
      setEditorState(savedInvitation.editorState);
    }
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

  const selectBlock = useCallback((blockId: string | null) => {
    setSelectedBlockId(blockId);
  }, []);

  const updateBlock = useCallback(
    (blockId: string, updates: Partial<EditorBlock>) => {
      setEditorState((prev) => ({
        ...prev,
        blocks: prev.blocks.map((block) =>
          block.id === blockId ? { ...block, ...updates } : block,
        ),
      }));
      setSaveStatus("idle");
    },
    [],
  );

  const updateSelectedBlock = useCallback(
    (updates: Partial<EditorBlock>) => {
      if (!selectedBlockId) return;
      updateBlock(selectedBlockId, updates);
    },
    [selectedBlockId, updateBlock],
  );

  const updateEditorSettings = useCallback(
    (updates: Partial<EditorSettings>) => {
      setEditorState((prev) => ({
        ...prev,
        settings: { ...prev.settings, ...updates },
      }));
      setSaveStatus("idle");
    },
    [],
  );

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
      editorState,
      selectedBlockId,
      currentSavedInvitationId,
      saveStatus,
      exportRef,
      updateField,
      setUploadedImage: setUploadedImageAndMarkDirty,
      selectBlock,
      updateBlock,
      updateSelectedBlock,
      updateEditorSettings,
      setCurrentSavedInvitation,
      markSaved,
    }),
    [
      template,
      formData,
      uploadedImage,
      editorState,
      selectedBlockId,
      currentSavedInvitationId,
      saveStatus,
      updateField,
      setUploadedImageAndMarkDirty,
      selectBlock,
      updateBlock,
      updateSelectedBlock,
      updateEditorSettings,
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
