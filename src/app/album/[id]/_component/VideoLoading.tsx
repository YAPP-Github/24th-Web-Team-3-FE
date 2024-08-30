import Image from "next/image"

const VideoLoading = () => {
  return (
    <div className="absolute left-0 top-0 z-10 h-dvh w-full bg-gray-800 bg-opacity-50">
      <div
        role="status"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div
          className="flex h-[224px] w-[345px] flex-col items-center rounded-[24px] bg-gradient-to-br from-[#C680FF] via-[#F09BF2] to-[#FF82C6]"
          style={{
            borderRadius: "24px",
            boxShadow:
              "0px 16px 20px 0px rgba(101, 125, 159, 0.12), 0px 0px 8px 0px rgba(88, 100, 117, 0.08)",
          }}>
          <Image
            className="mb-2 mt-6"
            src="/images/reel.gif"
            width={170}
            height={170}
            alt="loading"
          />

          <span className="tp-title1-semibold whitespace-pre text-center text-white">
            {"앨범 속 추억을\n리캡으로 만드는 중이에요.."}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VideoLoading
