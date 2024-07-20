"use client"

import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library"
import { useEffect, useRef, useState } from "react"

const Reader = () => {
  const [localStream, setLocalStream] = useState<MediaStream>()
  const Camera = useRef<HTMLVideoElement>(null)
  const hints = new Map()
  const formats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODABAR,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
  ]
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats)
  const Scan = new BrowserMultiFormatReader(hints, 500)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user" }, //전면
        // video: { facingMode: { exact: "environment" } }, //후면
      })
      .then((stream) => {
        console.log(stream)
        setLocalStream(stream)
      })
    return () => {
      Stop()
    }
  }, [])
  useEffect(() => {
    if (!Camera.current) return
    if (localStream && Camera.current) {
      Scanning()
    }
    return () => {
      Stop()
    }
  }, [localStream])
  const Scanning = async () => {
    // const t = await Scan.decodeOnce();
    console.log("scan")
    if (localStream && Camera.current) {
      try {
        await Scan.decodeFromStream(localStream, Camera.current, (data) => {
          if (data) {
            setText(data.getText())
            // Scan.stopContinuousDecode();
          } else {
            setText("")
          }
        })
      } catch (error) {
        alert(error)
      }
    }
  }
  const Stop = () => {
    if (localStream) {
      const vidTrack = localStream.getVideoTracks()
      vidTrack.forEach((track) => {
        localStream.removeTrack(track)
      })
    }
  }
  const [text, setText] = useState("")
  return (
    <div>
      <video ref={Camera} id="video" />
      <span>{text}</span>
    </div>
  )
}
export default Reader
