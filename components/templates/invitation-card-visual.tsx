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
  return (
    <div
      aria-hidden={ariaHidden}
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-[1.15rem] bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-80px_130px_rgba(0,0,0,0.18)] ${preview.gradient} ${className}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${preview.overlay}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_90%_88%,rgba(0,0,0,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(120deg,rgba(255,255,255,.22)_0_1px,transparent_1px_12px)]" />

      <SceneComposition preview={preview} content={content} />
    </div>
  );
}

function SceneComposition({
  preview,
  content,
}: {
  preview: TemplatePreviewStyle;
  content: InvitationCardContent;
}) {
  if (preview.scene === "neon") {
    return <NeonScene preview={preview} content={content} />;
  }

  if (preview.scene === "corporate") {
    return <CorporateScene preview={preview} content={content} />;
  }

  if (preview.scene === "ceremony") {
    return <CeremonyScene preview={preview} content={content} />;
  }

  if (preview.scene === "floral") {
    return <FloralScene preview={preview} content={content} />;
  }

  if (preview.scene === "silk") {
    return <SoftBabyScene preview={preview} content={content} />;
  }

  return <StationeryScene preview={preview} content={content} />;
}

function StationeryScene({
  preview,
  content,
}: {
  preview: TemplatePreviewStyle;
  content: InvitationCardContent;
}) {
  const isDark = preview.paper === "black-gold";
  const cardTone = isDark ? "bg-stone-950 text-amber-100" : "bg-[#fbf7ed] text-stone-800";
  const ink = isDark ? "text-amber-200" : "text-stone-800";
  const muted = isDark ? "text-amber-100/60" : "text-stone-500";

  return (
    <>
      <SilkSurface dark={isDark} />
      <Envelope className="-right-8 top-6 h-28 w-40 rotate-[-12deg]" dark={isDark} />
      <Envelope className="-left-10 bottom-12 h-24 w-36 rotate-[13deg]" dark={isDark} />
      {preview.ornament === "ribbon" && <Ribbon tone="champagne" />}
      {preview.ornament === "wax" && <Ribbon tone="black" />}
      <Pearls className="left-4 top-8" />
      <Pearls className="bottom-6 right-7 rotate-45" />

      {preview.layout === "editorial" && (
        <>
          <PhotoPrint className="left-5 top-9 h-24 w-16 rotate-[-9deg]" />
          <PhotoPrint className="bottom-8 left-12 h-20 w-14 rotate-[7deg]" />
        </>
      )}

      <div
        className={`absolute shadow-[0_26px_60px_-30px_rgba(0,0,0,0.8)] ${
          preview.layout === "asymmetric"
            ? "right-5 top-20 h-44 w-32 rotate-[2deg]"
            : preview.layout === "editorial"
              ? "right-7 bottom-7 h-44 w-32 rotate-[4deg]"
              : preview.layout === "square"
                ? "left-8 top-24 h-36 w-36"
                : "left-1/2 top-20 h-44 w-32 -translate-x-1/2"
        } ${cardTone}`}
      >
        <PaperTexture />
        <div className="absolute inset-2 border border-current/10" />
        {preview.ornament === "wax" && <WaxSeal className="-left-4 top-7" />}
        {preview.ornament === "pearls" && <EmbossedMonogram value={initials(content.title)} />}
        <Typography
          title={content.title}
          subtitle={content.subtitle}
          layout={preview.layout}
          inkClass={ink}
          mutedClass={muted}
        />
      </div>

      {preview.layout === "asymmetric" && (
        <SmallNote
          className="left-6 top-14 rotate-[-8deg]"
          title={initials(content.title)}
          subtitle="monogram"
          dark={isDark}
        />
      )}
    </>
  );
}

