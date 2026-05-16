"use client";

import type { ChangeEvent, CSSProperties } from "react";
import { FormField } from "@/components/builder/form-field";
import { ImageUpload } from "@/components/builder/image-upload";
import { DownloadInvitationButton } from "@/components/builder/download-invitation-button";
import { SaveInvitationButton } from "@/components/builder/save-invitation-button";
import { WhatsAppShareButton } from "@/components/builder/whatsapp-share-button";
import { EditorControls } from "@/components/editor/editor-controls";
import { useBuilder } from "@/lib/builder/context";
import type { InvitationFormField } from "@/lib/builder/types";
import { content } from "@/lib/content/he";

const fieldOrder: InvitationFormField[] = [
  "eventTitle",
  "celebrantNames",
  "date",
  "time",
  "location",
  "description",
  "phone",
];

export function BuilderForm() {
  const { formData, updateField } = useBuilder();
  const { builder } = content;

  return (
    <div className="builder-fade-in">
      <form
        className="space-y-5 sm:space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <ImageUpload />
        <EditorControls />

        {fieldOrder.map((field, index) => {
          const isMultiline = field === "description";
          const isPhone = field === "phone";

          const wrapperStyle = {
            animationDelay: `${(index + 1) * 60}ms`,
          } as CSSProperties;

          const commonProps = {
            id: field,
            label: builder.fields[field],
            placeholder: builder.placeholders[field],
            value: formData[field],
            onChange: (
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => updateField(field, e.target.value),
          };

          return (
            <div key={field} className="builder-field" style={wrapperStyle}>
              {isMultiline ? (
                <FormField {...commonProps} multiline rows={4} />
              ) : (
                <FormField
                  {...commonProps}
                  multiline={false}
                  type="text"
                  dir={isPhone ? "ltr" : undefined}
                  className={isPhone ? "text-start" : undefined}
                />
              )}
            </div>
          );
        })}

        <div
          className="builder-field grid gap-3 pt-2 sm:grid-cols-3 sm:pt-4"
          style={{ animationDelay: `${(fieldOrder.length + 1) * 60}ms` }}
        >
          <SaveInvitationButton />
          <WhatsAppShareButton fullWidth />
          <DownloadInvitationButton className="flex-1" fullWidth />
        </div>
      </form>
    </div>
  );
}
