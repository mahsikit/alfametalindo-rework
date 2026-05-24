import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("news");
  return { title: t("title") };
}

const articles = [
  {
    slug: "welding-duplex-lng",
    title: "Welding Duplex Stainless Steel in LNG Service: Key Considerations",
    excerpt:
      "Duplex stainless steels offer an excellent combination of strength and corrosion resistance for LNG applications. This article covers filler metal selection, heat input control, and PWHT requirements.",
    date: "2026-04-10",
    readMin: 7,
    category: "Technical",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
  },
  {
    slug: "super-duplex-offshore",
    title: "Super Duplex Electrodes for Offshore Oil & Gas: Metrode ER2594 in Practice",
    excerpt:
      "Super duplex alloys demand precise heat input and interpass temperature control. We share practical guidance on achieving compliant welds with ER2594 filler in offshore pipeline fabrication.",
    date: "2026-02-28",
    readMin: 5,
    category: "Product Spotlight",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    slug: "nickel-alloy-smaw",
    title: "Choosing the Right Nickel Alloy Electrode for SMAW in Petrochemical Service",
    excerpt:
      "With dozens of Nickel-base electrode options available, selecting the correct filler metal for your specific base material, temperature rating, and corrosion environment is critical.",
    date: "2025-11-14",
    readMin: 8,
    category: "Technical",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
  },
  {
    slug: "lincoln-electric-showcase",
    title: "Lincoln Electric's New Excalibur Low-Hydrogen Electrode Range — Now Available",
    excerpt:
      "PT Alfa Metalindo Indonesia is pleased to announce expanded stock of Lincoln Electric's latest low-hydrogen SMAW electrode series, now available for immediate delivery in Jakarta.",
    date: "2025-09-03",
    readMin: 3,
    category: "News",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
  },
];

export default function NewsPage() {
  const t = useTranslations("news");

  return (
    <>
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card
                key={article.slug}
                className="overflow-hidden hover:shadow-md hover:border-[#0B3D91] transition-all group"
              >
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge
                      className="absolute top-4 left-4 bg-[#F97316] hover:bg-[#F97316] text-white border-0"
                    >
                      {article.category}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <div className="flex gap-4 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(article.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readMin} {t("minuteRead")}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#0B3D91] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3">{article.excerpt}</p>
                    <button className="mt-4 text-sm font-medium text-[#0B3D91] hover:text-[#F97316] transition-colors">
                      {t("readMore")} →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
