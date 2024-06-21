import ErrorHandlingWrapper from "./_components/ErrorHandlingWrapper"
import Test from "./_components/Test"

export default function Home() {
  return (
    <ErrorHandlingWrapper>
      <Test />
    </ErrorHandlingWrapper>
  )
}
