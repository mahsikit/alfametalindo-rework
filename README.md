# PT. Alfa Metalindo Indonesia — Website Rework

Modern bilingual (EN/ID) marketing website for PT. Alfa Metalindo Indonesia, a Jakarta-based welding consumables and exotic alloys distributor. Built as a pitch demo to replace their early-2010s PHP site.

**Live demo:** https://alfametalindo-rework.vercel.app  
**GitHub:** https://github.com/mahsikit/alfametalindo-rework

---

## What This Is

A "spec work" pitch: build the finished site, deploy it live, walk into the meeting with a URL the owner can open on her phone. The goal is to show Widiarty Wirawan (Owner/Director) a site that's unmistakably _her_ company — not a template.

All copy, client names, brand partners, address, and milestones are sourced from real research. See [`research/`](./research/) for the source-of-truth files.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + shadcn/ui v4 |
| i18n | next-intl 4 (EN/ID, default Indonesian) |
| Forms | React Hook Form + Zod |
| Email | Resend (not yet configured — see below) |
| Deploy | Vercel (Hobby free tier) |

---

## Pages

| Page | Route | Notes |
|---|---|---|
| Home | `/id` or `/en` | Hero, stat row, client wall, brand groups, why-us |
| About | `/id/about` | Founder name, 13 brands in 3 groups, Leadership card |
| Products | `/id/products` | Filterable grid, Metrode PDF download, Beyond Products services |
| Industries | `/id/industries` | 8 industry cards with real material callouts |
| News & Milestones | `/id/news` | Real milestone timeline (2002, 2018, 2019, 2026) |
| Contact | `/id/contact` | Form, map, WhatsApp, correct Martadinata address |

Old PHP URLs redirect permanently to new routes:
- `/about-us.php` → `/id/about`
- `/products.php` → `/id/products`
- `/contact-us.php` → `/id/contact`
- `/news.php` → `/id/news`

---

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000 — auto-redirects to /id
```

---

## GitHub Setup

The repo must be owned solely by `mahsikit`. Git is configured to use:

```bash
git config user.name "mahsikit"
git config user.email "jonathan.yungyung61@gmail.com"
```

If you clone on a new machine, set these before committing:

```bash
cd alfametalindo-rework
git config user.name "mahsikit"
git config user.email "jonathan.yungyung61@gmail.com"
```

**Never commit with a different email** — Vercel detects multiple GitHub contributors and blocks production deploys on the Hobby plan.

---

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

| Variable | Purpose | Required |
|---|---|---|
| `RESEND_API_KEY` | Send contact form emails via Resend | No (currently just logs) |
| `CONTACT_EMAIL` | Where form submissions are delivered | No (defaults to marketing@alfametalindo.com) |

---

## Adding/Editing Translations

All UI strings live in two files:

- `messages/en.json` — English
- `messages/id.json` — Indonesian (default locale)

Edit **both** files to add a new string, then use it in a component:

```tsx
// Server component
const t = await getTranslations("home");

// Client component
const t = useTranslations("home");

return <span>{t("heroTagline")}</span>
```

---

## Enabling Email (Resend)

The contact forms and datasheet request forms are fully wired up to send emails directly to `jonathan.yungyung61@gmail.com`. To enable real email delivery:

1. Create a free account at https://resend.com (3,000 emails/mo free)
2. Get an API key
3. Add `RESEND_API_KEY=re_...` to `.env.local` and Vercel env vars

Once added, the frontend forms will automatically send emails using this backend service.

---

## Deployment

Pushing to `main` auto-deploys to Vercel via GitHub integration.

To deploy manually:

```bash
vercel        # Preview deploy (safe, creates a unique URL)
vercel --prod # Production deploy (ask first — affects live URL)
```

---

## Research Folder

`research/` contains source-of-truth documents compiled from real web research on PT Alfa Metalindo Indonesia. **All copy on the site should trace back to one of these files.**

| File | Contents |
|---|---|
| `company-profile.md` | Address, phone, fax, email, tagline, founding date |
| `people.md` | Owner Widiarty Wirawan + team LinkedIn links |
| `brands.md` | All 13 principal brand partners with country + specialty |
| `clients.md` | 10 named energy clients (verbatim from their About Us) |
| `products.md` | Verified product SKUs + service offerings |
| `exhibitions.md` | Manufacturing Indonesia 2018 (Stand F-310), Surabaya 2019 |
| `images/SOURCES.md` | URLs of real images to capture manually |
| `competitors.md` | Other Lincoln distributors in Indonesia; positioning |
| `open-questions.md` | 8 things to ask Widiarty after the pitch |

---

## Pitch Notes

- **Client:** PT. Alfa Metalindo Indonesia
- **Owner:** Widiarty Wirawan (Owner/Director, Universitas Tarumanagara)
- **Current site:** alfametalindo.com (PHP, outdated — no mobile, no form, news from 2010)
- **Pitch angle:** "Here's your new site, already live — want to take it over?"
- **Named clients on site:** Pertamina, PGN, Total, BP, ConocoPhillips, Medco E&P, Hess, PetroChina, CNOOC, APD Serica Energy (all verbatim from their own About Us)
- **Key differentiator to emphasize:** exotic-alloy specialization + Metrode UK distribution — most competitors don't carry these
- **Domain to buy:** `alfametalindo.id` at DomaiNesia (~Rp 165k/yr)
- **Vercel:** connect to `mahsikit/alfametalindo-rework` after pitch sign-off; transfer ownership to client's account

### After the Pitch — Open Questions

See `research/open-questions.md` for the 8 follow-up questions to ask Widiarty (certifications, real photos, exclusive distributor status, WhatsApp number, etc.).
