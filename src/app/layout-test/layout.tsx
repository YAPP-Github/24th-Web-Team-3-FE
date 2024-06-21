export default function LayoutTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="w-full bg-gray-300 flex justify-center">
      <section className="w-[430px] min-h-full bg-white p-4">
        {children}
      </section>
    </main>
  )
}
