import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const colorIconVariants = cva("flex items-center justify-center rounded-full", {
  variants: {
    iconColor: {
      HEART: "bg-red-500",
      FIRE: "bg-orange-600",
      BASKETBALL: "bg-green-700",
      BUILDING: "bg-blue-700",
      STARFALL: "bg-purple-600",
      SMILE_FACE: "bg-pink-600",
    },
    size: {
      medium: "w-9 h-9",
      large: "w-[52px] h-[52px]",
    },
  },
  defaultVariants: {
    iconColor: "HEART",
    size: "medium",
  },
})

const iconSrc = {
  HEART: "heartAngleBold",
  FIRE: "fireBold",
  BASKETBALL: "basketballBold",
  BUILDING: "buildingsBold",
  STARFALL: "starFallMinimalisticBold",
  SMILE_FACE: "emojiFunnyCircleBold",
}

const iconSize = {
  medium: 24,
  large: 34.67,
}

export interface ColorIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof colorIconVariants> {}

/**
 *
 * @param size 아이콘의 크기 (기본값: "red")
 * @param iconColor 아이콘의 배경색 (기본값: "medium")
 */
function ColorIcon({ size, iconColor, className, ...props }: ColorIconProps) {
  const SvgIcon = require(
    `@/assets/solar-icons/${iconSrc[iconColor || "HEART"]}.svg`
  ).default

  return (
    <div
      className={`${cn(colorIconVariants({ size, iconColor }), className)}`}
      {...props}>
      <SvgIcon
        width={iconSize[size || "medium"]}
        height={iconSize[size || "medium"]}
        className="fill-white"
      />
    </div>
  )
}

export { ColorIcon, colorIconVariants }
