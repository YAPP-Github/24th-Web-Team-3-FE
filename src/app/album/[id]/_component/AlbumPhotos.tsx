"use client"

import { useEffect, useState } from "react"

import { getPhotos } from "@/app/api/photo"

import { PhotoInfo } from "../../types"
import Photo from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"

export const AlbumPhotos = ({ albumId }: { albumId: string }) => {
  const [photos, setPhotos] = useState<PhotoInfo[]>([])

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
