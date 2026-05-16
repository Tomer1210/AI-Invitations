"use client";

import { BuilderHeader } from "@/components/builder/builder-header";
import { BuilderLayout } from "@/components/builder/builder-layout";
import { BuilderProvider } from "@/lib/builder/context";
import type { InvitationTemplate } from "@/lib/templates/types";

type BuilderShellProps = {
  template: InvitationTemplate;
  initialSavedInvitationId?: string | null;
};

export function BuilderShell({
  template,
  initialSavedInvitationId = null,
}: BuilderShellProps) {
  return (
    <BuilderProvider
      key={`${template.id}-${initialSavedInvitationId ?? "new"}`}
      template={template}
      initialSavedInvitationId={initialSavedInvitationId}
    >
      <div className="flex min-h-screen flex-col bg-background">
        <BuilderHeader template={template} />
        <main className="flex-1">
          <BuilderLayout />
        </main>
      </div>
    </BuilderProvider>
  );
}
