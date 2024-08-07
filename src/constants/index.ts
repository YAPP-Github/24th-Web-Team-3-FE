import { signOut } from "next-auth/react"

import { ListItemProps } from "@/app/profile/_components/ListItem"

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
        action: () => {
          signOut()
        },
      },
      {
        label: "탈퇴하기",
        action: () => {
          alert(
            "아직 지원하는 기능이 아니에요. 다음 업데이트를 기다려주세요 😉"
          )
        },
      },
    ],
  },
  {
    title: "기타",
    items: [
      {
        label: "개발팀 소개",
        action: () => {
          alert(
            "아직 지원하는 기능이 아니에요. 다음 업데이트를 기다려주세요 😉"
          )
        },
        // link: "/",
      },
      {
        label: "1:1 문의",
        link: "https://forms.gle/kX9j7co6jLvbgWFr7",
      },
      {
        label: "서비스 이용약관",
        action: () => {
          alert(
            "아직 지원하는 기능이 아니에요. 다음 업데이트를 기다려주세요 😉"
          )
        },
        // link: "/",
      },
    ],
  },
]

export const ACCESS_TOKEN_KEY = "connect.sid"
