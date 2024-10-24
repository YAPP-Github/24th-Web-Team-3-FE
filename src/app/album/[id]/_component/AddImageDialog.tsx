import { ChangeEvent, useCallback, useRef, useState } from "react"

import {
  generatePreSignedUrls,
  updatePhotoAlbumBulk,
  uploadPhotosWithUrls,
} from "@/app/api/photo"
import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import { buildCancelableTask } from "@/utils"

interface AddImageDialogProps {
  currentAlbumId: string
  isVisible: boolean
  onTapQrScan: () => void
  onTapBackdrop: () => void
  onImageUploaded: () => void
}

export const AddImageDialog = ({
  currentAlbumId,
  isVisible,
  onTapQrScan,
  onTapBackdrop,
  onImageUploaded,
}: AddImageDialogProps) => {
  const [isUploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentUploaded, setCurrentUploaded] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)
  const [tasks, setTasks] = useState<
    { run: () => Promise<unknown>; cancel: () => void }[]
  >([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const onTapGallery = () => {
    fileInputRef?.current?.click()
  }
  const onTapCancel = () => {
    tasks.forEach((task) => task.cancel())
    setUploading(false)
  }
  const handleImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files || files.length == 0) return

      setProgress(0)
      setCurrentUploaded(0)
      setTotalFiles(files.length)
      setUploading(true)
      setTasks([])
      try {
        const preSignedResponse = await generatePreSignedUrls(
          Array.from(files).map((file) => file.name)
        )
        const preSignedUrls = preSignedResponse.urls
        setProgress(10)
        const totalItems = files.length
        let currentItems = 0

        await Promise.all(
          Array.from(files).map((file, index) => {
            const task = buildCancelableTask(() =>
              fetch(preSignedUrls[index], {
                method: "PUT",
                body: file,
                headers: {
                  "Content-Type": file.type,
                },
              }).then(() => {
                currentItems += 1
                setProgress(Math.floor((currentItems / totalItems) * 80 + 10))
                setCurrentUploaded(currentItems)
              })
            )
            setTasks((prev) => [...prev, task])
            return task.run()
          })
        )

        const actualFileUrls = preSignedUrls.map((url) => url.split("?")[0])
        const results = await uploadPhotosWithUrls(actualFileUrls)
        setProgress(95)
        await updatePhotoAlbumBulk(
          currentAlbumId,
          results.map((result) => result.photoId)
        )
        setProgress(100)
        onImageUploaded()
      } catch (error) {
        console.error("Upload failed:", error)
      } finally {
        setUploading(false)
      }
    },
    []
  )
  return (
    <>
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
        ref={fileInputRef}
        style={{ display: "none" }} // 숨김
      />
      {isVisible && (
        <div
          className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-end justify-center bg-gray-800/50 px-5 pb-5 transition-all duration-500"
          onClick={onTapBackdrop}>
          <div className="w-full rounded-2xl bg-white p-3 px-5">
            <div className="flex flex-row">
              <div
                className="flex shrink grow basis-0 flex-col items-center justify-center gap-2 py-4"
                onClick={onTapQrScan}>
                <Icon name="qrIcon" size={28} color="gray-500" />
                <span className="tp-body1-semibold text-gray-600">
                  QR 스캔으로 추가
                </span>
              </div>
              <div className="divide-x bg-gray-200" style={{ width: "1px" }} />
              <div
                className="flex shrink grow basis-0 flex-col items-center justify-center gap-2 py-4"
                onClick={onTapGallery}>
                <Icon name="galleryIcon" size={28} color="gray-500" />
                <span className="tp-body1-semibold text-gray-600">
                  갤러리에서 추가
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {isUploading && (
        <div
          className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-gray-800/50 px-5 transition-all duration-500"
          onClick={onTapBackdrop}>
          <div className="w-full rounded-2xl bg-white p-6 px-8">
            <div className="flex flex-col items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                <span className="tp-header2-semibold text-gray-900">
                  {progress}%
                </span>
                <span className="tp-body1-regular text-gray-500">
                  마푸가 열심히 올리는 중...
                </span>
              </div>
              <Icon name="uploadMafoo" size={120} color="gray-500" />
              <div className="flex w-full flex-col items-end">
                <div
                  className="relative h-2 w-full bg-gray-200"
                  style={{ borderRadius: "64px" }}>
                  <div
                    className="absolute h-2 bg-green-600"
                    style={{
                      borderRadius: "64px",
                      width: progress + "%",
                    }}></div>
                </div>
                <span className="tp-caption1-regular text-gray-400">
                  {currentUploaded} / {totalFiles}장
                </span>
              </div>
              <div className="h-3" />
              <div className="flex w-full">
                <SquareButton
                  className="flex-1"
                  variant="weak"
                  size="medium"
                  theme="red"
                  onClick={onTapCancel}>
                  업로드 그만두기
                </SquareButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
