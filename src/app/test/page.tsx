import { Suspense } from "react"

import Test from "@/components/Test"

const TestPage = () => {
  return (
    // 해당 페이지에서 에러가 발생했을 때는 해당 depth에 있는 error.tsx 컴포넌트를 보여줍니다.
    // 해당 페이지에서 로딩 중일 떄는 header태그를 제외한 영역만 suspense로 인해 로딩 처리됩니다.
    <>
      <header>로딩이 없음</header>
      <Suspense fallback={<div>특정 범위 loading...</div>}>
        <Test />
      </Suspense>
    </>
  )
}
export default TestPage
