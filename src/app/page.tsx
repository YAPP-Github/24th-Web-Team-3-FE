import ErrorHandlingWrapper from "@/common/ErrorHandlingWrapper"
import Test from "@/common/Test"

export default function Home() {
  return (
    <ErrorHandlingWrapper>
      <Test />
    </ErrorHandlingWrapper>
  )
}
