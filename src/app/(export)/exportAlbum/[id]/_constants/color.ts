export type AlbumType =
  | "HEART"
  | "FIRE"
  | "BASKETBALL"
  | "BUILDING"
  | "STARFALL"
  | "SMILE_FACE"

export type ColorMapType = {
  [key in AlbumType]: {
    icon: string
    bg: string
    album: {
      bg: string
      text: string
    }
    bottomButton: {
      color: string[]
      position: number[]
    }
  }
}

export const COLOR_MAP: ColorMapType = {
  STARFALL: {
    icon: "purple-600",
    bg: "#F2E8FB",
    album: {
      bg: "bg-purple-200",
      text: "text-purple-600",
    },
    bottomButton: {
      color: ["#DF9AFF", "#BAC5FF"],
      position: [0.037, 0.9484],
    },
  },
  HEART: {
    icon: "red-500",
    bg: "#FDE6E5",
    album: {
      bg: "bg-red-200",
      text: "text-red-500",
    },
    bottomButton: {
      color: ["#FF9B9C", "#F89AFF"],
      position: [0.0226, 1],
    },
  },
  FIRE: {
    icon: "orange-600",
    bg: "#FFF4D6",
    album: {
      bg: "bg-butter-200",
      text: "text-orange-600",
    },
    bottomButton: {
      color: ["#FFB864", "#F8E47A"],
      position: [0.0638, 0.9932],
    },
  },
  BUILDING: {
    icon: "sky-blue-700",
    bg: "#DEEEFF",
    album: {
      bg: "bg-sky-blue-200",
      text: "text-sky-blue-700",
    },
    bottomButton: {
      color: ["#92AAFF", "#9FE7FC"],
      position: [0.037, 0.9484],
    },
  },
  BASKETBALL: {
    icon: "green-700",
    bg: "#E5F5ED",
    album: {
      bg: "bg-green-200",
      text: "text-green-700",
    },
    bottomButton: {
      color: ["#6DE694", "#F7F286"],
      position: [0.0638, 0.9932],
    },
  },
  SMILE_FACE: {
    icon: "pink-600",
    bg: "#FEE9F2",
    album: {
      bg: "bg-pink-200",
      text: "text-pink-600",
    },
    bottomButton: {
      color: ["#FF9DC7", "#FCE4A4"],
      position: [0.037, 0.9484],
    },
  },
}

export const colors = {
  white: "#ffffff",
  black: "#000000",
  gray: {
    50: "#F9F9FA",
    100: "#F0F2F4",
    200: "#E1E4E8",
    300: "#CBD0D6",
    400: "#B1B7BE",
    500: "#7F8A96",
    600: "#606A78",
    700: "#444E5C",
    800: "#2D3541",
    900: "#181C23",
    1000: "#0E1117",
  },
  green: {
    100: "#F3FAF6",
    200: "#E5F5ED",
    300: "#C8EBD8",
    400: "#A7E1C2",
    500: "#7CD6A9",
    600: "#36CA8C",
    700: "#30B57D",
    800: "#2A9C6C",
    900: "#228059",
    1000: "#185A3F",
  },
  butter: {
    100: "#FFF7E2",
    200: "#FFF4D6",
    300: "#FFECBB",
    400: "#FFDE8A",
    500: "#FFCF55",
    600: "#FFB908",
    700: "#C88F00",
    800: "#9B7106",
    900: "#745402",
    1000: "#4C3906",
  },
  "sky-blue": {
    100: "#EBF5FF",
    200: "#DEEEFF",
    300: "#BCD9F5",
    400: "#8EC6FA",
    500: "#65B5FF",
    600: "#319BFF",
    700: "#146EC2",
    800: "#1B5A94",
    900: "#104271",
    1000: "#073159",
  },
  red: {
    100: "#FEF3F3",
    200: "#FDE6E5",
    300: "#FBCAC8",
    400: "#F9A9A7",
    500: "#F56965",
    600: "#FF584F",
    700: "#DB3930",
    800: "#BE322A",
    900: "#9B2822",
    1000: "#6E1D18",
  },
  blue: {
    100: "#E9F2FF",
    200: "#D4E6FF",
    300: "#A9CDFF",
    400: "#7DB3FF",
    500: "#529AFF",
    600: "#2781FF",
    700: "#1F67CC",
    800: "#1E64C6",
    900: "#1952A1",
    1000: "#113A72",
  },
  orange: {
    100: "#FFF6E7",
    200: "#FFEBCE",
    300: "#FFDDAC",
    400: "#FFD498",
    500: "#FFB860",
    600: "#FF9B05",
    700: "#D67B00",
    800: "#B05E00",
    900: "#824500",
    1000: "#6D4100",
  },
  purple: {
    100: "#F9F4FD",
    200: "#F2E8FB",
    300: "#E5CFF7",
    400: "#D7B2F3",
    500: "#C890EF",
    600: "#B862EB",
    700: "#A558D2",
    800: "#8F4CB6",
    900: "#743E95",
    1000: "#522C69",
  },
  pink: {
    100: "#FEF4F8",
    200: "#FEE9F2",
    300: "#FDD0E3",
    400: "#FBB4D4",
    500: "#FA92C4",
    600: "#F966B2",
    700: "#DF5B9F",
    800: "#C14F8A",
    900: "#9D4171",
    1000: "#6F2E50",
  },
  kakao: {
    600: "#FEE500",
    700: "#EDD60B",
  },
  sumone: {
    pink: "#FF9092",
    brown: "#C5B698",
    pastelpink: "#FFDCD2",
    pastelblue: "#FFDCD2",
    pastelpurple: "#EADAFF",
    pastelyellow: "#F3D78B",
    pastelbeige: "#FBF3EE",
    white: "#ffffff",
    gray: {
      100: "#F0F2F4",
      200: "#E1E4E8",
      300: "#CBD0D6",
      500: "#7F8A96",
      600: "#606A78",
      700: "#444E5C",
      800: "#2D3541",
    },
  },
}
