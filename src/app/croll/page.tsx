"use client"

import { useEffect, useRef, useState } from "react"

// import { getCroll } from "../api"

const CrollPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: "environment" },
          },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = isCameraOn ? stream : null
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error accessing rear camera: ", error)
        // fallback to default camera or handle the error as needed
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          })
          return stream
        } catch (fallbackError) {
          // eslint-disable-next-line no-console
          console.error("Error accessing default camera: ", fallbackError)
        }
      }
    }

    initCamera()

    return () => {
      // 컴포넌트가 언마운트되면 미디어 스트림 해제
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [isCameraOn])

  const toggleCamera = () => {
    setIsCameraOn((prevState) => !prevState)
  }

  return (
    <div>
      <button onClick={toggleCamera}>
        {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
      </button>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  )
}

export default CrollPage
