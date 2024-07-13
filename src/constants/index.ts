import { ListItemProps } from "@/app/profile/_components/ListItem"

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&prompt=select_account`

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

export const LIST_ITEM_INFO: ListItemProps[] = [
  {
    title: "설정",
    items: [
      {
        label: "로그아웃",
        actionType: "link",
        link: "/",
      },
      {
        label: "탈퇴하기",
        actionType: "button",
        action: async () => {
          await setTimeout(() => {
            alert("탈퇴 성공")
          }, 100)
        },
      },
    ],
  },
  {
    title: "기타",
    items: [
      {
        label: "개발팀 소개",
        actionType: "link",
        link: "/",
      },
      {
        label: "1:1 스파링",
        actionType: "link",
        link: "/",
      },
      {
        label: "서비스 이용약관",
        actionType: "link",
        link: "/",
      },
    ],
  },
]
