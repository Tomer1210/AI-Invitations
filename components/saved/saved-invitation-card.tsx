"use client";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { InvitationCardVisual } from "@/components/templates/invitation-card-visual";
import { content } from "@/lib/content/he";
import type { SavedInvitation } from "@/lib/builder/types";
import { getBuilderPath } from "@/lib/templates/routes";
import type { InvitationTemplate } from "@/lib/templates/types";

type SavedInvitationCardProps = {
  invitation: SavedInvitation;
  template: InvitationTemplate;
  onDelete: (id: string) => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("he-IL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function SavedInvitationCard({
  invitation,
  template,
  onDelete,
}: SavedInvitationCardProps) {
  const { savedInvitations, builder, gallery } = content;
  const editHref = `${getBuilderPath(template.id)}?invitationId=${invitation.id}`;

  return (
    <article className="premium-card group overflow-hidden rounded-3xl p-2 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_24px_80px_-44px_rgba(167,139,250,0.4)]">
      <div className="grid gap-4 min-[520px]:grid-cols-[9rem_1fr] sm:gap-5">
        <div className="overflow-hidden rounded-2xl">
          <InvitationCardVisual
            preview={template.preview}
            content={{
              title: invitation.formData.celebrantNames,
              subtitle:
                invitation.formData.eventTitle || builder.preview.defaultSubtitle,
              imageUrl: invitation.uploadedImage,
              description: invitation.formData.description || undefined,
              date: invitation.formData.date || undefined,
              time: invitation.formData.time || undefined,
              location: invitation.formData.location || undefined,
              phone: invitation.formData.phone || undefined,
              dateLabel: builder.preview.dateLabel,
              timeLabel: builder.preview.timeLabel,
              locationLabel: builder.preview.locationLabel,
              phoneLabel: builder.preview.phoneLabel,
            }}
            className="min-[520px]:rounded-2xl"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between px-2 pb-3 pt-1 sm:px-2 sm:py-2">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border bg-white/[0.045] px-2.5 py-1 text-xs text-muted">
                {gallery.categoryLabels[template.category]}
              </span>
              <span className="rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-xs text-gold">
                {template.name}
              </span>
            </div>

            <h2 className="truncate text-lg font-semibold text-foreground sm:text-xl">
              {invitation.formData.celebrantNames || template.name}
            </h2>
            <p className="text-hebrew-body mt-1 line-clamp-2 text-sm text-muted">
              {invitation.formData.eventTitle || template.description}
            </p>

            <div className="mt-4 space-y-1 text-xs text-muted">
              <p>
                {savedInvitations.updatedAt}: {formatDate(invitation.updatedAt)}
              </p>
              <p>
                {savedInvitations.createdAt}: {formatDate(invitation.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <ButtonLink href={editHref} size="sm" className="w-full sm:flex-1">
              {savedInvitations.edit}
            </ButtonLink>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="w-full sm:flex-1"
              onClick={() => onDelete(invitation.id)}
            >
              {savedInvitations.delete}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
