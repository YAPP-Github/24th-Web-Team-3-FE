"use client"

import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner"

import { isUrlIncluded } from "@/libs/qr"

import { postQrCode } from "../api/photo"

const style = {
  container: {
    display: "flex",
    color: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
    "object-fit": "cover",
  },
}

const QrPage = () => {
  const onScan = async (result: IDetectedBarcode[]) => {
    const { rawValue } = result[0]

    if (!isUrlIncluded(rawValue)) {
      alert("지원하지 않는 QR코드입니다.")
      return
    }

    try {
      const data = await postQrCode(rawValue)
      alert(`QR코드가 성공적으로 저장되었습니다.\n${data.photoUrl}`)
    } catch (error) {
      alert(`QR코드 저장에 실패했습니다.\n${error}`)
    }
  }

  return (
    <div className="h-[100vh] overflow-hidden">
      <Scanner
        onScan={onScan}
        styles={{ ...style }}
        scanDelay={500}
        allowMultiple={true}
        components={{
          onOff: true,
          finder: false,
        }}>
        <>
          <p className="relative z-[1] px-4 py-3.5 text-header-2 font-bold text-white">
            홈
          </p>
          <div className="relative z-[1] flex flex-col items-center justify-center p-6">
            <p className="whitespace-pre text-center text-title-1 text-border text-white">
              {`QR코드를 스캔해\n인생네컷을 저장해요`}
            </p>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="bor h-[345px] w-[345px] rounded-3xl border-4 border-solid border-green-600 shadow-[0_0_0_100vh_rgba(24,28,35,0.8)]" />
            <p className="p-6 text-center text-body-2 font-medium text-white">
              지원하지 않는 브랜드라면 웹사이트를 열어드려요.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 z-[1] h-[106px] w-full rounded-t-2xl bg-gray-900 px-[54px] pb-[32px] pt-[20px]">
            {/* 아이콘 컴포넌투 추가 */}
          </div>
        </>
      </Scanner>
    </div>
  )
}

export default QrPage
