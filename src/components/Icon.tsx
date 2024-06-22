import { ComponentProps } from "react"

import type { iconTypes } from "@/types"

interface IconProps extends ComponentProps<"svg"> {
  name: iconTypes
  size: 16 | 20 | 24 | 28 | 36 | 44 | 56 | 64
  color?: `${string}-${number}` | `${string}-${string}-${number}`
}

/**
 *
 * @param name 아이콘 이름과 타입 ex) heartAngleBold
 * @param size 아이콘 크기 ex) 16
 * @param color 아이콘에 적용할 컬러 ex) gray/600 -> gray-600 (기본값)
 */
export default function Icon({
  name,
  size,
  color = "gray-600",
  ...props
}: IconProps) {
  const SvgIcon = require(`@/assets/solar-icons/${name}.svg`).default

  return (
    <SvgIcon
      width={size}
      height={size}
      className={color ? `fill-${color}` : "fill-gray-600"}
      {...props}
    />
  )
}
