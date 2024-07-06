import { AlbumPhotos } from "@/components"

const AlbumDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return (
    <section className="w-full p-4 px-6 flex flex-wrap border">
      <AlbumPhotos albumId={id} />
    </section>
  )
}

export default AlbumDetailPage
