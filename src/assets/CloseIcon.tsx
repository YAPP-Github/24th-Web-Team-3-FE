import { IconProps } from "./iconTypes"

const CloseIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      width={width || "28"}
      height={height || width || "28"}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_6145_10505)">
        <path
          d="M7.94043 20.0599L20.0599 7.94043M20.0599 20.0599L7.94043 7.94043"
          stroke="#2D3541"
          stroke-width="1.75"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6145_10505">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default CloseIcon
