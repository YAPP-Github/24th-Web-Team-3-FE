import { ComponentProps } from "react"

export type IconTypes =
  | "basketballBold"
  | "buildingsBold"
  | "emojiFunnyCircleBold"
  | "fireBold"
  | "heartAngleBold"
  | "starFallMinimalisticBold"
  | "altArrowLeftOutline"
  | "galleryAddOutline"
  | "kakaoLogo"
  | "albumOutline"
  | "albumBold"
  | "scannerOutline"
  | "userCircleOutline"
  | "userCircleBold"
  | "widgetAddOutline"
  | "downloadBold"

export interface IconProps extends ComponentProps<"svg"> {
  name: IconTypes
  size: 16 | 20 | 24 | 28 | 36 | 44 | 56 | 64
  color?: string
}

/**
 *
 * @param name 아이콘 이름과 타입 ex) heartAngleBold
 * @param size 아이콘 크기 ex) 16
 * @param color 아이콘에 적용할 컬러 ex) gray/600 -> gray-600 (기본값)
 */
const Icon = ({ name, size, color = "gray-600", ...props }: IconProps) => {
  const SvgIcon = require(`@/assets/${name}.svg`).default

  return (
    <SvgIcon
      width={size}
      height={size}
      className={color ? `fill-${color}` : "fill-gray-600"}
      {...props}
    />
  )
}

export default Icon
