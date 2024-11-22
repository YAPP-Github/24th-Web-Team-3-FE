"use client"

import { useEffect, useState } from "react"

import { getAlbum } from "@/app/api/photo"

import { AlbumInfo } from "../types"
import { AlbumPhotos } from "./_component/AlbumPhotos"
import { Header } from "./_component/Header"
import { cn } from "@/utils"
import { albumDetailStickyHeaderVariants as headerVariants, recapColorVariants } from "@/styles/variants"
import SquareButton from "@/common/SquareButton"
import Icon from "@/common/Icon"
import Button from "@/common/Button"

const AlbumDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo>()

  useEffect(() => {
    const initAlbum = async () => {
      const data = await getAlbum(id)
      if (data) {
        setAlbumInfo(data)
      }
    }
    initAlbum()
  }, [id])

  if (!albumInfo) return

  return (
    <>
      <div className={cn(headerVariants({ type: albumInfo.type }))}>
        <Header albumInfo={albumInfo} className="sticky top-0 z-10" />
        <div className={cn(headerVariants({ type: albumInfo.type }), 'flex flex-row justify-center')}>
          <span className='text-center tp-title1-semibold'>함께 찍은 친구랑<br/>앨범을 공유해보세요</span>
        </div>
        <div  className={cn(headerVariants({ type: albumInfo.type }), 'h-24 w-full z-10 px-4')}>
          <div className='flex flex-row justify-between bg-white rounded-2xl p-4 tp-title2-semibold text-gray-700'>
            친구랑 앨범 공유하기
            <SquareButton
              className="bg-purple-200 text-purple-700 tp-caption1-semibold"
              size='small'
              onClick={() => {

              }}>
              친구 찾기
            </SquareButton>
          </div>
        </div>
        <div className='bg-white w-full sticky top-14 z-10 flex flex-row justify-between' style={{borderRadius: '24px 24px 0 0'}}>
          <div className='flex flex-col px-6 pt-6 pb-2'>
            <span className='tp-body2-regular text-gray-500'>함께 칮은 추억</span>
            <span className='tp-header1-semibold text-gray-800'>{albumInfo.photoCount}장</span>
          </div>


        </div>
        <AlbumPhotos albumInfo={albumInfo} />
      </div>
    </>
  )
}

export default AlbumDetailPage
