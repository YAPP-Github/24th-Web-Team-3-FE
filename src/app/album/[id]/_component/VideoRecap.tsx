"use client"

import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import { fullDateStr } from "@/utils"

interface VideoRecapProps {
  url: string
}

const VideoRecap = ({ url }: VideoRecapProps) => {
  const handleDownload = () => {
    const a = document.createElement("a")
    a.href = url
    a.download = `mafoo_${fullDateStr()}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url) // Object URL 해제
  }

  return (
    <div className="fixed left-0 top-0 z-10 h-dvh w-dvw justify-center overflow-auto bg-gray-900">
      <div className="m-auto flex h-dvh w-full max-w-[390px] flex-col justify-between">
        <video src={url} autoPlay controls></video>

        <div className="max w-f p-6 pb-11 pt-3">
          <SquareButton
            onClick={handleDownload}
            color="green"
            className="w-full">
            <Icon name="downloadBold" size={28} color="white" />
            <span className="mr-[6px]">다운로드 받기</span>
          </SquareButton>
        </div>
      </div>
    </div>
  )
}
export default VideoRecap
