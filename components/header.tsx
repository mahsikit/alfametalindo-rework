"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/industries", key: "industries" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function toggleLocale() {
    const next = locale === "en" ? "id" : "en";
    const withoutLocale = pathname.replace(/^\/(en|id)/, "") || "/";
    router.push(`/${next}${withoutLocale}`);
  }

  function isActive(href: string) {
    const localePrefix = `/${locale}`;
    const full = href === "/" ? localePrefix : `${localePrefix}${href}`;
    return pathname === full;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[#0B3D91] text-lg tracking-tight">ALFA METALINDO</span>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase">Indonesia</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={`/${locale}${href === "/" ? "" : href}`}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(href)
                  ? "text-[#0B3D91] bg-blue-50"
                  : "text-slate-600 hover:text-[#0B3D91] hover:bg-slate-50"
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-[#0B3D91] border border-slate-200 rounded-full hover:border-[#0B3D91] transition-colors"
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" />
            {locale === "en" ? "ID" : "EN"}
          </button>

          <Link
            href={`/${locale}/contact`}
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden md:inline-flex bg-[#F97316] hover:bg-orange-600 text-white border-transparent"
            )}
          >
            {t("requestQuote")}
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "md:hidden"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-left font-bold text-[#0B3D91]">
                Alfa Metalindo
              </SheetTitle>
              <nav className="flex flex-col gap-1 mt-6">
                {navLinks.map(({ href, key }) => (
                  <Link
                    key={key}
                    href={`/${locale}${href === "/" ? "" : href}`}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      isActive(href)
                        ? "text-[#0B3D91] bg-blue-50"
                        : "text-slate-700 hover:text-[#0B3D91] hover:bg-slate-50"
                    }`}
                  >
                    {t(key)}
                  </Link>
                ))}
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "mt-4 bg-[#F97316] hover:bg-orange-600 text-white border-transparent"
                  )}
                >
                  {t("requestQuote")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
