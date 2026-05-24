import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Printer, Mail, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/products`, label: tNav("products") },
    { href: `/${locale}/industries`, label: tNav("industries") },
    { href: `/${locale}/news`, label: tNav("news") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex flex-col leading-none mb-3">
              <span className="font-bold text-white text-xl tracking-tight">ALFA METALINDO</span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase">Indonesia</span>
            </div>
            <p className="text-sm text-slate-400 mb-1">{t("tagline")}</p>
            <p className="text-xs text-slate-500 mt-3">Est. October 2002</p>
            <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">{t("distributorStrap")}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 text-[#F97316] mt-0.5 shrink-0" />
                <span>{tContact("address")}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-[#F97316] shrink-0" />
                <a href="tel:+62216470022" className="hover:text-white transition-colors">
                  021-64700022
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Printer className="h-4 w-4 text-[#F97316] shrink-0" />
                <span>021-64700033</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-[#F97316] shrink-0" />
                <a
                  href="mailto:marketing@alfametalindo.com"
                  className="hover:text-white transition-colors"
                >
                  marketing@alfametalindo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-500">
          {t("copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
