"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, ShieldCheck, Flame, Wrench } from "lucide-react";

type Product = {
  id: string;
  name: string;
  brand: string;
  process: string;
  material: string;
  application: string;
};

const products: Product[] = [
  { id: "1", name: "Lincoln Electric Excalibur 7018", brand: "Lincoln Electric", process: "SMAW", material: "Carbon Steel", application: "Pressure vessels, structural" },
  { id: "2", name: "Metrode Supercore 2209P", brand: "Metrode", process: "FCAW", material: "Duplex", application: "Oil & gas, chemical plant" },
  { id: "3", name: "Techalloy 625", brand: "Techalloy", process: "GTAW", material: "Nickel", application: "LNG, heat exchangers" },
  { id: "4", name: "Techalloy 82/182", brand: "Techalloy", process: "SMAW", material: "Nickel", application: "Nuclear, petrochemical" },
  { id: "5", name: "Metrode ER2594", brand: "Metrode", process: "GTAW", material: "Super Duplex", application: "Seawater, subsea" },
  { id: "6", name: "Kiswel K-308L", brand: "Kiswel", process: "SMAW", material: "Stainless Steel", application: "Food, pharmaceutical" },
  { id: "7", name: "Nihonweld NI-308L", brand: "Nihonweld", process: "GTAW", material: "Stainless Steel", application: "Cryogenic, general" },
  { id: "8", name: "Techalloy 276", brand: "Techalloy", process: "GMAW", material: "Nickel", application: "Severe corrosion service" },
  { id: "9", name: "Lincoln Electric LA-75", brand: "Lincoln Electric", process: "SAW", material: "Carbon Steel", application: "Heavy fabrication" },
  { id: "10", name: "Metrode Supercore 316LP", brand: "Metrode", process: "FCAW", material: "Stainless Steel", application: "Petrochemical vessels" },
  { id: "11", name: "Welding Alloys Hardface 350", brand: "Welding Alloys", process: "FCAW", material: "Hard Surfacing", application: "Cement, mining wear" },
  { id: "12", name: "Techalloy Ti Commercially Pure", brand: "Techalloy", process: "GTAW", material: "Titanium", application: "Chemical, aerospace" },
  { id: "13", name: "Nihonweld NI-2594", brand: "Nihonweld", process: "SMAW", material: "Super Duplex", application: "Offshore, oil & gas" },
  { id: "14", name: "Daiko ER NiCrMo-3", brand: "Daiko", process: "GTAW", material: "Nickel", application: "High temperature service" },
  { id: "15", name: "Kiswel K-309L", brand: "Kiswel", process: "SMAW", material: "Stainless Steel", application: "Dissimilar metal joining" },
  { id: "16", name: "Lincoln Electric Lincore 60-G", brand: "Lincoln Electric", process: "MCW", material: "Hard Surfacing", application: "Sugar mill rollers" },
];

const processes = ["All", "SMAW", "GTAW", "GMAW", "FCAW", "MCW", "SAW"];
const materials = ["All", "Nickel", "Duplex", "Super Duplex", "Stainless Steel", "Titanium", "Hard Surfacing", "Carbon Steel"];

const services = [
  {
    icon: ShieldCheck,
    brandKey: "service1Brand" as const,
    titleKey: "service1Title" as const,
    descKey: "service1Desc" as const,
  },
  {
    icon: Flame,
    brandKey: "service2Brand" as const,
    titleKey: "service2Title" as const,
    descKey: "service2Desc" as const,
  },
  {
    icon: Wrench,
    brandKey: "service3Brand" as const,
    titleKey: "service3Title" as const,
    descKey: "service3Desc" as const,
  },
];

