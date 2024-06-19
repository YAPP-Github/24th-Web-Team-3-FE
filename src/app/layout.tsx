import "@/styles/main.css"

import type { Metadata } from "next"
import localFont from "next/font/local"

import Providers from "../components/providers"

const pretendard = localFont({
  src: "../font/PretendardVariable.woff2",
  fallback: ["system-ui", "arial"],
  variable: "--font-pretendard",
})

export const metadata: Metadata = {
  title: "Myframe",
  description: "Myframe client service.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
