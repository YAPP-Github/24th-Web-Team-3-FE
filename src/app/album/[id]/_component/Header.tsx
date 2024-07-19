"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import Icon from "@/common/Icon"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { albumDetailHeaderVariants as headerVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { useDeleteAlbum, useGetAlbum } from "../../create/hooks/useAlbum"
import { Dialog } from "./Dialog"

export const Header = ({ albumId }: { albumId: string }) => {
  const { albumInfo } = useGetAlbum(albumId)
  const { deleteAlbum } = useDeleteAlbum()
  const [isModalShown, setIsModalShown] = useState(false)
  const router = useRouter()

  const onDialogOpenClick = () => {
    setIsModalShown(() => true)
  }
  const onDialogCloseClick = () => {
    setIsModalShown(false)
  }

  const handleDeleteAlbum = async () => {
    deleteAlbum({ albumId: albumInfo.albumId })
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

  const { type, name } = albumInfo

  return (
    <header className={cn(headerVariants({ type }))}>
      <button onClick={() => router.push("/album")}>
        <Icon name="altArrowLeftOutline" size={28} />
      </button>
      <div className="flex gap-1 text-title-2 font-bold text-gray-800">
        <Icon name={ICON_NAME[type]} color={ICON_COLOR_STYLE[type]} size={28} />
        {name}
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
