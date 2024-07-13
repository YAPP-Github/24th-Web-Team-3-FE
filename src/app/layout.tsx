import "@/styles/main.css"

import type { Metadata } from "next"
import localFont from "next/font/local"

import ErrorHandlingWrapper from "@/common/ErrorHandlingWrapper"
import { QueryProviders } from "@/common/QueryProviders"

const pretendard = localFont({
  src: [
    {
      path: "../font/Pretendard-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../font/Pretendard-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/Pretendard-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../font/Pretendard-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  title: "Myframe",
  description: "Myframe client service.",
  keywords: [
    "인생네컷",
    "포토이즘",
    "하루필름",
    "인생네컷 앨범",
    "인생네컷 정리",
    "인생네컷 보관",
    "즉석사진 앨범",
    "인생네컷 앨범 서비스",
    "앨범 서비스",
    "모바일 앨범",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard}`}>
      <body className={pretendard.className}>
        <QueryProviders>
          <ErrorHandlingWrapper>{children}</ErrorHandlingWrapper>
        </QueryProviders>
      </body>
    </html>
  )
}
