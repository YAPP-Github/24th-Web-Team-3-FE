import SquareButton, {
  ButtonProps as FloatingButtonProps,
} from "./SquareButton"

const FloatingButton = ({ className, ...props }: FloatingButtonProps) => {
  return <SquareButton className={`${className} rounded-full`} {...props} />
}

export default FloatingButton
