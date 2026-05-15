"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/lib/builder/context";
import {
  buildInvitationFilename,
  exportInvitationToPng,
} from "@/lib/builder/export-png";
import { content } from "@/lib/content/he";

type DownloadInvitationButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

export function DownloadInvitationButton({
  className = "",
  size = "md",
  variant = "primary",
  fullWidth = false,
}: DownloadInvitationButtonProps) {
  const { exportRef, template, formData } = useBuilder();
  const { builder } = content;
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    const node = exportRef.current;
    if (!node) {
      setError(builder.exportError);
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      const filename = buildInvitationFilename(
        template.name,
        formData.celebrantNames,
      );
      await exportInvitationToPng(node, { filename });
    } catch {
      setError(builder.exportError);
    } finally {
      setIsExporting(false);
    }
  }, [exportRef, template.name, formData.celebrantNames, builder.exportError]);

  return (
    <div
      className={
        fullWidth ? `min-w-0 flex-1 ${className}`.trim() : className || undefined
      }
    >
      <Button
        type="button"
        variant={variant}
        size={size}
        className={fullWidth ? "w-full" : undefined}
        disabled={isExporting}
        onClick={() => void handleDownload()}
        aria-busy={isExporting}
      >
        {isExporting ? builder.exporting : builder.downloadInvitation}
      </Button>
      {error && (
        <p className="mt-2 text-center text-xs text-rose-400 sm:text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
