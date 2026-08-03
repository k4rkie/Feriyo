<div align="center">
  <img src="./client/public/feriyo.svg" alt="Feriyo Logo" width="150" height="auto" />
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

## How it works (in plain words)

The project is made of three parts that talk to each other:

- **The website** (`client/`) — everything you see and click in the browser. Built with React.
- **The server** (`server/`) — the brain behind it. It checks who's logged in, saves new listings, delivers chat messages the moment they're sent, and enforces the rules — for example, only the owner of a listing can edit it, and prices have to be above zero. Built with Node.js and Express.
- **The database** — the permanent memory: users, listings, photos, chats, messages, offers, and saved items. PostgreSQL.

One detail I'm still happy with: the "only one open offer per chat" rule isn't just checked in my code — it's enforced by the database itself. So even if two people send an offer at the exact same moment, the database guarantees only one of them gets through.

---

## Built with

| Part | What I used | What it does (in plain words) |
| --- | --- | --- |
| Website | React, TypeScript, Tailwind CSS | The pages, and making them look decent |
| Server | Node.js, Express, TypeScript | Answers the browser's requests |
| Database | PostgreSQL, Drizzle | Stores everything; Drizzle lets me talk to the database in TypeScript instead of raw SQL |
| Live chat | Socket.IO | Makes messages show up instantly |
| Passwords | bcrypt | Scrambles passwords so they're never stored as-is |
| Staying logged in | JWT (access + refresh tokens) | Proves who you are on each request, without logging in again every hour |
| Input checking | Zod | Rejects badly-shaped data before it can reach the database |
| Photo uploads | Multer | Saves listing photos sent from the browser |

Everything is in one repository, split into `client/`, `server/`, and `shared/` (the `shared/` folder holds the input-checking rules, so the browser and the server always agree on what valid data looks like).

---

## Running it on your own machine

You'll need [Node.js](https://nodejs.org) and a PostgreSQL database running locally.

**1. Get the code**

```bash
git clone git@github.com:k4rkie/feriyo.git
cd feriyo
```

**2. Set up the server**

```bash
cd server
npm install
```

Create a file called `.env` inside `server/` with these values:

```env
PORT=8000
DATABASE_URL=your_postgres_connection_string
ACCESS_TOKEN_SECRET=any_long_random_string
REFRESH_TOKEN_SECRET=another_long_random_string
```

Then create the database tables:

```bash
npx drizzle-kit push --config=src/db/drizzle.config.ts
```

(Optional) Fill the database with fake users and listings so there's something to look at:

```bash
npx tsx src/db/seed.ts
```

Start the server:

```bash
npm run dev
```

**3. Set up the website**

In a second terminal:

```bash
cd client
npm install
```

Create a file called `.env` inside `client/` pointing at the server:

```env
VITE_BASE_BACKEND_URL=http://localhost:8000
```

Start the website:

```bash
npm run dev
```

Open the address it prints (usually `http://localhost:5173`) in your browser.

---

## What this project taught me

- How a full application fits together end to end: browser → server → database, and all the way back.
- Live features are a different beast from normal request/response pages — chat taught me that.
- The database can enforce rules on its own (like the one-open-offer rule), which is safer than only checking them in code.
- The basics of accounts and security: password hashing, login tokens, and protecting pages and actions from people who shouldn't touch them.

## Things I'd do differently today

Keeping it honest — this was a first attempt, and I've learned a lot since:

- **Photos are stored on the server's own disk.** That doesn't survive restarts on most hosting and doesn't scale — a real app uses dedicated cloud storage. (My newer projects do exactly that, with S3-style object storage.)
- **No automated tests.** Every change had to be checked by hand.
- **The server both serves data and saves files** — these days I separate those concerns from the start.

Those lessons are baked into my newer work — which is the whole point of keeping this project around.
