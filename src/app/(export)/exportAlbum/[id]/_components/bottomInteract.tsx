"use client"

import { useRouter } from "next/navigation"

import { AlbumType } from "@/app/album/types"
import HeartBoldMonoColor from "@/assets/heartBoldMonoColor"

import { COLOR_MAP, colors } from "../_constants/color"

const BottomInteractComponent = ({
  exportId,
  isLiked,
  type,
}: {
  exportId: string
  isLiked: boolean
  type: AlbumType
}) => {
  const selectedColor = COLOR_MAP[type]

  const router = useRouter()

  const handleClickLike = () => {
    console.log("Like Button Clicked")
  }

  const handleClickAlbum = () => {
    console.log("Album Button Clicked")
    router.push(`/exportAlbumDetail/${exportId}`)
  }

  return (
    <div className="flex w-full flex-row px-6" style={{ gap: "12px" }}>
      <button
        onClick={handleClickLike}
        className="flex items-center justify-center rounded-lg bg-gray-100 p-4">
        <HeartBoldMonoColor
          width={24}
          height={24}
          fill={isLiked ? colors.red[500] : colors.gray[300]}
        />
        {/* <Icon
                name="heartBoldMonoColor"
                size={24}
                color={exportAlbumData.isMeLiked ? "red-500" : "gray-300"}
              /> */}
      </button>
      <button onClick={handleClickAlbum} className="h-full w-full">
        <div
          className="flex h-full w-full flex-col items-center justify-center rounded-lg"
          style={{
            background: `linear-gradient(to right, ${selectedColor.bottomButton.color[0]} 0%, ${selectedColor.bottomButton.color[1]} ${
              selectedColor.bottomButton.position[1] * 100
            }%)`,
          }}>
          <p className="tp-body1-semibold text-white">앨범 구경하기</p>
        </div>
      </button>
    </div>
  )
}

export default BottomInteractComponent