function FloralScene({
  preview,
  content,
}: {
  preview: TemplatePreviewStyle;
  content: InvitationCardContent;
}) {
  return (
    <>
      <SilkSurface />
      <Envelope className="-right-8 top-3 h-28 w-40 rotate-[-9deg]" />
      <FlowerCluster className="-right-2 bottom-2 scale-110" />
      <FlowerCluster className="-left-6 top-7 rotate-180 scale-75" />
      <Pearls className="bottom-7 left-8 -rotate-12" />

      <div
        className={`absolute bg-[#fffaf2] text-stone-700 shadow-[0_28px_65px_-34px_rgba(80,55,42,0.85)] ${
          preview.layout === "centered"
            ? "left-1/2 top-16 h-48 w-36 -translate-x-1/2"
            : "right-7 top-20 h-44 w-32 rotate-[3deg]"
        }`}
      >
        <PaperTexture />
        <div className="absolute inset-3 rounded-sm border border-amber-700/20" />
        <div className="absolute left-4 top-4 h-10 w-10 rounded-full border border-rose-200/60" />
        <div className="absolute bottom-5 right-4 h-10 w-10 rounded-full border border-rose-200/60" />
        <Typography
          title={content.title}
          subtitle={content.subtitle}
          layout={preview.layout === "centered" ? "centered" : "asymmetric"}
          inkClass="text-stone-700"
          mutedClass="text-stone-500"
        />
      </div>

      <SmallNote
        className="bottom-7 left-8 rotate-[-5deg]"
        title={initials(content.title)}
        subtitle="save"
      />
    </>
  );
}

function CeremonyScene({
  preview,
  content,
}: {
  preview: TemplatePreviewStyle;
  content: InvitationCardContent;
}) {
  const isBar = preview.ornament === "torah";

  return (
    <>
      <SilkSurface />
      <Envelope className="-right-8 top-8 h-28 w-40 rotate-[-14deg]" />
      {isBar && <Tallit className="-left-6 bottom-2 rotate-[15deg]" />}
      <Pearls className="right-7 top-7 rotate-12" />

      <div className="absolute left-1/2 top-16 h-48 w-36 -translate-x-1/2 bg-[#fbf8ee] text-stone-700 shadow-[0_28px_65px_-34px_rgba(0,0,0,0.72)]">
        <PaperTexture />
        <div className="absolute inset-4 border border-stone-300/50" />
        <div className="absolute inset-x-8 top-8 h-px bg-amber-700/30" />
        {isBar ? (
          <div className="absolute inset-x-0 top-11 text-center text-xl text-amber-600/80">
            ✡
          </div>
        ) : (
          <EmbossedMonogram value={initials(content.title)} />
        )}
        <Typography
          title={content.title}
          subtitle={content.subtitle}
          layout={isBar ? "centered" : "editorial"}
          inkClass="text-stone-700"
          mutedClass="text-stone-500"
        />
      </div>

      <SmallNote
        className="bottom-8 right-6 rotate-[7deg]"
        title={isBar ? "BAR" : initials(content.title)}
        subtitle={isBar ? "MITZVAH" : "RSVP"}
      />
    </>
  );
}

