import { Suspense } from "react"

import ErrorHandlingWrapper from "@/components/ErrorHandlingWrapper"
import Test from "@/components/Test"

const TestPage = () => {
  return (
    // 각 페이지마다 ErrorHandlingWrapper로 감싸줍니다.
    // react-query의 QueryErrorResetBoundary를 이용하여 에러가 발생했을 때, 에러를 잡아주고 에러가 발생했을 때 보여줄 컴포넌트를 정의합니다.
    <ErrorHandlingWrapper>
      <Suspense fallback={<div>특정 범위 loading...</div>}>
        <Test />
      </Suspense>
    </ErrorHandlingWrapper>
  )
}
export default TestPage
