"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { PhotoInfo } from "@/app/album/types"
import Button from "@/common/Button"
import Icon from "@/common/Icon"

interface PhotoModalProps {
  photo: PhotoInfo
  onClose: () => void
}

export const PhotoModal = ({ photo, onClose }: PhotoModalProps) => {
  const { photoId, photoUrl } = photo
  const router = useRouter()
  const WIDTH = 240
  const [height, setHeight] = useState(358)

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
        <div className="relative p-4">
          <Image
            src={photoUrl}
            width={WIDTH}
            height={height}
            alt=""
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              handleLoadingComplete(naturalWidth, naturalHeight)
            }
            priority
          />
        </div>
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
