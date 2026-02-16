/**
 * Color tokens — mirrors Figma "Colors" variable collection.
 *
 * Primitives are raw palette values.
 * Semantic tokens reference primitives via CSS custom properties
 * so they can be swapped for theming (light / dark).
 */

export const colorPrimitives = {
  brand: {
    50: "#f0f4ff",
    100: "#dbe4ff",
    200: "#bac8ff",
    300: "#91a7ff",
    400: "#748ffc",
    500: "#5c7cfa",
    600: "#4c6ef5",
    700: "#4263eb",
    800: "#3b5bdb",
    900: "#364fc7",
  },
  neutral: {
    0: "#ffffff",
    50: "#f8f9fa",
    100: "#f1f3f5",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#868e96",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },
  green: {
    50: "#ebfbee",
    100: "#d3f9d8",
    200: "#b2f2bb",
    300: "#8ce99a",
    400: "#69db7c",
    500: "#51cf66",
    600: "#40c057",
    700: "#37b24d",
    800: "#2f9e44",
    900: "#2b8a3e",
  },
  red: {
    50: "#fff5f5",
    100: "#ffe3e3",
    200: "#ffc9c9",
    300: "#ffa8a8",
    400: "#ff8787",
    500: "#ff6b6b",
    600: "#fa5252",
    700: "#f03e3e",
    800: "#e03131",
    900: "#c92a2a",
  },
} as const;

/** Semantic color roles — values are CSS custom-property references */
export const colorSemantic = {
  surface: {
    primary: "var(--color-neutral-0)",
    secondary: "var(--color-neutral-50)",
    brand: "var(--color-brand-600)",
    inverse: "var(--color-neutral-900)",
  },
  text: {
    primary: "var(--color-neutral-900)",
    secondary: "var(--color-neutral-600)",
    onBrand: "var(--color-neutral-0)",
    inverse: "var(--color-neutral-0)",
    link: "var(--color-brand-600)",
  },
  border: {
    default: "var(--color-neutral-200)",
    strong: "var(--color-neutral-400)",
    brand: "var(--color-brand-600)",
  },
  feedback: {
    success: "var(--color-green-600)",
    error: "var(--color-red-600)",
    successLight: "var(--color-green-50)",
    errorLight: "var(--color-red-50)",
  },
} as const;
