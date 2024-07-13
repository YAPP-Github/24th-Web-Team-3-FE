import withPWAInit from "@ducanh2912/next-pwa"

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

const isProd = process.env.NODE_ENV === "production" // 빌드 환경에서만 PWA를 적용합니다.
const config = isProd ? withPWAInit({ dest: "public" })(nextConfig) : nextConfig

export default config
