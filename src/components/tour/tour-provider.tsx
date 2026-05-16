"use client";

// Guided tour provider — renders a backdrop spotlight + tooltip that walks
// new users through the demo workspace. State persists in sessionStorage so
// the tour survives client-side navigation. Auto-starts when the URL has
// ?tour=1 (e.g. landing page "Open Demo Workspace" CTA).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Compass, X } from "lucide-react";
import { tourSteps, type TourStep } from "./tour-steps";

type TourState = { active: boolean; index: number };
const STORAGE_KEY = "oncoq-tour-state";
const SEEN_KEY = "oncoq-tour-seen";

type TourContextValue = {
  start: () => void;
  stop: () => void;
  active: boolean;
};

const TourContext = createContext<TourContextValue | null>(null);

export function useTour(): TourContextValue {
  const ctx = useContext(TourContext);
  if (!ctx) {
    // Fail open so consumers can render without the provider during SSR/tests.
    return { start: () => {}, stop: () => {}, active: false };
  }
  return ctx;
}

export function TourProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState<TourState>({ active: false, index: 0 });
  const pathname = usePathname();
  const router = useRouter();

  // Hydrate from sessionStorage on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as TourState;
        if (parsed && typeof parsed.index === "number" && parsed.index < tourSteps.length) {
          setState(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist state across navigations.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  // Auto-start when the URL carries ?tour=1, then strip the param.
  // Also auto-start on first ever visit (persisted in localStorage).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const fromQuery = url.searchParams.get("tour") === "1";
    let firstVisit = false;
    try {
      firstVisit = !window.localStorage.getItem(SEEN_KEY);
    } catch {
      // ignore
    }
    const onWorkspace = (pathname ?? "/").startsWith("/dashboard");

    if (fromQuery || (firstVisit && onWorkspace)) {
      setState({ active: true, index: 0 });
      try {
        window.localStorage.setItem(SEEN_KEY, "1");
      } catch {
        // ignore
      }
      if (fromQuery) {
        url.searchParams.delete("tour");
        router.replace(url.pathname + (url.search ? `?${url.searchParams.toString()}` : "") + url.hash);
      }
    }
  }, [pathname, router]);

  const start = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(SEEN_KEY, "1");
      } catch {
        // ignore
      }
    }
    setState({ active: true, index: 0 });
  }, []);
  const stop = useCallback(() => setState({ active: false, index: 0 }), []);

  const value = useMemo<TourContextValue>(
    () => ({ start, stop, active: state.active }),
    [start, stop, state.active]
  );

  const step = state.active ? tourSteps[state.index] : null;

  return (
    <TourContext.Provider value={value}>
      {children}
      {step ? (
        <TourOverlay
          key={step.id}
          step={step}
          stepIndex={state.index}
          totalSteps={tourSteps.length}
          currentPath={pathname ?? "/"}
          onNext={() => {
            const next = state.index + 1;
            if (next >= tourSteps.length) {
              setState({ active: false, index: 0 });
              return;
            }
            const nextStep = tourSteps[next];
            if (nextStep.path !== pathname) {
              router.push(nextStep.path);
            }
            setState({ active: true, index: next });
          }}
          onPrev={() => {
            const prev = Math.max(0, state.index - 1);
            const prevStep = tourSteps[prev];
            if (prevStep.path !== pathname) {
              router.push(prevStep.path);
            }
            setState({ active: true, index: prev });
          }}
          onSkip={() => setState({ active: false, index: 0 })}
        />
      ) : null}
    </TourContext.Provider>
  );
}

type OverlayProps = {
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  currentPath: string;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
};

