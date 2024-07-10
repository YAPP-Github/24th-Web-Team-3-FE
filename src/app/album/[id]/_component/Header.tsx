"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { getAlbum } from "@/app/api/photo"
import Icon from "@/common/Icon"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { albumDetailHeaderVariants as headerVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumInfo } from "../../types"
import { DeleteDialog } from "./DeleteDialog"

export const Header = ({ albumId }: { albumId: string }) => {
  const [album, setAlbum] = useState<AlbumInfo | null>(null)
  const [isModalShown, setIsModalShown] = useState(false)
  const router = useRouter()

  const onDialogOpenClick = () => {
    setIsModalShown(() => true)
  }
  const onDialogCloseClick = () => {
    setIsModalShown(() => false)
  }

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
    return <header className={cn(headerVariants())}></header>
  }

  return (
    <header className={cn(headerVariants({ type: album.type }))}>
      <button onClick={() => router.push("/album")}>
        <Icon name="altArrowLeftOutline" size={28} />
      </button>
      <div className="flex gap-1 text-title-2 font-bold text-gray-800">
        <Icon
          name={ICON_NAME[album.type]}
          color={ICON_COLOR_STYLE[album.type]}
          size={28}
        />
        {album.name}
      </div>
      <button
        className="text-body-1 font-medium text-red-600"
        onClick={onDialogOpenClick}>
        삭제
      </button>
      {isModalShown && (
        <DeleteDialog albumInfo={album} onClose={onDialogCloseClick} />
      )}
    </header>
  )
}
