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
    "w-full rounded-xl border border-border bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 transition-all duration-200 focus:border-accent-from/50 focus:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-accent-from/20 sm:text-base";

  return (
    <div className="group space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground transition-colors group-focus-within:text-accent-via"
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
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
