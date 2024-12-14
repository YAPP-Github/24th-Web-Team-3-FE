"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Icon from "@/common/Icon"

import LoginButton from "./_component/LoginButton"

const Home = () => {
  const router = useRouter()
  const { data } = useSession()
  if (data) {
    return router.push("/album")
  }

  return (
    <div
      className="flex h-screen flex-col justify-between"
      style={{
        background:
          "linear-gradient(180deg, #FFF 0%, #FEEFE2 70%, #FFDBFB 99%)",
      }}>
      <div className="flex w-full flex-1 flex-col">
        <div className="mt-[32px] flex flex-col items-center justify-center gap-1 px-8 text-center">
          <Icon name={"heartBold"} size={36}></Icon>
          <p className="tp-header1-semibold text-gray-800">RECAP</p>
        </div>
        <p className="tp-body1-regular whitespace-pre pb-4 pt-2 text-center text-gray-500">
          {`올 한 해 사진을 모아\n추억이 담긴 영상으로!`}
        </p>
        <div className="flex h-1 flex-1 items-center pb-8">
          <div className="relative mx-12 my-12 h-full w-full">
            <Image
              src={"/images/RecapThumnail.png"}
              alt="RecapThumnail"
              fill
              className="object-fit"
            />
          </div>
        </div>
      </div>

      <div
        className="mb-8 w-full max-w-[430px] px-8"
        style={{ backgroundColor: "transparent" }}>
        <LoginButton />
      </div>
    </div>
  )
}

export default Home
