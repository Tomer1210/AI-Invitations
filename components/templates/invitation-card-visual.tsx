import type { TemplatePreviewStyle } from "@/lib/templates/types";

export type InvitationCardContent = {
  title: string;
  subtitle: string;
  imageUrl?: string | null;
  date?: string;
  time?: string;
  location?: string;
  phone?: string;
  description?: string;
  dateLabel?: string;
  timeLabel?: string;
  locationLabel?: string;
  phoneLabel?: string;
};

type InvitationCardVisualProps = {
  preview: TemplatePreviewStyle;
  content: InvitationCardContent;
  className?: string;
  "aria-hidden"?: boolean;
};

export function InvitationCardVisual({
  preview,
  content,
  className = "",
  "aria-hidden": ariaHidden,
}: InvitationCardVisualProps) {
  const hasDetails =
    content.date || content.time || content.location || content.phone;

  return (
    <div
      aria-hidden={ariaHidden}
      className={`relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-[1.15rem] bg-gradient-to-br p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-80px_130px_rgba(0,0,0,0.22)] sm:p-6 ${preview.gradient} ${className}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${preview.overlay}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,rgba(0,0,0,0.18))]" />

      <Ornament type={preview.ornament} />

      {content.imageUrl && (
        <div className="relative z-10 mb-3 w-full shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.95)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.imageUrl}
            alt=""
            className="aspect-[4/3] w-full object-cover transition-all duration-300"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-3 h-px w-14 bg-gradient-to-l from-transparent via-white/35 to-transparent" />
        <p
          className={`text-balance text-xl font-semibold leading-tight drop-shadow-sm transition-all duration-300 sm:text-2xl ${preview.accent}`}
        >
          {content.title || "—"}
        </p>
        <p className="text-hebrew-body mt-2 max-w-[90%] text-balance text-xs leading-relaxed text-white/66 transition-all duration-300 sm:text-sm">
          {content.subtitle || "—"}
        </p>
        {content.description && (
          <p className="mt-3 max-w-[90%] text-balance text-[10px] leading-relaxed text-white/48 sm:text-xs">
            {content.description}
          </p>
        )}
        <div className="mb-3 mt-4 h-px w-14 bg-gradient-to-l from-transparent via-white/30 to-transparent" />
      </div>

      {hasDetails && (
        <div className="relative z-10 rounded-2xl border border-white/10 bg-black/12 px-3 py-2.5 text-center text-[10px] leading-relaxed text-white/58 backdrop-blur-sm sm:text-xs">
          {content.date && (
            <p>
              <span className="text-white/35">{content.dateLabel}: </span>
              {content.date}
            </p>
          )}
          {content.time && (
            <p>
              <span className="text-white/35">{content.timeLabel}: </span>
              {content.time}
            </p>
          )}
          {content.location && (
            <p>
              <span className="text-white/35">{content.locationLabel}: </span>
              {content.location}
            </p>
          )}
          {content.phone && (
            <p dir="ltr" className="text-white/55">
              <span className="text-white/35">{content.phoneLabel}: </span>
              {content.phone}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Ornament({ type }: { type: TemplatePreviewStyle["ornament"] }) {
  switch (type) {
    case "floral":
      return (
        <>
          <div className="pointer-events-none absolute -end-6 -top-6 h-24 w-24 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -start-4 top-1/3 h-16 w-16 rotate-45 border border-rose-200/15" />
        </>
      );
    case "confetti":
      return (
        <>
          <div className="pointer-events-none absolute start-4 top-6 h-2 w-2 rotate-12 rounded-sm bg-amber-300/50" />
          <div className="pointer-events-none absolute end-8 top-12 h-1.5 w-1.5 rounded-full bg-pink-400/60" />
          <div className="pointer-events-none absolute bottom-20 start-8 h-2 w-2 rounded-full bg-cyan-300/40" />
        </>
      );
    case "torah":
      return (
        <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center">
          <div className="h-8 w-8 rounded border border-sky-200/20 bg-sky-400/5" />
        </div>
      );
    case "celebration":
      return (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.12),transparent_50%)]" />
      );
    case "elegant":
      return (
        <>
          <div className="pointer-events-none absolute inset-x-6 top-5 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />
          <div className="pointer-events-none absolute inset-x-6 bottom-14 h-px bg-gradient-to-l from-transparent via-white/15 to-transparent" />
        </>
      );
    case "minimal":
    default:
      return (
        <div className="pointer-events-none absolute end-4 top-4 h-8 w-px bg-white/15" />
      );
  }
}
