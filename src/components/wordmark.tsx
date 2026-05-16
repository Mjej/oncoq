import type { CSSProperties } from "react";

type WordmarkProps = {
  /** Pixel height for the wordmark; width scales automatically. */
  size?: number;
  /** Optional className applied to the root SVG element. */
  className?: string;
  /** Override the primary "ONCOQ" colour. Defaults to the deep ocean navy. */
  primary?: string;
  /** Override the ".tech" suffix colour. */
  secondary?: string;
  /** Override the accent colour used on the Q tail and dot. */
  accent?: string;
  /** When true, render an inverted (light-on-dark) palette. */
  inverted?: boolean;
  /** Accessible label. Defaults to "OncoQ.tech". */
  title?: string;
};

/**
 * OncoQ.tech wordmark.
 *
 * Premium, type-led logotype: tight uppercase "ONCOQ" with a stylized Q whose
 * tail extends into a thin accent stroke ending in a small dot — a quiet nod
 * to a pathway / signal trace. Followed by a lighter ".tech" suffix.
 *
 * No background container, no gradient halo — designed to sit cleanly on the
 * soft-white workspace canvas.
 */
export function Wordmark({
  size = 28,
  className,
  primary,
  secondary,
  accent,
  inverted = false,
  title = "OncoQ.tech"
}: WordmarkProps) {
  const primaryColor = primary ?? (inverted ? "#FFFFFF" : "#0B3A5C");
  const secondaryColor = secondary ?? (inverted ? "rgba(255,255,255,0.7)" : "#5B7488");
  const accentColor = accent ?? (inverted ? "#7FD7C6" : "#20C7B5");

  // Intrinsic viewBox; height is normalised to 32, width to 196.
  const VIEW_W = 196;
  const VIEW_H = 32;
  const aspect = VIEW_W / VIEW_H;
  const style: CSSProperties = {
    height: `${size}px`,
    width: `${size * aspect}px`,
    display: "inline-block"
  };

  return (
    <svg
      aria-label={title}
      className={className}
      role="img"
      style={style}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* ONCOQ — set in tight uppercase with a custom font stack that falls back to elegant serifs */}
      <text
        fill={primaryColor}
        fontFamily='"Inter Tight", "Inter", "SF Pro Display", "Helvetica Neue", system-ui, -apple-system, sans-serif'
        fontSize="22"
        fontWeight="680"
        letterSpacing="0.45"
        x="0"
        y="24"
      >
        ONCO
      </text>

      {/* The Q is drawn separately so its descender can extend into an accent stroke. */}
      <g transform="translate(67 0)">
        {/* Q ring — heavier stroke for an optical-tight feel */}
        <circle
          cx="13"
          cy="16"
          fill="none"
          r="9.5"
          stroke={primaryColor}
          strokeWidth="3.2"
        />
        {/* Q tail */}
        <path
          d="M 18.5 22 L 26.5 30"
          fill="none"
          stroke={primaryColor}
          strokeLinecap="round"
          strokeWidth="3.2"
        />
        {/* Accent extension — a thin trace continuing from the Q tail */}
        <path
          d="M 26.5 30 L 36 30"
          fill="none"
          stroke={accentColor}
          strokeLinecap="round"
          strokeWidth="2"
        />
        {/* Accent dot — quiet signal cue */}
        <circle cx="38.5" cy="30" fill={accentColor} r="1.8" />
      </g>

      {/* .tech — lighter weight, tracked, set on the baseline of the wordmark */}
      <text
        fill={secondaryColor}
        fontFamily='"Inter Tight", "Inter", "SF Pro Display", "Helvetica Neue", system-ui, -apple-system, sans-serif'
        fontSize="13.5"
        fontWeight="500"
        letterSpacing="0.25"
        x="108"
        y="23.5"
      >
        .tech
      </text>
    </svg>
  );
}

/**
 * Compact monogram variant — uses only the stylized "Q" mark with accent trace.
 * Useful for favicons, avatars, or very tight UI spots.
 */
export function WordmarkMonogram({
  size = 28,
  className,
  primary,
  accent,
  inverted = false,
  title = "OncoQ.tech"
}: Omit<WordmarkProps, "secondary">) {
  const primaryColor = primary ?? (inverted ? "#FFFFFF" : "#0B3A5C");
  const accentColor = accent ?? (inverted ? "#7FD7C6" : "#20C7B5");
  const dimension = `${size}px`;

  return (
    <svg
      aria-label={title}
      className={className}
      role="img"
      style={{ height: dimension, width: dimension, display: "inline-block" }}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <circle
        cx="14"
        cy="15"
        fill="none"
        r="10"
        stroke={primaryColor}
        strokeWidth="3"
      />
      <path
        d="M 19.5 21 L 26 27.5"
        fill="none"
        stroke={primaryColor}
        strokeLinecap="round"
        strokeWidth="3"
      />
      <circle cx="28.5" cy="29.5" fill={accentColor} r="1.8" />
    </svg>
  );
}
