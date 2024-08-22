import Link from "next/link"

import Icon from "@/common/Icon"

const IntroductionPage = () => {
  return (
    <div className="relative h-dvh w-full">
      <div className="flex h-12 w-full items-center pl-2">
        <Link href="/profile">
          <Icon name="altArrowLeftOutline" size={24} color="gray-500" />
        </Link>
      </div>
      <h1 className="tp-header2-semibold p-4 py-[14px] text-gray-800">
        마푸를 소개해요
      </h1>
      <ul>
        <Link href="/profile/introduction/keywords">
          <li className="flex h-[54px] w-full items-center justify-between px-4 active:bg-gray-100">
            <p className="tp-body1-regular text-gray-600">마푸 키워드</p>
            <Icon name="arrowRight" size={24} color="gray-500" />
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default IntroductionPage
