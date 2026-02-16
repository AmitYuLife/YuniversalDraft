/**
 * Design tokens barrel export.
 *
 * All token values originate from Figma variable collections
 * and are consumed by Tailwind (via CSS custom properties in globals.css)
 * and by component variants directly.
 */

export { colorPrimitives, colorSemantic } from "./colors";
export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
} from "./typography";
export { spacing, componentSpacing } from "./spacing";
export { radii } from "./radii";
export { shadows } from "./shadows";