function TourOverlay({ step, stepIndex, totalSteps, currentPath, onNext, onPrev, onSkip }: OverlayProps) {
  // While the router is still settling on the step's path, wait silently.
  const onCorrectPath = currentPath === step.path;

  // Track the target rect so we can position the spotlight + tooltip.
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [ready, setReady] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onCorrectPath) {
      setReady(false);
      setRect(null);
      return;
    }

    if (!step.selector) {
      setRect(null);
      setReady(true);
      return;
    }

    let cancelled = false;
    let raf = 0;
    let attempts = 0;

    const tick = () => {
      if (cancelled) return;
      const el = document.querySelector<HTMLElement>(step.selector!);
      if (el) {
        const r = el.getBoundingClientRect();
        // If the element is offscreen, scroll it into view first.
        const fullyVisible = r.top >= 0 && r.bottom <= window.innerHeight;
        if (!fullyVisible) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        setRect(el.getBoundingClientRect());
        setReady(true);
        return;
      }
      attempts += 1;
      if (attempts < 40) {
        raf = window.requestAnimationFrame(tick);
      } else {
        // Give up: fall back to centered tooltip.
        setRect(null);
        setReady(true);
      }
    };

    raf = window.requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [step.id, step.selector, onCorrectPath]);

  // Re-measure on resize / scroll.
  useEffect(() => {
    if (!onCorrectPath || !step.selector) return;
    const handler = () => {
      const el = document.querySelector<HTMLElement>(step.selector!);
      if (el) setRect(el.getBoundingClientRect());
    };
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, true);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, true);
    };
  }, [step.selector, onCorrectPath]);

  // Keyboard: Esc to skip, → next, ← prev.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSkip();
      else if (e.key === "ArrowRight" || e.key === "Enter") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onPrev, onSkip]);

  if (!onCorrectPath || !ready) {
    // While navigating between steps' pages, show a soft full-screen scrim
    // so the user knows the tour is still active.
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] bg-ink/30 backdrop-blur-[1px] transition-opacity" />
    );
  }

  const padding = 8;
  const spotlight = rect
    ? {
        top: Math.max(0, rect.top - padding),
        left: Math.max(0, rect.left - padding),
        width: rect.width + padding * 2,
        height: rect.height + padding * 2
      }
    : null;

  // Decide tooltip position.
  const tooltipStyle = computeTooltipStyle(rect, step.placement ?? "bottom");

  const isLast = stepIndex === totalSteps - 1;

  return (
    <div
      aria-live="polite"
      aria-modal="true"
      className="fixed inset-0 z-[90]"
      role="dialog"
    >
      {/* Dark overlay with a cutout for the spotlight via box-shadow. */}
      {spotlight ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-2xl ring-2 ring-aqua/90 transition-all duration-300"
            style={{
              top: spotlight.top,
              left: spotlight.left,
              width: spotlight.width,
              height: spotlight.height,
              boxShadow: "0 0 0 9999px rgba(8, 26, 44, 0.6), 0 0 0 4px rgba(45, 156, 219, 0.35)"
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-2xl ring-2 ring-aqua/60 motion-safe:animate-ping"
            style={{
              top: spotlight.top,
              left: spotlight.left,
              width: spotlight.width,
              height: spotlight.height,
              animationDuration: "2.4s"
            }}
          />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-ink/60 backdrop-blur-[1px]" />
      )}

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        className="absolute w-[min(92vw,360px)] rounded-2xl border border-[#cde8f5] bg-white p-4 shadow-2xl"
        style={tooltipStyle}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-tide">
            <Compass aria-hidden="true" className="h-3.5 w-3.5" />
            Step {stepIndex + 1} of {totalSteps}
          </div>
          <button
            aria-label="Skip tour"
            className="focus-ring rounded-lg p-1 text-ink/50 hover:bg-[#f0f8fc] hover:text-ink"
            onClick={onSkip}
            type="button"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-ink/65">{step.body}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            className="focus-ring inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-ink/55 hover:text-ink disabled:opacity-40"
            disabled={stepIndex === 0}
            onClick={onPrev}
            type="button"
          >
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /> Back
          </button>

          <div className="flex items-center gap-2">
            <button
              className="focus-ring rounded-lg px-2 py-1.5 text-xs font-semibold text-ink/55 hover:text-ink"
              onClick={onSkip}
              type="button"
            >
              Skip
            </button>
            <button
              autoFocus
              className="focus-ring inline-flex items-center gap-1 rounded-lg bg-ocean px-3 py-1.5 text-xs font-semibold text-white hover:bg-tide"
              onClick={onNext}
              type="button"
            >
              {step.nextLabel ?? (isLast ? "Finish" : "Next")}
              {!isLast ? <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /> : null}
            </button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-3 flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`h-1 flex-1 rounded-full ${i <= stepIndex ? "bg-ocean" : "bg-[#dbeef8]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Place the tooltip near the spotlight with viewport-aware clamping.
function computeTooltipStyle(rect: DOMRect | null, placement: TourStep["placement"]): React.CSSProperties {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const tipW = Math.min(360, vw - 24);
  const tipH = 220; // approximate
  const margin = 14;

  if (!rect || placement === "center") {
    return {
      top: Math.max(16, vh / 2 - tipH / 2),
      left: Math.max(16, vw / 2 - tipW / 2)
    };
  }

  let top: number;
  let left: number;

  switch (placement) {
    case "top":
      top = rect.top - tipH - margin;
      left = rect.left + rect.width / 2 - tipW / 2;
      break;
    case "left":
      top = rect.top + rect.height / 2 - tipH / 2;
      left = rect.left - tipW - margin;
      break;
    case "right":
      top = rect.top + rect.height / 2 - tipH / 2;
      left = rect.right + margin;
      break;
    case "bottom":
    default:
      top = rect.bottom + margin;
      left = rect.left + rect.width / 2 - tipW / 2;
      break;
  }

  // Clamp inside viewport with 12px gutter.
  top = Math.max(12, Math.min(top, vh - tipH - 12));
  left = Math.max(12, Math.min(left, vw - tipW - 12));

  return { top, left };
}
