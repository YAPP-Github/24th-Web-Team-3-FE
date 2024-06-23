import withPWAInit from "@ducanh2912/next-pwa"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "haru6.mx2.co.kr",
        port: "",
        pathname: "/download/album/**",
      },
    ],
  },
}

const isProd = process.env.NODE_ENV === "production" // 운영환경에서만 pwa 적용
const config = isProd ? withPWAInit({ dest: "public" })(nextConfig) : nextConfig

export default config
