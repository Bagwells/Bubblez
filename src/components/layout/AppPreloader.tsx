"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const SESSION_KEY = "bubblez_preloader_seen";
const HOME_PRELOAD_MS = 2000;
const OTHER_PRELOAD_MS = 400;

export default function AppPreloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const durationMs =
    pathname === "/" ? HOME_PRELOAD_MS : OTHER_PRELOAD_MS;

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SESSION_KEY)) {
      const skip = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(skip);
    }

    const t = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsLoading(false);
    }, durationMs);

    return () => clearTimeout(t);
  }, [pathname, durationMs]);

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary transition-opacity duration-500">
        <div className="text-white text-center space-y-2">
          <Logo />
          <div className="mt-4 w-32 h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full w-full bg-white rounded-full"
              style={{
                animation: `shrink ${durationMs}ms linear forwards`,
              }}
            />
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
