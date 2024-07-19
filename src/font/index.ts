import localFont from "next/font/local"

export const pretendard = localFont({
  src: [
    {
      path: "../font/Pretendard-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../font/Pretendard-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/Pretendard-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../font/Pretendard-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../font/Pretendard-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  fallback: ["system-ui", "arial"],
  variable: "--font-pretendard",
})
