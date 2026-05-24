# PT. Alfa Metalindo Indonesia — Website Rework

Modern bilingual (EN/ID) marketing website for PT. Alfa Metalindo Indonesia, a Jakarta-based welding consumables and exotic alloys distributor. Built as a pitch demo to replace their early-2010s PHP site.

**Live demo:** https://alfametalindo-rework.vercel.app

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + shadcn/ui v4 |
| i18n | next-intl 4 (EN/ID) |
| Forms | React Hook Form + Zod |
| Email | Resend (not yet configured) |
| Deploy | Vercel (Hobby free tier) |

---

## Pages

| Page | Route |
|---|---|
| Home | `/id` or `/en` |
| About | `/id/about` |
| Products | `/id/products` |
| Industries | `/id/industries` |
| News | `/id/news` |
| Contact | `/id/contact` |

Old PHP URLs (`/about-us.php`, `/products.php`, `/contact-us.php`, `/news.php`) redirect permanently to the new routes.

---

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000 — auto-redirects to /id
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

| Variable | Purpose | Required |
|---|---|---|
| `RESEND_API_KEY` | Send contact form emails via Resend | No (skipped for now) |
| `CONTACT_EMAIL` | Where form submissions are delivered | No (defaults to marketing@alfametalindo.com) |

---

## Adding/Editing Translations

All UI strings live in two files:

- `messages/en.json` — English
- `messages/id.json` — Indonesian

Edit both files to add a new string, then use it in a component:

```tsx
const t = useTranslations("nav");
return <span>{t("home")}</span>
```

---

## Enabling Email (Resend)

1. Create a free account at https://resend.com
2. Get an API key
3. Add `RESEND_API_KEY=re_...` to `.env.local` (local) and Vercel env vars (production)
4. In `app/api/contact/route.ts`, uncomment the Resend fetch block

---

## Deployment

Pushing to `main` on GitHub auto-deploys to Vercel.

To deploy manually:

```bash
vercel --prod
```

---

## Pitch Notes

- Client: PT. Alfa Metalindo Indonesia
- Current site: alfametalindo.com (PHP, outdated)
- Pitch angle: present the finished site, offer to transfer ownership
- Recommended domain to buy for pitch: `alfametalindo.id` at DomaiNesia (~Rp 165k/yr)
