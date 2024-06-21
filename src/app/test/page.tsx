import { Suspense } from "react"

import Test from "../_components/Test"

const TestPage = () => {
  return (
    <>
      <header>로딩이 없음</header>
      <Suspense fallback={<div>특정 범위 loading...</div>}>
        <Test />
      </Suspense>
    </>
  )
}
export default TestPage
