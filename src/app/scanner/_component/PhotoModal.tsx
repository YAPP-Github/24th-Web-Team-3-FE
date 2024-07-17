"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { PostQrCodeResponse } from "@/app/api/photo"
import Button from "@/common/Button"
import Icon from "@/common/Icon"

interface PhotoModalProps {
  scanInfo: PostQrCodeResponse
  onClose: () => void
}
const WIDTH = 240
const MIN_HEIGHT = 358

export const PhotoModal = ({ scanInfo, onClose }: PhotoModalProps) => {
  const { photoId, photoUrl } = scanInfo
  const router = useRouter()
  const [height, setHeight] = useState(MIN_HEIGHT)

  const onAlreadyExistAlbumBtnClick = () => {
    router.push(`/scanner/select-album?photoId=${photoId}`)
  }
  const onNewAlbumBtnClick = () => {
    router.push(`/album/create?photoId=${photoId}`)
  }

  const handleLoadingComplete = (
    naturalWidth: number,
    naturalHeight: number
  ) => {
    setHeight((WIDTH * naturalHeight) / naturalWidth)
  }

  return (
    <div className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-gray-800/50">
      <div className="relative flex w-[345px] flex-col items-center gap-3 rounded-3xl bg-white py-4">
        <h3 className="tp-title1-semibold w-full p-6 text-center">
          사진을 잘 가져왔어요!
          <br /> 어떤 앨범에 저장하시겠어요?
        </h3>
        <Image
          src={photoUrl}
          width={WIDTH}
          height={height}
          style={{ width: "auto", height: "auto" }}
          alt="scanner_image"
          onLoad={(e) => {
            handleLoadingComplete(
              e.currentTarget.naturalWidth,
              e.currentTarget.naturalHeight
            )
          }}
          priority
        />
        <div className="flex w-full gap-3 p-6 py-3">
          <Button
            variant="weak"
            onClick={onAlreadyExistAlbumBtnClick}
            className="w-full">
            이미 만든 앨범
          </Button>
          <Button onClick={onNewAlbumBtnClick} className="w-full">
            새 앨범 추가
          </Button>
        </div>
        <Icon
          name="closeCircleBold"
          size={36}
          color="gray-300"
          className="absolute right-3 top-3"
          onClick={onClose}
        />
      </div>
    </div>
  )
}
