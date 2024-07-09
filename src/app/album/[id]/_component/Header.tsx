"use client"

import { cva } from "class-variance-authority"
import { useEffect, useState } from "react"

import { getAlbum } from "@/app/api/photo"
import { Icon } from "@/components"
import {
  ALBUM_TYPE_BACKGROUND_VARIANTS,
  ICON_COLOR_STYLE,
  ICON_NAME,
} from "@/constants"
import type { albumType } from "@/types"
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
          name={ICON_NAME[album.type]}
          color={ICON_COLOR_STYLE[album.type]}
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
      type: { ...ALBUM_TYPE_BACKGROUND_VARIANTS, false: "bg-transparent" },
    },
    defaultVariants: {
      type: false,
    },
  }
)

interface album {
  albumId: string
  name: string
  type: albumType
  photoCount: string
}
