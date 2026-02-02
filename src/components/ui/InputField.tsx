import { forwardRef, InputHTMLAttributes, useId } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
  errorClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
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
    const inputId = id ?? `input-${generatedId}`;

    return (
      <div className="flex flex-col gap-1 font-work w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={clsx("text-xs lg:text-sm text-[#8D8D8D] font-medium", labelClassName)}
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          {...rest}
          className={clsx(
            "p-2 h-14 text-black text-base border-b border-[#8D8D8D] outline-none focus:border-black focus-within:outline-none transition-all duration-200 ease-in-out placeholder:text-sm placeholder:text-[#8D8D8D] box-border",
            {
              "border-state-error": error,
              "border-textColor-100": !error,
            },
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />

        {error && (
          <p id={`${inputId}-error`} className={clsx("text-state-error text-xs", errorClassName)}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";






