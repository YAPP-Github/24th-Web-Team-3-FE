"use client"

import { useRouter } from "next/navigation"

import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"

import Carousel from "./Carousel"

interface EventModalProps {
  onClose: () => void
}

const EventModal = ({ onClose }: EventModalProps) => {
  const router = useRouter()
  const handleClickButton = () => {
    router.push("/album/create")
  }
  return (
    <div className="fixed bottom-0 left-0 z-40 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <span
        style={{
          background:
            "linear-gradient(180deg, #FFF 0%, #FEEFE2 70%, #FFDBFB 99%)",
        }}
        className="relative z-50 flex h-[587px] w-[345px] flex-col items-center rounded-3xl bg-white p-4">
        <span className="absolute right-4 top-4">
          <Icon name="closeCircleBold" onClick={onClose} size={36} />
        </span>
        <div className="flex w-full flex-col items-center gap-2 p-6">
          <Icon name="heartPink" size={36} />
          <span className="text-2xl font-bold leading-[130%] tracking-[0.48px] text-gray-800">
            2024 RECAP
          </span>
          <span className="tp-body1-regular whitespace-pre text-center text-gray-700">
            {/* 앨범 테마에 따라
            <br />
            색색깔의 리캡이 만들어져요! */}
            {`다음주 부터\n리캡 기능이 출시돼요`}
          </span>
        </div>
        <div className="h-full w-full flex-grow">
          <Carousel />
        </div>
        <div className="flex w-full">
          <SquareButton
            onClick={handleClickButton}
            className="w-full bg-black text-white">
            앨범 만들러 가기
          </SquareButton>
        </div>
      </span>
    </div>
  )
}
export default EventModal
