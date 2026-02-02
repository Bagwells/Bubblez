import { forwardRef, TextareaHTMLAttributes, useId } from "react";
import clsx from "clsx";

interface TextMessageProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
  errorClassName?: string;
}

export const TextMessage = forwardRef<HTMLTextAreaElement, TextMessageProps>(
  (
    {
      label,
      className = "",
      labelClassName = "",
      error,
      errorClassName = "",
      id,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? `textarea-${generatedId}`;

    return (
      <div className="flex flex-col gap-1 font-work w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className={clsx(
              "text-xs lg:text-sm text-[#8D8D8D] font-medium",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          {...rest}
          className={clsx(
            "p-2 min-h-14 max-h-140 resize-y text-black text-base border-b border-[#8D8D8D] outline-none focus:border-black focus-within:outline-none transition-all duration-200 ease-in-out placeholder:text-sm placeholder:text-[#8D8D8D] box-border",
            {
              "border-state-error": error,
              "border-textColor-100": !error,
            },
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
        />

        {error && (
          <p
            id={`${textareaId}-error`}
            className={clsx("text-state-error text-xs", errorClassName)}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextMessage.displayName = "TextMessage";
