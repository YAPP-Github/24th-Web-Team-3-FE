"use client"

import { useEffect, useRef, useState } from "react"
import Masonry from "react-responsive-masonry"

import { deletePhoto, getPhotos } from "@/app/api/photo"
import Button from "@/common/Button"
import Icon from "@/common/Icon"

import { PhotoInfo } from "../../types"
import { ImageDetail } from "./ImageDetail"
import ImageRecap from "./ImageRecap"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"

export const AlbumPhotos = ({ albumId }: { albumId: string }) => {
  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  const [imageDetailShown, setImageDetailShown] = useState(false)

  const [recapOpen, setRecapOpen] = useState(false)

  const carouselStartIdx = useRef(0)

  const onPhotoClick = (startIdx: number) => {
    carouselStartIdx.current = startIdx
    setImageDetailShown(true)
  }

  const closeImageDetail = () => {
    setImageDetailShown(false)
  }

  const handleDelete = async (photoIdx: number) => {
    await deletePhoto(photos[photoIdx].photoId)

    const nextPhotos = photos.filter((v, i) => i !== photoIdx)
    setPhotos(nextPhotos)

    if (!nextPhotos.length) {
      setImageDetailShown(false)
    }
  }

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await getPhotos(albumId)
      if (data.length) {
        setPhotos(data)
      }
    }

    fetchAlbums()
  }, [albumId])

  const handleCreateRecap = () => {
    setRecapOpen(true)
  }

  return (
    <>
      <Masonry columnsCount={2} gutter="12px">
        <PhotoAddButton albumId={albumId} />
        {photos.map((photo, idx) => (
          <div key={photo.photoId} onClick={() => onPhotoClick(idx)}>
            <Photo photo={photo} />
          </div>
        ))}
      </Masonry>
      {imageDetailShown && (
        <ImageDetail
          photos={photos}
          startIdx={carouselStartIdx.current}
          onClose={closeImageDetail}
          onDelete={handleDelete}
        />
      )}

      <Button
        onClick={handleCreateRecap}
        style={{}}
        className="bg-lightgray m-auto rounded-[100px] bg-[114deg] bg-slate-400 bg-gradient-to-br from-[#C680FF] via-[#F09BF2] to-[#FF82C6] bg-[length:100px_100px] bg-repeat p-14 px-[22px] py-[16px] bg-blend-overlay shadow-[0_16px_20px_0_rgba(101,125,159,0.12),0_0_8px_0_rgba(88,100,117,0.08)]">
        <div className="flex gap-1 align-middle">
          <p>리캡 만들기</p>
          <Icon name="reelOutline" size={24} color="white" />
        </div>
      </Button>

      {recapOpen && (
        <ImageRecap images={photos.map((photo) => photo.photoUrl)} />
      )}
    </>
  )
}
