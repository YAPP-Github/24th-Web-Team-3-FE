"use client"

import { cva } from "class-variance-authority"
import { useEffect, useState } from "react"

import { myFetch } from "@/app/api"
import { Icon } from "@/components"
import { cn } from "@/utils"

export const Header = ({ albumId }: { albumId: string }) => {
  // 테스트용 앨범 정보, KAKAO로그인 로직과 병합 후 제거 예정
  const dummyAlbum = {
    name: "테스트용앨범",
    type: "yellow",
    photoCount: "6",
    albumId,
  } as const
  const [album, setAlbum] = useState<album | null>(null)

  useEffect(() => {
    // dev 머지 이후 api 폴더 내부로 이동 예정
    const getAlbum = async (albumId: string): Promise<album> => {
      const data = await myFetch(`/photo/v1/albums/${albumId}`, {
        method: "GET",
      })

      return data
    }

    const initAlbum = async (albumId: string) => {
      // 테스트용 로직, KAKAO로그인 로직과 병합 후 try & catch 제거 예정
      try {
        const data = await getAlbum(albumId)
        if (data) {
          setAlbum(() => data)
        }
      } catch (e) {
        setAlbum(() => dummyAlbum)
      }
    }
    initAlbum(albumId)
  }, [])

  if (!album) {
    return <header className={cn(backgroundVariants())}></header>
  }

  return (
    <header className={cn(backgroundVariants({ type: album.type }))}>
      <Icon name="altArrowLeftOutline" size={28} />
      <div className="flex gap-1 text-gray-800 text-title-2 font-bold">
        <Icon
          name={iconName[album.type]}
          color={iconColorStyle[album.type]}
          size={28}
        />
        {album.name}
      </div>
      <button className="text-red-600 text-body-1 font-medium">삭제</button>
    </header>
  )
}

// css, types 등

const backgroundVariants = cva(
  "w-full h-14 p-4 py-[14px] flex justify-between items-center",
  {
    variants: {
      type: {
        red: "bg-red-200",
        yellow: "bg-butter-200",
        green: "bg-green-200",
        blue: "bg-blue-200",
        purple: "bg-purple-200",
        pink: "bg-pink-200",
        false: "bg-transparent",
      },
    },
    defaultVariants: {
      type: false,
    },
  }
)
const iconName = {
  red: "heartAngleBold",
  yellow: "fireBold",
  green: "basketballBold",
  blue: "buildingsBold",
  purple: "starFallMinimalisticBold",
  pink: "emojiFunnyCircleBold",
} as const
const iconColorStyle = {
  red: "red-500",
  yellow: "orange-600",
  green: "green-700",
  blue: "sky-blue-700",
  purple: "purple-600",
  pink: "pink-600",
} as const
interface album {
  albumId: string
  name: string
  type: "red" | "yellow" | "green" | "blue" | "purple" | "pink"
  photoCount: string
}
