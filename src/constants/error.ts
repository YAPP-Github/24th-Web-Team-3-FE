"use client"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export type ErrorHandler = {
  errorTitle: string
  errorDescription: string
  buttonContext: string
  buttonAction: (
    router: AppRouterInstance,
    resetErrorBoundary: () => void
  ) => void
}

type ErrorHandlers = {
  [errorMessage: string]: ErrorHandler
}

export const errorHandlers: ErrorHandlers = {
  "인증(Authorization) 헤더가 없습니다": {
    errorTitle: "로그인 세션이 만료되었어요",
    errorDescription: "다시 로그인하러 가볼까요?",
    buttonContext: "로그인 하러 가기",
    buttonAction: (router, resetErrorBoundary) => {
      router.replace("/")
      resetErrorBoundary()
    },
  },
  "토큰이 올바르지 않습니다": {
    errorTitle: "로그인 세션이 만료되었어요",
    errorDescription: "다시 로그인하러 가볼까요?",
    buttonContext: "로그인 하러 가기",
    buttonAction: (router, resetErrorBoundary) => {
      router.replace("/")
      resetErrorBoundary()
    },
  },
}

export const defaultErrorHandler: ErrorHandler = {
  errorTitle: "앗! 마푸를 불러오지 못했어요",
  errorDescription: "다시 시도해볼까요?",
  buttonContext: "홈으로 돌아가기",
  buttonAction: (router, resetErrorBoundary) => {
    router.replace("/")
    resetErrorBoundary()
  },
}
