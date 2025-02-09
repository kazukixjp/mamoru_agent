import { createTheme } from "@/components/ui/themes"

export const theme = createTheme({
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
    },
    keyframes: {
      "mamoru-wave": {
        "0%, 100%": { transform: "rotate(0deg)" },
        "25%": { transform: "rotate(-10deg)" },
        "75%": { transform: "rotate(10deg)" },
      },
    },
    animation: {
      "mamoru-wave": "mamoru-wave 2s ease-in-out infinite",
    },
  },
})

