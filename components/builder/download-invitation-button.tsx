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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"locked" | "ready">("locked");
  const [error, setError] = useState<string | null>(null);

  const runExport = useCallback(async () => {
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
      setIsModalOpen(false);
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
        onClick={() => {
          setError(null);
          setPaymentStep("locked");
          setIsModalOpen(true);
        }}
        aria-busy={isExporting}
      >
        {isExporting ? builder.exporting : builder.downloadInvitation}
      </Button>
      {error && (
        <p className="mt-2 text-center text-xs text-rose-400 sm:text-sm" role="alert">
          {error}
        </p>
      )}
      {isModalOpen && (
        <PremiumExportModal
          isExporting={isExporting}
          paymentStep={paymentStep}
          onClose={() => setIsModalOpen(false)}
          onContinue={() => setPaymentStep("ready")}
          onExportDraft={() => void runExport()}
        />
      )}
    </div>
  );
}

function PremiumExportModal({
  isExporting,
  paymentStep,
  onClose,
  onContinue,
  onExportDraft,
}: {
  isExporting: boolean;
  paymentStep: "locked" | "ready";
  onClose: () => void;
  onContinue: () => void;
  onExportDraft: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0">
      <div className="glass-panel w-full max-w-md rounded-[2rem] p-5 text-start shadow-[0_30px_120px_-50px_rgba(0,0,0,0.95)] sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow-label text-accent-via">Premium Export</p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground">
              ייצוא נקי ללא סימן מים
            </h2>
            <p className="text-hebrew-body mt-2 text-sm text-muted">
              התשלום יחובר בהמשך. כרגע אפשר לבדוק את זרימת הפרימיום ולהוריד
              טיוטה עם סימן מים.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.04] text-muted transition-colors hover:text-foreground"
            aria-label="סגירת חלון"
          >
            ×
          </button>
        </div>

        <div className="rounded-3xl border border-gold/25 bg-gold/10 p-4">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-semibold text-foreground">Premium Export</p>
            <p className="text-2xl font-bold text-gold">₪19</p>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>• PNG באיכות גבוהה</li>
            <li>• הסרת סימן מים</li>
            <li>• מוכן לשיתוף ולהדפסה</li>
          </ul>
        </div>

        {paymentStep === "ready" && (
          <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200">
            מקום שמור לאינטגרציית תשלום. בשלב הבא נחבר Stripe / Meshulam /
            PayPal.
          </p>
        )}

        <div className="mt-5 grid gap-3">
          <Button
            type="button"
            onClick={onContinue}
            className="w-full"
            disabled={paymentStep === "ready"}
          >
            המשך לתשלום
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={isExporting}
            onClick={onExportDraft}
          >
            {isExporting ? "מוריד טיוטה..." : "הורדת טיוטה עם סימן מים"}
          </Button>
        </div>
      </div>
    </div>
  );
}
