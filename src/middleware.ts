import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret })

  if (!token) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL as string)
  }
}

export const config = {
  matcher: ["/scanner", "/profile", "/album/:path*"],
}
