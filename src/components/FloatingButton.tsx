import { Button } from "@/components"

import { ButtonProps as FloatingButtonProps } from "./Button"

function FloatingButton({ className, ...props }: FloatingButtonProps) {
  return <Button className={`${className} rounded-full`} {...props} />
}

export { FloatingButton }
