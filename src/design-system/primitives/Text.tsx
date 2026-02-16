import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      // H1-H6 — Standard web hierarchy (responsive)
      h1: "font-heading text-h1 font-bold tracking-[-0.02em]",
      h2: "font-heading text-h2 font-bold tracking-[-0.02em]",
      h3: "font-heading text-h3 font-bold tracking-[-0.02em]",
      h4: "font-heading text-h4 font-bold tracking-[-0.01em]",
      h5: "font-heading text-h5 font-bold tracking-[-0.01em]",
      h6: "font-heading text-h6 font-bold tracking-[-0.01em]",
      
      // Legacy variants (deprecated — use h1-h6 instead)
      "heading-xl":
        "font-heading text-5xl font-bold leading-[1.2] tracking-[-0.02em]",
      "heading-lg":
        "font-heading text-4xl font-bold leading-[1.2] tracking-[-0.02em]",
      "heading-md":
        "font-heading text-h6 font-bold tracking-[-0.01em]",
      "heading-sm":
        "font-heading text-2xl font-bold leading-[1.35] tracking-[-0.01em]",
      
      // Body text
      "body-lg": "font-body text-lg font-normal leading-normal",
      "body-md": "font-body text-base font-normal leading-normal",
      "body-sm": "font-body text-sm font-normal leading-normal",
      caption: "font-body text-xs font-medium leading-normal tracking-[0.01em]",
    },
    color: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      onBrand: "text-text-on-brand",
      inverse: "text-text-inverse",
      link: "text-text-link",
      inherit: "text-inherit",
    },
  },
  defaultVariants: {
    variant: "body-md",
    color: "primary",
  },
});

/** Maps text variant to sensible default HTML element */
const defaultTagMap: Record<string, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  "heading-xl": "h1",
  "heading-lg": "h2",
  "heading-md": "h6",
  "heading-sm": "h4",
  "body-lg": "p",
  "body-md": "p",
  "body-sm": "p",
  caption: "span",
};

export interface TextProps
  extends Omit<HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  /** Override the rendered HTML element */
  as?: ElementType;
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, variant, color, as, ...props }, ref) => {
    const Tag = as ?? defaultTagMap[variant ?? "body-md"] ?? "p";

    return (
      <Tag
        ref={ref}
        className={cn(textVariants({ variant, color, className }))}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
