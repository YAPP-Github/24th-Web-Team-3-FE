"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

// import { getCroll } from "@/app/api"

const CallPage = () => {
  //   const data = getCroll()
  const [qrCode, setQrCode] = useState<string>("")

  useEffect(() => {
    setQrCode(
      "http://haru6.mx2.co.kr/download/album/HA021CH8jth/output/output.jpg"
    )
  }, [])

  return (
    <div>
      {qrCode && (
        <div>
          qrCode
          <Image
            src={qrCode}
            width={862}
            height={1294}
            alt="Picture of the author"
          />
        </div>
      )}
    </div>
  )
}

export default CallPage
