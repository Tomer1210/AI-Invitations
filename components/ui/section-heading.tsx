type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-start";

  return (
    <div className={`max-w-2xl mb-12 sm:mb-16 lg:mb-20 ${alignClass}`}>
      {eyebrow && (
        <p className="eyebrow-label mb-3 text-accent-via sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-hebrew-body mt-4 text-base text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
