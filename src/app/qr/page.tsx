"use client"
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner"

import { isUrlIncluded } from "./lib"

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
    <div>
      <Scanner onScan={onScan} />
    </div>
  )
}

export default QrPage
