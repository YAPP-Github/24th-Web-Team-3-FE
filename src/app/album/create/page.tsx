import { AlbumEditSection } from "./_components/AlbumEditSection"
import { Header } from "./_components/Header"

const AlbumCreatePage = () => {
  return (
    <>
      <Header />
      <h1 className="p-6 text-header-2 font-bold">
        새로운 앨범을 만들어주세요
      </h1>
      <AlbumEditSection />
    </>
  )
}

export default AlbumCreatePage
