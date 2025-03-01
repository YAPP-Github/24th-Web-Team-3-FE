"use client"

import { useEffect, useState } from "react"
import Masonry from "react-responsive-masonry"

import { Photo } from "@/app/album/[id]/_component/Photo"
import { PhotoInfo } from "@/app/album/types"
import { getExportAlbumPhotos } from "@/app/api/album/export"

interface AlbumPhotosProps {
  exportId: string
}

export const AlbumPhotos = ({ exportId }: AlbumPhotosProps) => {
  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  // const [imageDetailShown, setImageDetailShown] = useState(false)

  // const carouselStartIdx = useRef(0)

  // const onPhotoClick = (startIdx: number) => {
  //   carouselStartIdx.current = startIdx
  //   setImageDetailShown(true)
  // }

  // const closeImageDetail = () => {
  //   setImageDetailShown(false)
  // }

  const fetchAlbums = async () => {
    // const data = await getPhotos(albumInfo.albumId)
    const data = await getExportAlbumPhotos(exportId)
    if (data.length) {
      setPhotos(data)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [exportId])

  return (
    <>
      <div className="flex w-full flex-wrap bg-white p-4 px-6">
        <Masonry key={photos.length} columnsCount={2} gutter="12px">
          {photos.map((photo) => (
            <div
              key={photo.photoId}
              className="h-fit w-full"
              // onClick={() => onPhotoClick(idx)}>
            >
              <Photo photo={photo} />
            </div>
          ))}
        </Masonry>
        {/* {imageDetailShown && (
          <ImageDetail
            photos={photos}
            startIdx={carouselStartIdx.current}
            onClose={closeImageDetail}
          />
        )} */}
      </div>
    </>
  )
}

export default AlbumPhotos
