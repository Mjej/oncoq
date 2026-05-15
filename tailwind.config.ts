import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Aquatic glassmorphism palette
        ink: "#0A1929",
        abyss: "#061B2E",
        ocean: "#0B3D6B",
        tide: "#0E6BA8",
        aqua: "#3FB6E0",
        cyan: "#67E8F9",
        ice: "#E0F4FB",
        foam: "#F3FAFE",
        // Aliases kept for backwards-compat (mapped to new aquatic palette)
        sea: "#0B3D6B",
        sage: "#5E8FB5",
        leaf: "#22C5B6",
        mist: "#F3FAFE",
        gold: "#E0A458",
        coral: "#F4748A"
      },
      boxShadow: {
        soft: "0 24px 60px -20px rgba(11, 61, 107, 0.35)",
        glow: "0 0 40px rgba(63, 182, 224, 0.35)",
        line: "inset 0 0 0 1px rgba(63, 182, 224, 0.18)",
        sink: "0 30px 60px -30px rgba(6, 27, 46, 0.55)"
      }
    }
  },
  plugins: []
};

export default config;
