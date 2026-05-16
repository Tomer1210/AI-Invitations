"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { SavedInvitationCard } from "@/components/saved/saved-invitation-card";
import { content } from "@/lib/content/he";
import type { SavedInvitation } from "@/lib/builder/types";
import {
  deleteSavedInvitation,
  getSavedInvitations,
} from "@/lib/saved-invitations/storage";
import { getAllTemplates, getTemplateById } from "@/lib/templates";

export function SavedInvitationsPage() {
  const { savedInvitations, brand } = content;
  const [invitations, setInvitations] = useState<SavedInvitation[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadInvitations = useCallback(() => {
    setInvitations(getSavedInvitations());
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    loadInvitations();
  }, [loadInvitations]);

  const handleDelete = (id: string) => {
    if (!window.confirm(savedInvitations.confirmDelete)) return;
    deleteSavedInvitation(id);
    loadInvitations();
  };

  const firstTemplate = getAllTemplates()[0];

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/72 shadow-[0_14px_55px_-42px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        <Container className="flex h-14 items-center justify-between gap-3 sm:h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            <span
              aria-hidden
              className="gradient-accent-br flex h-8 w-8 items-center justify-center rounded-lg text-xs text-background"
            >
              ✦
            </span>
            {brand}
          </Link>
          <ButtonLink href="/#templates" size="sm">
            {savedInvitations.createNew}
          </ButtonLink>
        </Container>
      </header>

      <Container className="py-8 sm:py-12 lg:py-16">
        <section className="relative overflow-hidden rounded-[2rem] border border-border bg-white/[0.035] px-5 py-8 text-start shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm sm:px-8 sm:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(167,139,250,0.16),transparent_40%)]"
          />
          <div className="relative max-w-2xl">
            <p className="eyebrow-label text-accent-via">
              {savedInvitations.eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {savedInvitations.pageTitle}
            </h1>
            <p className="text-hebrew-body mt-4 text-sm text-muted sm:text-base">
              {savedInvitations.description}
            </p>
          </div>
        </section>

        {!hasLoaded ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-3xl border border-border bg-white/[0.035]"
              />
            ))}
          </div>
        ) : invitations.length > 0 ? (
          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            {invitations.map((invitation) => {
              const template = getTemplateById(invitation.templateId);
              if (!template) return null;

              return (
                <SavedInvitationCard
                  key={invitation.id}
                  invitation={invitation}
                  template={template}
                  onDelete={handleDelete}
                />
              );
            })}
          </section>
        ) : (
          <section className="glass-panel mx-auto mt-8 max-w-xl rounded-3xl px-6 py-12 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/60 text-xl">
              ✦
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              {savedInvitations.emptyTitle}
            </h2>
            <p className="text-hebrew-body mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">
              {savedInvitations.emptyDescription}
            </p>
            <ButtonLink
              href={firstTemplate ? `/#templates` : "/"}
              size="lg"
              className="mt-8 w-full sm:w-auto"
            >
              {savedInvitations.createNew}
            </ButtonLink>
          </section>
        )}
      </Container>
    </main>
  );
}
