"use client"
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from "react"

interface QRReaderProps {
  onScan: (result: string) => void
}

// 확장된 Window 타입 정의 (iOS를 식별하기 위해)
interface ExtendedWindow extends Window {
  isMediaStreamAPISupported: boolean
  iOS: boolean
}

declare let window: ExtendedWindow

const QRReader: React.FC<QRReaderProps> = ({ onScan }) => {
  const [active, setActive] = useState(false)
  const webcamRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const decoderRef = useRef<Worker | null>(null)

  useEffect(() => {
    const baseurl = ""
    let streaming = false

    const setCanvasProperties = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    const startCapture = (constraints: MediaStreamConstraints) => {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream
            webcamRef.current.setAttribute("playsinline", "true")
            webcamRef.current.setAttribute("controls", "true")
            setTimeout(() => {
              webcamRef.current?.removeAttribute("controls")
            })
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log("Error occurred ", err)
          showErrorMsg()
        })
    }

    const showErrorMsg = () => {
      const scannerElement = document.querySelector(
        ".custom-scanner"
      ) as HTMLElement
      if (scannerElement) {
        scannerElement.style.display = "none"
      }
      alert(
        "You need to allow camera access in your browser to use this feature."
      )
    }

    const setPhotoSourceToScan = (forSelectedPhotos?: boolean) => {
      if (!forSelectedPhotos && window.isMediaStreamAPISupported) {
        // video element를 할당하기 위해 null 가능성을 제거합니다.
        const videoElement = document.querySelector("video")
        if (videoElement) {
          webcamRef.current = videoElement as HTMLVideoElement
        }
      } else {
        const imageElement = document.querySelector("img")
        if (imageElement) {
          webcamRef.current = imageElement as unknown as HTMLVideoElement
        }
      }
    }

    setPhotoSourceToScan()

    if (window.isMediaStreamAPISupported) {
      webcamRef.current?.addEventListener(
        "play",
        () => {
          if (!streaming) {
            setCanvasProperties()
            streaming = true
          }
        },
        false
      )
    } else {
      setCanvasProperties()
    }

    if (window.isMediaStreamAPISupported) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          )
          let constraints: MediaStreamConstraints
          if (videoDevices.length > 1) {
            constraints = {
              video: {
                deviceId: videoDevices[videoDevices.length - 1].deviceId
                  ? { exact: videoDevices[videoDevices.length - 1].deviceId }
                  : undefined,
                facingMode: "environment",
              },
              audio: false,
            }
            startCapture(constraints)
          } else if (videoDevices.length) {
            constraints = {
              video: {
                deviceId: videoDevices[0].deviceId
                  ? { exact: videoDevices[0].deviceId }
                  : undefined,
                facingMode: "environment",
              },
              audio: false,
            }
            startCapture(constraints)
          } else {
            startCapture({ video: { facingMode: "environment" }, audio: false })
          }
        })
        .catch((error) => {
          showErrorMsg()
          // eslint-disable-next-line no-console
          console.error("Error occurred : ", error)
        })
    }

    decoderRef.current = new Worker("/decode.js")
    decoderRef.current.onmessage = (event) => {
      if (event.data.length > 0) {
        const qrid = event.data[0][2]
        setActive(false)
        onScan(qrid)
      }
      setTimeout(newDecoderFrame, 0)
    }

    const newDecoderFrame = () => {
      if (!active) return
      try {
        const ctx = canvasRef.current?.getContext("2d")
        if (ctx && webcamRef.current) {
          ctx.drawImage(
            webcamRef.current,
            0,
            0,
            canvasRef.current?.width || 0,
            canvasRef.current?.height || 0
          )
          const imgData = ctx.getImageData(
            0,
            0,
            canvasRef.current?.width || 0,
            canvasRef.current?.height || 0
          )
          if (imgData.data) {
            decoderRef.current?.postMessage(imgData)
          }
        }
      } catch (e: any) {
        if (e.name === "NS_ERROR_NOT_AVAILABLE") setTimeout(newDecoderFrame, 0)
      }
    }

    setActive(true)
    newDecoderFrame()

    return () => {
      setActive(false)
      if (webcamRef.current?.srcObject) {
        ;(webcamRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop())
      }
      decoderRef.current?.terminate()
    }
  }, [onScan, active])

  return (
    <div className="qr-reader">
      <video
        ref={webcamRef}
        style={{ display: active ? "block" : "none" }}></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  )
}

export default QRReader
