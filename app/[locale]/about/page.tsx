import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Handshake, Clock, UserCircle2 } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: `${t("title")} — PT. Alfa Metalindo Indonesia` };
}

const consumableBrands = [
  { name: "Lincoln Electric", country: "USA", spec: "Welding machines & consumables across all processes", logo: "/brands/lincoln.png", width: 140 },
  { name: "Metrode", country: "UK", spec: "Premium exotic-alloy filler metals for oil & gas and LNG", logo: "/brands/metrode.png", width: 140 },
  { name: "Techalloy", country: "USA", spec: "Nickel-based welding alloys (Inconel, Hastelloy)", logo: "/brands/techalloy.png", width: 140 },
  { name: "Kiswel", country: "Korea", spec: "Wide-range welding consumables", logo: "/brands/kiswel.png", width: 100 },
  { name: "Nihonweld", country: "Philippines", spec: "Stainless steel & hard-surfacing consumables", logo: "/brands/nihonweld.png", width: 120 },
  { name: "Welding Alloys", country: "UK", spec: "Hard-surfacing and wear-resistant consumables", logo: "/brands/welding_alloys.png", width: 120 },
  { name: "Daiko", country: "Italy", spec: "High-temperature welding consumables", logo: "/brands/daiko.png", width: 100 },
];

const equipmentBrands = [
  { name: "BUG-O System International", country: "USA", spec: "Mechanized welding carriages & track automation", logo: "/brands/bugo.png", width: 100 },
  { name: "Tri Tool Inc.", country: "USA", spec: "Pipe cold-cutting & bevelling machines", logo: "/brands/tritool.png", width: 120 },
  { name: "Advanced Instruments Inc.", country: "USA", spec: "Measurement & testing instruments" },
  { name: "Powcon", country: "USA", spec: "Inverter welding power sources", logo: "/brands/powcon.png", width: 120 },
  { name: "Showa Welder", country: "", spec: "Welding equipment" },
];

const ownBrands = [
  { name: "Alfa PWHT Systems", country: "", spec: "Post-Weld Heat Treatment machines — rental & on-site service" },
  { name: "WorkSafe Habitat", country: "", spec: "Pressurized safety enclosures for offshore & hot-work" },
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
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
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
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">{t("storyTitle")}</h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>{t("storyP1")}</p>
                <p>{t("storyP2")}</p>
                <p>{t("storyP3")}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/exhibition-booth-2018.jpg"
                  alt="Alfa Metalindo booth at Manufacturing Indonesia 2018"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-xs text-slate-400 text-center">
                Manufacturing Indonesia 2018 — JIExpo Kemayoran, Stand F-310
              </p>
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

          <h3 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-4">{t("brandsConsumablesLabel")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {consumableBrands.map((brand) => (
              <Card key={brand.name} className="hover:border-[#0B3D91] transition-colors">
                <CardContent className="p-5 flex flex-col gap-3">
                  {brand.logo ? (
                    <div className="h-10 flex items-center justify-start">
                      <Image src={brand.logo} alt={brand.name} width={brand.width} height={40} className="object-contain max-h-full w-auto mix-blend-multiply grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" />
                    </div>
                  ) : (
                    <div className="h-10 flex items-center justify-start">
                      <div className="font-bold text-[#0B3D91] text-lg">{brand.name}</div>
                    </div>
                  )}
                  <div>
                    {brand.country && <Badge variant="secondary" className="text-[10px]">{brand.country}</Badge>}
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{brand.spec}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-4">{t("brandsEquipmentLabel")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {equipmentBrands.map((brand) => (
              <Card key={brand.name} className="hover:border-[#0B3D91] transition-colors">
                <CardContent className="p-5 flex flex-col gap-3">
                  {brand.logo ? (
                    <div className="h-10 flex items-center justify-start">
                      <Image src={brand.logo} alt={brand.name} width={brand.width} height={40} className="object-contain max-h-full w-auto mix-blend-multiply grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" />
                    </div>
                  ) : (
                    <div className="h-10 flex items-center justify-start">
                      <div className="font-bold text-slate-700 text-lg">{brand.name}</div>
                    </div>
                  )}
                  <div>
                    {brand.country && <Badge variant="secondary" className="text-[10px]">{brand.country}</Badge>}
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{brand.spec}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-4">{t("brandsOwnLabel")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ownBrands.map((brand) => (
              <Card key={brand.name} className="hover:border-[#F97316] transition-colors border-[#F97316]/30">
                <CardContent className="p-5">
                  <div className="font-bold text-[#F97316]">{brand.name}</div>
                  <p className="text-xs text-slate-500 mt-2">{brand.spec}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">{t("leadershipTitle")}</h2>
          <div className="max-w-xs mx-auto">
            <Card className="border-0 shadow-md bg-white text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 rounded-full bg-[#0B3D91]/10 flex items-center justify-center mx-auto mb-5">
                  <UserCircle2 className="h-10 w-10 text-[#0B3D91]" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t("leadershipName")}</h3>
                <p className="text-[#F97316] text-sm font-semibold mt-1">{t("leadershipRole")}</p>
                <p className="text-slate-500 text-xs mt-2">{t("leadershipEdu")}</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-slate-500 text-sm mt-8 max-w-md mx-auto">{t("teamNote")}</p>
        </div>
      </section>
    </>
  );
}
