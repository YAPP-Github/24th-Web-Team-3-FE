import { IconProps } from "./iconTypes"

const HeartBoldMonoColor = ({ width, height, fill, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "28"}
      height={height || width || "28"}
      viewBox="0 0 28 28"
      className={className}
      fill={fill || "currentColor"}>
      <path
        d="M2.3335 10.6601C2.3335 16.3335 7.02283 19.3568 10.4555 22.0628C11.6668 23.0177 12.8335 23.9168 14.0002 23.9168C15.1668 23.9168 16.3335 23.0177 17.5448 22.0628C20.9775 19.3568 25.6668 16.3335 25.6668 10.6601C25.6668 4.98665 19.25 0.963163 14.0002 6.41753C8.75035 0.963163 2.3335 4.98665 2.3335 10.6601Z"
        fill={fill || "currentColor"}
      />
    </svg>
  )
}

export default HeartBoldMonoColor
