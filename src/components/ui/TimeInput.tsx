"use client";

import { useId } from "react";
import clsx from "clsx";

function parseTime(value: string): { hour: number; minute: number; period: "AM" | "PM" } {
  if (!value || !value.trim()) return { hour: 8, minute: 0, period: "AM" };
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match) {
    let hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    const period = match[3].toUpperCase() as "AM" | "PM";
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return { hour: h12, minute, period: period as "AM" | "PM" };
  }
  return { hour: 8, minute: 0, period: "AM" };
}

function formatTime(hour: number, minute: number, period: "AM" | "PM"): string {
  const h = hour.toString().padStart(2, "0");
  const m = minute.toString().padStart(2, "0");
  return `${h}:${m} ${period}`;
}

interface TimeInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  className?: string;
  defaultValue?: string;
}

export const TimeInput = ({
  label = "Preferred Time",
  value = "08:00 AM",
  onChange,
  onBlur,
  error,
  className = "",
}: TimeInputProps) => {
  const id = useId();
  const { hour, minute, period } = parseTime(value ?? "08:00 AM");

  const handleChange = (newHour: number, newMinute: number, newPeriod: "AM" | "PM") => {
    onChange?.(formatTime(newHour, newMinute, newPeriod));
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <div className={clsx("flex flex-col gap-1 font-work w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx("text-xs lg:text-sm text-[#8D8D8D] font-medium")}
        >
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <select
          id={id}
          value={hour}
          onChange={(e) => handleChange(parseInt(e.target.value, 10), minute, period)}
          onBlur={onBlur}
          className={clsx(
            "flex-1 p-2 h-14 text-black text-base border-b border-[#8D8D8D] outline-none focus:border-black transition-all duration-200 bg-transparent",
            { "border-state-error": error }
          )}
          aria-invalid={!!error}
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <span className="self-center text-[#8D8D8D]">:</span>
        <select
          value={minute}
          onChange={(e) => handleChange(hour, parseInt(e.target.value, 10), period)}
          onBlur={onBlur}
          className={clsx(
            "flex-1 p-2 h-14 text-black text-base border-b border-[#8D8D8D] outline-none focus:border-black transition-all duration-200 bg-transparent",
            { "border-state-error": error }
          )}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select
          value={period}
          onChange={(e) => handleChange(hour, minute, e.target.value as "AM" | "PM")}
          onBlur={onBlur}
          className={clsx(
            "flex-1 p-2 h-14 text-black text-base border-b border-[#8D8D8D] outline-none focus:border-black transition-all duration-200 bg-transparent",
            { "border-state-error": error }
          )}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      {error && (
        <p className="text-state-error text-xs">{error}</p>
      )}
    </div>
  );
};
