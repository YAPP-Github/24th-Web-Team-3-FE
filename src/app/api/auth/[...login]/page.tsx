"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { authLogin } from "../.."

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
          // 추후 토큰 및 세션 처리 로직 추가
          router.replace("/")
        }
      } catch (error) {
        throw new Error(`SNS 로그인 실패 : ${error}`)
      }
    }

    handleAuthLogin()
  }, [code, router])
}

export default RoutePage
