# Manthan Tiwari — Athlete & Coaching Portfolio

Premium personal brand site built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content & images

Edit **`src/data/site.ts`** for achievements, services, testimonials, gallery paths, and contact info.

Add your photography under **`public/images/`**:

| File | Purpose |
|------|---------|
| `hero.jpg` | Hero athlete photo |
| `about.jpg` | About portrait |
| `gallery/*.jpg` | Journey gallery (see `galleryItems` in data file) |
| `results/*` | Before/after placeholders |

Missing images show a styled placeholder until files exist.

## Inquiry form

Submissions POST to **`/api/inquiry`** with server-side validation.

- Without **`INQUIRY_WEBHOOK_URL`**: returns a honest success message that delivery is not configured (no fake email sent).
- With **`INQUIRY_WEBHOOK_URL`**: forwards JSON payload to your endpoint.

Copy `.env.example` to `.env.local` and set variables as needed.

## Instagram (@MANTHANLIFTS)

Profile: [instagram.com/MANTHANLIFTS](https://www.instagram.com/MANTHANLIFTS/)

Automated pulls use Meta’s **Instagram Graph API** (not public scraping). Set `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID` in `.env.local`, or add post URLs to `instagramPostUrls` in `src/data/site.ts` for embeds.

## Stack

- Next.js App Router, React 19, TypeScript
- Tailwind CSS v4
- Framer Motion, Lucide icons
- Aceternity / React Bits–inspired UI primitives in `src/components/ui/`

## Build

```bash
npm run build
npm start
```
