/**
 * Typography tokens — mirrors Figma "Typography" variable collection.
 *
 * Font families reference CSS custom properties set by next/font.
 * Sizes, weights and line-heights are used in both Tailwind config
 * and component variants.
 */

export const fontFamily = {
  heading: "'Berlingske Serif', Georgia, serif",
  body: "'Lota Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "ui-monospace, monospace",
} as const;

export const fontSize = {
  xs: "0.75rem",    // 12px
  sm: "0.875rem",   // 14px
  base: "1rem",     // 16px
  lg: "1.125rem",   // 18px
  xl: "1.25rem",    // 20px
  "2xl": "1.5rem",  // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem",    // 48px
  "6xl": "3.75rem", // 60px
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const lineHeight = {
  tight: "1.2",
  snug: "1.35",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

export const letterSpacing = {
  tighter: "-0.02em",
  tight: "-0.01em",
  normal: "0em",
  wide: "0.01em",
} as const;

/**
 * Composite text styles matching Figma H1-H5 hierarchy.
 * These map to specific combinations of size, weight, and line-height.
 * 
 * H1-H5 use responsive CSS custom properties (--type-h*) that automatically
 * adjust via media queries in globals.css. Use Tailwind classes like text-h1
 * for automatic responsive behavior with consistent ratios across breakpoints.
 */
export const textStyles = {
  // H1-H5 — Standard Web Heading Hierarchy (Berlingske Serif Bold)
  // These use responsive CSS vars defined in globals.css
  h1: {
    fontSize: "var(--type-h1-size)", // 120px → 80px → 56px
    lineHeight: "var(--type-h1-line)", // 96px → 64px → 48px (0.80x ratio)
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.heading,
    letterSpacing: letterSpacing.tighter,
  },
  h2: {
    fontSize: "var(--type-h2-size)", // 80px → 56px → 40px
    lineHeight: "var(--type-h2-line)", // 64px → 48px → 32px (0.80x ratio)
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.heading,
    letterSpacing: letterSpacing.tighter,
  },
  h3: {
    fontSize: "var(--type-h3-size)", // 56px → 40px → 32px
    lineHeight: "var(--type-h3-line)", // 48px → 32px → 24px (0.86x ratio)
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.heading,
    letterSpacing: letterSpacing.tighter,
  },
  h4: {
    fontSize: "var(--type-h4-size)", // 40px → 32px → 28px
    lineHeight: "var(--type-h4-line)", // 48px → 40px → 32px (1.20x ratio)
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.heading,
    letterSpacing: letterSpacing.tight,
  },
  h5: {
    fontSize: "var(--type-h5-size)", // 32px → 28px → 24px
    lineHeight: "var(--type-h5-line)", // 40px → 32px → 32px (1.25x ratio)
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.heading,
    letterSpacing: letterSpacing.tight,
  },
  h6: {
    fontSize: "var(--type-h6-size)", // 24px → 24px → 20px
    lineHeight: "var(--type-h6-line)", // 32px → 32px → 28px (1.33x ratio)
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.heading,
    letterSpacing: letterSpacing.tight,
  },

  // Legacy heading styles (deprecated — use h1-h6 instead)
  "heading-md": {
    fontSize: "var(--type-h6-size)",
    lineHeight: "var(--type-h6-line)",
    fontWeight: fontWeight.semibold,
    fontFamily: fontFamily.heading,
    letterSpacing: letterSpacing.tight,
  },
  "heading-sm": {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },

  // Body — Paragraph Text (Lota Grotesque)
  "body-lg": {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  "body-md": {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  "body-sm": {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
} as const;
