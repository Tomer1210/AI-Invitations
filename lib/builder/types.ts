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
