"use client";

import { useMemo } from "react";
import { useBuilder } from "@/lib/builder/context";
import {
  backgroundOptions,
  fontOptions,
} from "@/lib/editor/defaults";

const colorOptions = [
  "#ffffff",
  "#fde68a",
  "#18181b",
  "#fce7f3",
  "#67e8f9",
  "#bfdbfe",
  "#f5f5f4",
];

export function EditorControls() {
  const {
    editorState,
    selectedBlockId,
    updateEditorSettings,
    updateSelectedBlock,
  } = useBuilder();

  const selectedBlock = useMemo(
    () =>
      editorState.blocks.find((block) => block.id === selectedBlockId) ??
      editorState.blocks[0],
    [editorState.blocks, selectedBlockId],
  );

  return (
    <section className="builder-field space-y-4 rounded-3xl border border-border bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-sm">
      <div>
        <p className="eyebrow-label text-accent-via">סטודיו עיצוב</p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">
          התאמה ויזואלית מהירה
        </h3>
        <p className="text-hebrew-body mt-1 text-xs text-muted">
          בחרו בלוק בהזמנה, גררו אותו על הקנבס ועדכנו צבע, גודל וסגנון.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ControlSelect
          label="גופן"
          value={selectedBlock?.fontFamily ?? editorState.settings.fontFamily}
          onChange={(value) => updateSelectedBlock({ fontFamily: value })}
          options={fontOptions}
        />

        <ControlSelect
          label="יחס הזמנה"
          value={editorState.settings.aspectRatio}
          onChange={(value) =>
            updateEditorSettings({
              aspectRatio: value as typeof editorState.settings.aspectRatio,
            })
          }
          options={[
            { label: "קלאסי 3:4", value: "portrait" },
            { label: "סטורי 9:16", value: "story" },
            { label: "מרובע 1:1", value: "square" },
          ]}
        />

        <ControlSelect
          label="רקע"
          value={editorState.settings.background}
          onChange={(value) => {
            const option = backgroundOptions.find((item) => item.value === value);
            updateEditorSettings({
              background: value,
              backgroundLabel: option?.label ?? "רקע מותאם",
            });
          }}
          options={backgroundOptions}
        />

        <ControlSelect
          label="יישור טקסט"
          value={selectedBlock?.align ?? "center"}
          onChange={(value) =>
            updateSelectedBlock({ align: value as "right" | "center" | "left" })
          }
          options={[
            { label: "ימין", value: "right" },
            { label: "מרכז", value: "center" },
            { label: "שמאל", value: "left" },
          ]}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <RangeControl
          label="גודל טקסט"
          value={selectedBlock?.fontSize ?? 16}
          min={9}
          max={44}
          onChange={(value) => updateSelectedBlock({ fontSize: value })}
        />
        <RangeControl
          label="אטימות שכבת רקע"
          value={Math.round(editorState.settings.overlayOpacity * 100)}
          min={0}
          max={65}
          onChange={(value) =>
            updateEditorSettings({ overlayOpacity: value / 100 })
          }
        />
        <RangeControl
          label="מרווח פנימי"
          value={editorState.settings.sectionSpacing}
          min={4}
          max={36}
          onChange={(value) => updateEditorSettings({ sectionSpacing: value })}
        />
        <div>
          <p className="mb-2 text-xs font-medium text-muted">צבע טקסט</p>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`צבע ${color}`}
                className="h-9 w-9 rounded-full border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
                onClick={() => updateSelectedBlock({ color })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Option = {
  label: string;
  value: string;
};

function ControlSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-medium text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="premium-focus w-full rounded-2xl border border-border bg-white/[0.045] px-3 py-3 text-sm text-foreground backdrop-blur-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="flex items-center justify-between text-xs font-medium text-muted">
        {label}
        <span>{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent-via"
      />
    </label>
  );
}
