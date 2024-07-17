import "@/styles/main.css"

import type { Metadata } from "next"

import ErrorHandlingWrapper from "@/common/ErrorHandlingWrapper"
import { QueryProviders } from "@/common/QueryProviders"
import { pretendard } from "@/font"
import AlertContainer from "@/store/AlertContext"

export const metadata: Metadata = {
  title: "MAFOO",
  description: "MAFOO client service.",
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
          <ErrorHandlingWrapper>
            <AlertContainer />
            {children}
          </ErrorHandlingWrapper>
        </QueryProviders>
      </body>
    </html>
  )
}
