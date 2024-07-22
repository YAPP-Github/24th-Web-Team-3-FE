"use client"

import { useEffect, useRef } from "react"

const Test3Page = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: { exact: "environment" },
        },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: " + err)
      })
  }, [])

  return <video ref={videoRef} autoPlay />
}

export default Test3Page
