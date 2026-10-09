"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "warn" | "error" | "info";

export type ToastOptions = {
  title?: string;
  message?: string;
  description?: string;
  type?: ToastType;
  durationMs?: number;
};

export type ToastItem = {
  id: number;
  title: string;
  description: string;
  type: ToastType;
  durationMs: number;
};

export type ToastFn = (
  messageOrOptions: string | ToastOptions,
  type?: ToastType,
) => void;

const ToastContext = createContext<ToastFn | null>(null);

/** Push a toast from anywhere under the provider. */
export function useToast(): ToastFn {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const DEFAULT_DURATION_MS = 4500;
/** Keep at most this many chips on screen at once. */
const MAX_VISIBLE = 3;

function resolveTitle(
  type: ToastType,
  desc: string,
  customTitle?: string,
): string {
  if (customTitle) return customTitle;
  if (desc.includes("404")) return "ERROR // 404 NOT FOUND";
  if (
    desc.toLowerCase().includes("gallery") ||
    desc.toLowerCase().includes("screenshot") ||
    desc.toLowerCase().includes("image")
  ) {
    return "STATUS // IMAGES UNAVAILABLE";
  }
  if (
    desc.toLowerCase().includes("document") ||
    desc.toLowerCase().includes("doc")
  ) {
    return "STATUS // DOCS UNAVAILABLE";
  }
  switch (type) {
    case "error":
      return "SYSTEM // ALERT ERROR";
    case "warn":
      return "STATUS // NOTICE";
    case "info":
      return "SYSTEM // NOTIFICATION";
    case "success":
      return "STATUS // COMPLETED";
  }
}

/**
 * Modern rectangular HUD toast with dark header, white description box,
 * left-attached vertical backwards progress bar, and top-right close button.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const timers = useRef<Map<number, number>>(new Map());

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback<ToastFn>(
    (messageOrOptions, explicitType = "success") => {
      const id = ++nextId.current;
      let title = "";
      let description = "";
      let type: ToastType = explicitType;
      let durationMs = DEFAULT_DURATION_MS;

      if (typeof messageOrOptions === "string") {
        description = messageOrOptions;
        type = explicitType;
        title = resolveTitle(type, description);
      } else {
        description =
          messageOrOptions.description || messageOrOptions.message || "";
        type = messageOrOptions.type || explicitType;
        title = resolveTitle(type, description, messageOrOptions.title);
        if (messageOrOptions.durationMs) {
          durationMs = messageOrOptions.durationMs;
        }
      }

      const item: ToastItem = {
        id,
        title,
        description,
        type,
        durationMs,
      };

      setToasts((list) => [...list, item].slice(-MAX_VISIBLE));

      const timer = window.setTimeout(() => {
        dismiss(id);
      }, durationMs);

      timers.current.set(id, timer);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={push}>
      {children}

      {/* Viewport: bottom-right on tablet/desktop, bottom-center on mobile */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 top-5 sm:bottom-7 sm:right-7 sm:left-auto z-[99] flex flex-col items-center sm:items-end gap-3.5"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="group pointer-events-auto relative flex w-full sm:w-[22.5rem] flex-col rounded-none border border-[#2b303b] bg-[#0c0e12] shadow-[0_16px_40px_rgba(0,0,0,0.7)] toast-slide-up overflow-hidden select-none"
          >
            {/* Left attached vertical progress bar running backward */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/40 z-20 overflow-hidden">
              <div
                className={cn(
                  "w-full toast-progress-bar origin-top",
                  toast.type === "error" &&
                  "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]",
                  toast.type === "warn" &&
                  "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]",
                  toast.type === "info" &&
                  "bg-ice shadow-[0_0_8px_rgba(170,204,216,0.7)]",
                  toast.type === "success" &&
                  "bg-mint shadow-[0_0_8px_rgba(45,212,191,0.7)]",
                )}
                style={{
                  animationDuration: `${toast.durationMs}ms`,
                }}
              />
            </div>

            {/* Header: Dark background with status/title + top-right cross button */}
            <div className="flex items-center justify-between border-b border-[#222631] bg-[#0e1117] py-2 px-3 pl-4">
              <div className="flex items-center gap-2 min-w-0">
                {/* Status indicator dot */}
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-none",
                    toast.type === "error" && "bg-rose-500",
                    toast.type === "warn" && "bg-amber-400",
                    toast.type === "info" && "bg-ice",
                    toast.type === "success" && "bg-mint",
                  )}
                />
                <span className="truncate font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-sand">
                  {toast.title}
                </span>
              </div>

              {/* Cross button in top right corner */}
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center text-muted hover:text-stark hover:bg-white/10 transition-colors"
                aria-label="Dismiss notification"
              >
                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="square"
                  className="h-3 w-3"
                >
                  <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" />
                </svg>
              </button>
            </div>

            {/* Below: Box in white with description */}
            <div className="bg-white py-3 px-3.5 pl-4 border-t border-[#1e222c]">
              <p className="font-sans text-[0.8125rem] font-medium leading-[1.35rem] text-[#0f172a]">
                {toast.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
