<div align="center">
  <img src="./apps/web/public/feriyo.svg" alt="Feriyo Logo" width="150" height="auto" />
  <p><strong>Feriyo is a website where people buy and sell second-hand stuff.</strong></p>
</div>

Think of it like a small Facebook Marketplace: you post what you want to sell, buyers message you, you haggle over the price, and you make a deal.


## What can you do on Feriyo?

- **Sign up and log in** — passwords are scrambled before being stored (using bcrypt), so the real password never touches the database. Once you log in, you stay logged in.
- **Sell something** — post a listing with up to 5 photos, a title, a description, a price, a category (electronics, fashion, furniture, vehicles…), the condition it's in, and your location.
- **Shop around** — browse everything for sale, search by keyword, filter by category, and page through the results.
- **Save items for later** — bookmark listings you like so you can find them again.
- **Chat with the other person** — every listing gets its own conversation between buyer and seller, and messages appear instantly without refreshing the page.
- **Haggle** — buyers can send a price offer inside the chat. The seller can accept or reject it. Offers expire after a while, and only one open offer can exist in a conversation at a time.
- **Have a profile** — every user gets a public page with their avatar and their listings.

---

## Built with

| Part | What I used | What it does (in plain words) |
| --- | --- | --- |
| Website | React, TypeScript, Tailwind CSS | The pages, and making them look decent |
| Server | Node.js, Express, TypeScript | Answers the browser's requests |
| Database | PostgreSQL, Drizzle | Stores everything; Drizzle lets me talk to the database in TypeScript instead of raw SQL |
| Live chat | Socket.IO | Makes messages show up instantly |
| Staying logged in | JWT (access + refresh tokens) | Proves who you are on each request, without logging in again every hour |
| Input checking | Zod | Rejects badly-shaped data before it can reach the database |
| Photo uploads | Multer | Saves listing photos sent from the browser |

This is a **pnpm monorepo** with three packages:

```
feriyo/
├── apps/
│   ├── web/            @feriyo/web   — React (Vite) frontend
│   └── api/            @feriyo/api   — Express backend
├── packages/
│   └── shared/         @feriyo/shared — Zod validation schemas (used by both web & api)
├── pnpm-workspace.yaml
├── docker-compose.yml  — PostgreSQL
└── .env                — docker-compose env vars
```

The `shared/` package holds the input-checking rules (Zod), so the browser and the server always agree on what valid data looks like.

---

## Running it on your own machine

You'll need [Node.js](https://nodejs.org) (v18+) and [pnpm](https://pnpm.io).

**1. Get the code**

```bash
git clone git@github.com:k4rkie/feriyo.git
cd feriyo
```

**2. Set up environment variables**

The root `.env` is used by `docker-compose.yml` to configure the PostgreSQL container:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=feriyo_postgre123
POSTGRES_DB=feriyodb
```

**3. Start the database**

```bash
docker compose up -d
```

This spins up a PostgreSQL 17 container on `localhost:5432` using the credentials above.

**4. Install dependencies**

```bash
pnpm install
```

**5. Set up the API environment**

Create a file called `.env` inside `apps/api/` with these values:

```env
PORT=8000
DATABASE_URL=postgres://postgres:feriyo_postgre123@localhost:5432/feriyodb
ACCESS_TOKEN_SECRET=any_long_random_string
REFRESH_TOKEN_SECRET=another_long_random_string
```

**6. Create the database tables**

```bash
pnpm --filter @feriyo/api exec drizzle-kit push --config ./src/db/drizzle.config.ts
```

**(Optional)** Seed the database with fake users and listings:

```bash
pnpm --filter @feriyo/api exec tsx src/db/seed.ts
```

**7. Start everything**

```bash
pnpm dev
```

This runs the API server and the Vite dev server in parallel.

Open `http://localhost:5173` in your browser.
