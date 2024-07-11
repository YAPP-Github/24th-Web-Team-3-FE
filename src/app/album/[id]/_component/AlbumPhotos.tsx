"use client"

import { useEffect, useRef, useState } from "react"

import { getPhotos } from "@/app/api/photo"

import { PhotoInfo } from "../../types"
import { ImageDetail } from "./ImageDetail"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"

const dummyPhotos = [
  {
    photoId: "123",
    photoUrl:
      "https://www.hattori.asia/wordpress/wp-content/uploads/2023/03/20230315-01.jpg",
    albumId: "",
  },
  {
    photoId: "2",
    photoUrl:
      "https://m.media-amazon.com/images/M/MV5BMGQ0ZGJiZTItYTkxMy00OThiLWFkNGQtNGNlOTE3MDZiNmI5XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    albumId: "",
  },
  {
    photoId: "3",
    photoUrl:
      "https://m.media-amazon.com/images/I/51csusgNVrL._AC_UF1000,1000_QL80_.jpg",
    albumId: "",
  },
]
export const AlbumPhotos = ({ albumId }: { albumId: string }) => {
  const [photos, setPhotos] = useState<PhotoInfo[]>(dummyPhotos)
  const [imageDetailShown, setImageDetailShown] = useState(false)
  const carouselStartIdx = useRef(0)

  const onPhotoClick = (startIdx: number) => {
    carouselStartIdx.current = startIdx
    setImageDetailShown(() => true)
  }

  const closeImageDetail = () => {
    setImageDetailShown(() => false)
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
        <PhotoAddButton />
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
        />
      )}
    </>
  )
}
