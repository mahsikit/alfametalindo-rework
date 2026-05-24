<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Project-specific agent rules

- **Git identity:** Always commit as `mahsikit <jonathan.yungyung61@gmail.com>`. Never use any other email — it breaks Vercel production deploys.
- **Research first:** Before writing any copy or adding any company fact, check `research/` for the verified source. Do not fabricate client names, SKUs, certifications, or project history.
- **`proxy.ts` not `middleware.ts`:** The Next.js 16 middleware convention uses `proxy.ts` with an exported function named `proxy`.
- **No `asChild`:** shadcn/ui v4 uses `@base-ui/react` — `asChild` does not exist. Use `buttonVariants` on `<Link>` or the `render` prop.
- **Both locales:** Any new i18n string must be added to both `messages/en.json` AND `messages/id.json`.
<!-- END:nextjs-agent-rules -->
