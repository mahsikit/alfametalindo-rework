@AGENTS.md

# Project: PT. Alfa Metalindo Indonesia Website Rework

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
    page.tsx         ← Homepage
    about/page.tsx
    products/page.tsx
    industries/page.tsx
    news/page.tsx
    contact/page.tsx
  api/contact/route.ts  ← Contact form handler
  layout.tsx         ← Minimal root passthrough (no html/body)
  page.tsx           ← Redirects / to /id
components/
  header.tsx         ← Sticky nav with locale toggle
  footer.tsx         ← Footer with contact info
  ui/                ← shadcn/ui components
messages/
  en.json            ← English strings
  id.json            ← Indonesian strings
i18n/
  routing.ts         ← Locale config (locales: ["en","id"], default: "id")
  request.ts         ← next-intl server config
proxy.ts             ← Locale detection + routing (next-intl middleware)
vercel.ts            ← Vercel deployment config
```

---

## i18n Rules

- Default locale is **Indonesian** (`id`)
- Locale prefix is **always** present: `/id/about`, `/en/about`
- To add a string: add to both `messages/en.json` AND `messages/id.json`
- Server components use `getTranslations()`, client components use `useTranslations()`

---

## Brand Colors

| Token | Value | Usage |
|---|---|---|
| Primary blue | `#0B3D91` | Headers, links, borders, buttons |
| Accent orange | `#F97316` | CTAs, highlights, icons |
| Dark | `slate-900` | Hero backgrounds, footer |
| Light | `slate-50` | Section backgrounds |

---

## Common Commands

```bash
npm run dev       # Local dev server → http://localhost:3000
npm run build     # Production build (run before deploying)
vercel --prod     # Deploy to production
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