function NeonScene({
  preview,
  content,
}: {
  preview: TemplatePreviewStyle;
  content: InvitationCardContent;
}) {
  const story = preview.layout === "story";

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(34,211,238,.35),transparent_34%),radial-gradient(circle_at_80%_78%,rgba(217,70,239,.4),transparent_38%)]" />
      <div className="absolute -left-10 top-12 h-40 w-40 rounded-full border border-cyan-300/20 blur-[1px]" />
      <div className="absolute right-5 top-7 h-20 w-20 rounded-full border border-fuchsia-300/25" />
      <div
        className={`absolute overflow-hidden rounded-[1.4rem] border border-white/15 bg-black/38 shadow-[0_30px_80px_-36px_rgba(217,70,239,0.9)] backdrop-blur-sm ${
          story ? "inset-x-9 top-8 h-60" : "left-6 top-16 h-48 w-36 rotate-[-4deg]"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.1),transparent_30%),radial-gradient(circle_at_50%_22%,rgba(34,211,238,.28),transparent_32%)]" />
        <div className="absolute left-1/2 top-8 h-28 w-24 -translate-x-1/2 rounded-3xl border border-white/10 bg-white/10" />
        <Typography
          title={content.title}
          subtitle={content.subtitle}
          layout={story ? "story" : "asymmetric"}
          inkClass="text-fuchsia-100"
          mutedClass="text-cyan-100/75"
        />
      </div>
      <div className="absolute bottom-8 right-6 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100">
        glow
      </div>
    </>
  );
}

function CorporateScene({
  content,
}: {
  preview: TemplatePreviewStyle;
  content: InvitationCardContent;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,.13),transparent_34%)]" />
      <div className="absolute left-4 top-5 h-24 w-36 rotate-[-8deg] rounded-md border border-sky-200/15 bg-white/8 shadow-xl" />
      <div className="absolute bottom-7 right-5 h-28 w-40 rotate-[5deg] rounded-md border border-sky-200/15 bg-slate-950/70 shadow-2xl" />
      <div className="absolute left-7 top-20 h-44 w-36 bg-slate-950/88 text-sky-50 shadow-[0_30px_80px_-38px_rgba(14,165,233,0.85)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,.2),transparent_36%)]" />
        <div className="absolute left-0 top-0 h-20 w-20 bg-sky-300/10 [clip-path:polygon(0_0,100%_0,0_100%)]" />
        <Typography
          title={content.title}
          subtitle={content.subtitle}
          layout="editorial"
          inkClass="text-sky-50"
          mutedClass="text-sky-200/70"
        />
      </div>
    </>
  );
}

function SoftBabyScene({
  content,
}: {
  preview: TemplatePreviewStyle;
  content: InvitationCardContent;
}) {
  return (
    <>
      <SilkSurface />
      <Pearls className="left-4 top-10 scale-110" />
      <Envelope className="-right-9 top-8 h-28 w-40 rotate-[-11deg]" />
      <div className="absolute left-1/2 top-20 h-40 w-32 -translate-x-1/2 rounded-t-full bg-[#fffdf6] text-slate-600 shadow-[0_28px_65px_-34px_rgba(0,0,0,0.62)]">
        <PaperTexture />
        <Typography
          title={content.title}
          subtitle={content.subtitle}
          layout="centered"
          inkClass="text-slate-600"
          mutedClass="text-slate-400"
        />
      </div>
      <SmallNote className="bottom-8 left-7 rotate-[-6deg]" title="NEW" subtitle="baby" />
    </>
  );
}

function Typography({
  title,
  subtitle,
  layout,
  inkClass,
  mutedClass,
}: {
  title: string;
  subtitle: string;
  layout: TemplatePreviewStyle["layout"];
  inkClass: string;
  mutedClass: string;
}) {
  if (layout === "asymmetric") {
    return (
      <div className="absolute inset-0 p-4 text-start">
        <p className={`max-w-[5.5rem] text-[9px] uppercase tracking-[0.34em] ${mutedClass}`}>
          invitation
        </p>
        <p className={`mt-8 font-serif text-2xl leading-none ${inkClass}`}>
          {title}
        </p>
        <p className={`mt-3 text-[10px] leading-relaxed ${mutedClass}`}>
          {subtitle}
        </p>
        <div className="absolute bottom-5 right-4 h-px w-14 bg-current/20" />
      </div>
    );
  }

  if (layout === "editorial") {
    return (
      <div className="absolute inset-0 p-4 text-start">
        <p className={`text-[8px] uppercase tracking-[0.38em] ${mutedClass}`}>
          save the date
        </p>
        <p className={`mt-7 font-serif text-3xl leading-[0.9] ${inkClass}`}>
          {title}
        </p>
        <p className={`absolute bottom-6 left-4 right-4 text-[10px] leading-relaxed ${mutedClass}`}>
          {subtitle}
        </p>
      </div>
    );
  }

  if (layout === "story") {
    return (
      <div className="absolute inset-x-4 bottom-8 text-center">
        <p className={`text-[10px] uppercase tracking-[0.3em] ${mutedClass}`}>
          tonight
        </p>
        <p className={`mt-2 text-3xl font-black leading-none ${inkClass}`}>
          {title}
        </p>
        <p className={`mt-3 text-xs font-medium ${mutedClass}`}>{subtitle}</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
      <p className={`text-[9px] uppercase tracking-[0.34em] ${mutedClass}`}>
        {subtitle}
      </p>
      <p className={`mt-4 font-serif text-3xl leading-none ${inkClass}`}>{title}</p>
      <div className="mt-5 h-px w-16 bg-current/20" />
      <p className={`mt-4 text-[10px] leading-relaxed ${mutedClass}`}>05.11.2026</p>
    </div>
  );
}

function Envelope({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-sm border shadow-[0_22px_50px_-30px_rgba(0,0,0,0.75)] ${
        dark
          ? "border-amber-200/10 bg-stone-900/80"
          : "border-stone-300/40 bg-[#f7f0e3]"
      } ${className}`}
    >
      <div className="absolute inset-0 [background-image:linear-gradient(145deg,transparent_49%,rgba(0,0,0,.1)_50%,transparent_51%),linear-gradient(35deg,transparent_49%,rgba(255,255,255,.35)_50%,transparent_51%)]" />
    </div>
  );
}

