"use client"

import { useRouter } from "next/navigation"
import { ComponentType } from "react"

import Button from "./Button"
import { FallbackProps } from "./ErrorBoundary"
import Icon from "./Icon"

const Fallback: ComponentType<FallbackProps> = ({
  errorHandler,
  resetErrorBoundary,
}) => {
  const router = useRouter()
  const { errorTitle, errorDescription, buttonContext, buttonAction } =
    errorHandler

  return (
    <div className="flex h-[100vh] flex-col items-center">
      <div className="grow"></div>
      <div className="grow">
        <p className="text-center text-header-2 font-semibold text-gray-500">
          {errorTitle}
        </p>
        <p className="text-center text-header-2 font-semibold text-gray-800">
          {errorDescription}
        </p>
        <Icon
          name="errorLogo"
          className="ml-[34px] mt-8 h-[134px] w-[217px]"
          size={64}
        />
      </div>
      <div className="relative grow">
        <div className="absolute bottom-0 left-0 flex w-full justify-center gap-3 pb-11">
          <Button
            className="bg-green-200 text-green-700"
            onClick={() => {
              buttonAction(router, resetErrorBoundary)
            }}>
            {buttonContext}
          </Button>
          <Button onClick={resetErrorBoundary}>새로고침하기</Button>
        </div>
      </div>
    </div>
  )
}

export default Fallback
