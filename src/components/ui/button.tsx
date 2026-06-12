import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base: Cursor-spec button — 14px/500, rounded-md (8px), no shadow
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
  {
    variants: {
      variant: {
        // Primary CTA — Cursor Orange analog: WVR deep cyan. Used scarcely.
        primary:
          "bg-primary text-on-primary hover:bg-primary-active rounded-[8px]",
        // Download/hero CTA — pill shape signals primary importance (Supabase convention)
        ink:
          "bg-ink text-canvas hover:bg-[#3d3b30] rounded-full",
        // Secondary — shadow-as-border (Vercel technique)
        secondary:
          "bg-surface text-ink [box-shadow:var(--shadow-border)] hover:bg-canvas-soft rounded-[8px]",
        // Ghost/text link
        ghost:
          "bg-transparent text-body hover:text-ink hover:bg-surface-strong rounded-[8px]",
        // Inline text link
        link:
          "bg-transparent text-ink underline underline-offset-4 hover:text-body p-0 h-auto",
        // Destructive
        destructive:
          "bg-error text-white hover:bg-[#b02748] rounded-[8px]",
      },
      size: {
        sm:      "h-8 px-3 text-[13px] gap-1.5",
        default: "h-10 px-[18px] text-[14px] gap-2",     // Cursor button spec: 40px
        lg:      "h-11 px-5 text-[14px] gap-2",           // download button: 44px
        xl:      "h-12 px-6 text-[15px] gap-2",
        icon:    "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