export default function ProductsPage() {
  const t = useTranslations("products");
  const locale = useLocale();
  const [process, setProcess] = useState("All");
  const [material, setMaterial] = useState("All");
  const [dialogProduct, setDialogProduct] = useState<Product | null>(null);

  const filtered = products.filter((p) => {
    const matchProcess = process === "All" || p.process === process;
    const matchMaterial = material === "All" || p.material === material;
    return matchProcess && matchMaterial;
  });

  return (
    <>
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Premium Infinite Scrolling Brand Marquee */}
      <section className="py-12 border-b border-slate-100 bg-white overflow-hidden">
        <div className="container mx-auto mb-8 px-4 text-center">
          <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">Official Distributor For Premium World-Class Brands</p>
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
              className="flex shrink-0 items-center gap-16 sm:gap-24 min-w-full animate-marquee group-hover:[animation-play-state:paused] pr-16 sm:pr-24"
            >
              {/* Lincoln Electric */}
              <div className="flex items-center shrink-0">
                <Image src="/brands/lincoln.png" alt="Lincoln Electric" width={180} height={50} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain h-12 w-auto" />
              </div>
              {/* Welding Alloys */}
              <div className="flex items-center shrink-0">
                <Image src="/brands/welding_alloys.png" alt="Welding Alloys" width={160} height={50} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain h-12 w-auto" />
              </div>
              {/* Daiko */}
              <div className="flex items-center shrink-0">
                <Image src="/brands/daiko.png" alt="Daiko Welding" width={140} height={50} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain h-10 w-auto" />
              </div>
              {/* Kiswel */}
              <div className="flex items-center shrink-0">
                <Image src="/brands/kiswel.png" alt="Kiswel" width={140} height={50} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain h-10 w-auto" />
              </div>
              {/* Nihonweld */}
              <div className="flex items-center shrink-0">
                <Image src="/brands/nihonweld.png" alt="Nihonweld" width={160} height={50} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain h-10 w-auto" />
              </div>
              {/* Metrode */}
              <div className="flex items-center shrink-0">
                <Image src="/brands/metrode.png" alt="Metrode" width={180} height={50} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain h-12 w-auto" />
              </div>
              {/* Techalloy */}
              <div className="flex items-center shrink-0">
                <Image src="/brands/techalloy.png" alt="Techalloy" width={180} height={50} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all object-contain h-12 w-auto" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metrode catalog banner */}
      <div className="bg-[#0B3D91]">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white flex items-center gap-3">
            <Download className="h-5 w-5 text-[#F97316] shrink-0" />
            <div>
              <p className="font-semibold text-sm">{t("metrodeTitle")}</p>
              <p className="text-blue-200 text-xs">{t("metrodeDesc")}</p>
            </div>
          </div>
          <a
            href="https://alfametalindo.com/Metrode-Energy-Markets.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }), "bg-[#F97316] hover:bg-orange-600 text-white border-transparent shrink-0 text-xs")}
          >
            {t("metrodeButton")}
          </a>
        </div>
      </div>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Process filter */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-3">{t("filterByProcess")}</p>
            <Tabs value={process} onValueChange={setProcess}>
              <TabsList className="flex !h-auto flex-wrap justify-start p-1.5 gap-2 bg-slate-100 rounded-lg w-full">
                {processes.map((p) => (
                  <TabsTrigger key={p} value={p} className="text-sm !h-auto py-1.5 px-3">
                    {p === "All" ? t("filterAll") : t(`processes.${p}` as any)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Material filter */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-3 mt-4">{t("filterByMaterial")}</p>
            <Tabs value={material} onValueChange={setMaterial}>
              <TabsList className="flex !h-auto flex-wrap justify-start p-1.5 gap-2 bg-slate-100 rounded-lg w-full">
                {materials.map((m) => (
                  <TabsTrigger key={m} value={m} className="text-sm !h-auto py-1.5 px-3">
                    {m === "All" ? t("filterAll") : m}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <p className="text-sm text-slate-500 mb-6">{filtered.length} products</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product) => (
              <Card key={product.id} className="hover:shadow-md hover:border-[#0B3D91] transition-all">
                <CardContent className="p-5">
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] text-[#0B3D91] border-[#0B3D91]">
                      {t(`processes.${product.process}` as any)}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">{product.material}</Badge>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-slate-500 mb-1">
                    <span className="font-medium text-slate-600">{t("brandLabel")}:</span> {product.brand}
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    <span className="font-medium text-slate-600">{t("applicationLabel")}:</span> {product.application}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white"
                      onClick={() => setDialogProduct(product)}
                    >
                      {t("requestDatasheet")}
                    </Button>
                    <Link
                      href={`/${locale}/contact`}
                      className={cn(buttonVariants({ size: "sm" }), "flex-1 text-xs bg-[#F97316] hover:bg-orange-600 text-white border-transparent text-center")}
                    >
                      {t("requestQuote")}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Products — Services */}
      <section className="py-16 bg-[#0B3D91] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("servicesTitle")}</h2>
            <p className="text-blue-200 max-w-xl mx-auto">{t("servicesSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, brandKey, titleKey, descKey }) => (
              <div key={titleKey} className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                <Icon className="h-8 w-8 text-[#F97316] mb-4" />
                <p className="text-xs text-[#F97316] font-bold tracking-wide mb-1">{t(brandKey)}</p>
                <h3 className="font-bold text-white mb-2">{t(titleKey)}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!dialogProduct} onOpenChange={(open) => !open && setDialogProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("datasheetDialogTitle")}</DialogTitle>
            <DialogDescription>
              {dialogProduct?.name} — {t("datasheetDialogDesc")}
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4 mt-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = {
                name: (form.elements.namedItem("name") as HTMLInputElement).value,
                email: (form.elements.namedItem("email") as HTMLInputElement).value,
                company: (form.elements.namedItem("company") as HTMLInputElement).value,
                product: `Datasheet Request: ${dialogProduct?.name}`,
                message: "I am interested in this product and would like to request its datasheet.",
              };
              
              try {
                await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
              } catch (error) {
                console.error("Failed to send datasheet request", error);
              }
              
              setDialogProduct(null);
            }}
          >
            <div className="space-y-1.5">
              <Label>{t("formName")}</Label>
              <Input name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-1.5">
              <Label>{t("formEmail")}</Label>
              <Input name="email" type="email" placeholder="john@company.com" required />
            </div>
            <div className="space-y-1.5">
              <Label>{t("formCompany")}</Label>
              <Input name="company" placeholder="PT Example" required />
            </div>
            <Button type="submit" className="w-full bg-[#0B3D91] hover:bg-blue-900 text-white">
              {t("formSubmit")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
