import { AlbumPhotos } from "./_component/AlbumPhotos"
import { Header } from "./_component/Header"

const AlbumDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return (
    <>
      <Header albumId={id} />
      <section className="w-full p-4 px-6 flex flex-wrap">
        <AlbumPhotos albumId={id} />
      </section>
    </>
  )
}

export default AlbumDetailPage
