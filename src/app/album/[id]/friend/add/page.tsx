"use client"

import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import FriendElement from "@/app/album/[id]/friend/add/_component/FriendElement"
import {
  createSharedMember,
  getAlbum,
  GetSharedAlbumResponse,
  PermissionLevel,
} from "@/app/api/photo"
import { MemberSearchResult, searchMembers } from "@/app/api/user"
import { IconImage } from "@/common/Icon"
import { SharePermissionDialog } from "@/common/SharePermissionDialog"

import { Header } from "./_component/Header"

const AddFriendPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [albumInfo, setAlbumInfo] = useState<GetSharedAlbumResponse>()
  const [searchParam, setSearchParam] = useState("")
  const [addDialogVisible, setAddDialogVisible] = useState(false)
  const [editingMember, setEditingMember] = useState<MemberSearchResult>()
  const [searchResults, setSearchResults] = useState<Array<MemberSearchResult>>(
    []
  )
  const updateSearchResults = (query: string) => {
    searchMembers(query, id).then((res) => {
      setSearchResults(res)
    })
  }
  const debounced = useDebouncedCallback((value) => {
    if (value.length < 2) {
      setSearchResults([])
      return
    }
    updateSearchResults(value)
  }, 300)
  const handleSearchParam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value)
  }
  const onTapShareButton = (friend: MemberSearchResult) => {
    if (!friend.shareStatus) {
      setEditingMember(friend)
      setAddDialogVisible(true)
    }
  }
  const onSavePermissionLevel = (level: PermissionLevel) => {
    setAddDialogVisible(false)
    if (!editingMember) return
    const friend = editingMember
    createSharedMember(id, friend.memberId, level).then(() => {
      updateSearchResults(searchParam)
    })
  }
  const initAlbum = async () => {
    const data = await getAlbum(id)
    if (data) {
      setAlbumInfo(data)
    }
  }
  useEffect(() => {
    initAlbum()
  }, [id])

  useEffect(() => {
    debounced(searchParam)
  }, [searchParam])

  const albumName = albumInfo?.name ?? ""

  const typeToBackgroundColor: Record<string, string> = {
    HEART: "bg-red-200",
    FIRE: "bg-butter-200",
    BASKETBALL: "bg-green-200",
    BUILDING: "bg-skyblue-200",
    STARFALL: "bg-purple-200",
    SMILE_FACE: "bg-pink-200",
  }

  const typeToTextColor: Record<string, string> = {
    HEART: "text-red-700",
    FIRE: "text-butter-700",
    BASKETBALL: "text-green-700",
    BUILDING: "text-skyblue-700",
    STARFALL: "text-purple-700",
    SMILE_FACE: "text-pink-700",
  }

  const backgroundColorClass = albumInfo?.type
    ? typeToBackgroundColor[albumInfo.type]
    : "bg-gray-200"
  const textColorClass = albumInfo?.type
    ? typeToTextColor[albumInfo.type]
    : "text-gray-700"

  return (
    <div className={`relative h-dvh w-full ${backgroundColorClass}`}>
      <Header />
      <SharePermissionDialog
        isOwnerMigrateVisible={false}
        defaultPermissionLevel={PermissionLevel.FULL_ACCESS}
        name={editingMember?.name ?? ""}
        imageUrl={editingMember?.profileImageUrl ?? ""}
        isVisible={addDialogVisible}
        onExit={() => {
          setAddDialogVisible(false)
        }}
        onTapSave={onSavePermissionLevel}
      />
      <div className="flex flex-col gap-4 px-6 pb-6 pt-4">
        <div className="tp-header2-semibold text-gray-800">
          <p>
            <span className={`${textColorClass}`}>{albumName}</span> 앨범을
          </p>
          <p>공유할 친구를 찾아봐요</p>
        </div>
        <input
          className="tp-title2-regular w-full rounded-lg bg-gray-100 py-2.5 pl-3 pr-4 caret-gray-400 mix-blend-multiply outline-none"
          value={searchParam}
          onChange={handleSearchParam}
          placeholder="이름으로 검색해주세요"
        />
        <div className="flex flex-col gap-2">
          {searchResults.length == 0 ? (
            <EmptyMafoo />
          ) : (
            searchResults.map((friend) => (
              <FriendElement
                key={friend.memberId}
                imageUrl={friend.profileImageUrl}
                name={friend.name}
                tag={"#" + friend.serialNumber}
                isShared={friend.shareStatus != null}
                onTapShare={() => {
                  onTapShareButton(friend)
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const EmptyMafoo = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <IconImage name={"emptyMafoo"} width={119} height={90} />
      <p className="tp-body2-regular text-center text-gray-500">
        친구가 이미 마푸에 가입한
        <br />
        상태여야 찾을 수 있어요!
      </p>
    </div>
  )
}

export default AddFriendPage
