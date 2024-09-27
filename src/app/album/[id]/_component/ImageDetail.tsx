"use client"

import Image from "next/image"
import { useState } from "react"
import PinchZoomPan from "react-responsive-pinch-zoom-pan"
import Slider from "react-slick"

import { myFetch } from "@/app/api/myfetch"
import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import { fullDateStr } from "@/utils"

import { PhotoInfo } from "../../types"
import { Dialog } from "./Dialog"

interface ImageDetailProps {
  photos: PhotoInfo[]
  startIdx: number
  onClose: () => void
  onDelete: (photoIdx: number) => Promise<void>
}

export const ImageDetail = ({
  photos,
  startIdx,
  onClose,
  onDelete,
}: ImageDetailProps) => {
  const [idx, setIdx] = useState(startIdx)
  const [deleteModalShown, setDeleteModalShown] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false) // 확대 상태 관리
  const sliderSettings = {
    infinite: true,
    arrows: false,
    beforeChange: (_: number, newIdx: number) => setIdx(newIdx),
    initialSlide: startIdx,
  }
  const handleDownload = async (imageUrl: string) => {
    const res = await myFetch(imageUrl, {
      method: "GET",
      headers: {
        "Content-Type": "image/jpeg",
        Authorization: "null",
      },
    })

    const url = URL.createObjectURL(res)
    const a = document.createElement("a")
    a.href = url
    a.download = `mafoo_${fullDateStr()}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url) // Object URL 해제
  }

  const onDeleteBtnClick = () => {
    setDeleteModalShown(true)
  }

  const handleDelete = async () => {
    await onDelete(idx)
    setDeleteModalShown(false)
    onClose()
  }

  const dialogProps = {
    title: "해당 사진을 삭제할까요?",
    desc: "한 번 삭제하면 복구할 수 없어요.",
    confirmBtnContext: "사진 삭제",
    onClose: () => setDeleteModalShown(false),
    onConfirm: handleDelete,
  }

  // 확대 모드에서 빠져나오는 핸들러
  const handleZoomOut = () => {
    setIsZoomed(false)
  }

  // 이미지 클릭 시 확대 모드로 들어가는 핸들러
  const handleImageClick = () => {
    setIsZoomed(true)
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-10 flex h-dvh w-dvw justify-center bg-gray-900">
        <div className="flex w-full max-w-[390px] flex-col">
          <header className="tp-body1-regular flex w-full items-center justify-between p-4 py-[14px]">
            <button onClick={onClose}>
              <Icon name="altArrowLeftOutline" size={28} color="white" />
            </button>
            <span className="text-white">
              {idx + 1} / {photos.length}
            </span>
            <button className="text-red-600" onClick={onDeleteBtnClick}>
              삭제
            </button>
          </header>
          <div className="flex h-1 w-full flex-1 items-center justify-center">
            <Slider {...sliderSettings} className="h-full w-full">
              {photos.map((photo) => (
                <div
                  className="relative flex h-full w-full items-center justify-center"
                  key={photo.photoId}
                  onClick={handleImageClick} // 이미지 클릭 시 확대 모드 진입
                >
                  <Image
                    src={photo.photoUrl}
                    alt={`mafoo_${photo.photoId}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full p-6 pb-11 pt-3">
            <SquareButton
              color="green"
              className="w-full"
              onClick={() => handleDownload(photos[idx].photoUrl)}>
              <Icon name="downloadBold" size={28} color="white" />
              <span className="mr-[6px]">다운로드 받기</span>
            </SquareButton>
          </div>
        </div>
      </div>

      {isZoomed && ( // 확대 모드일 때만 모달 표시
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-80">
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={handleZoomOut}
          />
          <div className="relative z-0 h-full max-h-[90%] w-full max-w-[90%]">
            <PinchZoomPan zoomButtons={false}>
              <Image
                src={photos[idx].photoUrl}
                alt={`zoomed_${photos[idx].photoId}`}
                fill
                className="object-contain"
              />
            </PinchZoomPan>
          </div>
          ㅋㅋ{" "}
        </div>
      )}

      {deleteModalShown && <Dialog {...dialogProps} />}
    </>
  )
}
