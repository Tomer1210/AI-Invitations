import type { InvitationFormData } from "./types";

type ShareMessageLabels = {
  greeting: string;
  eventTitle: string;
  names: string;
  date: string;
  location: string;
  footer: string;
};

export function buildWhatsAppInvitationMessage(
  formData: InvitationFormData,
  labels: ShareMessageLabels,
) {
  const lines = [
    labels.greeting,
    "",
    formData.eventTitle && `${labels.eventTitle}: ${formData.eventTitle}`,
    formData.celebrantNames && `${labels.names}: ${formData.celebrantNames}`,
    formData.date && `${labels.date}: ${formData.date}`,
    formData.location && `${labels.location}: ${formData.location}`,
    "",
    labels.footer,
  ].filter(Boolean);

  return lines.join("\n");
}

export function getWhatsAppShareUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
