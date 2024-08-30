"use client"

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import { toPng } from "html-to-image"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Masonry from "react-responsive-masonry"

import { deletePhoto, getPhotos } from "@/app/api/photo"
import Button from "@/common/Button"
import Icon from "@/common/Icon"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { formattedDate } from "@/libs"
import { useAlertStore } from "@/store/alert"
import { base64ToBlob, blobToFile } from "@/utils"

import { AlbumInfo, PhotoInfo } from "../../types"
import { ImageDetail } from "./ImageDetail"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"
import VideoLoading from "./VideoLoading"
import VideoRecap from "./VideoRecap"

const ffmpeg = createFFmpeg({ log: true })

interface AlbumPhotosProps {
  albumInfo: AlbumInfo
}

export const AlbumPhotos = ({ albumInfo }: AlbumPhotosProps) => {
  const { showAlert } = useAlertStore()

  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  const [imageDetailShown, setImageDetailShown] = useState(false)

  const [isCreateRecap, setIsCreateRecap] = useState(false)

  const carouselStartIdx = useRef(0)

  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [videoUrl, setVideoUrl] = useState<string | null>()

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
      const data = await getPhotos(albumInfo.albumId)
      if (data.length) {
        setPhotos(data)
      }
    }

    fetchAlbums()
  }, [albumInfo.albumId])

  useEffect(() => {
    const generateImages = async () => {
      if (!refs.current) return
      const newGeneratedImages = await Promise.all(
        refs.current.map(async (ref) => {
          if (ref) {
            try {
              const dataUrl = await toPng(ref)
              return dataUrl
            } catch (err) {
              return null
            }
          }
          return null
        })
      )

      // Filter out any null values and update the state
      const filteredImages = newGeneratedImages.filter(Boolean) as string[]
      const newGeneratedFiles = filteredImages
        .filter(Boolean)
        .map((url, idx) => {
          const base64Data = url.split(",")[1]
          const blob = base64ToBlob(base64Data, "image/png")
          return blobToFile(blob, `image-${idx}.png`)
        })

      setFiles(newGeneratedFiles)
    }

    if (isCreateRecap) {
      generateImages()
    }
  }, [refs, isCreateRecap])

  useEffect(() => {
    if (!files.length) return

    const createVideo = async () => {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load()
      }

      // 이미지 파일들을 FFmpeg 가상 파일 시스템에 작성
      for (let index = 0; index < files.length; index++) {
        const file = files[index]
        ffmpeg.FS("writeFile", `image${index}.png`, await fetchFile(file))
      }

      try {
        for (let index = 0; index < files.length; index++) {
          await ffmpeg.run(
            "-loop",
            "1",
            "-i",
            `image${index}.png`,
            "-t",
            "1", // 각 이미지를 1초 동안 표시
            "-vf",
            "scale=390:670,format=yuv420p", // 이미지 크기를 1920x1080으로 변환
            "-y",
            `video${index}.mp4`
          )
        }

        // 생성된 비디오 파일들을 concat 필터로 연결
        const inputArgs = files
          .map((_, index) => `-i video${index}.mp4`)
          .join(" ")
        const concatFilter = `concat=n=${files.length}:v=1:a=0[outv]`

        const args = [
          ...inputArgs.split(" "),
          "-filter_complex",
          concatFilter,
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
        // eslint-disable-next-line no-console
        console.error("FFmpeg error:", error)
      }
    }

    createVideo()
  }, [files, showAlert])

  return (
    <>
      <div className="flex w-full flex-wrap p-4 px-6">
        <Masonry columnsCount={2} gutter="12px">
          <PhotoAddButton albumId={albumInfo.albumId} />
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

        {photos.length >= 3 && (
          <Button
            onClick={() => setIsCreateRecap(true)}
            className="bg-lightgray m-auto rounded-[100px] bg-gradient-to-r from-purple-400 via-pink-300 to-pink-500 p-14 px-[22px] py-[16px]">
            <div className="flex gap-1 align-middle">
              <p>리캡 만들기</p>
              <Icon name="reelOutline" size={24} color="white" />
            </div>
          </Button>
        )}
      </div>

      <div className="fixed left-0 top-0 -translate-x-full">
        {photos.map(({ photoUrl, createdAt }, idx) => (
          <div
            className="relative inline-block"
            key={`${photoUrl}-${idx}`}
            ref={(el) => {
              refs.current[idx] = el
            }}>
            <Image
              className="block"
              src="/images/recap_bg_img.png"
              width={393}
              height={680}
              alt="cover-image"
            />
            <Image
              src={photoUrl}
              className="absolute left-1/2 top-1/2 mt-[130px] max-h-[433px] transform object-contain"
              fill
              alt={`recap_bg_img-${idx}`}
            />
            <div className="absolute bottom-[31px] w-full">
              <div className="flex items-center justify-around">
                <div
                  style={{
                    backgroundColor: `rgba(255, 255, 255, 0.70)`,
                  }}
                  className="tp-title2-semibold b flex h-11 w-28 items-center justify-center gap-1 rounded-[100px] px-4 py-2 text-gray-800">
                  <Icon
                    name={ICON_NAME[albumInfo.type]}
                    color={ICON_COLOR_STYLE[albumInfo.type]}
                    size={28}
                  />
                  {albumInfo.name}
                </div>
                <span
                  className="text-right text-[18px] font-normal leading-[130%] tracking-[0.36px]"
                  style={{
                    color: `var(--White, #FFF)`,
                    fontFeatureSettings: `'ss10' on`,
                    fontFamily: `"SB AggroOTF"`,
                    fontStyle: `normal`,
                  }}>
                  {formattedDate(createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isCreateRecap && !videoUrl && <VideoLoading />}
      {videoUrl && <VideoRecap url={videoUrl} />}
    </>
  )
}
