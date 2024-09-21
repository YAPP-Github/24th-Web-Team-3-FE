"use client"

import { useRouter } from "next/navigation"
import { ComponentType } from "react"

import { FallbackProps } from "./ErrorBoundary"
import Icon from "./Icon"
import SquareButton from "./SquareButton"

const Fallback: ComponentType<FallbackProps> = ({ resetErrorBoundary }) => {
  const router = useRouter()

  return (
    <div className="flex h-[100vh] flex-col items-center">
      <div className="grow"></div>
      <div className="grow">
        <p className="text-center text-header-2 font-semibold text-gray-500">
          앗! 마푸를 불러오지 못했어요
        </p>
        <p className="text-center text-header-2 font-semibold text-gray-800">
          다시 시도해볼까요?
        </p>
        <Icon
          name="errorLogo"
          className="ml-[34px] mt-8 h-[134px] w-[217px]"
          size={64}
        />
      </div>
      <div className="relative grow">
        <div className="absolute bottom-0 left-0 flex w-full justify-center gap-3 pb-11">
          <SquareButton
            className="bg-green-200 text-green-700"
            onClick={() => {
              router.replace("/")
              resetErrorBoundary()
            }}>
            홈으로 돌아가기
          </SquareButton>
          <SquareButton onClick={resetErrorBoundary}>새로고침하기</SquareButton>
        </div>
      </div>
    </div>
  )
}

export default Fallback
