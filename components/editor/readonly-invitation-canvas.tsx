import type {
  EditorBlock,
  EditorState,
  InvitationFormData,
} from "@/lib/builder/types";
import { getBlockText, getDetailsText } from "@/lib/editor/defaults";
import type { InvitationTemplate } from "@/lib/templates/types";

const aspectRatioClass = {
  portrait: "aspect-[3/4]",
  story: "aspect-[9/16]",
  square: "aspect-square",
};

type ReadonlyInvitationCanvasProps = {
  template: InvitationTemplate;
  formData: InvitationFormData;
  uploadedImage: string | null;
  editorState?: EditorState;
  className?: string;
};

export function ReadonlyInvitationCanvas({
  template,
  formData,
  uploadedImage,
  editorState = template.editorPreset,
  className = "",
}: ReadonlyInvitationCanvasProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[1.15rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-80px_130px_rgba(0,0,0,0.22)] ${aspectRatioClass[editorState.settings.aspectRatio]} ${className}`}
      style={{ background: editorState.settings.background }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black"
        style={{ opacity: editorState.settings.overlayOpacity }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,rgba(0,0,0,0.18))]" />

      {editorState.blocks.map((block) => (
        <ReadonlyBlock
          key={block.id}
          block={block}
          text={
            block.kind === "details"
              ? block.content || getDetailsText(formData)
              : getBlockText(block, formData)
          }
          uploadedImage={uploadedImage}
          spacing={editorState.settings.sectionSpacing}
        />
      ))}
    </div>
  );
}

function ReadonlyBlock({
  block,
  text,
  uploadedImage,
  spacing,
}: {
  block: EditorBlock;
  text: string;
  uploadedImage: string | null;
  spacing: number;
}) {
  return (
    <div
      className="absolute z-10 overflow-hidden rounded-xl"
      style={{
        left: `${block.x}%`,
        top: `${block.y}%`,
        width: `${block.width}%`,
        height: `${block.height}%`,
      }}
    >
      {block.kind === "image" ? (
        <div className="h-full w-full overflow-hidden rounded-xl border border-white/15 bg-black/18">
          {uploadedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={uploadedImage} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>
      ) : (
        <div
          className="h-full w-full overflow-hidden px-2 py-1"
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
        >
          {text}
        </div>
      )}
    </div>
  );
}
