import { ChangeEvent, useCallback, useRef, useState } from "react"

import {
  generatePreSignedUrls,
  updatePhotoAlbumBulk,
  uploadPhotosWithUrls,
} from "@/app/api/photo"
import Icon from "@/common/Icon"

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
  const [, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const onTapGallery = () => {
    fileInputRef?.current?.click()
  }
  const handleImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files) return

      setUploading(true)

      try {
        const preSignedResponse = await generatePreSignedUrls(
          Array.from(files).map((file) => file.name)
        )
        const preSignedUrls = preSignedResponse.urls

        await Promise.all(
          Array.from(files).map((file, index) => {
            return fetch(preSignedUrls[index], {
              method: "PUT",
              body: file,
              headers: {
                "Content-Type": file.type,
              },
            })
          })
        )

        const actualFileUrls = preSignedUrls.map((url) => url.split("?")[0])
        const results = await uploadPhotosWithUrls(actualFileUrls)
        await updatePhotoAlbumBulk(
          currentAlbumId,
          results.map((result) => result.photoId)
        )
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
    </>
  )
}
