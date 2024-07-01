import Link from "next/link"

import { KAKAO_AUTH_URL } from "@/constants"

const KakaoLogin = () => {
  return (
    <Link style={{ backgroundColor: "yellow" }} href={KAKAO_AUTH_URL}>
      카카오톡 로그인
    </Link>
  )
}

export default KakaoLogin
