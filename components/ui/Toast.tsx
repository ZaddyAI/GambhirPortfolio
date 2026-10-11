"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import {
  IconAlert,
  IconClose,
  IconProgress,
  IconSync,
  IconUndo,
  IconVerified,
  IconWarning,
  type IconProps,
} from "./icons";

export type ToastType =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "warn"
  | "error"
  | "actionable"
  | "progress";

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastOptions = {
  title?: string;
  message?: string;
  description?: string;
  type?: ToastType;
  durationMs?: number;
  action?: ToastAction;
  actionLabel?: string;
  onAction?: () => void;
  isProgress?: boolean;
  progressValue?: number;
};

export type ToastItem = {
  id: number;
  title: string;
  description: string;
  type: ToastType;
  durationMs: number;
  action?: ToastAction;
  isProgress?: boolean;
  progressValue?: number;
};

export interface ToastFn {
  (messageOrOptions: string | ToastOptions, type?: ToastType): void;
  neutral: (opts: string | Omit<ToastOptions, "type">) => void;
  info: (opts: string | Omit<ToastOptions, "type">) => void;
  success: (opts: string | Omit<ToastOptions, "type">) => void;
  warning: (opts: string | Omit<ToastOptions, "type">) => void;
  warn: (opts: string | Omit<ToastOptions, "type">) => void;
  error: (opts: string | Omit<ToastOptions, "type">) => void;
  actionable: (opts: string | Omit<ToastOptions, "type">) => void;
  progress: (opts: string | Omit<ToastOptions, "type">) => void;
  clear: () => void;
}

const ToastContext = createContext<ToastFn | null>(null);

