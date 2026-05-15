"use client";

import { BuilderHeader } from "@/components/builder/builder-header";
import { BuilderLayout } from "@/components/builder/builder-layout";
import { BuilderProvider } from "@/lib/builder/context";
import type { InvitationTemplate } from "@/lib/templates/types";

type BuilderShellProps = {
  template: InvitationTemplate;
};

export function BuilderShell({ template }: BuilderShellProps) {
  return (
    <BuilderProvider key={template.id} template={template}>
      <div className="flex min-h-screen flex-col bg-background">
        <BuilderHeader template={template} />
        <main className="flex-1">
          <BuilderLayout />
        </main>
      </div>
    </BuilderProvider>
  );
}
