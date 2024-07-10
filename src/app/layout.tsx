import "@/styles/main.css"

import type { Metadata } from "next"
import localFont from "next/font/local"

import ErrorHandlingWrapper from "@/common/ErrorHandlingWrapper"
import { QueryProviders } from "@/common/QueryProviders"

const pretendard = localFont({
  src: "../font/PretendardVariable.woff2",
  fallback: ["system-ui", "arial"],
  variable: "--font-pretendard",
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
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <QueryProviders>
          <ErrorHandlingWrapper>{children}</ErrorHandlingWrapper>
        </QueryProviders>
      </body>
    </html>
  )
}
