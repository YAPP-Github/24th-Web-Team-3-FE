import Script from "next/script"

export const GoogleAdSense = () => {
  if (process.env.NODE_ENV !== "production") {
    return null
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_PID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  )
}
