"use client"

import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner"
import React from "react"

const Test2Page = () => {
  const [value, setValue] = React.useState<string>("")
  const onScan = (result: IDetectedBarcode[]) => {
    const { rawValue } = result[0]

    setValue(rawValue)
  }

  return (
    <>
      <Scanner
        onScan={onScan}
        allowMultiple={true}
        components={{
          audio: true,
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
        }}></Scanner>

      <p>{value}</p>
    </>
  )
}

export default Test2Page
