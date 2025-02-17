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
        background: "var(--background)", // Certifique-se que essas variáveis estão configuradas
        foreground: "var(--foreground)",
        sourelle_main_color: "#CFB0AE", // Cor principal personalizada
        light_red: "#F35C7A", // Vermelho personalizado
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Exemplo: ajuste conforme necessário
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Para estilização de formulários
    require("@tailwindcss/typography"), // Para textos ricos
  ],
};

export default config;
