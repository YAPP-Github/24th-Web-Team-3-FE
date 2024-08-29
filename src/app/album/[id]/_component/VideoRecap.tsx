"use client"

import Button from "@/common/Button"
import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import { useAlertStore } from "@/store/alert"
import { fullDateStr } from "@/utils"

interface VideoRecapProps {
  url: string
}

const VideoRecap = ({ url }: VideoRecapProps) => {
  const { showAlert } = useAlertStore()

  const handleDownload = () => {
    const a = document.createElement("a")
    a.href = url
    a.download = `mafoo_${fullDateStr()}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url) // Object URL 해제
  }

  const handleShare = async () => {
    if (!navigator.canShare) {
      showAlert("공유하기를 지원하지 않는 브라우저입니다.")
    }

    try {
      await navigator.share({
        title: "MDN",
        text: "Learn web development on MDN!",
        url,
      })
    } catch (err) {
      showAlert("공유하기에 실패했습니다.")
    }
  }

  return (
    <div className="fixed left-0 top-0 z-10 h-dvh w-dvw justify-center overflow-auto bg-gray-900">
      <div className="m-auto flex h-dvh w-full max-w-[390px] flex-col justify-between">
        <video className="mt-8" src={url} autoPlay controls></video>

        <div className="flex gap-3">
          <Button
            onClick={handleDownload}
            color="white"
            className="flex w-full items-center justify-center gap-[6px] rounded-[100px] bg-gray-800 px-6 text-white">
            <Icon name="downloadBold" size={28} color="white" />
            <span className="mr-[6px]">다운로드 받기</span>
          </Button>

          <SquareButton
            onClick={handleShare}
            className="w-full rounded-[100px] bg-gray-800 bg-gradient-to-br from-yellow-500 via-pink-500 to-blue-500"
            style={{
              background:
                "linear-gradient(275deg, #FFD735 -13%, #FF6C5A 19.01%, #E848C8 52.09%, #4A8CF0 93.31%), #F0F2F4",
            }}>
            <Icon name="insta" size={28} color="white" />
            <span className="mr-[6px]">인스타 공유</span>
          </SquareButton>
        </div>
      </div>
    </div>
  )
}
export default VideoRecap