export function useToast(): ToastFn {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const DEFAULT_DURATION_MS = 4800;
const MAX_VISIBLE = 5;
const EXIT_MS = 220;

type CanonicalType =
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "actionable"
  | "progress";

function normalizeType(type?: ToastType): CanonicalType {
  if (!type) return "neutral";
  if (type === "info") return "neutral";
  if (type === "warn") return "warning";
  return type;
}

interface ToastPresetConfig {
  title: string;
  desc: string;
  icon: ComponentType<IconProps>;
  iconBg: string;
  iconColor: string;
  barColor: string;
}

const TOAST_PRESETS: Record<CanonicalType, ToastPresetConfig> = {
  neutral: {
    title: "SYSTEM SYNC COMPLETE",
    desc: "Locked to 120 FPS runtime target. Remote git branch pulled cleanly without merge friction.",
    icon: IconSync,
    iconBg: "bg-[#2a2a2c]",
    iconColor: "text-white",
    barColor: "bg-white",
  },
  success: {
    title: "PAYLOAD VERIFIED // NPR 80,000",
    desc: "Transaction confirmed via eSewa Gateway. Cryptographic receipt emitted to client cluster.",
    icon: IconVerified,
    iconBg: "bg-[#2c4e57]",
    iconColor: "text-[#aaccd8]",
    barColor: "bg-[#aaccd8]",
  },
  warning: {
    title: "TELEMETRY JITTER > 42MS",
    desc: "High round-trip latency detected on peer ingress socket. Buffer consumption at 88%.",
    icon: IconWarning,
    iconBg: "bg-[#39393b]",
    iconColor: "text-white",
    barColor: "bg-[#8e9192]",
  },
  error: {
    title: "UDP CRITICAL PACKET LOSS",
    desc: "Stream packet loss peaked at 12.4%. Auth gateway session rejected socket handshake.",
    icon: IconAlert,
    iconBg: "bg-[#93000a]",
    iconColor: "text-[#ffb4ab]",
    barColor: "bg-[#ffb4ab]",
  },
  actionable: {
    title: "STAGING CLUSTER REVERTED",
    desc: "Commit #891a pulled down. Node teardown in progress. Rollback available immediately.",
    icon: IconUndo,
    iconBg: "bg-[#2a2a2c]",
    iconColor: "text-[#aaccd8]",
    barColor: "bg-white",
  },
  progress: {
    title: "ASSET INGESTION 74%",
    desc: "Uploading 8.4 GB compressed texture shards to global distributed points of presence.",
    icon: IconProgress,
    iconBg: "bg-[#2c4e57]",
    iconColor: "text-[#aaccd8]",
    barColor: "bg-[#aaccd8]",
  },
};

function resolveTitle(
  canonical: CanonicalType,
  desc: string,
  customTitle?: string,
): string {
  if (customTitle) return customTitle;

  if (desc.includes("404")) {
    return "ERROR // 404 NOT FOUND";
  }
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
  if (
    desc.toLowerCase().includes("clipboard") ||
    desc.toLowerCase().includes("copied")
  ) {
    return "CLIPBOARD // COPIED";
  }

  return TOAST_PRESETS[canonical].title;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Tactical Toast Row (Larger size, no latency/meta text, slides from top-right)
 */
function ToastRow({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: number) => void;
}) {
  const canonical = normalizeType(toast.type);
  const config = TOAST_PRESETS[canonical];
  const Glyph = config.icon;

  const [pct, setPct] = useState(100);
  const [paused, setPaused] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const remainingRef = useRef(toast.durationMs);
  const closingRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setLeaving(true);
    exitTimerRef.current = window.setTimeout(
      () => onDismiss(toast.id),
      prefersReducedMotion() ? 0 : EXIT_MS,
    );
  }, [onDismiss, toast.id]);

  useEffect(
    () => () => {
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (paused || leaving) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      remainingRef.current = Math.max(0, remainingRef.current - (now - last));
      last = now;

      const next = (remainingRef.current / toast.durationMs) * 100;
      if (next <= 0) {
        setPct(0);
        close();
        return;
      }
      setPct(next);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, leaving, toast.durationMs, close]);

  return (
    <div
      role="status"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "pointer-events-auto relative w-full bg-[#1c1b1d] p-4 sm:p-4.5 flex flex-col gap-2.5 overflow-hidden shadow-2xl transition-all duration-300 border border-[#444748]/35 hover:border-white/50",
        leaving ? "toast-leave" : "toast-slide-up",
      )}
    >
      {/* Top Header Row: [Icon Box + Title] left, [Close Cross] right (NO latency text) */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={cn(
              "w-5 h-5 flex items-center justify-center font-display font-bold text-xs shrink-0",
              config.iconBg,
              config.iconColor,
            )}
          >
            <Glyph className="h-3 w-3" />
          </div>
          <h4 className="font-display font-bold text-sm sm:text-[0.9375rem] tracking-wider uppercase text-white truncate leading-tight">
            {toast.title}
          </h4>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Dismiss notification"
          className="text-[#8e9192] hover:text-white transition-colors flex items-center justify-center p-0.5 hover:bg-white/10 cursor-pointer shrink-0"
        >
          <IconClose className="h-3 w-3" />
        </button>
      </div>

      {/* Description body */}
      {toast.description && (
        <p className="font-sans text-xs text-[#e5e1e4] leading-relaxed">
          {toast.description}
        </p>
      )}

      {/* Action block if actionable */}
      {toast.action && (
        <div className="flex items-center gap-2 pt-0.5">
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick();
              close();
            }}
            className="bg-white text-[#2f3131] hover:bg-[#aaccd8] hover:text-[#11353e] px-3 py-1 font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            {toast.action.label}
          </button>
          <button
            type="button"
            onClick={close}
            className="bg-[#201f22] hover:bg-[#2a2a2c] text-[#e5e1e4] px-2.5 py-1 font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Inline data progress bar if progress */}
      {toast.isProgress && (
        <div className="w-full bg-[#201f22] h-1.5 mt-0.5 overflow-hidden">
          <div
            className="bg-[#aaccd8] h-full animate-pulse transition-all duration-300"
            style={{ width: `${toast.progressValue ?? 74}%` }}
          />
        </div>
      )}

      {/* Linear Expiration Progress Strip on bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#201f22]">
        <div
          className={cn("h-full transition-all ease-linear", config.barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Toast Container Overlay in the Top-Right:
 * fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-[22rem] sm:max-w-[25rem] w-full px-4 sm:px-0
 */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Fix TS2345: Standard callback function without generic mismatch
  const push = useCallback(
    (messageOrOptions: string | ToastOptions, explicitType: ToastType = "neutral") => {
      const id = ++nextId.current;
      let rawType: ToastType = explicitType;
      let title = "";
      let description = "";
      let durationMs = DEFAULT_DURATION_MS;
      let action: ToastAction | undefined;
      let isProgress = false;
      let progressValue = 74;

      if (typeof messageOrOptions === "string") {
        description = messageOrOptions;
        rawType = explicitType;
      } else {
        description =
          messageOrOptions.description || messageOrOptions.message || "";
        rawType = messageOrOptions.type || explicitType;
        durationMs = messageOrOptions.durationMs || DEFAULT_DURATION_MS;

        if (messageOrOptions.action) {
          action = messageOrOptions.action;
        } else if (messageOrOptions.onAction) {
          action = {
            label: messageOrOptions.actionLabel || "UNDO DISPATCH",
            onClick: messageOrOptions.onAction,
          };
        }

        if (messageOrOptions.isProgress !== undefined) {
          isProgress = messageOrOptions.isProgress;
        }
        if (messageOrOptions.progressValue !== undefined) {
          progressValue = messageOrOptions.progressValue;
        }
      }

      const canonical = normalizeType(rawType);
      const customTitle =
        typeof messageOrOptions === "object" ? messageOrOptions.title : undefined;

      title = resolveTitle(canonical, description, customTitle);

      if (canonical === "actionable" && !action) {
        action = {
          label: "UNDO DISPATCH",
          onClick: () => {
            push({
              title: "PAYLOAD VERIFIED // REVERTED",
              description: "Action safely reverted and restored to prior state.",
              type: "success",
            });
          },
        };
      }

      if (canonical === "progress") {
        isProgress = true;
      }

      const item: ToastItem = {
        id,
        title,
        description,
        type: rawType,
        durationMs,
        action,
        isProgress,
        progressValue,
      };

      setToasts((list) => [...list, item].slice(-MAX_VISIBLE));
    },
    [],
  );

  const toastFn = useMemo<ToastFn>(() => {
    const fn = ((messageOrOptions: string | ToastOptions, type?: ToastType) => {
      push(messageOrOptions, type);
    }) as ToastFn;

    fn.neutral = (opts) =>
      push(typeof opts === "string" ? { description: opts, type: "neutral" } : { ...opts, type: "neutral" });
    fn.info = fn.neutral;

    fn.success = (opts) =>
      push(typeof opts === "string" ? { description: opts, type: "success" } : { ...opts, type: "success" });

    fn.warning = (opts) =>
      push(typeof opts === "string" ? { description: opts, type: "warning" } : { ...opts, type: "warning" });
    fn.warn = fn.warning;

    fn.error = (opts) =>
      push(typeof opts === "string" ? { description: opts, type: "error" } : { ...opts, type: "error" });

    fn.actionable = (opts) =>
      push(typeof opts === "string" ? { description: opts, type: "actionable" } : { ...opts, type: "actionable" });

    fn.progress = (opts) =>
      push(typeof opts === "string" ? { description: opts, type: "progress" } : { ...opts, type: "progress" });

    fn.clear = clearAll;

    return fn;
  }, [push, clearAll]);

  // Expose dispatchToast globally for testing
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { dispatchToast: (type: string) => void }).dispatchToast = (
        type: string,
      ) => {
        switch (type.toLowerCase()) {
          case "neutral":
          case "default":
            toastFn.neutral({
              title: "SYSTEM SYNC COMPLETE",
              description:
                "Locked to 120 FPS runtime target. Remote git branch pulled cleanly without merge friction.",
            });
            break;
          case "success":
            toastFn.success({
              title: "PAYLOAD VERIFIED // NPR 80,000",
              description:
                "Transaction confirmed via eSewa Gateway. Cryptographic receipt emitted to client cluster.",
            });
            break;
          case "warning":
          case "warn":
            toastFn.warning({
              title: "TELEMETRY JITTER > 42MS",
              description:
                "High round-trip latency detected on peer ingress socket. Buffer consumption at 88%.",
            });
            break;
          case "error":
            toastFn.error({
              title: "UDP CRITICAL PACKET LOSS",
              description:
                "Stream packet loss peaked at 12.4%. Auth gateway session rejected socket handshake.",
            });
            break;
          case "actionable":
            toastFn.actionable({
              title: "STAGING CLUSTER REVERTED",
              description:
                "Commit #891a pulled down. Node teardown in progress. Rollback available immediately.",
              actionLabel: "UNDO DISPATCH",
              onAction: () => {
                toastFn.success({
                  title: "PAYLOAD VERIFIED // REVERTED",
                  description: "Rollback operation verified and committed.",
                });
              },
            });
            break;
          case "progress":
            toastFn.progress({
              title: "ASSET INGESTION 74%",
              description:
                "Uploading 8.4 GB compressed texture shards to global distributed points of presence.",
              isProgress: true,
              progressValue: 74,
            });
            break;
          default:
            toastFn({ description: `Dispatched protocol [${type}]` });
        }
      };

      const clearBtn = document.getElementById("clear-all-toasts-btn");
      if (clearBtn) {
        clearBtn.addEventListener("click", clearAll);
        return () => clearBtn.removeEventListener("click", clearAll);
      }
    }
  }, [toastFn, clearAll]);

  return (
    <ToastContext.Provider value={toastFn}>
      {children}

      {/* Viewport: Top-Right Stack */}
      <div
        id="toast-viewport-container"
        aria-live="polite"
        className="pointer-events-none fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-[22rem] sm:max-w-[25.5rem] w-full px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <ToastRow key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
