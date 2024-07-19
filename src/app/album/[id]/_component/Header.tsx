"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { getAlbum } from "@/app/api/photo"
import { deleteAlbum } from "@/app/api/photo"
import Icon from "@/common/Icon"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { albumDetailHeaderVariants as headerVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumInfo } from "../../types"
import { Dialog } from "./Dialog"

export const Header = ({ albumId }: { albumId: string }) => {
  const [album, setAlbum] = useState<AlbumInfo | null>(null)
  const [isModalShown, setIsModalShown] = useState(false)
  const router = useRouter()

  const onDialogOpenClick = () => {
    setIsModalShown(() => true)
  }
  const onDialogCloseClick = () => {
    setIsModalShown(false)
  }

  const handleDeleteAlbum = async () => {
    await deleteAlbum(album!.albumId)
    router.push("/album")
  }

  const dialogProps = {
    title: `'${album?.name}' 앨범을 삭제할까요?`,
    desc: "모든 사진도 함께 삭제되며, 복구할 수 없어요",
    confirmBtnContext: "앨범 삭제",
    onClose: onDialogCloseClick,
    onConfirm: handleDeleteAlbum,
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
      <div className="tp-title2-semibold flex gap-1 text-gray-800">
        <Icon
          name={ICON_NAME[album.type]}
          color={ICON_COLOR_STYLE[album.type]}
          size={28}
        />
        {album.name}
      </div>
      <button
        className="tp-body1-regular text-red-600"
        onClick={onDialogOpenClick}>
        삭제
      </button>
      {isModalShown && <Dialog {...dialogProps} />}
    </header>
  )
}
