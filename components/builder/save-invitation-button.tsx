"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/lib/builder/context";
import { content } from "@/lib/content/he";
import { saveInvitation } from "@/lib/saved-invitations/storage";
import { getBuilderPath } from "@/lib/templates/routes";

type SaveInvitationButtonProps = {
  className?: string;
};

export function SaveInvitationButton({ className = "" }: SaveInvitationButtonProps) {
  const router = useRouter();
  const {
    template,
    formData,
    uploadedImage,
    editorState,
    currentSavedInvitationId,
    saveStatus,
    setCurrentSavedInvitation,
  } = useBuilder();
  const { builder } = content;
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    setError(null);

    try {
      const savedInvitation = saveInvitation({
        id: currentSavedInvitationId,
        template,
        formData,
        uploadedImage,
        editorState,
      });

      setCurrentSavedInvitation(savedInvitation);
      router.replace(
        `${getBuilderPath(template.id)}?invitationId=${savedInvitation.id}`,
        { scroll: false },
      );
    } catch {
      setError(builder.saveError);
    } finally {
      setIsSaving(false);
    }
  }, [
    builder.saveError,
    currentSavedInvitationId,
    editorState,
    formData,
    router,
    setCurrentSavedInvitation,
    template,
    uploadedImage,
  ]);

  return (
    <div className={`min-w-0 flex-1 ${className}`.trim()}>
      <Button
        type="button"
        variant={saveStatus === "saved" ? "secondary" : "primary"}
        className="w-full"
        disabled={isSaving}
        onClick={handleSave}
      >
        {isSaving
          ? builder.saving
          : saveStatus === "saved"
            ? builder.saved
            : builder.saveDraft}
      </Button>
      {error && (
        <p className="mt-2 text-center text-xs text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
