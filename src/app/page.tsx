import ErrorHandlingWrapper from "./_components/ErrorHandlingWrapper"
import Test from "./_components/Test"

export default function Home() {
  return (
    // 해당 페이지에서 에러가 발생했을 때, ErrorHandlingWrapper 컴포넌트를 이용하여 에러를 잡아주고 에러가 발생했을 때 보여줄 컴포넌트를 정의합니다.
    // 해당 페이지에서 로딩이 발생했을 때는 해당 depth에 있는 loading.tsx 컴포넌트를 보여줍니다.
    <ErrorHandlingWrapper>
      <Test />
    </ErrorHandlingWrapper>
  )
}
