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
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ]
  },
}

const isProd = process.env.NODE_ENV === "production" // 운영환경에서만 pwa 적용
const config = isProd ? withPWAInit({ dest: "public" })(nextConfig) : nextConfig

export default config
