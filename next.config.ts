import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/about-us.php", destination: "/id/about", permanent: true },
      { source: "/contact-us.php", destination: "/id/contact", permanent: true },
      { source: "/products.php", destination: "/id/products", permanent: true },
      { source: "/news.php", destination: "/id/news", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
