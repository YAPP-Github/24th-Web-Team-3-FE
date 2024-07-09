"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { getPhotos } from "@/app/api/photo"

import { PhotoAddButton } from "./PhotoAddButton"

export const AlbumPhotos = ({ albumId }: { albumId: string }) => {
  const [photos, setPhotos] = useState<photo[]>([])

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await getPhotos(albumId)
      if (data.length) {
        setPhotos(() => data)
      }
    }

    fetchAlbums()
  }, [albumId])

  return (
    <div className="w-full columns-2 gap-[13px]">
      <PhotoAddButton />
      {photos.map((photo) => (
        <Photo key={photo.photoId} photo={photo} />
      ))}
    </div>
  )
}

function Photo({ photo }: { photo: photo }) {
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

interface photo {
  photoId: string
  photoUrl: string
  albumId: string
}
