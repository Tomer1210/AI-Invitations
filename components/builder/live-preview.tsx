"use client";

import { InvitationCardVisual } from "@/components/templates/invitation-card-visual";
import { useBuilder } from "@/lib/builder/context";
import { content } from "@/lib/content/he";

export function LivePreview() {
  const { template, formData, uploadedImage, exportRef } = useBuilder();
  const { builder } = content;
  const { preview: previewLabels } = builder;

  const cardContent = {
    title: formData.celebrantNames,
    subtitle: formData.eventTitle || previewLabels.defaultSubtitle,
    imageUrl: uploadedImage,
    description: formData.description || undefined,
    date: formData.date || undefined,
    time: formData.time || undefined,
    location: formData.location || undefined,
    phone: formData.phone || undefined,
    dateLabel: previewLabels.dateLabel,
    timeLabel: previewLabels.timeLabel,
    locationLabel: previewLabels.locationLabel,
    phoneLabel: previewLabels.phoneLabel,
  };

  return (
    <div className="builder-scale-in">
      <div className="relative mx-auto w-full max-w-md">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-b from-accent-from/20 via-transparent to-accent-to/10 opacity-60 blur-xl"
        />
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-2 shadow-2xl shadow-black/40">
          <div
            ref={exportRef}
            dir="rtl"
            lang="he"
            data-invitation-export
            className="w-full overflow-hidden rounded-xl"
          >
            <InvitationCardVisual
              key={`${template.id}-${uploadedImage ? "img" : "no-img"}`}
              preview={template.preview}
              content={cardContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
