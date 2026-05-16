import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseFieldProps = {
  label: string;
  id: string;
  hint?: string;
};

type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
  };

type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

export type FormFieldProps = InputFieldProps | TextareaFieldProps;

export function FormField(props: FormFieldProps) {
  const { label, id, hint, multiline, className = "", ...rest } = props;

  const inputClassName =
    "premium-focus w-full rounded-2xl border border-border bg-white/[0.045] px-4 py-3.5 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] placeholder:text-muted/45 backdrop-blur-sm hover:border-border-strong hover:bg-white/[0.065] sm:text-base";

  return (
    <div className="group space-y-2.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground/90 transition-colors group-focus-within:text-accent-via"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={3}
          className={`text-hebrew-body resize-none ${inputClassName} ${className}`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={`${inputClassName} ${className}`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {hint && <p className="text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}
