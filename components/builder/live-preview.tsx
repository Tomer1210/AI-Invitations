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
      <div className="relative mx-auto w-full max-w-[23rem] sm:max-w-md">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-accent-from/25 via-accent-to/10 to-transparent opacity-75 blur-2xl"
        />
        <div className="premium-card relative overflow-hidden rounded-[1.65rem] p-2.5 shadow-[0_35px_100px_-48px_rgba(0,0,0,0.95)]">
          <div
            ref={exportRef}
            dir="rtl"
            lang="he"
            data-invitation-export
            className="w-full overflow-hidden rounded-[1.15rem]"
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
