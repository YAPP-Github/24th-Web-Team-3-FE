import ErrorHandlingWrapper from "@/components/ErrorHandlingWrapper"
import Test from "@/components/Test"

export default function Home() {
  return (
    <ErrorHandlingWrapper>
      <Test />
    </ErrorHandlingWrapper>
  )
}
