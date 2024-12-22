import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.gravatar.com'],  // Добавляем gravatar.com в список разрешённых доменов
  },
};

export default nextConfig;
