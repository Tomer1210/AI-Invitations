"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { useBuilder } from "@/lib/builder/context";
import type { EditorBlock } from "@/lib/builder/types";
import { getBlockText, getDetailsText } from "@/lib/editor/defaults";

const aspectRatioClass = {
  portrait: "aspect-[3/4]",
  story: "aspect-[9/16]",
  square: "aspect-square",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function InvitationEditorCanvas() {
  const {
    template,
    formData,
    uploadedImage,
    editorState,
    selectedBlockId,
    exportRef,
    selectBlock,
    updateBlock,
    updateField,
  } = useBuilder();
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const startDrag = (
    e: ReactPointerEvent,
    block: EditorBlock,
    mode: "move" | "resize",
  ) => {
    e.preventDefault();
    e.stopPropagation();
    selectBlock(block.id);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const initial = { ...block };

    const move = (event: PointerEvent) => {
      const dx = ((event.clientX - startX) / rect.width) * 100;
      const dy = ((event.clientY - startY) / rect.height) * 100;

      if (mode === "move") {
        updateBlock(block.id, {
          x: clamp(initial.x + dx, 0, 100 - initial.width),
          y: clamp(initial.y + dy, 0, 100 - initial.height),
        });
        return;
      }

      updateBlock(block.id, {
        width: clamp(initial.width + dx, 18, 100 - initial.x),
        height: clamp(initial.height + dy, 8, 100 - initial.y),
      });
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const updateEditableText = (block: EditorBlock, value: string) => {
    updateBlock(block.id, { content: value });
    if (block.field) {
      updateField(block.field, value);
    }
  };

  return (
    <div className="builder-scale-in">
      <div className="relative mx-auto w-full max-w-[23rem] sm:max-w-md">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-accent-from/25 via-accent-to/10 to-transparent opacity-75 blur-2xl"
        />
        <div className="premium-card relative overflow-hidden rounded-[1.65rem] p-2.5 shadow-[0_35px_100px_-48px_rgba(0,0,0,0.95)]">
          <div
            ref={exportRef}
            dir="rtl"
            lang="he"
            data-invitation-export
            className="w-full overflow-hidden rounded-[1.15rem]"
          >
            <div
              ref={canvasRef}
              className={`relative w-full overflow-hidden rounded-[1.15rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-80px_130px_rgba(0,0,0,0.22)] ${aspectRatioClass[editorState.settings.aspectRatio]}`}
              style={{ background: editorState.settings.background }}
              onPointerDown={() => selectBlock(null)}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-black transition-opacity"
                style={{ opacity: editorState.settings.overlayOpacity }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,rgba(0,0,0,0.18))]"
              />
              <TemplateDecor collection={template.collection} />

              {editorState.blocks.map((block) => (
                <EditableBlock
                  key={block.id}
                  block={block}
                  selected={selectedBlockId === block.id}
                  text={
                    block.kind === "details"
                      ? block.content || getDetailsText(formData)
                      : getBlockText(block, formData)
                  }
                  imageUrl={uploadedImage}
                  spacing={editorState.settings.sectionSpacing}
                  onSelect={() => selectBlock(block.id)}
                  onDragStart={(e) => startDrag(e, block, "move")}
                  onResizeStart={(e) => startDrag(e, block, "resize")}
                  onTextChange={(value) => updateEditableText(block, value)}
                />
              ))}

              {editorState.settings.watermarkEnabled && (
                <div className="pointer-events-none absolute bottom-2 left-3 z-20 rounded-full bg-black/25 px-2 py-1 text-[9px] text-white/35 backdrop-blur-sm">
                  InviteAI
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type EditableBlockProps = {
  block: EditorBlock;
  selected: boolean;
  text: string;
  imageUrl: string | null;
  spacing: number;
  onSelect: () => void;
  onDragStart: (e: ReactPointerEvent) => void;
  onResizeStart: (e: ReactPointerEvent) => void;
  onTextChange: (value: string) => void;
};

function EditableBlock({
  block,
  selected,
  text,
  imageUrl,
  spacing,
  onSelect,
  onDragStart,
  onResizeStart,
  onTextChange,
}: EditableBlockProps) {
  return (
    <div
      className={`group absolute z-10 rounded-xl transition-shadow duration-200 ${
        selected
          ? "ring-2 ring-accent-via/80 shadow-[0_0_0_4px_rgba(167,139,250,0.16)]"
          : "hover:ring-1 hover:ring-white/25"
      }`}
      style={{
        left: `${block.x}%`,
        top: `${block.y}%`,
        width: `${block.width}%`,
        height: `${block.height}%`,
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <button
        type="button"
        aria-label="גרירת בלוק"
        className={`absolute -top-3 -right-3 z-30 flex h-7 w-7 touch-none items-center justify-center rounded-full border border-white/20 bg-black/55 text-xs text-white/80 shadow-lg backdrop-blur transition-opacity md:opacity-0 md:group-hover:opacity-100 ${
          selected ? "md:opacity-100" : ""
        }`}
        onPointerDown={onDragStart}
      >
        ⋮⋮
      </button>

      {block.kind === "image" ? (
        <div className="h-full w-full overflow-hidden rounded-xl border border-white/15 bg-black/18 shadow-[0_20px_55px_-34px_rgba(0,0,0,0.95)] backdrop-blur-sm">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-white/55">
              העלו תמונה כדי למקם אותה כאן
            </div>
          )}
          <button
            type="button"
            aria-label="שינוי גודל תמונה"
            className="absolute -bottom-2 -left-2 z-30 h-6 w-6 touch-none rounded-full border border-white/25 bg-white/80 text-[10px] text-background shadow-lg"
            onPointerDown={onResizeStart}
          >
            ↙
          </button>
        </div>
      ) : (
        <div
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          tabIndex={0}
          className="h-full w-full overflow-hidden rounded-xl px-2 py-1 outline-none transition-colors focus:bg-white/5"
          style={{
            color: block.color,
            fontFamily: block.fontFamily,
            fontSize: `${block.fontSize}px`,
            fontWeight: block.weight,
            textAlign: block.align,
            letterSpacing: `${block.letterSpacing ?? 0}em`,
            lineHeight: block.kind === "details" ? 1.65 : 1.22,
            paddingBlock: `${Math.max(spacing / 8, 2)}px`,
          }}
          onInput={(e) => onTextChange(e.currentTarget.innerText)}
        >
          {text || "הקלידו טקסט"}
        </div>
      )}
    </div>
  );
}

function TemplateDecor({ collection }: { collection: string }) {
  if (collection.includes("Cinematic")) {
    return (
      <>
        <div className="pointer-events-none absolute inset-x-8 top-8 h-px bg-gradient-to-l from-transparent via-amber-200/50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-10 right-8 w-px bg-gradient-to-b from-transparent via-amber-200/35 to-transparent" />
      </>
    );
  }

  if (collection.includes("Floral")) {
    return (
      <>
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-rose-100/20" />
        <div className="pointer-events-none absolute -bottom-8 left-4 h-28 w-28 rotate-45 border border-pink-100/15" />
      </>
    );
  }

  if (collection.includes("Corporate")) {
    return (
      <>
        <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 bg-sky-300/10 [clip-path:polygon(0_0,100%_0,0_100%)]" />
        <div className="pointer-events-none absolute bottom-8 right-8 h-20 w-20 border border-sky-200/15" />
      </>
    );
  }

  if (collection.includes("Japanese")) {
    return (
      <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 rounded-full bg-red-500/18" />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.13),transparent_36%),radial-gradient(circle_at_78%_75%,rgba(255,255,255,0.1),transparent_34%)]" />
  );
}
