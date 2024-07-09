"use client"
import Image from "next/image"

export function Photo({ photo }: { photo: photo }) {
  const { photoUrl } = photo
  return (
    <div className="relative mb-4 h-fit w-full">
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

export interface photo {
  photoId: string
  photoUrl: string
  albumId: string
}
