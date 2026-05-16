"use client";

import { BuilderForm } from "@/components/builder/builder-form";
import { DownloadInvitationButton } from "@/components/builder/download-invitation-button";
import { LivePreview } from "@/components/builder/live-preview";
import { Container } from "@/components/ui/container";
import { useBuilder } from "@/lib/builder/context";
import { content } from "@/lib/content/he";

export function BuilderLayout() {
  const { builder, gallery } = content;
  const { template } = useBuilder();
  const categoryLabel = gallery.categoryLabels[template.category];

  return (
    <Container className="py-5 sm:py-8 lg:py-10">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-10 xl:gap-14">
        {/* Preview — visual right in RTL (column 1) */}
        <aside className="order-2 lg:order-none lg:col-start-1 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <div className="mb-4 rounded-2xl border border-border bg-white/[0.035] p-4 text-center backdrop-blur-sm lg:mb-5 lg:text-start">
              <p className="eyebrow-label text-accent-via">
                {builder.livePreview}
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {template.name}
              </p>
              <p className="mt-0.5 text-xs text-muted sm:text-sm">
                {categoryLabel} · {builder.previewHint}
              </p>
            </div>
            <LivePreview />
            <div className="mt-5 lg:hidden">
              <DownloadInvitationButton fullWidth size="lg" />
            </div>
          </div>
        </aside>

        {/* Form — visual left in RTL (column 2) */}
        <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1">
          <div className="glass-panel rounded-3xl p-4 sm:p-6 lg:p-8">
            <BuilderForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
