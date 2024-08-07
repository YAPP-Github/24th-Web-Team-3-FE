import "@/styles/main.css"

import type { Metadata } from "next"

import AuthProvider from "@/common/AuthProvider"
import ErrorHandlingWrapper from "@/common/ErrorHandlingWrapper"
import { QueryProviders } from "@/common/QueryProviders"
import { pretendard } from "@/font"
import AlertContainer from "@/store/AlertContext"

export const metadata: Metadata = {
  title: "마푸-네컷사진 전용 앨범",
  description: "마푸를 켜고 QR을 가져다 대면 바로 업로드",
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: "마푸 - 지금 함께 찍은 네컷사진을 올려보세요",
    description: "마푸를 켜고 QR을 가져다 대면 바로 업로드",
    url: process.env.NEXT_PUBLIC_OPENGRAPH_URL,
    type: "website",
    siteName: "마푸",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard}`}>
      <body className={pretendard.className}>
        <AuthProvider>
          <QueryProviders>
            <ErrorHandlingWrapper>
              <AlertContainer />
              {children}
            </ErrorHandlingWrapper>
          </QueryProviders>
        </AuthProvider>
      </body>
    </html>
  )
}
