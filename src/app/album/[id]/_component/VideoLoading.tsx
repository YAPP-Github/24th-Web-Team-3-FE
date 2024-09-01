"use client"

import Image from "next/image"
import { useEffect } from "react"

import { recapColorVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumType } from "../../types"

interface VideoLoadingProps {
  type: AlbumType
}

const VideoLoading = ({ type }: VideoLoadingProps) => {
  useEffect(() => {
    // 로딩 중일 때 스크롤 비활성화
    document.body.style.overflow = "hidden"
    // 컴포넌트가 언마운트될 때 스크롤을 원래 상태로 복구
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-10 h-dvh w-full overflow-hidden bg-gray-800 bg-opacity-50">
      <div
        role="status"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div
          className={cn(
            recapColorVariants({ type }),
            "flex h-[224px] w-[345px] flex-col items-center rounded-[24px]"
          )}
          style={{
            borderRadius: "24px",
            boxShadow:
              "0px 16px 20px 0px rgba(101, 125, 159, 0.12), 0px 0px 8px 0px rgba(88, 100, 117, 0.08)",
          }}>
          <Image
            className="mb-2 mt-6"
            src="/images/reel.gif"
            width={170}
            height={170}
            alt="loading"
          />

          <span className="tp-title1-semibold whitespace-pre text-center text-white">
            {"앨범 속 추억을\n리캡으로 만드는 중이에요.."}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VideoLoading
