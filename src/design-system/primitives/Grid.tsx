import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns (default: 12, matching Figma) */
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  /** Gap between columns (default: 8 = 32px, matching Figma gutter) */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
} as const;

const gapMap = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",   // 32px - Figma gutter
  10: "gap-10", // 40px
  12: "gap-12", // 48px
} as const;

/**
 * Grid component for 12-column layout matching Figma design system.
 *
 * Defaults to 12 columns with 32px gutter (matching Figma spec).
 *
 * Usage:
 * ```tsx
 * <Grid>
 *   <GridItem span={6}>Half width</GridItem>
 *   <GridItem span={6}>Half width</GridItem>
 * </Grid>
 * ```
 */
const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 12, gap = 8, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid", colsMap[cols], gapMap[gap], className)}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Responsive column span for small screens and up */
  spanSm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Responsive column span for medium screens and up */
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Responsive column span for large screens and up */
  spanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const spanMap = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
} as const;

/**
 * Grid item component for controlling column span.
 *
 * Usage:
 * ```tsx
 * <GridItem span={12} spanMd={6} spanLg={4}>
 *   Full width on mobile, half on tablet, third on desktop
 * </GridItem>
 * ```
 */
const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span = 12, spanSm, spanMd, spanLg, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          spanMap[span],
          spanSm && `sm:${spanMap[spanSm]}`,
          spanMd && `md:${spanMap[spanMd]}`,
          spanLg && `lg:${spanMap[spanLg]}`,
          className
        )}
        {...props}
      />
    );
  }
);

GridItem.displayName = "GridItem";

export { Grid, GridItem };
