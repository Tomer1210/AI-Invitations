export type InvitationFormData = {
  eventTitle: string;
  celebrantNames: string;
  date: string;
  time: string;
  location: string;
  description: string;
  phone: string;
};

export type InvitationFormField = keyof InvitationFormData;

export type SavedInvitation = {
  id: string;
  templateId: string;
  templateName: string;
  templateCategory: string;
  formData: InvitationFormData;
  uploadedImage: string | null;
  createdAt: string;
  updatedAt: string;
};
