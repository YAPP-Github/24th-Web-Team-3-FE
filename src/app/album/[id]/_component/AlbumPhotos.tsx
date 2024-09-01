"use client"

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import { toBlob } from "html-to-image"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Masonry from "react-responsive-masonry"

import { deletePhoto, getPhotos } from "@/app/api/photo"
import { useGetProfile } from "@/app/profile/hooks/useProfile"
import Button from "@/common/Button"
import Icon from "@/common/Icon"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { formattedDate } from "@/libs"
import { useAlertStore } from "@/store/alert"
import { recapColorVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumInfo, PhotoInfo } from "../../types"
import { ImageDetail } from "./ImageDetail"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"
import RecapContainer from "./RecapContainer"
import VideoLoading from "./VideoLoading"
import VideoRecap from "./VideoRecap"

const ffmpeg = createFFmpeg({ log: true })

interface AlbumPhotosProps {
  albumInfo: AlbumInfo
}

export const AlbumPhotos = ({ albumInfo }: AlbumPhotosProps) => {
  const { showAlert } = useAlertStore()
  const { profile } = useGetProfile()

  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  const [imageDetailShown, setImageDetailShown] = useState(false)

  const carouselStartIdx = useRef(0)

  const [isRecapOpen, setIsRecapOpen] = useState(false)
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

  const handleCloseRecap = () => {
    setIsRecapOpen(false)
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
              // HTML을 이미지로 변환할 때 더 높은 해상도를 위해 scale 값을 조정
              const blob = await toBlob(ref, {
                quality: 1, // 이미지 품질 설정 (0.1 ~ 1)
                pixelRatio: 3, // 기본값은 1, 값이 클수록 해상도가 높아짐
              })
              return blob
            } catch (err) {
              return null
            }
          }
          return null
        })
      )

      const filteredImages = newGeneratedImages.filter(
        (file): file is File => file !== null
      )
      setFiles(filteredImages)
    }

    if (isRecapOpen) {
      generateImages()
    }
  }, [refs, isRecapOpen])

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
            `scale=1170:2040:force_original_aspect_ratio=increase,crop=1170:2040,pad=1170:2040:(ow-iw)/2:(oh-ih)/2,format=yuv420p`, //3배수로 해상도 조정
            "-c:v",
            "libx264", // H.264 코덱 사용
            "-crf",
            "18", // 낮은 값을 사용할수록 품질이 높고 파일 크기가 커짐
            "-preset",
            "slow", // 고품질 인코딩을 위한 slow 프리셋
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
            className={cn(
              recapColorVariants({ type: albumInfo.type }),
              "m-auto rounded-[100px] p-14 px-[22px] py-[16px]"
            )}
            onClick={() => setIsRecapOpen(true)}>
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
            <div className="absolute mb-2 mt-10 flex w-full flex-col items-center justify-center gap-2">
              <p className="tp-title2-semibold">{profile?.name}님의 Recap</p>
              <Icon
                name="mafooLogo"
                color="white"
                size={64}
                className="h-[27px] w-[144px]"></Icon>
            </div>
            <RecapContainer type={albumInfo.type} />
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

        {files.map((file, idx) => (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={URL.createObjectURL(file)} key={idx} />
        ))}
      </div>

      {isRecapOpen &&
        (videoUrl ? (
          <VideoRecap url={videoUrl} closeModal={handleCloseRecap} />
        ) : (
          <VideoLoading type={albumInfo.type} />
        ))}
    </>
  )
}
