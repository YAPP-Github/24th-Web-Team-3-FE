"use client"

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import { toPng } from "html-to-image"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"

interface ImageRecapProps {
  images: string[]
}

const ffmpeg = createFFmpeg({ log: true })

// Utility functions
function base64ToBlob(base64Data: string, contentType: string): Blob {
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: contentType })
}

function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type })
}

const ImageRecap = ({ images }: ImageRecapProps) => {
  const [generatedImages, setGeneratedImages] = useState<string[]>()
  const [files, setFiles] = useState<File[]>([])
  const [videoUrl, setVideoUrl] = useState<string | null>()
  // const [idx, setIdx] = useState(0)

  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!refs.current.length) return

    const generateImages = async () => {
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
      setGeneratedImages(newGeneratedImages.filter(Boolean) as string[])
    }

    // 컴포넌트가 마운트될 때 바로 이미지 생성 작업을 실행
    generateImages()
  }, [images]) // `images` 배열이 변경될 때마다 실행

  useEffect(() => {
    if (!generatedImages) return

    const newGeneratedFiles = generatedImages
      .filter(Boolean)
      .map((url, idx) => {
        const base64Data = url.split(",")[1]
        const blob = base64ToBlob(base64Data, "image/png")
        return blobToFile(blob, `image-${idx}.png`)
      })

    setFiles(newGeneratedFiles)
  }, [generatedImages])

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
        // 각 이미지를 2초 길이의 비디오로 변환
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
        console.error("FFmpeg error:", error)
      }
    }

    createVideo()
  }, [files])

  return (
    <>
      <div className="fixed left-0 top-0 z-10 h-dvh w-dvw justify-center overflow-auto bg-gray-900">
        {!videoUrl ? (
          <>
            {images.map((image, idx) => (
              <div
                key={`${image}-${idx}`}
                ref={(el) => {
                  refs.current[idx] = el
                }}
                className="absolute items-center justify-center">
                <Image
                  src="/images/recap_bg_img.png"
                  width={393}
                  height={680}
                  alt="cover-image"
                />
                <Image
                  src={image}
                  className="absolute mt-[130px] max-h-[433px] object-contain"
                  fill
                  alt={`recap_bg_img-${idx}`}
                />
              </div>
            ))}
          </>
        ) : (
          <video src={videoUrl} controls></video>
        )}
      </div>
      <div className="w-full p-6 pb-11 pt-3">
        <SquareButton color="green" className="w-full">
          <Icon name="downloadBold" size={28} color="white" />
          <span className="mr-[6px]">다운로드 받기</span>
        </SquareButton>
      </div>
    </>
  )
}
export default ImageRecap
