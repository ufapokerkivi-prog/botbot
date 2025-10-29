import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          50: "rgba(0, 200, 179, 0.05)",
          100: "rgba(0, 200, 179, 0.1)",
          200: "rgba(0, 200, 179, 0.2)",
          300: "rgba(0, 200, 179, 0.3)",
          400: "rgba(0, 200, 179, 0.4)",
          500: "var(--color-primary)",
          600: "#00a69a",
          700: "#008378",
          800: "#006156",
          900: "#003e34",
        },
        surface: "var(--color-surface)",
        elevated: "var(--color-elevated)",
        text: "var(--color-text)",
        muted: "var(--color-text-muted)",
        border: "var(--color-border)",
        overlay: "var(--color-overlay)",
        bg: "var(--color-bg)",
        "bg-secondary": "var(--color-bg-secondary)",
        "text-primary": "var(--color-text)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        "primary-sm": "0 4px 6px rgba(0, 200, 179, 0.2)",
        "primary-md": "0 8px 16px rgba(0, 200, 179, 0.3)",
        "primary-lg": "0 12px 24px rgba(0, 200, 179, 0.4)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      spacing: {
        0: "var(--space-0)",
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        20: "var(--space-20)",
        24: "var(--space-24)",
      },
    },
  },
  plugins: [],
};

export default config;
