import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Flame,
  Layers,
  Wrench,
  HeadphonesIcon,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: "PT. Alfa Metalindo Indonesia — A Better Welding Partner",
    description: t("heroSubtitle"),
  };
}

const brands = [
  { name: "Lincoln Electric", origin: "USA" },
  { name: "Metrode", origin: "UK" },
  { name: "Techalloy", origin: "USA" },
  { name: "Kiswel", origin: "Korea" },
  { name: "Nihonweld", origin: "Philippines" },
  { name: "Welding Alloys", origin: "UK" },
  { name: "Daiko", origin: "Italy" },
];

const industryIcons: Record<string, React.ReactNode> = {
  oil: <Flame className="h-7 w-7" />,
  petrochem: <Layers className="h-7 w-7" />,
  lng: <CheckCircle2 className="h-7 w-7" />,
  fertilizer: <Wrench className="h-7 w-7" />,
  power: <Flame className="h-7 w-7" />,
  cement: <Layers className="h-7 w-7" />,
  steel: <Wrench className="h-7 w-7" />,
  sugar: <HeadphonesIcon className="h-7 w-7" />,
};

export default function HomePage() {
  const t = useTranslations("home");
  const tIndustries = useTranslations("industries");
  const locale = useLocale();

  const whyItems = [
    { titleKey: "why1Title", descKey: "why1Desc", icon: <CheckCircle2 className="h-8 w-8 text-[#F97316]" /> },
    { titleKey: "why2Title", descKey: "why2Desc", icon: <Layers className="h-8 w-8 text-[#F97316]" /> },
    { titleKey: "why3Title", descKey: "why3Desc", icon: <Flame className="h-8 w-8 text-[#F97316]" /> },
    { titleKey: "why4Title", descKey: "why4Desc", icon: <HeadphonesIcon className="h-8 w-8 text-[#F97316]" /> },
  ] as const;

  const industryKeys = ["oil", "petrochem", "lng", "fertilizer", "power", "cement", "steel", "sugar"] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&q=80"
            alt="Industrial welding"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Est. 2002 · Jakarta, Indonesia
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {t("heroTagline")}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/products`}
              className={cn(buttonVariants({ size: "lg" }), "bg-[#F97316] hover:bg-orange-600 text-white text-base px-8 border-transparent")}
            >
              {t("heroCta1")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white text-white hover:bg-white hover:text-slate-900 text-base px-8")}
            >
              {t("heroCta2")}
            </Link>
          </div>
        </div>
      </section>

      {/* Brands strip */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-semibold text-slate-400 tracking-widest uppercase mb-8">
            {t("brandsTitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
            {brands.map((brand) => (
              <div key={brand.name} className="flex flex-col items-center">
                <span className="font-bold text-[#0B3D91] text-sm md:text-base tracking-tight">{brand.name}</span>
                <span className="text-[10px] text-slate-400">{brand.origin}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{t("industriesTitle")}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">{t("industriesSubtitle")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industryKeys.map((key) => (
              <Link key={key} href={`/${locale}/industries`}>
                <Card className="group hover:border-[#0B3D91] hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="text-[#0B3D91] group-hover:text-[#F97316] transition-colors">
                      {industryIcons[key]}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">{tIndustries(`${key}.name`)}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{t("whyTitle")}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">{t("whySubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item) => (
              <div key={item.titleKey} className="flex flex-col items-start gap-3 p-6 rounded-xl bg-slate-50 border">
                {item.icon}
                <h3 className="font-bold text-slate-900">{t(item.titleKey)}</h3>
                <p className="text-sm text-slate-600">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#0B3D91]">
        <div className="container mx-auto px-4 md:px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("ctaTitle")}</h2>
          <p className="text-blue-200 max-w-lg mx-auto mb-8">{t("ctaSubtitle")}</p>
          <Link
            href={`/${locale}/contact`}
            className={cn(buttonVariants({ size: "lg" }), "bg-[#F97316] hover:bg-orange-600 text-white px-10 border-transparent")}
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
