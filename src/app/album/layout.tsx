const AlbumLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full justify-center">
      <div className="relative w-full max-w-[390px] bg-white">{children}</div>
    </div>
  )
}

export default AlbumLayout
