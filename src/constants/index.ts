export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&prompt=select_account`

export const ALBUM_TYPE_BACKGROUND_VARIANTS = {
  HEART: "bg-red-200",
  FIRE: "bg-butter-200",
  BASKETBALL: "bg-green-200",
  BUILDING: "bg-blue-200",
  STARFALL: "bg-purple-200",
  SMILE_FACE: "bg-pink-200",
} as const

export const ICON_NAME = {
  HEART: "heartAngleBold",
  FIRE: "fireBold",
  BASKETBALL: "basketballBold",
  BUILDING: "buildingsBold",
  STARFALL: "starFallMinimalisticBold",
  SMILE_FACE: "emojiFunnyCircleBold",
} as const

export const ICON_COLOR_STYLE = {
  HEART: "red-500",
  FIRE: "orange-600",
  BASKETBALL: "green-700",
  BUILDING: "sky-blue-700",
  STARFALL: "purple-600",
  SMILE_FACE: "pink-600",
} as const
