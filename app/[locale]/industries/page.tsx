import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Beaker, Wind, Sprout, Zap, Mountain, Factory, Coffee } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("industries");
  return { title: t("title") };
}

const industryData = [
  {
    key: "oil",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    color: "from-orange-500/20",
  },
  {
    key: "petrochem",
    icon: Beaker,
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    color: "from-blue-500/20",
  },
  {
    key: "lng",
    icon: Wind,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    color: "from-cyan-500/20",
  },
  {
    key: "fertilizer",
    icon: Sprout,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
    color: "from-green-500/20",
  },
  {
    key: "power",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    color: "from-yellow-500/20",
  },
  {
    key: "cement",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    color: "from-stone-500/20",
  },
  {
    key: "steel",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
    color: "from-slate-500/20",
  },
  {
    key: "sugar",
    icon: Coffee,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    color: "from-amber-500/20",
  },
] as const;

export default function IndustriesPage() {
  const t = useTranslations("industries");
  const locale = useLocale();

  return (
    <>
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryData.map(({ key, icon: Icon, image, color }) => (
              <Card
                key={key}
                className="overflow-hidden group hover:shadow-lg transition-all hover:border-[#0B3D91]"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-48 h-40 sm:h-auto overflow-hidden shrink-0">
                      <Image
                        src={image}
                        alt={t(`${key}.name`)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${color} to-transparent`} />
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="h-5 w-5 text-[#F97316]" />
                          <h3 className="font-bold text-slate-900 text-lg">{t(`${key}.name`)}</h3>
                        </div>
                        <p className="text-sm text-slate-600">{t(`${key}.desc`)}</p>
                      </div>
                      <Link
                        href={`/${locale}/products`}
                        className="mt-4 self-start text-sm font-medium text-[#0B3D91] hover:text-[#F97316] transition-colors"
                      >
                        {t("learnMore")} →
                      </Link>
                    </div>
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
