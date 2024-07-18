"use client"

import { QueryErrorResetBoundary } from "@tanstack/react-query"

import ErrorBoundary from "./ErrorBoundary"
import Fallback from "./Fallback"

interface PropsType {
  children: React.ReactNode
}

export default function ErrorHandlingWrapper({ children }: PropsType) {
  return (
    // query error reset boundary를 이용하여 에러가 발생했을 때, 에러를 잡아주고 에러가 발생했을 때 보여줄 컴포넌트를 정의합니다.
    // query reset을 이용하여 에러가 발생했을 때, 에러를 초기화합니다.
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={Fallback}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
