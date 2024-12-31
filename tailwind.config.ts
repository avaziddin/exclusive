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
        'custom-gray': 'rgba(255, 255, 255, 0.3)', // Цвет для градиента
      },
      boxShadow: {
        'only-bottom': '0 1px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        xs: '300px', // добавление кастомного брейкпоинта для 320px
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '20px',
        lg: '12px',
        xl: '16px',
      },
      backgroundImage: {
        'gradient-blur': 'linear-gradient(145deg, rgba(0,0,0,0.5), rgba(255,255,255,0.2))',
      },
      borderRadius: {
        'xl': '12px',
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
