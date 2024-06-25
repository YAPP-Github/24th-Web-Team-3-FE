import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
      }
      return session
    },
  },
  session: { strategy: "jwt" },
})

export { handler as GET, handler as POST }
