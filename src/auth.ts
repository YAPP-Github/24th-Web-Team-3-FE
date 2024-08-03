import { cookies } from "next/headers"
import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

import { authLogin } from "@/app/api/signIn"
import { ACCESS_TOKEN_KEY } from "@/constants"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/",
  },
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.access_token) {
        const authResponse = await authLogin(account.access_token)

        cookies().set(ACCESS_TOKEN_KEY, authResponse.accessToken)

        const updatedAccount = {
          ...account,
          access_token: authResponse.accessToken,
          refresh_token: authResponse.refreshToken,
        }
        account = updatedAccount
      }

      return true
    },
    jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      }
    },
  },
  events: {
    signOut() {
      cookies().delete(ACCESS_TOKEN_KEY)
      return
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
