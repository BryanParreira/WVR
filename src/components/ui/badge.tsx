import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Cursor badge-pill spec: surface-strong bg, ink text, caption-uppercase type, pill shape
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full",
  {
    variants: {
      variant: {
        // Default: surface-strong pill (Cursor badge-pill)
        default:
          "bg-surface-strong text-ink caption-uppercase px-[10px] py-1",
        // Outline hairline pill
        outline:
          "border border-hairline text-muted caption-uppercase px-[10px] py-1",
        // Primary tint — monochrome ink wash
        primary:
          "bg-ink/[0.06] text-ink border border-ink/[0.12] caption-uppercase px-[10px] py-1",
        // Semantic
        success:
          "bg-[rgba(31,138,101,0.08)] text-success border border-[rgba(31,138,101,0.16)] caption-uppercase px-[10px] py-1",
        error:
          "bg-[rgba(207,45,86,0.08)] text-error border border-[rgba(207,45,86,0.16)] caption-uppercase px-[10px] py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
