"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { AddImageDialog } from "@/app/album/[id]/_component/AddImageDialog"
import Button from "@/common/Button"
import Icon from "@/common/Icon"

interface PhotoAddButtonProps {
  albumId: string
  onImageUploaded: () => void
}

export const PhotoAddButton = ({
  albumId,
  onImageUploaded,
}: PhotoAddButtonProps) => {
  const router = useRouter()
  const [isAddDialogShow, setIsAddDialogShow] = useState(false)
  const onTapQrScan = () => {
    router.push(`/scanner?albumId=${albumId}`)
  }
  const onClickAdd = () => {
    setIsAddDialogShow(true)
  }
  const onTapBackdrop = () => {
    setIsAddDialogShow(false)
  }

  return (
    <>
      <Button
        onClick={onClickAdd}
        className="aspect-square w-full overflow-hidden rounded-xl">
        <div className="mb-[13px] flex aspect-square w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-100">
          <Icon name="galleryAddOutline" size={56} color="gray-300" />
        </div>
      </Button>
      <AddImageDialog
        currentAlbumId={albumId}
        isVisible={isAddDialogShow}
        onTapQrScan={onTapQrScan}
        onTapBackdrop={onTapBackdrop}
        onImageUploaded={onImageUploaded}
      />
    </>
  )
}
