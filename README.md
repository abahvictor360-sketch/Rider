# Rider — Car Rental App (React + Framer Motion)

**Rider** is a premium car rental mobile app UI built as a fully navigable React web app.
Find your next drive on a live map, browse supercars, SUVs and EVs, compare specs and book in a few taps.

## Features
- **Animated splash screen** — logo spring-in, letter reveal, car drive-in with speed lines
- **Login / Sign up** — validation, password toggle, social buttons, demo account
- **Home** — animated map (pulsing pickup pin, moving cars), pickup location & date picker, categories, promo banner, sort/fuel filters, car carousel, top brands
- **Car details** — studio cutout / real photo / dark showroom views, drag-to-rotate 360° mode, insurance, specs grid, similar cars, sticky Book Now bar
- **Booking** — trip dates, extras, payment method, live price breakdown, animated success check
- **Explore** — search, category chips, price filter, animated grid
- **Trips, Profile, Favourites, Notifications** — bookings persist in localStorage, cancel / book again, logout
- Page transitions, shared-layout nav pill, bottom sheets, toasts, micro-interactions everywhere
- Responsive: full-screen on phones, device frame + pitch panel on desktop

## Stack
React 18 · Vite · React Router · Framer Motion · Lucide icons · Inter font.
Car images had their backgrounds removed with `rembg` (IS-Net).

## Run locally
```bash
npm install
npm run dev
```

## Deploy
`vercel.json` is included (Vite preset + SPA rewrites). Run `vercel --prod` or import the repo at vercel.com/new.

## Marketing assets
`marketing/` holds the 9:16 promo video and ready-to-post copy with keywords and hashtags.
