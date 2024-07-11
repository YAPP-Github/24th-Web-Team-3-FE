"use client"

import { useEffect, useRef, useState } from "react"

import { deletePhoto, getPhotos } from "@/app/api/photo"

import { PhotoInfo } from "../../types"
import { ImageDetail } from "./ImageDetail"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"

export const AlbumPhotos = ({ albumId }: { albumId: string }) => {
  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  const [imageDetailShown, setImageDetailShown] = useState(false)
  const carouselStartIdx = useRef(0)

  const onPhotoClick = (startIdx: number) => {
    carouselStartIdx.current = startIdx
    setImageDetailShown(() => true)
  }

  const closeImageDetail = () => {
    setImageDetailShown(() => false)
  }

  const handleDelete = async (photoIdx: number) => {
    await deletePhoto(photos[photoIdx].photoId)

    const nextPhotos = photos.filter((v, i) => i !== photoIdx)
    setPhotos(() => nextPhotos)
    if (!nextPhotos.length) {
      setImageDetailShown(() => false)
    }
  }

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
    <>
      <div className="w-full columns-2 gap-[13px]">
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
          onDelete={(photoIdx) => handleDelete(photoIdx)}
        />
      )}
    </>
  )
}
