"use client"

import Cookies from "js-cookie"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { authLogin } from "../../login"

const RoutePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get("code")

  useEffect(() => {
    if (!code) return

    const handleAuthLogin = async () => {
      try {
        const result = await authLogin(code)

        if (result) {
          Cookies.set("accessToken", result.accessToken, {
            expires: 7,
            // httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          })
          router.replace("/scanner")
          return
        }
      } catch (error) {
        router.replace("/")
        throw new Error(`SNS 로그인 실패 : ${error}`)
      }
    }

    handleAuthLogin()
  }, [code, router])
}

export default RoutePage
