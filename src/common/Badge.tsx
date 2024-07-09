import { type VariantProps } from "class-variance-authority"
import * as React from "react"

import { BADGE_STYLES } from "@/constants/styles"
import { cn } from "@/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof BADGE_STYLES> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={`${cn(BADGE_STYLES({ variant }), className)}`} {...props} />
  )
}

export default Badge
