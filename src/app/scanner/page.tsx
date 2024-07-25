"use client"

import { IDetectedBarcode, Scanner, useDevices } from "@yudiel/react-qr-scanner"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { BottomBar } from "@/common/BottomBar"
import Loading from "@/common/Loading"
import { isUrlIncluded } from "@/libs"

import { PhotoModal } from "./_component/PhotoModal"
import {
  useGetAlbums,
  usePatchPhotoAlbum,
  usePostQrCode,
} from "./hooks/usePhoto"

const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
} as const

const ScannerPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultAlbumId = searchParams.get("defaultAlbumId")
  const { scanInfo, postQrCodeQuery, isPending } = usePostQrCode()
  const { albumLength } = useGetAlbums()
  const { patchPhotoAlbum } = usePatchPhotoAlbum()
  const [isPhotoModalShown, setIsPhotoModalShown] = useState(false)

  const devices = useDevices()
  const [deviceId, setDeviceId] = useState<string | undefined>()

  useEffect(() => {
    if (devices.length < 1) return
    setDeviceId(devices[devices.length - 1].deviceId)
  }, [devices])

  const onScan = (result: IDetectedBarcode[]) => {
    const { rawValue } = result[0]

    if (!isUrlIncluded(rawValue)) {
      if (confirm("지원하지 않는 QR코드입니다. 웹사이트를 열어드릴까요?")) {
        window.open(rawValue, "_blank")
      }

      return
    }

    postQrCodeQuery(rawValue)
  }

  useEffect(() => {
    if (!scanInfo) return

    const { photoId } = scanInfo

    // 만든 앨범이 하나도 없다면 앨범 생성 페이지로 바로 이동
    if (!albumLength) {
      router.push(`/album/create?photoId=${photoId}`)
      return
    }

    // 기본 앨범이 있다면 기본 앨범에 사진 추가
    if (defaultAlbumId) {
      patchPhotoAlbum({ photoId, defaultAlbumId })
      router.push(`/album/${defaultAlbumId}`)
      return
    }

    setIsPhotoModalShown(true)
  }, [albumLength, defaultAlbumId, patchPhotoAlbum, router, scanInfo])

  const closePhotoModal = () => {
    setIsPhotoModalShown(false)
  }

  return (
    <div className="flex h-screen flex-col">
      {isPending && <Loading />}

      <select onChange={(e) => setDeviceId(e.target.value)}>
        <option value={undefined}>
          {devices.length > 0 ? "카메라 선택" : "카메라 없음"}
        </option>
        {devices.map((device, index) => (
          <option key={index} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      <div className="h-full overflow-hidden">
        <Scanner
          styles={{ ...style }}
          constraints={{
            deviceId: deviceId,
            aspectRatio: 1.7778, // exact 16:9 aspect ratio
          }}
          onScan={onScan}
          components={{
            audio: true,
            torch: true,
            zoom: true,
            finder: false,
            tracker: () => "centerText",
          }}
          allowMultiple={true}
          scanDelay={500}>
          <>
            <p className="tp-header2-semibold relative z-[1] px-4 py-3.5 text-white">
              홈
            </p>
            <div className="relative z-[1] flex flex-col items-center justify-center p-6">
              <p className="tp-title1-semibold whitespace-pre text-center text-border text-white">
                {`QR코드를 스캔해\n인생네컷을 저장해요`}
              </p>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="bor h-[245px] w-[245px] rounded-3xl border-4 border-solid border-green-600 shadow-[0_0_0_100vh_rgba(24,28,35,0.8)]" />
              <p className="tp-body2-regular p-6 text-center text-white">
                지원하지 않는 브랜드라면 웹사이트를 열어드려요.
              </p>
            </div>
          </>
        </Scanner>
      </div>

      <BottomBar variant="scanner" />

      {isPhotoModalShown && scanInfo && (
        <PhotoModal scanInfo={scanInfo} onClose={closePhotoModal} />
      )}
    </div>
  )
}

export default ScannerPage
