"use client"

import Image from "next/image"
import { useState } from "react"

import Button from "@/common/Button"
import Icon from "@/common/Icon"

import { PhotoInfo } from "../../types"

interface ImageDetailProps {
  photos: PhotoInfo[]
  startIdx: number
  onClose: () => void
}

export const ImageDetail = ({
  photos,
  startIdx,
  onClose,
}: ImageDetailProps) => {
  const [idx] = useState(startIdx)

  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw justify-center bg-gray-900">
      <div className="flex w-full max-w-[390px] flex-col">
        <header className="tp-body1-regular flex w-full items-center justify-between p-4 py-[14px]">
          <Icon
            name="altArrowLeftOutline"
            size={28}
            color="white"
            onClick={onClose}
          />
          <span className="text-white">
            {idx + 1} / {photos.length}
          </span>
          <button className="text-red-600">삭제</button>
        </header>
        <div className="relative flex h-20 w-full flex-1 items-center justify-center border-2 border-pink-500 p-6">
          <Image
            src={photos[idx].photoUrl}
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="w-full p-6 pb-11 pt-3">
          <Button color="green" disabled className="w-full">
            <Icon name="downloadBold" size={28} color="white" />
            <span className="mr-[6px]">다운로드 받기</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
