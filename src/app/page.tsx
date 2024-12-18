"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"

import Highlighter from "@/assets/highlighter"
import Icon from "@/common/Icon"

import ExamplePhoto from "./_components/_assets/ExamplePhoto.png"
import LoginButton from "./_components/LoginButton"
import SumoneCodePage from "./_components/SumoneCode"

const Home = () => {
  const [isSumone, setIsSumone] = useState(false)
  const router = useRouter()
  const { data } = useSession()
  if (data) {
    // return router.push("/scanner")
    return router.push("/album")
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #FFF 0%, #FEEFE2 70%, #FFDBFB 99%)",
      }}
      className="flex h-full w-full flex-col justify-between pb-8 pt-4">
      {!isSumone ? (
        <>
          <div className="flex h-full w-full flex-1 flex-col">
            <div className="flex w-full flex-row items-center justify-center gap-6">
              <Highlighter
                width={45}
                height={89}
                fill="#FDD0E3"
                reversed={false}
              />
              <div className="flex w-fit flex-col items-center gap-2">
                <Icon name="heartPink" size={36} />
                <div className="px-8 text-center">
                  <p className="tp-header1-semibold text-gray-800">
                    2024 RECAP
                  </p>
                </div>
                <p className="tp-body1-regular whitespace-pre text-center text-gray-500">
                  {`올 한 해 사진을 모아\n추억이 담긴 영상으로!`}
                </p>
              </div>
              <Highlighter
                width={45}
                height={89}
                fill="#FDD0E3"
                reversed={true}
              />
            </div>
            <div className="mb-8 mt-4 flex h-full flex-grow items-center">
              <div className="relative flex h-full w-full flex-grow">
                {/* <Image
              src={"/images/AlbumItem_Carousell.svg"}
              alt="albumImage"
              fill
              className="object-cover"
            /> */}
                <Image
                  src={ExamplePhoto}
                  alt="mainPageExample"
                  unoptimized
                  fill
                  quality={100}
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full px-6">
            <LoginButton isSumone={false} setIsSumone={setIsSumone} />
          </div>
        </>
      ) : (
        <SumoneCodePage />
      )}
    </div>
  )
}

export default Home
