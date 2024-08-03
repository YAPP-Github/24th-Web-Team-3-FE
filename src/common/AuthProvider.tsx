"use client"

import { SessionProvider } from "next-auth/react"
import React from "react"

interface Props {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider basePath={process.env.NEXT_PUBLIC_NEXTAUTH_URL}>
      {children}
    </SessionProvider>
  )
}

export default AuthProvider
