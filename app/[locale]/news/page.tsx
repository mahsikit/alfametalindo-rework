import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("news");
  return { title: `${t("title")} — PT. Alfa Metalindo Indonesia` };
}

export default function NewsPage() {
  const t = useTranslations("news");
  const locale = useLocale();

  const milestones = [
    { year: t("milestone1Year"), title: t("milestone1Title"), desc: t("milestone1Desc"), image: null },
    { year: t("milestone2Year"), title: t("milestone2Title"), desc: t("milestone2Desc"), image: "/exhibition-booth-2018.jpg" },
    { year: t("milestone3Year"), title: t("milestone3Title"), desc: t("milestone3Desc"), image: null },
    { year: t("milestone4Year"), title: t("milestone4Title"), desc: t("milestone4Desc"), image: null },
  ];

  return (
    <>
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">{t("timelineTitle")}</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />

            <div className="space-y-10">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="relative flex gap-6 items-start">
                  {/* Year circle */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0B3D91] text-white flex items-center justify-center z-10 shadow-md">
                    <span className="text-[10px] font-bold text-center leading-tight px-0.5">
                      {milestone.year}
                    </span>
                  </div>
                  {/* Card */}
                  <div className="flex-1 bg-white rounded-xl border border-slate-200 hover:border-[#0B3D91] hover:shadow-sm transition-all overflow-hidden">
                    {milestone.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-xs font-bold text-[#F97316] mb-2">{milestone.year}</div>
                      <h3 className="font-bold text-slate-900 text-base mb-2">{milestone.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B3D91] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">{t("ctaTitle")}</h2>
          <p className="text-blue-200 max-w-md mx-auto mb-8">{t("ctaDesc")}</p>
          <Link
            href={`/${locale}/contact`}
            className={cn(buttonVariants({ size: "lg" }), "bg-[#F97316] hover:bg-orange-600 text-white border-transparent px-10")}
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
