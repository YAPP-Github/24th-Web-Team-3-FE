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
      {
        protocol: "http",
        hostname: "*.kakaocdn.net",
        pathname: "/**",
      },
    ],
  },
  // SharedArrayBuffer를 사용하려면 Cross-Origin-Embedder-Policy 헤더를 require-corp로 설정해야 합니다.
  // @ffmpeg/ffmpeg 모듈을 사용할 때 SharedArrayBuffer를 사용하므로 설정합니다.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/blog",
          destination: "https://inblog.ai/mafoo",
        },
        {
          source: "/blog/:path*",
          destination: "https://inblog.ai/mafoo/:path*",
        },
        {
          source: "/robots.txt",
          destination: "https://inblog.ai/mafoo/robots.txt",
        },
        {
          source: "/_inblog/:path*",
          destination: "https://inblog.ai/mafoo/_inblog/:path*",
        },
      ],
    };
  },
}

const isProd = process.env.NODE_ENV === "production" // 빌드 환경에서만 PWA를 적용합니다.
const config = isProd ? withPWAInit({ dest: "public" })(nextConfig) : nextConfig

export default config
