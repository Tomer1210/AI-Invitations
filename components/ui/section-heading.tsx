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
    <div className={`mb-10 max-w-2xl sm:mb-14 lg:mb-16 ${alignClass}`}>
      {eyebrow && (
        <p className="eyebrow-label mb-3 text-accent-via sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
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
