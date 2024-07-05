import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const colorIconVariants = cva("flex items-center justify-center rounded-full", {
  variants: {
    iconColor: {
      red: "bg-red-500",
      yellow: "bg-orange-600",
      green: "bg-green-700",
      blue: "bg-blue-700",
      purple: "bg-purple-600",
      pink: "bg-pink-600",
    },
    size: {
      medium: "w-9 h-9",
      large: "w-[52px] h-[52px]",
    },
  },
  defaultVariants: {
    iconColor: "red",
    size: "medium",
  },
})

const iconSrc = {
  red: "heartAngleBold",
  yellow: "fireBold",
  green: "basketballBold",
  blue: "buildingsBold",
  purple: "starFallMinimalisticBold",
  pink: "emojiFunnyCircleBold",
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
    `@/assets/solar-icons/${iconSrc[iconColor || "red"]}.svg`
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
