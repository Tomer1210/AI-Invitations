"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { InvitationTemplate } from "@/lib/templates/types";
import { getDefaultFormData } from "./defaults";
import type { InvitationFormData, InvitationFormField } from "./types";

type BuilderContextValue = {
  template: InvitationTemplate;
  formData: InvitationFormData;
  uploadedImage: string | null;
  exportRef: RefObject<HTMLDivElement | null>;
  updateField: (field: InvitationFormField, value: string) => void;
  setUploadedImage: (dataUrl: string | null) => void;
};

const BuilderContext = createContext<BuilderContextValue | null>(null);

type BuilderProviderProps = {
  template: InvitationTemplate;
  children: ReactNode;
};

export function BuilderProvider({ template, children }: BuilderProviderProps) {
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<InvitationFormData>(() =>
    getDefaultFormData(template),
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const updateField = useCallback(
    (field: InvitationFormField, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      template,
      formData,
      uploadedImage,
      exportRef,
      updateField,
      setUploadedImage,
    }),
    [template, formData, uploadedImage, updateField],
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
