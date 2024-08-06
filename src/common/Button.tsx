import { Slot } from "@radix-ui/react-slot"
import { VariantProps } from "class-variance-authority"
import * as React from "react"
import { forwardRef } from "react"

import { buttonVariants } from "@/styles/variants"
import { cn } from "@/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          className,
          "align-center relative inline-flex justify-center overflow-hidden",
          !disabled && "group"
        )}
        disabled={disabled}
        ref={ref}
        {...props}>
        <div className="absolute inset-0 bg-gray-100 opacity-0 mix-blend-multiply content-none group-active:opacity-100" />
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export default Button
