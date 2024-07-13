import Image from "next/image"
import Link from "next/link"

import Button from "@/common/Button"
import Icon from "@/common/Icon"
import { KAKAO_AUTH_URL } from "@/constants"

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <div>
        <div className="mt-[94px] px-[24px] text-center">
          <p className="text-header-1 font-bold text-gray-500">
            인생네컷을 모아보는
          </p>
          <p className="text-header-1 font-bold text-gray-800">
            가장 편한 방법
          </p>
        </div>
        <p className="whitespace-pre px-[24px] py-[24px] text-center text-body-1 font-medium text-gray-500">
          {`인생네컷만 모아보고 싶나요?\n간편한 QR 스캔과 앨범 정리로\n쉽고 빠르게 모아봐요`}
        </p>
        <Image
          className="mt-[110px] w-full"
          src={"/images/AlbumItem_Carousell.svg"}
          alt="albumImage"
          width={300}
          height={150}
        />
      </div>

      <div className="mx-[24px] mb-[44px] mt-[12px]">
        <Link href={KAKAO_AUTH_URL} replace>
          <Button className="w-full bg-kakao text-gray-1000">
            <Icon name={"kakaoLogo"} size={28}></Icon>
            카카오로 3초만에 계속하기
          </Button>
        </Link>
      </div>
    </div>
  )
}
