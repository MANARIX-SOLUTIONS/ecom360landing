# 360 PME Commerce — Landing Page

Modern marketing landing page for the Ecom 360 PME Commerce SaaS platform. Built with React, TypeScript, and Vite.

## Features

- **Hero** — Headline, value proposition, and dashboard preview
- **Features** — POS, stocks, clients, reports, Wave/Orange Money, multi-store
- **Pricing** — Starter, Pro, Business plans with feature comparison
- **CTA** — 14-day free trial call-to-action
- **Responsive** — Mobile-first design with breakpoints

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Lucide React (icons)
- Plus Jakarta Sans (typography)

## Quick Start

```bash
npm install
npm run dev
```

Landing page: **http://localhost:5174**

The main app (ecom360) runs on port 5173. Both can run simultaneously.

## Environment

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_APP_URL` | URL of the main ecom360 app for login/signup links. Default: `http://localhost:5173` |
| `VITE_WHATSAPP_DEMO` | WhatsApp number for demo requests (format: 221778000000). Used by "Demander une démo" CTA. |

## Build

```bash
npm run build
```

Output: `dist/` — deploy to any static host (Vercel, Netlify, etc.).
