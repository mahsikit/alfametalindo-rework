import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Handshake, Clock } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("title") };
}

const brands = [
  { name: "Lincoln Electric", country: "USA", spec: "Welding Machines & Consumables" },
  { name: "Metrode", country: "UK", spec: "High-Temperature Welding" },
  { name: "Techalloy", country: "USA", spec: "Nickel Wire & Electrode" },
  { name: "Kiswel", country: "Korea", spec: "Welding Consumables" },
  { name: "Nihonweld", country: "Philippines", spec: "Stainless & Hard Surfacing" },
  { name: "Welding Alloys", country: "UK", spec: "Hard Surfacing Consumables" },
  { name: "Daiko", country: "Italy", spec: "High-Temperature Welding" },
];

const valueIcons = [Shield, Award, Handshake, Clock];

export default function AboutPage() {
  const t = useTranslations("about");

  const values = [
    { titleKey: "value1Title", descKey: "value1Desc" },
    { titleKey: "value2Title", descKey: "value2Desc" },
    { titleKey: "value3Title", descKey: "value3Desc" },
    { titleKey: "value4Title", descKey: "value4Desc" },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
            alt="Industrial facility"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <Badge className="mb-4 bg-[#F97316]/20 text-[#F97316] border-[#F97316]/40 hover:bg-[#F97316]/20">
            Est. October 2002
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">{t("heroSubtitle")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{t("storyTitle")}</h2>
              <div className="space-y-4 text-slate-600">
                <p>{t("storyP1")}</p>
                <p>{t("storyP2")}</p>
                <p>{t("storyP3")}</p>
              </div>
            </div>
            <div className="relative h-80 md:h-full min-h-72 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"
                alt="Welding operations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-[#0B3D91] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">{t("visionTitle")}</h2>
          <p className="text-blue-100 text-lg leading-relaxed italic">{t("visionText")}</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">{t("valuesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => {
              const Icon = valueIcons[i];
              return (
                <Card key={item.titleKey} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6 flex flex-col gap-3">
                    <Icon className="h-8 w-8 text-[#F97316]" />
                    <h3 className="font-bold text-slate-900">{t(item.titleKey)}</h3>
                    <p className="text-sm text-slate-600">{t(item.descKey)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">{t("brandsTitle")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <Card key={brand.name} className="hover:border-[#0B3D91] transition-colors">
                <CardContent className="p-5">
                  <div className="font-bold text-[#0B3D91]">{brand.name}</div>
                  <Badge variant="secondary" className="mt-1 text-xs">{brand.country}</Badge>
                  <p className="text-xs text-slate-500 mt-2">{brand.spec}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
