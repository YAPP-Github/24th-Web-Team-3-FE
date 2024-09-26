"use client"
import Image from "next/image"

import { PhotoInfo } from "../../types"

export const Photo = ({ photo }: { photo: PhotoInfo }) => {
  const { photoUrl } = photo
  return (
    <div className="relative h-fit w-full">
      <Image
        src={photoUrl}
        alt="img"
        layout="responsive"
        width={100}
        height={100}
        style={{ borderRadius: "12px", border: "1px solid #E1E4E8" }}
      />
    </div>
  )
}
