import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * Size of the logo (width & height in pixels)
   * @default 80
   */
  size?: number;
  /**
   * Color of the logo
   * @default "currentColor"
   */
  color?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * YuLife Logo — rounded square with "YU" wordmark
 * Extracted from Figma design system (node: 442:2010)
 * 
 * Usage:
 * ```tsx
 * <Logo size={80} color="white" />          // Hero section
 * <Logo size={40} color="var(--color-brand-600)" /> // Header
 * ```
 */
export function Logo({ size = 80, color = "currentColor", className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="YuLife"
      className={cn("flex-shrink-0", className)}
    >
      <path
        d="M76.8 0H3.2C1.44 0 0 1.44 0 3.2V76.8C0 78.56 1.44 80 3.2 80H76.8C78.56 80 80 78.56 80 76.8V3.2C80 1.44 78.56 0 76.8 0ZM22.96 64.72H17.88C17.88 64.72 22.92 52.96 23.48 51.56L12.44 25.28H17.72L26.04 45.64L34.36 25.28H39.68L22.96 64.72ZM67.12 42.12C67.12 52.76 60.2 54 55 54C46.72 54 42.88 50.24 42.88 42.12V25.28H47.72V42.12C47.72 45.48 48.56 49.32 55 49.32C61.44 49.32 62.28 45.48 62.28 42.12V25.28H67.12V42.12Z"
        fill={color}
      />
    </svg>
  );
}
