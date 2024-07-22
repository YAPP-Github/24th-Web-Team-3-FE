"use client"

import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library"
import { useCallback, useEffect, useRef, useState } from "react"

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

  const Stop = useCallback(() => {
    if (localStream) {
      const vidTrack = localStream.getVideoTracks()
      vidTrack.forEach((track) => {
        localStream.removeTrack(track)
      })
    }
  }, [localStream])

  const Scanning = useCallback(async () => {
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
  }, [Scan, localStream])

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { exact: "environment" } }, //후면
      })
      .then((stream) => {
        console.log(stream)
        setLocalStream(stream)
      })
    return () => {
      Stop()
    }
  }, [Stop])
  useEffect(() => {
    if (!Camera.current) return
    if (localStream && Camera.current) {
      Scanning()
    }
    return () => {
      Stop()
    }
  }, [Scanning, Stop, localStream])

  const [text, setText] = useState("")
  return (
    <div>
      <video ref={Camera} id="video" />
      <span>{text}</span>
    </div>
  )
}
export default Reader
