"use client"
import { useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle: any
  }
}

export const GoogleAdSenseComponent = () => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100%", height: "100%" }}
      data-ad-client="ca-pub-5402060146912815"
      data-ad-slot="6025965251"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
