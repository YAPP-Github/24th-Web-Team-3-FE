"use client"
import { BrowserQRCodeReader } from "@zxing/browser"
import React, { useEffect } from "react"

const QRScanner: React.FC = () => {
  useEffect(() => {
    const codeReader = new BrowserQRCodeReader()
    let videoInputDevice: MediaDeviceInfo | null = null
    let stream: MediaStream | null = null

    async function findBackCamera(): Promise<MediaDeviceInfo | null> {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        )

        for (const device of videoDevices) {
          if (device.label.toLowerCase().includes("back")) {
            return device
          }
        }

        return videoDevices[0] || null
      } catch (error) {
        console.error("Error enumerating devices:", error)
        return null
      }
    }

    async function setupCamera() {
      try {
        videoInputDevice = await findBackCamera()

        if (!videoInputDevice) {
          console.error("No back camera found.")
          return
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: videoInputDevice.deviceId },
            facingMode: "environment",
          },
        })

        const videoElement = document.createElement("video")
        videoElement.srcObject = stream
        videoElement.autoplay = true
        document.body.appendChild(videoElement)

        const result = await codeReader.decodeFromVideoElement(
          videoElement,
          async (result) => {
            const text = result?.getText() // Result 클래스에서 text 가져오기
            alert("Decoded: " + text)
            // QR 코드의 내용을 처리하는 로직 추가
          }
        )

        console.log("QR Code scan result:", result)
      } catch (error) {
        console.error("Error accessing camera:", error)
        alert("Error accessing camera: " + error)
      }
    }

    setupCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [])

  return (
    <div>
      <h1>QR Scanner</h1>
      {/* QR 코드 스캔 관련 UI 및 기타 요소 추가 */}
    </div>
  )
}

export default QRScanner
