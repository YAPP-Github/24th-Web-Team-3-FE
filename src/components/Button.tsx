import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { forwardRef } from "react"

import { cn } from "@/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[6px] whitespace-nowrap rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "text-white",
        weak: "",
      },
      theme: { green: "", red: "", gray: "" },
      size: {
        large: "h-14 px-6 text-body-1 font-bold",
        medium: "h-10 px-5 text-body-2 font-bold",
        small: "h-8 px-4 text-caption-1 font-bold",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        theme: "green",
        class: "bg-green-600",
      },
      {
        variant: "solid",
        theme: "red",
        class: "bg-red-600",
      },
      {
        variant: "weak",
        theme: "green",
        class: "bg-green-200 text-green-700",
      },
      {
        variant: "weak",
        theme: "red",
        class: "bg-red-200 text-red-600",
      },
      {
        variant: "weak",
        theme: "gray",
        class: "bg-gray-100 text-gray-600",
      },
      {
        variant: "solid",
        theme: "gray",
        class: "bg-gray-100 text-gray-600",
      },
    ],
    defaultVariants: {
      variant: "solid",
      theme: "green",
      size: "large",
    },
  }
)

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

export { Button }
