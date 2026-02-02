# Bubblez Cleaning Services

A full-stack website for Bubblez Cleaning Services — cleaning services in Johannesburg & Pretoria (residential, commercial, post-construction, specialty). Built with Next.js (frontend) and Express (API); forms send email via Nodemailer.

---

## Tech stack

| Layer    | Stack |
| -------- | ----- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS |
| API      | Express 5 (Node), TypeScript, Nodemailer |
| Forms    | react-hook-form, react-toastify |
| UI       | Headless UI, react-icons, clsx |

---

## Project structure

```
bubblez/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── contact/            # Contact page
│   │   ├── home/               # Home sections (hero, about, process, services)
│   │   ├── services/           # Services page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/             # NavBar, Footer, Modal, AppPreloader, Logo
│   │   ├── modals/             # Book Service, Free Quote, Confirmation
│   │   └── ui/                 # Button, Input, Card, Pills, Radio, etc.
│   ├── contexts/               # ModalContext (modal state + provider)
│   ├── hooks/                  # useApi, useModals, useRadio
│   ├── server/                 # Express API (runs separately)
│   │   ├── app.ts              # Express app, CORS, routes
│   │   ├── routes/             # emailRoutes, contactRoutes
│   │   └── services/           # emailService, contactService (Nodemailer)
│   ├── types/                  # Shared types (booking, quote, contact)
│   └── utils/                  # Navigation, Contact, Process, Services data
├── public/
├── .env                        # See "Environment variables" (not committed)
├── package.json
└── README.md
```

- **Frontend** (Next.js): `src/app`, `src/components`, `src/contexts`, `src/hooks`, `src/types`, `src/utils`.
- **API** (Express): `src/server`. Loads `.env` via `dotenv/config`; serves `/api/*` and sends email via Nodemailer.

---

## Prerequisites

- **Node.js** 18+ (or 20+)
- **pnpm** (or npm/yarn)

---

## Installation

```bash
git clone <repo-url>
cd bubblez
pnpm install
```

---

## Environment variables

Create a `.env` file in the project root. **Do not commit it.**

### Frontend (Next.js)

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `NEXT_PUBLIC_API_BASE_URL` | No | API base URL. Omit or leave empty to use default `http://localhost:3001` when the Express API runs on 3001. Set in production to your API URL. |

### API (Express) — email (Nodemailer)

Used by `src/server/services/emailService.ts` and `contactService.ts`:

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `EMAIL_SERVICE` | Yes | Mail provider, e.g. `gmail`, `outlook`, or [Nodemailer service](https://nodemailer.com/usage/using-well-known-services/). |
| `EMAIL_USER` | Yes | Sender/login email (e.g. `you@gmail.com`). |
| `EMAIL_PASSWORD` | Yes | **App password**, not your normal account password. |

### Gmail: fixing "Username and Password not accepted"

Gmail blocks normal passwords for apps. Use an **App Password**:

1. Turn on [2-Step Verification](https://myaccount.google.com/security) for the Google account.
2. Open [App passwords](https://myaccount.google.com/apppasswords) (or search “App passwords” in Google Account).
3. Create an app password for “Mail” / “Other (Custom name)” (e.g. “Bubblez”).
4. Put the **16-character password** in `.env` as `EMAIL_PASSWORD`; keep `EMAIL_USER` as the Gmail address and `EMAIL_SERVICE=gmail`.

Example `.env`:

```env
# Optional: override API URL (default when running both: http://localhost:3001)
# NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Required for contact / book / quote emails
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

---

## Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Runs **both** Next.js (port 3000) and Express API (port 3001). Use this for full local development. |
| `pnpm run dev:api` | Runs **only** the Express API on port 3001 (e.g. for debugging the API alone). |
| `pnpm build` | Builds the Next.js app for production. |
| `pnpm start` | Runs the built Next.js app (production). Does **not** start the Express API. |
| `pnpm lint` | Runs ESLint. |

For normal development, run:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000). The frontend will call the API at `http://localhost:3001` by default.

---

## API reference

Base URL when running locally: `http://localhost:3001`.

| Method | Endpoint | Description | Body (JSON) |
| ------ | -------- | ----------- | ----------- |
| GET | `/api/health` | Health check | — |
| POST | `/api/book` | Submit booking (Book Service modal) | `BookingProps` (service_type, size, date, time, contact fields, etc.) |
| POST | `/api/quote` | Request quote (Free Quote modal) | `GetQuoteProps` (contact fields, date, time, property_address, service_type, message) |
| POST | `/api/contact` | Contact form (Contact page) | `ContactProps` (firstName, lastName, email, phone, message) |

Success responses: `{ "success": true, "message": "..." }`.  
Errors: `{ "error": "...", "message": "..." }` with appropriate HTTP status (e.g. 500).

Shared types are in `src/types/` (`booking.ts`, `quote.ts`, `contact.ts`).

---

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)
