import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full py-1 px-[10px] text-white font-bold",
  {
    variants: {
      variant: {
        default: "bg-gradient-purple text-caption-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={`${cn(badgeVariants({ variant }), className)}`}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
