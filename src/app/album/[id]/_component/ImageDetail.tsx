"use client"

import Image from "next/image"
import { useState } from "react"
import Slider from "react-slick"

import Button from "@/common/Button"
import Icon from "@/common/Icon"
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
  const sliderSettings = {
    infinite: true,
    arrows: false,
    beforeChange: (_: number, newIdx: number) => setIdx(newIdx),
    initialSlide: startIdx,
  }
  const handleDownload = async (imageUrl: string) => {
    const res = await fetch(imageUrl)
    const blob = await res.blob()

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `mafoo_${fullDateStr()}.jpg` // 다운로드될 파일명 설정
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url) // Object URL 해제
  }

  const onDeleteBtnClick = () => {
    setDeleteModalShown(() => true)
  }

  const handleDelete = async () => {
    await onDelete(idx)
    setDeleteModalShown(() => false)
  }

  const dialogProps = {
    title: "해당 사진을 삭제할까요?",
    desc: "한 번 삭제하면 복구할 수 없어요.",
    confirmBtnContext: "사진 삭제",
    onClose: () => setDeleteModalShown(() => false),
    onConfirm: handleDelete,
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-10 flex h-dvh w-dvw justify-center bg-gray-900">
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
            <button className="text-red-600" onClick={onDeleteBtnClick}>
              삭제
            </button>
          </header>
          <div className="flex h-1 w-full flex-1 items-center justify-center">
            <Slider {...sliderSettings} className="h-full w-full">
              {photos.map((photo) => (
                <div
                  className="relative flex h-full w-full items-center justify-center"
                  key={photo.photoId}>
                  <Image
                    src={photo.photoUrl}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full p-6 pb-11 pt-3">
            <Button
              color="green"
              className="w-full"
              onClick={() => handleDownload(photos[idx].photoUrl)}>
              <Icon name="downloadBold" size={28} color="white" />
              <span className="mr-[6px]">다운로드 받기</span>
            </Button>
          </div>
        </div>
      </div>
      {deleteModalShown && <Dialog {...dialogProps} />}
    </>
  )
}
