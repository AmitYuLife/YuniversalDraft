import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  /* Base styles shared by all variants */
  "inline-flex items-center justify-center gap-2 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-surface-brand text-text-on-brand hover:bg-brand-700 active:bg-brand-800",
        secondary:
          "border border-border-default bg-surface-primary text-text-primary hover:bg-surface-secondary active:bg-neutral-100",
        ghost:
          "text-text-primary hover:bg-surface-secondary active:bg-neutral-100",
        "hero-primary":
          "bg-white text-brand-900 hover:bg-white/90",
      },
      size: {
        sm: "h-9 rounded-md px-4 text-sm",
        md: "h-11 rounded-lg px-6 text-base",
        lg: "h-13 rounded-lg px-8 text-lg",
        xl: "h-16 rounded-lg px-8 text-body-lg sm:h-20 sm:px-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if ("href" in props && props.href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
