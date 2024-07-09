import { VariantProps } from "class-variance-authority"

import { ICON_NAME } from "@/constants"
import { COLOR_ICON_STYLES } from "@/constants/styles"
import { cn } from "@/utils"

const iconSize = {
  medium: 24,
  large: 36,
} as const

export interface ColorIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof COLOR_ICON_STYLES> {}

/**
 *
 * @param size 아이콘의 크기 (기본값: "red")
 * @param iconColor 아이콘의 배경색 (기본값: "medium")
 */
const ColorIcon = ({
  size,
  iconColor,
  className,
  ...props
}: ColorIconProps) => {
  const SvgIcon = require(
    `@/assets/${ICON_NAME[iconColor || "HEART"]}.svg`
  ).default

  return (
    <div
      className={`${cn(COLOR_ICON_STYLES({ size, iconColor }), className)}`}
      {...props}>
      <SvgIcon
        width={iconSize[size || "medium"]}
        height={iconSize[size || "medium"]}
        className="fill-white"
      />
    </div>
  )
}

export default ColorIcon
