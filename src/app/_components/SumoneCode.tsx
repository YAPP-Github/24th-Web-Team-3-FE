import SumoneLogo from "@/assets/SumoneLogo"
import Icon from "@/common/Icon"

import LoginButton from "./LoginButton"

const SumoneCodePage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <header className="relative flex h-14 w-full items-center justify-center px-4 py-3.5">
        <span className="absolute left-4">
          <Icon name="altArrowLeftOutline" size={28} />
        </span>
        <span className="tp-title2-semibold text-gray-800">
          썸원 이벤트 참여자
        </span>
      </header>
      <div className="mt-8 flex h-full w-full flex-col">
        <span className="flex flex-col gap-2.5 p-6">
          <SumoneLogo width={120} fill="#FF9092" />
          <span className="tp-header2-semibold whitespace-pre text-gray-900">
            {`썸원에서 복사한\n가입코드를 입력해주세요`}
          </span>
        </span>
        <div className="px-6 py-1">
          <input
            className="tp-header1-semibold h-12 w-full rounded-lg bg-gray-100 px-4 py-2 text-center text-gray-800 placeholder:text-gray-400 focus:outline-none"
            type="text"
            placeholder="가입코드"
            tabIndex={0}
          />
        </div>
      </div>
      <div className="flex w-full px-6">
        <LoginButton isSumone={true} />
      </div>
    </div>
  )
}

export default SumoneCodePage
