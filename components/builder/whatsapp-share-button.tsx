"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/lib/builder/context";
import {
  buildWhatsAppInvitationMessage,
  getWhatsAppShareUrl,
} from "@/lib/builder/whatsapp-share";
import { content } from "@/lib/content/he";

type WhatsAppShareButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export function WhatsAppShareButton({
  className = "",
  size = "md",
  fullWidth = false,
}: WhatsAppShareButtonProps) {
  const { formData } = useBuilder();
  const { builder } = content;
  const [isOpening, setIsOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = useCallback(() => {
    setError(null);
    setIsOpening(true);

    try {
      const message = buildWhatsAppInvitationMessage(
        formData,
        builder.shareMessage,
      );
      const shareUrl = getWhatsAppShareUrl(message);
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    } catch {
      setError(builder.shareError);
    } finally {
      window.setTimeout(() => setIsOpening(false), 450);
    }
  }, [builder.shareError, builder.shareMessage, formData]);

  return (
    <div
      className={
        fullWidth ? `min-w-0 flex-1 ${className}`.trim() : className || undefined
      }
    >
      <Button
        type="button"
        variant="whatsapp"
        size={size}
        className={fullWidth ? "w-full" : undefined}
        disabled={isOpening}
        onClick={handleShare}
        aria-busy={isOpening}
      >
        <span aria-hidden className="text-base leading-none">
          ◉
        </span>
        {isOpening ? builder.shareOpening : builder.shareWhatsApp}
      </Button>
      {error && (
        <p className="mt-2 text-center text-xs text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
