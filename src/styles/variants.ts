import { cva } from "class-variance-authority"

export const albumDetailHeaderVariants = cva(
  "w-full h-14 p-4 py-[14px] flex justify-between items-center",
  {
    variants: {
      type: {
        HEART: "bg-red-200",
        FIRE: "bg-butter-200",
        BASKETBALL: "bg-green-200",
        BUILDING: "bg-blue-200",
        STARFALL: "bg-purple-200",
        SMILE_FACE: "bg-pink-200",
        false: "bg-transparent",
      },
    },
    defaultVariants: {
      type: false,
    },
  }
)

export const colorIconVariants = cva(
  "flex items-center justify-center rounded-full",
  {
    variants: {
      iconColor: {
        HEART: "bg-red-500",
        FIRE: "bg-orange-600",
        BASKETBALL: "bg-green-700",
        BUILDING: "bg-blue-700",
        STARFALL: "bg-purple-600",
        SMILE_FACE: "bg-pink-600",
      },
      size: {
        medium: "w-9 h-9",
        large: "w-[52px] h-[52px]",
      },
    },
    defaultVariants: {
      iconColor: "HEART",
      size: "medium",
    },
  }
)

export const albumItemVariants = cva(
  "w-[164px] h-[150px] rounded-2xl relative p-4",
  {
    variants: {
      type: {
        HEART: "bg-red-200",
        FIRE: "bg-butter-200",
        BASKETBALL: "bg-green-200",
        BUILDING: "bg-blue-200",
        STARFALL: "bg-purple-200",
        SMILE_FACE: "bg-pink-200",
      },

      isEditable: {
        true: "w-60 h-[219.51px] rounded-[23.41px]",
      },
    },
    defaultVariants: {
      type: "HEART",
    },
  }
)

export const photoCountVariants = cva("tp-caption1-regular", {
  variants: {
    type: {
      HEART: "text-red-500",
      FIRE: "text-orange-600",
      BASKETBALL: "text-green-700",
      BUILDING: "text-sky-blue-700",
      STARFALL: "text-purple-600",
      SMILE_FACE: "text-pink-600",
    },
  },
  defaultVariants: {
    type: "HEART",
  },
})

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[6px] whitespace-nowrap rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "text-white",
        weak: "",
      },
      theme: { green: "", red: "", gray: "" },
      size: {
        large: "h-14 px-6 tp-body1-semibold",
        medium: "h-10 px-5 tp-body2-semibold",
        small: "h-8 px-4 tp-caption1-semibold",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        theme: "green",
        class: "bg-green-600 active:bg-green-700",
      },
      {
        variant: "solid",
        theme: "red",
        class: "bg-red-600 active:bg-red-700",
      },
      {
        variant: "weak",
        theme: "green",
        class: "bg-green-200 text-green-700 active:bg-green-300",
      },
      {
        variant: "weak",
        theme: "red",
        class: "bg-red-200 text-red-600 active:bg-red-300",
      },
      {
        variant: "weak",
        theme: "gray",
        class: "bg-gray-100 text-gray-600 active:bg-gray-200",
      },
      {
        variant: "solid",
        theme: "gray",
        class: "bg-gray-100 text-gray-600 active:bg-gray-200",
      },
    ],
    defaultVariants: {
      variant: "solid",
      theme: "green",
      size: "large",
    },
  }
)

export const badgeVariants = cva(
  "inline-flex items-center rounded-full py-1 px-[10px] text-white tp-caption1-semibold",
  {
    variants: {
      variant: {
        default: "bg-gradient-purple",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export const bottomBarVariants = cva(
  "fixed max-w-[430px] bottom-0 left-0 z-[1] flex w-full justify-evenly rounded-t-2xl pb-8 pt-5 tp-caption1-regular",
  {
    variants: {
      variant: {
        album: "bg-white text-gray-400",
        scanner: "bg-gray-900 text-gray-600",
        profile: "bg-white text-gray-400",
      },
    },
    defaultVariants: {
      variant: "scanner",
    },
  }
)
