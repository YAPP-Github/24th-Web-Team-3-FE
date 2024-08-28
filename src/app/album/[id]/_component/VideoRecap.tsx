"use client"

import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"

interface ImageRecapProps {
  url: string
}

const ImageRecap = ({ url }: ImageRecapProps) => {
  return (
    <>
      <div className="fixed left-0 top-0 z-10 h-dvh w-dvw justify-center overflow-auto bg-gray-900">
        <video src={url} controls></video>
      </div>
      <div className="w-full p-6 pb-11 pt-3">
        <SquareButton color="green" className="w-full">
          <Icon name="downloadBold" size={28} color="white" />
          <span className="mr-[6px]">다운로드 받기</span>
        </SquareButton>
      </div>
    </>
  )
}
export default ImageRecap
