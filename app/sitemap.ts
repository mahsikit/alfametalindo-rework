import { MetadataRoute } from "next";

const baseUrl = "https://alfametalindo.id";

const routes = ["/", "/about", "/products", "/industries", "/news", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of ["en", "id"]) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route === "/" ? "" : route}`,
        lastModified: new Date(),
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : 0.8,
      });
    }
  }
  return entries;
}
