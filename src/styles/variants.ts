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

export const photoCountVariants = cva("text-caption-1 font-medium", {
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
        large: "h-14 px-6 text-body-1 font-bold",
        medium: "h-10 px-5 text-body-2 font-bold",
        small: "h-8 px-4 text-caption-1 font-bold",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        theme: "green",
        class: "bg-green-600",
      },
      {
        variant: "solid",
        theme: "red",
        class: "bg-red-600",
      },
      {
        variant: "weak",
        theme: "green",
        class: "bg-green-200 text-green-700",
      },
      {
        variant: "weak",
        theme: "red",
        class: "bg-red-200 text-red-600",
      },
      {
        variant: "weak",
        theme: "gray",
        class: "bg-gray-100 text-gray-600",
      },
      {
        variant: "solid",
        theme: "gray",
        class: "bg-gray-100 text-gray-600",
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
  "inline-flex items-center rounded-full py-1 px-[10px] text-white font-bold",
  {
    variants: {
      variant: {
        default: "bg-gradient-purple text-caption-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
