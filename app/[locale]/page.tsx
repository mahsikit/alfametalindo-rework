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
  ShieldCheck,
  Factory,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: "PT. Alfa Metalindo Indonesia — A Better Welding Partner",
    description: t("heroSubtitle"),
  };
}

const consumableBrands = [
  { name: "Lincoln Electric", origin: "USA" },
  { name: "Metrode", origin: "UK" },
  { name: "Techalloy", origin: "USA" },
  { name: "Kiswel", origin: "Korea" },
  { name: "Nihonweld", origin: "Philippines" },
  { name: "Welding Alloys", origin: "UK" },
  { name: "Daiko", origin: "Italy" },
];

const equipmentBrands = [
  { name: "BUG-O System", origin: "USA" },
  { name: "Tri Tool", origin: "USA" },
  { name: "Powcon", origin: "USA" },
  { name: "WorkSafe", origin: "" },
  { name: "Alfa PWHT Systems", origin: "" },
];

const clients = [
  "Pertamina",
  "PGN",
  "Total",
  "BP",
  "ConocoPhillips",
  "Medco E&P",
  "Hess",
  "PetroChina",
  "CNOOC",
  "APD Serica Energy",
];

const industryIcons: Record<string, React.ReactNode> = {
  oil: <Flame className="h-7 w-7" />,
  petrochem: <Layers className="h-7 w-7" />,
  lng: <CheckCircle2 className="h-7 w-7" />,
  fertilizer: <Factory className="h-7 w-7" />,
  power: <Flame className="h-7 w-7" />,
  cement: <Layers className="h-7 w-7" />,
  steel: <Wrench className="h-7 w-7" />,
  sugar: <ShieldCheck className="h-7 w-7" />,
};

export default function HomePage() {
  const t = useTranslations("home");
  const tIndustries = useTranslations("industries");
  const locale = useLocale();

  const whyItems = [
    { titleKey: "why1Title", descKey: "why1Desc", icon: <ShieldCheck className="h-8 w-8 text-[#F97316]" /> },
    { titleKey: "why2Title", descKey: "why2Desc", icon: <Layers className="h-8 w-8 text-[#F97316]" /> },
    { titleKey: "why3Title", descKey: "why3Desc", icon: <Wrench className="h-8 w-8 text-[#F97316]" /> },
    { titleKey: "why4Title", descKey: "why4Desc", icon: <CheckCircle2 className="h-8 w-8 text-[#F97316]" /> },
  ] as const;

  const industryKeys = ["oil", "petrochem", "lng", "fertilizer", "power", "cement", "steel", "sugar"] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&q=80"
            alt="Industrial welding"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Est. October 2002 · Jakarta Utara, Indonesia
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

          {/* Stat row */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-sm mx-auto border-t border-white/10 pt-10">
            <div>
              <div className="text-3xl font-bold text-[#F97316]">{t("statsYears")}</div>
              <div className="text-xs text-slate-400 mt-1">{t("statsYearsLabel")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#F97316]">{t("statsProjects")}</div>
              <div className="text-xs text-slate-400 mt-1">{t("statsProjectsLabel")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#F97316]">{t("statsBrands")}</div>
              <div className="text-xs text-slate-400 mt-1">{t("statsBrandsLabel")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Infinite Client Marquee */}
      <section className="py-14 bg-white border-b overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-10">
          <p className="text-center text-xs font-semibold text-slate-400 tracking-widest uppercase">
            {t("clientsTitle")}
          </p>
        </div>
        
        {/* Marquee Wrapper */}
        <div 
          className="relative flex overflow-hidden w-full group"
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          {/* We render two identical blocks to create the seamless loop */}
          {[1, 2].map((groupIndex) => (
            <div 
              key={groupIndex} 
              className="flex items-center gap-16 sm:gap-24 min-w-full animate-marquee hover-pause pr-16 sm:pr-24"
            >
              {/* Image Logos */}
              <div className="flex items-center gap-4 shrink-0">
                <Image src="/clients/pertamina.png" alt="Pertamina" width={50} height={50} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain" />
                <span className="font-bold text-2xl text-slate-800 tracking-tight">PERTAMINA</span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Image src="/clients/total.png" alt="TotalEnergies" width={45} height={45} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain" />
                <span className="font-bold text-xl text-slate-800 tracking-tight">TotalEnergies</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Image src="/clients/medco.png" alt="Medco E&P" width={40} height={40} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain" />
                <span className="font-bold text-xl text-slate-800 tracking-tight">MedcoEnergi</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Image src="/clients/hess.png" alt="Hess" width={45} height={45} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain" />
                <span className="font-black text-2xl text-slate-800 tracking-tighter">HESS</span>
              </div>
              <div className="flex items-center shrink-0">
                <Image src="/clients/serica.png" alt="Serica Energy" width={110} height={45} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain" />
              </div>
              
              {/* Styled Text Logos for the rest */}
              <div className="shrink-0 flex items-center">
                <span className="font-black text-4xl text-slate-400 hover:text-green-600 transition-colors tracking-tighter">bp</span>
              </div>
              <div className="shrink-0 flex items-center">
                <span className="font-bold text-3xl text-slate-400 hover:text-blue-600 transition-colors tracking-widest uppercase">PGN</span>
              </div>
              <div className="shrink-0 flex items-center">
                <span className="font-bold text-2xl text-slate-400 hover:text-red-600 transition-colors tracking-tight italic">ConocoPhillips</span>
              </div>
              <div className="shrink-0 flex items-center">
                <span className="font-bold text-3xl text-slate-400 hover:text-red-500 transition-colors tracking-tighter">PetroChina</span>
              </div>
              <div className="shrink-0 flex items-center">
                <span className="font-black text-3xl text-slate-400 hover:text-blue-700 transition-colors tracking-normal">CNOOC</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands strip */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-semibold text-slate-400 tracking-widest uppercase mb-8">
            {t("brandsTitle")}
          </p>

          <div className="mb-2">
            <p className="text-center text-[10px] text-slate-400 tracking-wider uppercase mb-4">{t("brandsConsumablesLabel")}</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center mb-8">
              {consumableBrands.map((brand) => (
                <div key={brand.name} className="flex flex-col items-center">
                  <span className="font-bold text-[#0B3D91] text-sm md:text-base tracking-tight">{brand.name}</span>
                  {brand.origin && <span className="text-[10px] text-slate-400">{brand.origin}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <p className="text-center text-[10px] text-slate-400 tracking-wider uppercase mb-4">{t("brandsEquipmentLabel")}</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
              {equipmentBrands.map((brand) => (
                <div key={brand.name} className="flex flex-col items-center">
                  <span className="font-semibold text-slate-600 text-sm tracking-tight">{brand.name}</span>
                  {brand.origin && <span className="text-[10px] text-slate-400">{brand.origin}</span>}
                </div>
              ))}
            </div>
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
              <div key={item.titleKey} className="flex flex-col items-start gap-3 p-6 rounded-xl bg-slate-50 border hover:border-[#0B3D91] transition-colors">
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
