import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Certifique-se de configurar essas variáveis no CSS global
        foreground: "var(--foreground)",
        sourelle_main_color: "#CFB0AE",
        light_red: "#F35C7A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Fontes personalizadas
      },
    },
  }
};

export default config;
