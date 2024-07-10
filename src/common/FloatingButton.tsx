import Button, { ButtonProps as FloatingButtonProps } from "./Button"

const FloatingButton = ({ className, ...props }: FloatingButtonProps) => {
  return <Button className={`${className} rounded-full`} {...props} />
}

export default FloatingButton
