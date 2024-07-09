"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { myFetch } from "@/app/api/index"
import { PhotoAddButton } from "@/components"

export const AlbumPhotos = ({ albumId }: { albumId: string }) => {
  const [photos, setPhotos] = useState<photo[]>([])

  useEffect(() => {
    // dev 머지 이후 api 폴더 내부로 이동 예정
    const getPhotos = async (albumId: string): Promise<GetPhotosResponse[]> => {
      const data = await myFetch(`photo/v1/photos?albumId=${albumId}`, {
        method: "GET",
      })

      return data
    }

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
    <div className="h-fit mb-4 relative w-full">
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
type GetPhotosResponse = photo
