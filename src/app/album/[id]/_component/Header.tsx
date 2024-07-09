"use client"

import { useEffect, useState } from "react"

import { getAlbum } from "@/app/api/photo"
import Icon from "@/common/Icon"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { HEADER_STYLES } from "@/constants/styles"
import { cn } from "@/utils"

import { AlbumType } from "../../types"

interface Album {
  albumId: string
  name: string
  type: AlbumType
  photoCount: string
}

export const Header = ({ albumId }: { albumId: string }) => {
  const [album, setAlbum] = useState<Album | null>(null)

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
    return <header className={cn(HEADER_STYLES)}></header>
  }

  return (
    <header className={cn(HEADER_STYLES({ type: album.type }))}>
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
