"use client"

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import { useEffect, useRef, useState } from "react"
import Masonry from "react-responsive-masonry"

import { deletePhoto, getPhotos } from "@/app/api/photo"
import Button from "@/common/Button"
import Icon from "@/common/Icon"

import { PhotoInfo } from "../../types"
import { ImageDetail } from "./ImageDetail"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"

const ffmpeg = createFFmpeg({ log: true })

export const AlbumPhotos = ({ albumId }: { albumId: string }) => {
  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  const [imageDetailShown, setImageDetailShown] = useState(false)
  const [images, setImages] = useState<File[]>([])
  console.log("images", images)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  console.log("videoUrl", videoUrl)

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

  useEffect(() => {
    if (!images) return

    const createVideo = async () => {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load()
      }

      // 이미지 파일들을 FFmpeg 가상 파일 시스템에 작성
      for (let index = 0; index < images.length; index++) {
        const image = images[index]
        const fileData = await fetchFile(image)
        ffmpeg.FS("writeFile", `image${index}.jpg`, fileData)
      }

      try {
        // 입력 파일 구성
        const inputFiles = images
          .map((_, index) => `-loop 1 -t 2 -i image${index}.jpg`)
          .join(" ")

        // 필터 체인 구성
        const filterScale = images
          .map((_, index) => `[${index}:v]scale=640:480,setsar=1[v${index}]`)
          .join("; ")

        const filterConcat = images.map((_, index) => `[v${index}]`).join("")

        const filterComplex = `${filterScale};${filterConcat}concat=n=${images.length}:v=1:a=0[outv]`

        // FFmpeg 명령어 조합
        const args = [
          ...inputFiles.split(" "),
          "-filter_complex",
          filterComplex,
          "-map",
          "[outv]",
          "-y",
          "output.mp4",
        ]

        await ffmpeg.run(...args)

        // 파일 시스템에서 output.mp4 읽기
        const data = ffmpeg.FS("readFile", "output.mp4")
        const video = URL.createObjectURL(
          new Blob([data.buffer], { type: "video/mp4" })
        )
        setVideoUrl(video)
      } catch (error) {
        console.error("FFmpeg error:", error)
      }
    }

    createVideo()
  }, [images])

  const downloadImages = async () => {
    const imageBlobs = await Promise.all(
      photos.map(async ({ photoUrl }) => {
        const response = await fetch(photoUrl)
        return response.blob()
      })
    )

    const imageFiles = imageBlobs.map(
      (blob, index) =>
        new File([blob], `image${index}.jpg`, { type: blob.type })
    )

    setImages(imageFiles) // File 배열을 images 상태에 설정
  }

  // const convertImagesToVideo = async () => {
  //   // const imageBlobs = await downloadImages()
  //   // createVideo(imageBlobs)
  // }

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
        onClick={downloadImages}
        className="rounded-[100px] bg-slate-400 p-14 px-[22px] py-[16px]">
        <div className="flex gap-1 align-middle">
          <p>리캡 만들기</p>
          <Icon name="reelOutline" size={24} color="white" />
        </div>
      </Button>

      {videoUrl && <video src={videoUrl} controls></video>}
    </>
  )
}
