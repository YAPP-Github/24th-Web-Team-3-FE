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
    if (children) {
      return (
        <Comp
          className={cn(
            className,
            disabled && "bg-gray-100 text-gray-400",
            "align-center group relative inline-flex justify-center"
          )}
          disabled={disabled}
          ref={ref}
          {...props}>
          <div className="absolute inset-0 bg-gray-100 opacity-0 mix-blend-multiply content-none group-active:opacity-100" />
          {children}
        </Comp>
      )
    }
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
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export default Button
