import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#F3F5F4",     // page background
        card: "#FFFFFF",     // table card
        ink: "#1B2420",      // main text
        muted: "#5C6862",    // secondary text
        line: "#E3E7E4",     // borders and dividers
        primary: "#1F7A54",  // done cell, today highlight
        tint: "#EEF6F1",     // today's column background
        missed: "#E4E8E5",   // missed cell
      },
      fontFamily: {
        sans: ["Figtree", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        cell: "9px",
      },
    },
  },
};

export default config;