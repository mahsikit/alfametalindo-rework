import { type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  buildCommand: "npm run build",
  framework: "nextjs",
  headers: [
    {
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/favicon.ico",
      headers: [
        { key: "Cache-Control", value: "public, max-age=86400" },
      ],
    },
  ],
  redirects: [
    { source: "/about-us.php", destination: "/id/about", permanent: true },
    { source: "/contact-us.php", destination: "/id/contact", permanent: true },
    { source: "/products.php", destination: "/id/products", permanent: true },
    { source: "/news.php", destination: "/id/news", permanent: true },
    { source: "/about-us", destination: "/id/about", permanent: false },
    { source: "/products", destination: "/id/products", permanent: false },
    { source: "/contact", destination: "/id/contact", permanent: false },
  ],
};
