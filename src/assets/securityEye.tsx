import { IconProps } from "./iconTypes"

const SecurityEyeIcon = ({ width, height, fill, className }: IconProps) => {
  return (
    <svg
      width={width || "20"}
      height={height || width || "21"}
      viewBox="0 0 20 21"
      fill={fill || "currentColor"}
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <g id="Bold / Security / Eye">
        <g id="Vector">
          <path
            d="M8.2 10.5001C8.2 9.50599 9.00589 8.7001 10 8.7001C10.9941 8.7001 11.8 9.50599 11.8 10.5001C11.8 11.4942 10.9941 12.3001 10 12.3001C9.00589 12.3001 8.2 11.4942 8.2 10.5001Z"
            fill="#B1B7BE"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 10.5001C2 11.8116 2.33997 12.2533 3.01991 13.1366C4.37757 14.9005 6.65449 16.9001 10 16.9001C13.3455 16.9001 15.6224 14.9005 16.9801 13.1366C17.66 12.2533 18 11.8116 18 10.5001C18 9.1886 17.66 8.74692 16.9801 7.86356C15.6224 6.09974 13.3455 4.1001 10 4.1001C6.65449 4.1001 4.37757 6.09974 3.01991 7.86356C2.33997 8.74692 2 9.1886 2 10.5001ZM10 7.5001C8.34315 7.5001 7 8.84324 7 10.5001C7 12.157 8.34315 13.5001 10 13.5001C11.6569 13.5001 13 12.157 13 10.5001C13 8.84324 11.6569 7.5001 10 7.5001Z"
            fill="#B1B7BE"
          />
        </g>
      </g>
    </svg>
  )
}

export default SecurityEyeIcon
