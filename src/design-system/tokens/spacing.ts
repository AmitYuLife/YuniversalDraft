/**
 * Spacing tokens — mirrors Figma "Spacing" variable collection.
 *
 * Uses a 4px base grid. Each step is a multiplier of the base.
 * These feed into Tailwind as custom spacing values.
 */

const BASE = 4; // px

export const spacing = {
  0: "0px",
  0.5: `${BASE * 0.5}px`,  // 2px
  1: `${BASE}px`,            // 4px
  1.5: `${BASE * 1.5}px`,  // 6px
  2: `${BASE * 2}px`,       // 8px
  3: `${BASE * 3}px`,       // 12px
  4: `${BASE * 4}px`,       // 16px
  5: `${BASE * 5}px`,       // 20px
  6: `${BASE * 6}px`,       // 24px
  8: `${BASE * 8}px`,       // 32px
  10: `${BASE * 10}px`,     // 40px
  12: `${BASE * 12}px`,     // 48px
  16: `${BASE * 16}px`,     // 64px
  20: `${BASE * 20}px`,     // 80px
  24: `${BASE * 24}px`,     // 96px
  32: `${BASE * 32}px`,     // 128px
} as const;

/** Component-level spacing aliases */
export const componentSpacing = {
  "page-gutter": spacing[4],     // 16px
  "page-gutter-lg": spacing[6],  // 24px
  "section-gap": spacing[16],    // 64px
  "card-padding": spacing[6],    // 24px
  "input-padding-x": spacing[4], // 16px
  "input-padding-y": spacing[3], // 12px
  "button-padding-x": spacing[6], // 24px
  "button-padding-y": spacing[3], // 12px
} as const;
