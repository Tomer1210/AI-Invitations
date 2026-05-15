import type { InvitationFormData } from "./types";
import type { InvitationTemplate } from "@/lib/templates/types";

export function getDefaultFormData(
  template: InvitationTemplate,
): InvitationFormData {
  return {
    eventTitle: template.preview.sampleSubtitle,
    celebrantNames: template.preview.sampleTitle,
    date: "",
    time: "",
    location: "",
    description: "",
    phone: "",
  };
}
