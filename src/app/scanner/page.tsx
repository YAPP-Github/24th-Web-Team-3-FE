"use client"

import {
  IDetectedBarcode,
  IScannerStyles,
  Scanner,
} from "@yudiel/react-qr-scanner"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { BottomBar } from "@/common/BottomBar"
import { isUrlIncluded } from "@/libs"

import { PhotoInfo } from "../album/types"
import { getAlbums, patchPhotoAlbum, postQrCode } from "../api/photo"
import { PhotoModal } from "./_component/PhotoModal"

const styles: IScannerStyles = {
  container: {
    width: 345,
    height: 345,
    borderRadius: 12,
    background: "black",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}

const ScannerPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultAlbumId = searchParams.get("defaultAlbumId")
  const [isPhotoModalShown, setIsPhotoModalShown] = useState(false)
  const photoInfo = useRef<PhotoInfo | null>(null)
  const isAlbumExist = useRef(false)

  const patchPhotoToDefaultAlbum = async (photo: PhotoInfo) => {
    if (!defaultAlbumId) {
      console.error(
        "기본 앨범 아이디가 없는 상황에서 patchPhotoAlbum을 시도했습니다."
      )
      return
    }

    const { photoId } = photo
    await patchPhotoAlbum(photoId, defaultAlbumId)
    router.push(`/album/${defaultAlbumId}`)
  }

  const onScan = async (result: IDetectedBarcode[]) => {
    const { rawValue } = result[0]

    if (!isUrlIncluded(rawValue)) {
      if (confirm("지원하지 않는 QR코드입니다. 웹사이트를 열어드릴까요?")) {
        window.open(rawValue, "_blank")
      }

      return
    }

    try {
      const photo = await postQrCode(rawValue)
      photoInfo.current = photo

      // 만든 앨범이 하나도 없다면 앨범 생성 페이지로 바로 이동
      if (!isAlbumExist) {
        router.push(`/album/create?photoId=${photo.photoId}`)
        return
      }

      // 기본 앨범이 있다면 기본 앨범에 사진 추가
      if (defaultAlbumId) {
        patchPhotoToDefaultAlbum(photo)
        return
      }

      // 기본 앨범이 없다면 사진 모달 보여줌
      if (!defaultAlbumId && photoInfo.current) {
        setIsPhotoModalShown(() => true)
      }
    } catch (error) {
      alert(`QR코드 저장에 실패했습니다.\n${error}`)
      router.push("/album/create")
      return
    }
  }

  const closePhotoModal = () => {
    setIsPhotoModalShown(false)
  }

  useEffect(() => {
    const initAlbumExist = async () => {
      const albums = await getAlbums()
      if (albums.length) {
        isAlbumExist.current = true
      }
    }
    initAlbumExist()
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900">
      <div className="w">
        <p className="relative z-[1] px-4 py-3.5 text-header-2 font-bold text-white">
          홈
        </p>
        <div className="relative z-[1] flex flex-col items-center justify-center p-6">
          <p className="whitespace-pre text-center text-title-1 text-border text-white">
            {`QR코드를 스캔해\n인생네컷을 저장해요`}
          </p>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Scanner onScan={onScan} styles={styles} allowMultiple={true} />
          <p className="p-6 text-center text-body-2 font-medium text-white">
            지원하지 않는 브랜드라면 웹사이트를 열어드려요.
          </p>
        </div>
        <BottomBar variant="scanner" />
      </div>
      {isPhotoModalShown && (
        <PhotoModal photo={photoInfo.current!} onClose={closePhotoModal} />
      )}
    </div>
  )
}

export default ScannerPage
