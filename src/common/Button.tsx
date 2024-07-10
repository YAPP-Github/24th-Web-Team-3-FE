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
  (
    {
      className,
      variant,
      size,
      theme,
      disabled,
      type = "button",
      asChild = false,
      children,
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
        disabled={disabled}
        ref={ref}
        type={type}
        {...props}>
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export default Button
