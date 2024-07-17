import ReactDOM from "react-dom"

import Button from "./Button"

interface AlertProps {
  title: string
  description: string
  onClose: () => void
}

const Alert = ({ title, description, onClose }: AlertProps) => {
  return ReactDOM.createPortal(
    <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative flex h-[220px] w-[350px] flex-col justify-between rounded-3xl bg-white px-5 py-6">
        <div>
          <p className="text-title-1 font-semibold text-gray-800">{title}</p>
          <p className="mt-3 px-[6px] text-body-1 font-regular text-gray-600">
            {description}
          </p>
        </div>
        <Button onClick={onClose}>확인</Button>
      </div>
    </div>,
    document.body
  )
}

export default Alert
