import Image from "next/image";
import { cn } from "@/lib/utils";

interface YunityLogoProps {
  /**
   * Width of the logo in pixels (height auto-scales to maintain aspect ratio)
   * @default 380
   */
  width?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Yunity Logo — official brand asset
 * Exported from Figma design system (node: I442:2436;4636:125) as PNG @2x
 * Original dimensions: 380×178px (aspect ratio ~2.13:1)
 * 
 * ⚠️ This is a brand identity asset - do not modify or recreate
 * 
 * Usage:
 * ```tsx
 * <YunityLogo width={380} />
 * <YunityLogo width={280} className="sm:w-96" />
 * ```
 */
export function YunityLogo({ width = 380, className }: YunityLogoProps) {
  // Calculate height maintaining aspect ratio (380:178 = ~2.13:1)
  const height = Math.round(width * (178 / 380));
  
  return (
    <Image
      src="/YuniversalDraft/images/yunity-logo.png"
      alt="Yunity"
      width={width}
      height={height}
      className={cn("flex-shrink-0", className)}
      priority
    />
  );
}
