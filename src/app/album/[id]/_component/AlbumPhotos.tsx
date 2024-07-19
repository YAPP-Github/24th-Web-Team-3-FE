"use client"

import { useEffect, useRef, useState } from "react"

import { useDeletePhoto, useGetPhotos } from "@/app/scanner/hooks/usePhoto"

import { ImageDetail } from "./ImageDetail"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"

export const AlbumPhotos = ({ albumId }: { albumId: string }) => {
  const [imageDetailShown, setImageDetailShown] = useState(false)
  const carouselStartIdx = useRef(0)
  const { deletePhoto } = useDeletePhoto()

  const { photos, photosRefetch } = useGetPhotos(albumId)

  const onPhotoClick = (startIdx: number) => {
    carouselStartIdx.current = startIdx
    setImageDetailShown(true)
  }

  const closeImageDetail = () => {
    setImageDetailShown(false)
  }

  const handleDelete = async (photoIdx: number) => {
    deletePhoto(photos[photoIdx].photoId)
    photosRefetch()
  }

  useEffect(() => {
    if (!photos.length) {
      setImageDetailShown(false)
    }
  }, [photos])

  return (
    <>
      <div className={`flex min-h-[165px] w-full flex-wrap gap-[13px]`}>
        <PhotoAddButton albumId={albumId} />
        {photos.map((photo, idx) => (
          <div key={photo.photoId} onClick={() => onPhotoClick(idx)}>
            <Photo photo={photo} />
          </div>
        ))}
      </div>
      {imageDetailShown && (
        <ImageDetail
          photos={photos}
          startIdx={carouselStartIdx.current}
          onClose={closeImageDetail}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}
