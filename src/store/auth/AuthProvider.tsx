"use client"

import useAuthStore from "./useAuthStore"

interface AuthContextProps {
  accessToken: string | null
}

const AuthProvider = ({ accessToken }: AuthContextProps) => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  if (accessToken) {
    setAccessToken(accessToken)
  }

  return null
}

export default AuthProvider
