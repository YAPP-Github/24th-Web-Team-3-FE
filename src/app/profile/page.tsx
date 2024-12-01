import { BottomBar } from "@/common/BottomBar"

import Header from "./_components/Header"
import ListItem from "./_components/ListItem"

const ProfilePage = () => {
  return (
    <div className="relative flex h-dvh w-full flex-col bg-gray-100">
      <Header />
      <ListItem />
      <div className="h-[106px]" />
      <BottomBar variant="profile" />
    </div>
  )
}

export default ProfilePage
