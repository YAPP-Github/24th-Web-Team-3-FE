const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>header</header>
      {children}
    </div>
  )
}

export default TestLayout
