import { AlbumPhotos } from "./_component/AlbumPhotos"
import { Header } from "./_component/Header"

const AlbumDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return (
    <>
      <Header albumId={id} />
      {/* <section className="flex w-full flex-wrap p-4 px-6"> */}
      <AlbumPhotos albumId={id} />
      {/* </section> */}
    </>
  )
}

export default AlbumDetailPage
