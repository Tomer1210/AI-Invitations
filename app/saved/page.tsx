import type { Metadata } from "next";
import { SavedInvitationsPage } from "@/components/saved/saved-invitations-page";
import { content } from "@/lib/content/he";

export const metadata: Metadata = {
  title: `${content.savedInvitations.pageTitle} | ${content.brand}`,
  description: content.savedInvitations.description,
};

export default function SavedPage() {
  return <SavedInvitationsPage />;
}
