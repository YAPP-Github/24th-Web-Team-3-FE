import Link from "next/link"

import Icon from "@/common/Icon"
import { MAFOO_KEYWORDS } from "@/constants"

const KeywordPage = () => {
  return (
    <section className="relative h-dvh w-full text-gray-600">
      <div className="flex h-12 w-full items-center pl-2">
        <Link href="/profile/introduction">
          <Icon name="altArrowLeftOutline" size={24} color="gray-500" />
        </Link>
      </div>
      <h1 className="tp-header2-semibold p-4 py-[14px] text-gray-800">
        마푸의 키워드
      </h1>
      <p className="mb-2 p-4">마푸는 다음과 같은 키워드를 가진 서비스에요.</p>
      <ul className="mb-4">
        {MAFOO_KEYWORDS.map((keyword) => (
          <li className="ml-8 list-disc" key={keyword}>
            {keyword}
          </li>
        ))}
      </ul>
      <div className="ml-4 mt-4">
        <Link href="/scanner">
          <div className="flex h-10 w-fit items-center rounded-lg bg-green-600 px-5 text-white active:bg-green-700">
            마푸 이용하러 가기
          </div>
        </Link>
      </div>
    </section>
  )
}

export default KeywordPage
