"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/lib/builder/context";
import {
  processImageFile,
  type ImageUploadError,
} from "@/lib/builder/image-utils";
import { content } from "@/lib/content/he";

export function ImageUpload() {
  const { uploadedImage, setUploadedImage } = useBuilder();
  const { imageUpload: copy } = content.builder;
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<ImageUploadError | null>(null);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;

      setError(null);
      setIsProcessing(true);
      const result = await processImageFile(file);

      if ("error" in result) {
        setError(result.error);
        setIsProcessing(false);
        return;
      }

      setUploadedImage(result.dataUrl);
      setIsProcessing(false);
    },
    [setUploadedImage],
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      void handleFile(file);
      e.target.value = "";
    },
    [handleFile],
  );

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      void handleFile(file);
    },
    [handleFile],
  );

  const openFilePicker = () => inputRef.current?.click();

  const removeImage = () => {
    setError(null);
    setUploadedImage(null);
  };

  return (
    <div className="builder-field space-y-2.5" style={{ animationDelay: "0ms" }}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-foreground/90"
      >
        {copy.label}
      </label>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={onInputChange}
      />

      {uploadedImage ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-sm">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={uploadedImage}
              alt=""
              className="h-full w-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col gap-2 p-3 sm:flex-row sm:p-4">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={openFilePicker}
            >
              {copy.replace}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex-1 text-muted hover:text-foreground"
              onClick={removeImage}
            >
              {copy.remove}
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openFilePicker}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`group relative flex min-h-[150px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed px-4 py-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] transition-all duration-300 sm:min-h-[170px] ${
            isDragging
              ? "scale-[1.01] border-accent-from bg-accent-from/10"
              : "border-border bg-white/[0.04] hover:border-accent-from/40 hover:bg-white/[0.07]"
          }`}
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.13),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100" />
          <span
            aria-hidden
            className={`relative flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
              isDragging
                ? "border-accent-from/50 bg-accent-from/20 text-accent-via"
                : "border-border bg-surface-elevated text-muted group-hover:-translate-y-0.5 group-hover:border-accent-from/30 group-hover:text-accent-via"
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </span>
          <span className="relative block">
            <span className="text-sm font-medium text-foreground">
              {isProcessing
                ? "מעבד תמונה..."
                : isDragging
                  ? copy.dropActive
                  : copy.hint}
            </span>
            <span className="mt-1 block text-xs text-muted">{copy.formats}</span>
          </span>
          <span className="gradient-accent-bg relative rounded-full px-4 py-2 text-xs font-semibold text-background shadow-[0_12px_35px_-18px_rgba(167,139,250,0.9)] sm:text-sm">
            {copy.browse}
          </span>
        </button>
      )}

      {error && (
        <p className="text-xs text-rose-400 sm:text-sm" role="alert">
          {copy.errors[error]}
        </p>
      )}
    </div>
  );
}
