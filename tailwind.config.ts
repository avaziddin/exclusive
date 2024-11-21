import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'only-bottom': '0 1px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities(
        {
          '.scrollbar-hidden': {
            overflow: 'auto', // Оставляем возможность прокрутки
            scrollbarWidth: 'none', // Отключение скроллбара в Firefox
            msOverflowStyle: 'none', // Отключение скроллбара в IE и Edge
          },
          '.scrollbar-hidden::-webkit-scrollbar': {
            display: 'none', // Отключение скроллбара в Chrome, Safari и Edge
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
} satisfies Config;
