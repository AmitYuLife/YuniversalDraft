import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SliderCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Card index for animations */
  index?: number;
}

/**
 * SliderCard — Individual card for horizontal scroll slider
 * 
 * Figma specifications (node 480:1372):
 *   - Desktop: 904px × 678px
 *   - Padding: 80px all around (p-20) on desktop, 40px (p-10) on mobile
 *   - Gap: 24px between title and description (gap-6)
 *   - Background: brand-900 purple (#290163)
 *   - Text: white, left-aligned
 *   - Corner radius: 16px (rounded-lg)
 *   - Title: text-h3 (56px), Berlingske Serif Bold
 *   - Description: text-body-lg (24px), Lota Grotesque Regular
 *   - Content alignment: Bottom left (justify-end)
 * 
 * Responsive:
 *   - Mobile: 280px × 400px, p-10, smaller gap
 *   - Tablet: 500px × 500px, p-16
 *   - Desktop: 904px × 678px, p-20
 */
export function SliderCard({
  title,
  description,
  index,
  className,
  ...props
}: SliderCardProps) {
  return (
    <div
      className={cn(
        "flex-none flex flex-col justify-end gap-4 sm:gap-6",
        "w-[280px] h-[400px] p-10",
        "sm:w-[500px] sm:h-[500px] sm:p-16",
        "lg:w-[904px] lg:h-[678px] lg:p-20",
        "rounded-lg bg-brand-900",
        className
      )}
      {...props}
    >
      <h3 className="font-heading text-h3 font-bold text-white">
        {title}
      </h3>
      <p className="text-body-lg text-white">
        {description}
      </p>
    </div>
  );
}
