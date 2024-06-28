import { Button } from "@/components"

import { ButtonProps } from "./Button"

export interface FloatingButtonProps extends ButtonProps {}

function FloatingButton({ className, ...props }: FloatingButtonProps) {
  return <Button className={`${className} rounded-full`} {...props} />
}

export { FloatingButton }
