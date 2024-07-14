import jsQR from "jsqr"
import { useEffect, useRef } from "react"

import { cn } from "@/utils"

interface ScannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onScan: (result: any) => {}
}

export const Scanner = ({ onScan, className }: ScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })
        video.srcObject = stream
        video.setAttribute("playsinline", "true")
        video.play()

        requestAnimationFrame(tick)
      } catch (err) {
        console.error("Error accessing webcam: ", err)
      }
    }

    const stopVideo = () => {
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }

    const tick = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        )
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        })

        if (code) {
          onScan(code.data)
        }
      }
      requestAnimationFrame(tick)
    }

    startVideo()

    return () => {
      stopVideo()
    }
  }, [])

  return (
    <div className={cn(className, "h-full w-full")}>
      <video ref={videoRef} className="h-full w-full object-cover"></video>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", display: "none" }}></canvas>
    </div>
  )
}

export default Scanner
