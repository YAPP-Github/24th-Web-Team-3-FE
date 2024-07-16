import AlertContainer from "@/store/AlertContext"

const ScannerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AlertContainer />
      {children}
    </>
  )
}

export default ScannerLayout
