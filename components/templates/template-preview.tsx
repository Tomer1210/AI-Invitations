import type { TemplatePreviewStyle } from "@/lib/templates/types";
import { InvitationCardVisual } from "./invitation-card-visual";

type TemplatePreviewProps = {
  preview: TemplatePreviewStyle;
};

export function TemplatePreview({ preview }: TemplatePreviewProps) {
  return (
    <InvitationCardVisual
      preview={preview}
      content={{
        title: preview.sampleTitle,
        subtitle: preview.sampleSubtitle,
      }}
      aria-hidden
    />
  );
}
