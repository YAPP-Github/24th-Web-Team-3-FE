import { signOut } from "next-auth/react"

import { quit } from "@/app/api/signIn"
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
    items: [
      {
        label: "1:1 문의",
        link: "https://forms.gle/kX9j7co6jLvbgWFr7",
      },
      {
        label: "서비스 이용약관",
        link: "https://chisel-promise-9ff.notion.site/7d80231fcdf040158d31e48e7cd570a2",
      },
      {
        label: "마푸를 소개해요",
        link: "/profile/introduction",
      },
      {
        label: "개발팀 소개",
        action: () => {
          alert(
            "아직 지원하는 기능이 아니에요. 다음 업데이트를 기다려주세요 😉"
          )
        },
      },
    ],
  },
  {
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
          confirm("정말 탈퇴하시겠어요?") &&
            quit().then(
              () => {
                signOut()
              },
              () => {
                alert("회원 탈퇴에 실패했어요 😉")
              }
            )
        },
      },
    ],
  },
]

export const ACCESS_TOKEN_KEY = "connect.sid"

export const MAFOO_KEYWORDS = [
  "인생네컷",
  "포토이즘",
  "하루필름",
  "인생네컷 앨범",
  "인생네컷 정리",
  "인생네컷 보관",
  "즉석사진 앨범",
  "인생네컷 앨범 서비스",
  "앨범 서비스",
  "모바일 앨범",
]
