import { BottomBar } from "@/common/BottomBar"

import Header from "./_components/Header"
import ListItem from "./_components/ListItem"

const ProfilePage = () => {
  return (
    <div className="relative h-dvh w-full">
      <h1 className="tp-header2-semibold bg-green-200 p-4 py-[14px] text-gray-800">
        마이
      </h1>
      <Header />
      <ListItem />
      <BottomBar variant="profile" />
    </div>
  )
}

export default ProfilePage
