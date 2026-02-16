import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the container */
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-2xl",    // 672px
  md: "max-w-4xl",    // 896px
  lg: "max-w-6xl",    // 1152px
  xl: "max-w-7xl",    // 1280px
} as const;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10",
          // Mobile: 16px, Tablet: 24px, Desktop: 32px, Large: 40px (Figma spec)
          sizeMap[size],
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };
