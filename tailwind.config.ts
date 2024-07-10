import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
          200: "#E5F5ED ",
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
          200: "#FFF4D6 ",
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
          200: "#DEEEFF ",
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
          1000: "#113A72 ",
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
        kakao: "#FEE500",
      },
      fontSize: {
        "display-1": ["40px", "130%"],
        "display-2": ["36px", "130%"],
        "header-1": ["28px", "130%"],
        "header-2": ["24px", "130%"],
        "title-1": ["20px", "140%"],
        "title-2": ["18px", "140%"],
        "body-1": ["16px", "150%"],
        "body-2": ["14px", "150%"],
        "caption-1": ["12px", "150%"],
        "caption-2": ["10px", "150%"],
      },
      fontWeight: {
        semibold: "700",
        regular: "500",
        extralight: "300",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        weak: "0px 6px 12px 0px rgba(101, 125, 159, 0.12), 0px 0px 4px 0px rgba(88, 100, 117, 0.08)",
        normal:
          "0px 2px 8px 0px rgba(101, 125, 159, 0.12), 0px 0px 1px 0px rgba(88, 100, 117, 0.08)",
        medium:
          "0px 6px 12px 0px rgba(101, 125, 159, 0.12), 0px 0px 4px 0px rgba(88, 100, 117, 0.08)",
        strong:
          "0px 16px 20px 0px rgba(101, 125, 159, 0.12), 0px 0px 8px 0px rgba(88, 100, 117, 0.08);",
      },
      backdropBlur: {
        weak: "blur(2px)",
        normal: "blur(4px)",
        medium: "blur(8px)",
        strong: "blur(12px)",
      },
      backgroundImage: {
        "gradient-purple":
          "linear-gradient(107deg, #E875F2 2.87%, #75ACFF 104.11%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    {
      pattern: /fill-*/,
    },
  ],
} satisfies Config

export default config
