import { Slot } from "@radix-ui/react-slot"
import { VariantProps } from "class-variance-authority"
import * as React from "react"
import { forwardRef } from "react"

import { buttonVariants } from "@/styles/variants"
import { cn } from "@/utils"

export interface SquareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const SquareButton = forwardRef<HTMLButtonElement, SquareButtonProps>(
  (
    {
      className,
      variant,
      size,
      theme,
      disabled,
      type = "button",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, theme }),
          className,
          disabled && "bg-gray-100 text-gray-400"
        )}
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
      />
    )
  }
)
SquareButton.displayName = "SquareButton"

export default SquareButton
