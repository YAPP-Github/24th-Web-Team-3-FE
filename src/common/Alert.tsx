import ReactDOM from "react-dom"

import SquareButton from "./SquareButton"

interface AlertProps {
  title: string
  description?: string
  onClose: () => void
}

const Alert = ({ title, description, onClose }: AlertProps) => {
  return ReactDOM.createPortal(
    <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative flex h-[220px] w-[350px] flex-col justify-between rounded-3xl bg-white px-5 py-6">
        <div>
          <p className="tp-title1-semibold text-gray-800">{title}</p>
          {description && (
            <p className="tp-body1-regular mt-3 px-[6px] text-gray-600">
              {description}
            </p>
          )}
        </div>
        <SquareButton onClick={onClose}>확인</SquareButton>
      </div>
    </div>,
    document.body
  )
}

export default Alert
