import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL as string)
  }
}

export const config = {
  matcher: ["/scanner", "/profile", "/album/:path*"],
}
