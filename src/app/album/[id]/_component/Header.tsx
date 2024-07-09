"use client"

import { cva } from "class-variance-authority"
import { useEffect, useState } from "react"

import { getAlbum } from "@/app/api/photo"
import { Icon } from "@/components"
import { albumType } from "@/types"
import { cn } from "@/utils"

export const Header = ({ albumId }: { albumId: string }) => {
  const [album, setAlbum] = useState<album | null>(null)

  useEffect(() => {
    const initAlbum = async (albumId: string) => {
      const data = await getAlbum(albumId)
      if (data) {
        setAlbum(() => data)
      }
    }
    initAlbum(albumId)
  }, [albumId])

  if (!album) {
    return <header className={cn(backgroundVariants())}></header>
  }

  return (
    <header className={cn(backgroundVariants({ type: album.type }))}>
      <Icon name="altArrowLeftOutline" size={28} />
      <div className="flex gap-1 text-title-2 font-bold text-gray-800">
        <Icon
          name={iconName[album.type]}
          color={iconColorStyle[album.type]}
          size={28}
        />
        {album.name}
      </div>
      <button className="text-body-1 font-medium text-red-600">삭제</button>
    </header>
  )
}

// css, types 등

const backgroundVariants = cva(
  "w-full h-14 p-4 py-[14px] flex justify-between items-center",
  {
    variants: {
      type: {
        HEART: "bg-red-200",
        FIRE: "bg-butter-200",
        BASKETBALL: "bg-green-200",
        BUILDING: "bg-blue-200",
        STARFALL: "bg-purple-200",
        SMILE_FACE: "bg-pink-200",
        false: "bg-transparent",
      },
    },
    defaultVariants: {
      type: false,
    },
  }
)
const iconName = {
  HEART: "heartAngleBold",
  FIRE: "fireBold",
  BASKETBALL: "basketballBold",
  BUILDING: "buildingsBold",
  STARFALL: "starFallMinimalisticBold",
  SMILE_FACE: "emojiFunnyCircleBold",
} as const
const iconColorStyle = {
  HEART: "red-500",
  FIRE: "orange-600",
  BASKETBALL: "green-700",
  BUILDING: "sky-blue-700",
  STARFALL: "purple-600",
  SMILE_FACE: "pink-600",
} as const
interface album {
  albumId: string
  name: string
  type: albumType
  photoCount: string
}
