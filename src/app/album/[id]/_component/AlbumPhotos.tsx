"use client"

import { useEffect, useRef, useState } from "react"
import Masonry from "react-responsive-masonry"

import VideoLoading from "@/app/album/[id]/_component/VideoLoading"
import VideoRecap from "@/app/album/[id]/_component/VideoRecap"
import { deletePhoto, getPhotos } from "@/app/api/photo"
import Button from "@/common/Button"
import Icon from "@/common/Icon"
import { recapColorVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumInfo, PhotoInfo } from "../../types"
import { ImageDetail } from "./ImageDetail"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"

interface AlbumPhotosProps {
  albumInfo: AlbumInfo
}

export const AlbumPhotos = ({ albumInfo }: AlbumPhotosProps) => {
  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  const [imageDetailShown, setImageDetailShown] = useState(false)

  const carouselStartIdx = useRef(0)

  const [isRecapOpen, setIsRecapOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>()

  const onPhotoClick = (startIdx: number) => {
    carouselStartIdx.current = startIdx
    setImageDetailShown(true)
  }

  const closeImageDetail = () => {
    setImageDetailShown(false)
  }

  const fetchAlbums = async () => {
    const data = await getPhotos(albumInfo.albumId)
    if (data.length) {
      setPhotos(data)
    }
  }

  const handleDelete = async (photoIdx: number) => {
    await deletePhoto(photos[photoIdx].photoId)

    const nextPhotos = photos.filter((v, i) => i !== photoIdx)
    setPhotos(nextPhotos)

    if (!nextPhotos.length) {
      setImageDetailShown(false)
    }
  }

  const onImageUploaded = () => {
    fetchAlbums()
  }

  const handleCloseRecap = () => {
    setIsRecapOpen(false)
  }

  useEffect(() => {
    fetchAlbums()
  }, [albumInfo.albumId])

  useEffect(() => {
    if (isRecapOpen) {
      setTimeout(() => {
        setVideoUrl(
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        )
      }, 2000)
    }
  }, [isRecapOpen])

  return (
    <>
      <div className="flex w-full flex-wrap p-4 px-6">
        <Masonry key={photos.length} columnsCount={2} gutter="12px">
          <PhotoAddButton
            albumId={albumInfo.albumId}
            onImageUploaded={onImageUploaded}
          />
          {photos.map((photo, idx) => (
            <div key={photo.photoId} onClick={() => onPhotoClick(idx)}>
              <Photo photo={photo} />
            </div>
          ))}
        </Masonry>
        {imageDetailShown && (
          <ImageDetail
            photos={photos}
            startIdx={carouselStartIdx.current}
            onClose={closeImageDetail}
            onDelete={handleDelete}
          />
        )}

        {photos.length >= 3 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
            <Button
              className={cn(
                recapColorVariants({ type: albumInfo.type }),
                "m-auto rounded-[100px] p-14 px-[22px] py-[16px]"
              )}
              onClick={() => setIsRecapOpen(true)}>
              <div className="flex gap-1 align-middle">
                <p>리캡 만들기</p>
                <Icon name="reelOutline" size={24} color="white" />
              </div>
            </Button>
          </div>
        )}
      </div>

      {/*<div className="fixed left-0 top-0 -translate-x-full">*/}
      {/*  {photos.map(({ photoUrl, createdAt }, idx) => (*/}
      {/*    <div*/}
      {/*      className="relative inline-block"*/}
      {/*      key={`${photoUrl}-${idx}`}*/}
      {/*      ref={(el) => {*/}
      {/*        refs.current[idx] = el*/}
      {/*      }}>*/}
      {/*      <div className="absolute mb-2 mt-10 flex w-full flex-col items-center justify-center gap-2">*/}
      {/*        <p className="tp-title2-semibold">{profile?.name}님의 Recap</p>*/}
      {/*        <Icon*/}
      {/*          name="mafooLogo"*/}
      {/*          color="white"*/}
      {/*          size={64}*/}
      {/*          className="h-[27px] w-[144px]"></Icon>*/}
      {/*      </div>*/}
      {/*      <RecapContainer type={albumInfo.type} />*/}
      {/*      <Image*/}
      {/*        src={photoUrl}*/}
      {/*        className="absolute left-1/2 top-1/2 mt-[130px] max-h-[433px] transform object-contain"*/}
      {/*        fill*/}
      {/*        alt={`recap_bg_img-${idx}`}*/}
      {/*      />*/}
      {/*      <div className="absolute bottom-[31px] w-full">*/}
      {/*        <div className="flex items-center justify-around">*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              backgroundColor: `rgba(255, 255, 255, 0.70)`,*/}
      {/*            }}*/}
      {/*            className="tp-title2-semibold b flex h-11 w-28 items-center justify-center gap-1 rounded-[100px] px-4 py-2 text-gray-800">*/}
      {/*            <Icon*/}
      {/*              name={ICON_NAME[albumInfo.type]}*/}
      {/*              color={ICON_COLOR_STYLE[albumInfo.type]}*/}
      {/*              size={28}*/}
      {/*            />*/}
      {/*            {albumInfo.name}*/}
      {/*          </div>*/}
      {/*          <span*/}
      {/*            className="text-right text-[18px] font-normal leading-[130%] tracking-[0.36px]"*/}
      {/*            style={{*/}
      {/*              color: `var(--White, #FFF)`,*/}
      {/*              fontFeatureSettings: `'ss10' on`,*/}
      {/*              fontFamily: `"SB AggroOTF"`,*/}
      {/*              fontStyle: `normal`,*/}
      {/*            }}>*/}
      {/*            {formattedDate(createdAt)}*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}

      {/*  {files.map((file, idx) => (*/}
      {/*    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text*/}
      {/*    <img src={URL.createObjectURL(file)} key={idx} />*/}
      {/*  ))}*/}
      {/*</div>*/}

      {isRecapOpen &&
        (videoUrl ? (
          <VideoRecap url={videoUrl} closeModal={handleCloseRecap} />
        ) : (
          <VideoLoading type={albumInfo.type} />
        ))}
    </>
  )
}