function Ribbon({ tone }: { tone: "black" | "champagne" }) {
  return (
    <>
      <div
        className={`absolute inset-x-0 top-16 h-4 shadow-[0_16px_26px_-22px_rgba(0,0,0,0.9)] ${
          tone === "black" ? "bg-black/65" : "bg-[#e9d6b8]/70"
        }`}
      />
      <div
        className={`absolute right-8 top-10 h-12 w-20 rounded-full border-[11px] ${
          tone === "black" ? "border-black/58" : "border-[#e9d6b8]/70"
        }`}
      />
    </>
  );
}

function WaxSeal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute z-20 flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/35 bg-gradient-to-br from-amber-600 to-amber-900 text-sm font-serif text-amber-100 shadow-[inset_0_2px_8px_rgba(255,255,255,0.25),0_14px_30px_-18px_rgba(0,0,0,0.95)] ${className}`}
    >
      B
    </div>
  );
}

function Pearls({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute h-2 w-2 rounded-full bg-white/75 shadow-[14px_8px_0_rgba(255,255,255,.55),28px_11px_0_rgba(255,255,255,.46),43px_6px_0_rgba(255,255,255,.38),58px_-3px_0_rgba(255,255,255,.32)] ${className}`}
    />
  );
}

function FlowerCluster({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute h-24 w-24 ${className}`}>
      <div className="absolute left-7 top-7 h-9 w-9 rounded-full bg-rose-100/75 shadow-[0_0_0_8px_rgba(255,255,255,.28)]" />
      <div className="absolute left-2 top-12 h-12 w-px rotate-[-35deg] bg-green-700/25" />
      <div className="absolute left-10 top-2 h-12 w-px rotate-[25deg] bg-green-700/25" />
      <div className="absolute left-1 top-9 h-5 w-8 rounded-full border border-green-700/20" />
      <div className="absolute left-12 top-12 h-5 w-8 rounded-full border border-green-700/20" />
    </div>
  );
}

function PhotoPrint({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute bg-white p-1 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.75)] ${className}`}>
      <div className="h-[72%] w-full bg-[linear-gradient(135deg,#111827,#9ca3af_55%,#f8fafc)]" />
      <div className="mt-1 h-2 rounded-sm bg-stone-200" />
    </div>
  );
}

function SmallNote({
  className = "",
  title,
  subtitle,
  dark = false,
}: {
  className?: string;
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`absolute h-16 w-16 p-2 text-center shadow-[0_18px_40px_-24px_rgba(0,0,0,0.72)] ${
        dark ? "bg-stone-950 text-amber-100" : "bg-[#fffaf2] text-stone-600"
      } ${className}`}
    >
      <p className="font-serif text-lg leading-none">{title}</p>
      <p className="mt-1 text-[8px] uppercase tracking-[0.22em] opacity-55">
        {subtitle}
      </p>
    </div>
  );
}

function Tallit({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute h-36 w-24 rounded-sm bg-[#f8f4e8] shadow-[0_18px_40px_-26px_rgba(0,0,0,.55)] ${className}`}
    >
      <div className="absolute inset-y-0 right-5 w-2 bg-stone-300/60" />
      <div className="absolute bottom-0 left-0 right-0 h-6 border-t border-stone-300/70" />
    </div>
  );
}

function EmbossedMonogram({ value }: { value: string }) {
  return (
    <div className="absolute inset-x-0 top-6 text-center font-serif text-5xl text-current/10">
      {value}
    </div>
  );
}

function SilkSurface({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`absolute inset-0 opacity-75 ${
        dark
          ? "bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,.12),transparent_32%),radial-gradient(ellipse_at_80%_75%,rgba(0,0,0,.45),transparent_38%)]"
          : "bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,.55),transparent_30%),radial-gradient(ellipse_at_78%_72%,rgba(120,100,70,.18),transparent_38%),linear-gradient(135deg,rgba(255,255,255,.24),transparent_40%)]"
      }`}
    />
  );
}

function PaperTexture() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_20%_30%,rgba(0,0,0,.25)_0_1px,transparent_1px),radial-gradient(circle_at_70%_60%,rgba(255,255,255,.8)_0_1px,transparent_1px)] [background-size:12px_12px,16px_16px]" />
  );
}

function initials(value: string) {
  const parts = value
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "I";
  if (parts.length === 1) return parts[0]?.slice(0, 1).toUpperCase() ?? "I";
  return `${parts[0]?.slice(0, 1) ?? ""}${parts[parts.length - 1]?.slice(0, 1) ?? ""}`.toUpperCase();
}
