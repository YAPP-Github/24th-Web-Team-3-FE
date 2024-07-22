"use client"

import { useState } from "react"
import { OnResultFunction, QrReader } from "react-qr-reader"

const Test3Page = () => {
  const [data, setData] = useState<string | null>(null)

  const handleResult: OnResultFunction = (result) => {
    if (result) {
      setData(result.getText())
    }
  }

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <QrReader
        constraints={{ facingMode: { exact: "environment" } }} // Use the back camera on mobile devices
        onResult={handleResult}
      />
      <p>{data}</p>
    </div>
  )
}

export default Test3Page
