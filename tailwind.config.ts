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
    fontSize: {
      "display-1": ["40px", "130%"],
      "display-2": ["36px", "130%"],
      "header-1": ["28px", "130%"],
      "header-2": ["24px", "130%"],
      "title-1": ["28px", "140%"],
      "title-2": ["24px", "140%"],
      "body-1": ["16px", "150%"],
      "body-2": ["14px", "150%"],
      "caption-1": ["12px", "150%"],
      "caption-2": ["10px", "150%"],
    },
    fontWeight: {
      light: "200",
      medium: "500",
      bold: "700",
    },
    colors: {
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
      "mf-green": {
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
      "mf-butter": {
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
      "mf-sky-blue": {
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
        500: "#F7807C",
        600: "#F54036",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
