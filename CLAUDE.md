@AGENTS.md

# Project: PT. Alfa Metalindo Indonesia Website Rework

## Git Identity — CRITICAL

**Always use these credentials for commits in this repo:**

```bash
git config user.name "mahsikit"
git config user.email "jonathan.yungyung61@gmail.com"
```

Vercel Hobby plan blocks production deploys if it detects multiple GitHub contributors. The repo owner is `mahsikit`. Any commit authored under a different email (e.g. a work email) will show as a second contributor and break the Vercel deploy.

---

## Critical: Next.js 16 Breaking Changes

This project runs **Next.js 16**. Key differences from Next.js 14/15 you must know:

### Middleware is now `proxy.ts`
- File is `proxy.ts` at project root (NOT `middleware.ts`)
- Exported function is named `proxy` (NOT `middleware`)
- Everything else (NextRequest, NextResponse, config matcher) is identical

```ts
// proxy.ts
export function proxy(request: NextRequest) { ... }
export const config = { matcher: [...] }
```

### Typed route params
Use the globally available `PageProps` and `LayoutProps` helpers:

```tsx
export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params  // params is a Promise in Next.js 16
}
```

---

## Critical: shadcn/ui v4 Uses @base-ui (NOT Radix)

The installed shadcn components use `@base-ui/react` instead of Radix UI.

**`asChild` does NOT exist.** Never write `<Button asChild>`.

### Correct pattern for button-as-link:
```tsx
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

<Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-[#F97316] text-white")}>
  Contact Us
</Link>
```

### Correct pattern for trigger components:
```tsx
// SheetTrigger renders a native button — just pass className
<SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
  <Menu />
</SheetTrigger>
```

### If you need a custom render element, use the `render` prop:
```tsx
<ButtonPrimitive render={<Link href="..." />} className={buttonVariants()} />
```

---

## Project Structure

```
app/
  [locale]/          ← All pages live here (EN/ID routing)
    layout.tsx       ← Root layout with html/body
    page.tsx         ← Homepage (hero, stat row, client wall, brands, why-us)
    about/page.tsx   ← Founder story, 13 brands in 3 groups, Leadership card
    products/page.tsx ← Filterable grid, Metrode PDF banner, Beyond Products
    industries/page.tsx
    news/page.tsx    ← Milestone timeline (NOT article grid)
    contact/page.tsx
  api/contact/route.ts  ← Zod validation; currently logs only (Resend disabled)
  layout.tsx         ← Minimal root passthrough (no html/body)
  page.tsx           ← Redirects / to /id
components/
  header.tsx         ← Sticky nav with locale toggle
  footer.tsx         ← Footer with contact info + distributor strap
  ui/                ← shadcn/ui components
messages/
  en.json            ← English strings
  id.json            ← Indonesian strings (default locale)
i18n/
  routing.ts         ← Locale config (locales: ["en","id"], default: "id")
  request.ts         ← next-intl server config
research/            ← Source-of-truth research docs (see research/README.md)
proxy.ts             ← Locale detection + routing (next-intl middleware)
vercel.ts            ← Vercel deployment config
```

---

## i18n Rules

- Default locale is **Indonesian** (`id`)
- Locale prefix is **always** present: `/id/about`, `/en/about`
- To add a string: add to **both** `messages/en.json` AND `messages/id.json`
- Server components use `getTranslations()`, client components use `useTranslations()`

---

## Brand Colors

| Token | Value | Usage |
|---|---|---|
| Primary blue | `#0B3D91` | Headers, links, borders, buttons |
| Accent orange | `#F97316` | CTAs, highlights, icons, brand names |
| Dark | `slate-900` | Hero backgrounds, footer |
| Light | `slate-50` | Section backgrounds |

---

## Key Message Keys Added (do not remove)

These keys were added during personalization and are used in the page components:

**home:** `statsYears`, `statsYearsLabel`, `statsProjects`, `statsProjectsLabel`, `statsBrands`, `statsBrandsLabel`, `clientsTitle`, `brandsConsumablesLabel`, `brandsEquipmentLabel`, `why1–4Title/Desc` (updated to real moats)

**about:** `storyP1–P3` (rewritten with founder name), `brandsConsumablesLabel`, `brandsEquipmentLabel`, `brandsOwnLabel`, `leadershipTitle`, `leadershipName`, `leadershipRole`, `leadershipEdu`, `teamNote`

**products:** `metrodeTitle`, `metrodeDesc`, `metrodeButton`, `servicesTitle`, `servicesSubtitle`, `service1–3Title`, `service1–3Brand`, `service1–3Desc`

**news:** `timelineTitle`, `milestone1–4Year`, `milestone1–4Title`, `milestone1–4Desc`, `ctaTitle`, `ctaDesc`, `ctaButton`

**footer:** `distributorStrap`

---

## Company Facts (do not fabricate beyond these)

| Fact | Value |
|---|---|
| Owner/Director | Widiarty Wirawan |
| Founded | October 2002, Jakarta Utara |
| Address | Komplek Rukan Mahkota Ancol Blok C No. 53–55, Jl. R.E. Martadinata, Pademangan Barat, Jakarta Utara 14420 |
| Phone | 021-6470 0022 |
| Fax | 021-6470 0033 |
| Email | marketing@alfametalindo.com |
| Tagline | "A Better Welding Partner" (their own) |
| Track record | "100+ projects" (self-claim from their About Us) |
| Named clients | Pertamina, PGN, Total, BP, ConocoPhillips, Medco E&P, Hess, PetroChina, CNOOC, APD Serica Energy |
| Brand partners | 13 total — see `research/brands.md` |
| Exhibitions | Manufacturing Indonesia 2018 (Stand F-310), Manufacturing Surabaya 2019 |

Full source-of-truth in `research/` folder.

---

## Common Commands

```bash
npm run dev       # Local dev server → http://localhost:3000
npm run build     # Production build (run before deploying)
vercel            # Preview deploy
vercel --prod     # Production deploy (confirm with user first)
```

---

## Contact Form

`app/api/contact/route.ts` validates with Zod and currently just logs submissions.
To enable email: add `RESEND_API_KEY` env var and restore the Resend fetch call.

---

## Do Not

- Do not rename `proxy.ts` to `middleware.ts`
- Do not use `asChild` on any shadcn component
- Do not add an `<html>` or `<body>` tag to `app/layout.tsx` (the `[locale]/layout.tsx` handles it)
- Do not hardcode locale in links — always use `/${locale}/path`
- Do not fabricate client names, SKUs, certifications, or project details not in `research/`
- Do not commit with any email other than `jonathan.yungyung61@gmail.com`
