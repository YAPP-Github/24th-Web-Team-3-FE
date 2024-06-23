/* eslint-disable no-unused-vars */
"use client"
import { BrowserQRCodeReader } from "@zxing/browser"
import React, { useEffect } from "react"

import { getCroll } from "../api"

const QRScanner: React.FC = () => {
  // 후방 카메라 찾기 시도
  async function findBackCamera(): Promise<MediaDeviceInfo | null> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      )

      // 후방 카메라 찾기 (후면 카메라의 라벨을 확인하여 선택)
      for (const device of videoDevices) {
        if (device.label.toLowerCase().includes("back")) {
          return device
        }
      }

      // 후방 카메라가 없으면 null 반환
      return null
    } catch (error) {
      console.error("Error enumerating devices:", error)
      return null
    }
  }

  const getQRCode = async (url: string) => {
    try {
      const croll = await getCroll()
      console.log(croll)
    } catch (error) {
      console.error("Error getting QR code:", error)
    }
  }

  useEffect(() => {
    const setupCamera = async () => {
      try {
        let stream: MediaStream | null = null
        let videoInputDevice: MediaDeviceInfo | null = null

        // 후방 카메라 사용 시도
        videoInputDevice = await findBackCamera()

        if (!videoInputDevice) {
          console.warn("No back camera found, switching to front camera.")
          // 후방 카메라가 없으면 전면 카메라로 대체
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user", // 전면 카메라 사용
            },
          })
        } else {
          // 후방 카메라 사용
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: videoInputDevice.deviceId },
              facingMode: "environment", // 후방 카메라 사용
            },
          })
        }

        // 비디오 요소 설정
        const videoElement = document.createElement("video")
        videoElement.srcObject = stream
        videoElement.setAttribute("playsinline", "true") // iOS Safari 지원을 위한 속성 추가
        videoElement.setAttribute("autoplay", "true")
        document.body.appendChild(videoElement)

        // ZXing 라이브러리 로드
        const codeReader = new BrowserQRCodeReader()

        // QR 코드 스캔 및 처리
        codeReader.decodeFromVideoElement(videoElement, (result, error) => {
          if (result) {
            alert("Decoded URL: " + result.getText())
            // QR 코드가 발견되면 처리

            // getQRCode(result.getText())
          } else {
            // 오류 처리: QR 코드가 발견되지 않음
            console.warn(
              "Error decoding QR code:",
              error?.message || "Unknown error"
            )
          }
        })
      } catch (error) {
        console.error("Error accessing camera:", error)
        alert("Error accessing camera: " + error)
      }
    }

    setupCamera()

    return () => {
      // Clean up function
      const videoElement = document.querySelector("video")
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
        videoElement.srcObject = null
      }
    }
  }, [])

  return (
    <div>
      <h1>QR Code Scanner</h1>
      {/* 추가적인 UI 요소는 여기에 추가 */}
    </div>
  )
}

export default QRScanner
