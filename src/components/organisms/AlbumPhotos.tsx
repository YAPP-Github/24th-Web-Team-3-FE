"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { myFetch } from "@/app/api/index"

interface photo {
  photoId: string
  photoUrl: string
  albumId: string
}
type GetPhotosResponse = photo

// 머지 이후 hotfix를 통해 api 폴더 내로 옮기겠습니다.
export const getPhotos = async (
  albumId: string
): Promise<GetPhotosResponse[]> => {
  const data = await myFetch(`photo/v1/photos?albumId=${albumId}`, {
    method: "GET",
  })

  return data
}

export const AlbumPhotos = ({ albumId }: { albumId: string }) => {
  const [photos, setPhotos] = useState<photo[]>([])

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await getPhotos(albumId)
      setPhotos(() => data)
    }

    fetchAlbums()
  }, [albumId])

  if (!photos.length) return <div></div>

  return (
    <div>
      {photos.map((photo) => (
        <Photo key={photo.photoId} photo={photo} />
      ))}
      <Photo photo={photos[0]} />
    </div>
  )
}

function Photo({ photo }: { photo: photo }) {
  const { photoUrl } = photo
  return <Image src={photoUrl} alt="img" width={100} height={100} />
}
