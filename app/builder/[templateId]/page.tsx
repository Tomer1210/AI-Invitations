import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BuilderShell } from "@/components/builder/builder-shell";
import { content } from "@/lib/content/he";
import { resolveTemplateFromParam } from "@/lib/templates/routes";

type BuilderPageProps = {
  params: Promise<{ templateId: string }>;
  searchParams: Promise<{ invitationId?: string }>;
};

export async function generateMetadata({
  params,
}: BuilderPageProps): Promise<Metadata> {
  const { templateId } = await params;
  const template = resolveTemplateFromParam(templateId);

  if (!template) {
    return { title: content.brand };
  }

  return {
    title: `${content.builder.pageTitle} — ${template.name} | ${content.brand}`,
  };
}

export default async function BuilderPage({
  params,
  searchParams,
}: BuilderPageProps) {
  const { templateId } = await params;
  const { invitationId } = await searchParams;
  const template = resolveTemplateFromParam(templateId);

  if (!template) {
    notFound();
  }

  return (
    <BuilderShell
      template={template}
      initialSavedInvitationId={invitationId ?? null}
    />
  );
}
