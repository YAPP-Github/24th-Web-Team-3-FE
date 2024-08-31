"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { deleteAlbum } from "@/app/api/photo"
import Icon from "@/common/Icon"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { albumDetailHeaderVariants as headerVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumInfo } from "../../types"
import { Dialog } from "./Dialog"

interface HeaderProps {
  albumInfo: AlbumInfo
}

export const Header = ({ albumInfo }: HeaderProps) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const router = useRouter()

  const onDialogOpenClick = () => {
    setIsModalShown(() => true)
  }
  const onDialogCloseClick = () => {
    setIsModalShown(false)
  }

  const handleDeleteAlbum = async () => {
    await deleteAlbum(albumInfo.albumId)
    router.push("/album")
  }

  const dialogProps = {
    title: `'${albumInfo.name}' 앨범을 삭제할까요?`,
    desc: "모든 사진도 함께 삭제되며, 복구할 수 없어요",
    confirmBtnContext: "앨범 삭제",
    onClose: onDialogCloseClick,
    onConfirm: handleDeleteAlbum,
  }

  if (!albumInfo) {
    return <header className={cn(headerVariants())}></header>
  }

  return (
    <header className={cn(headerVariants({ type: albumInfo.type }))}>
      <button onClick={() => router.back()}>
        <Icon name="altArrowLeftOutline" size={28} />
      </button>
      <div className="tp-title2-semibold flex gap-1 text-gray-800">
        <Icon
          name={ICON_NAME[albumInfo.type]}
          color={ICON_COLOR_STYLE[albumInfo.type]}
          size={28}
        />
        {albumInfo.name}
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
