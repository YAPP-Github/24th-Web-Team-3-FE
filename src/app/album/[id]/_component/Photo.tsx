"use client"
import Image from "next/image"

import { PhotoInfo } from "../../types"

export const Photo = ({ photo }: { photo: PhotoInfo }) => {
  const { photoUrl } = photo
  return (
    <div className="relative mb-4 h-fit w-[164px]">
      <Image
        src={photoUrl}
        alt="img"
        layout="responsive"
        width={100}
        height={100}
      />
    </div>
  )
}
