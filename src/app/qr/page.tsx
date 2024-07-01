"use client"
import "./page.css" // 스타일 정의를 위한 CSS 파일을 포함합니다.

import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner"

import { isUrlIncluded } from "./lib"

const style = {
  container: {
    display: "flex !important",
    color: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  finderBorder: 100,
}

const QrPage = () => {
  const onScan = (result: IDetectedBarcode[]) => {
    const { rawValue } = result[0]

    if (!isUrlIncluded(rawValue)) {
      alert("지원하지 않는 QR코드입니다.")
      return
    }

    alert(rawValue)
  }

  return (
    <div className="fullscreen-qr-scanner">
      <Scanner
        onScan={onScan}
        styles={style}
        scanDelay={500}
        allowMultiple={true}
        components={{
          onOff: true,
          finder: false,
        }}>
        <>
          <p className="text-header-2 font-bold text-white clear">홈</p>
          <div>
            <button>버튼 텍스트</button>
          </div>
          <div className="fullscreen-qr-scanner__overlay">
            <div className="fullscreen-qr-scanner__overlay__inner" />
          </div>
        </>
      </Scanner>
    </div>
  )
}

export default QrPage
