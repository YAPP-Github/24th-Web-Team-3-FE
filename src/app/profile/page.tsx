import { BottomBar } from "@/common/BottomBar"

import Header from "./_components/Header"
import ListItem from "./_components/ListItem"

const ProfilePage = () => {
  return (
    <div className="relative h-dvh w-full">
      <Header />
      <ListItem />
      <div className="h-[106px]" />
      <BottomBar variant="profile" />
    </div>
  )
}

export default ProfilePage
