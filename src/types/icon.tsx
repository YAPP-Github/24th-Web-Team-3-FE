export interface IconProps {
  width: number | string
  height?: number | string
  fill?: string
  className?: string
}

export interface TouchableIcon extends IconProps {
  onClick?: () => void
  role?: string
  tabIndex?: number
}
