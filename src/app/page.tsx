import Image from "next/image"

import LoginButton from "./_component/LoginButton"

const Home = () => {
  return (
    <div className="flex flex-col justify-between pb-24">
      <div className="flex w-full flex-1 flex-col">
        <div className="mt-[94px] px-8 text-center">
          <p className="tp-header1-semibold text-gray-500">
            인생네컷을 모아보는
          </p>
          <p className="tp-header1-semibold text-gray-800">가장 편한 방법</p>
        </div>
        <p className="tp-body1-regular whitespace-pre px-8 py-8 text-center text-gray-500">
          {`인생네컷만 모아보고 싶나요?\n간편한 QR 스캔과 앨범 정리로\n쉽고 빠르게 모아봐요`}
        </p>
        <div className="flex h-1 flex-1 items-center pb-14">
          <div className="relative h-[200px] w-full">
            <Image
              src={"/images/AlbumItem_Carousell.svg"}
              alt="albumImage"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-11 w-full max-w-[430px] px-8">
        <LoginButton />
      </div>
    </div>
  )
}

export default Home
