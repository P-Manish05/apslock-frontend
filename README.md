# APSLOCK — Full Stack Setup Guide

This guide covers everything needed to get the full APSLOCK stack running on any new machine from scratch. Follow the steps in order and you will have everything working with zero issues.

---

## What's in the Stack

| Part | Tech | Repo |
|------|------|------|
| Frontend | Next.js 16 | apslock-frontend |
| CMS | Strapi 5 + Supabase | apslock-cms |
| Backend | Django 5 | apslock-backend |

---

## Prerequisites

Install these before starting:

- **Node.js** v20 or higher — https://nodejs.org
- **Python** 3.11 or higher — https://python.org
- **Git** — https://git-scm.com

---

## Step 1 — Clone All Three Repos

```bash
git clone https://github.com/P-Manish05/apslock-cms.git
git clone https://github.com/P-Manish05/apslock-frontend.git
git clone https://github.com/P-Manish05/apslock-backend.git
```

---

## Step 2 — Set Up the CMS (Strapi)

### 2.1 Install dependencies

```bash
cd apslock-cms
npm install
```

### 2.2 Create the .env file

Create a file called `.env` inside the `apslock-cms` folder and paste this:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=flSOijE1nZzpBjx55rl7fQ==,7zRWndaToWZAQjFFjc4h+A==,tDjwBAXiCY1KMLO8UF97rw==,8t2aOs45lk4jnoUptVucag==
API_TOKEN_SALT=gr8xCPFGln7Wy/oSycs+Tg==
ADMIN_JWT_SECRET=zp5VCLm5OAyW8oQuKK/ojQ==
TRANSFER_TOKEN_SALT=awuicIIOi+7Tg2Rdh1paGw==
ENCRYPTION_KEY=xTEjgzfvnl6s42d9ZjlBnw==
JWT_SECRET=/DKguPcmRwPua4qVC18/OQ==

# Database (Supabase)
DATABASE_CLIENT=postgres
DATABASE_HOST=aws-1-ap-southeast-1.pooler.supabase.com
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres.zrqzwwaxtjajsuthvgql
DATABASE_PASSWORD=wkCz?tbnL-cCB,2
DATABASE_SSL=true
DATABASE_FILENAME=
```

### 2.3 Start Strapi

```bash
npm run develop
```

Wait for `Strapi started successfully` in the terminal.

### 2.4 Create admin account

Open http://localhost:1337/admin and create your admin account.

### 2.5 Create API Token

1. Go to **Settings → API Tokens → Create new**
2. Name: `nextjs-frontend`
3. Type: `Read Only`
4. Click **Save** and copy the token

### 2.6 Create Content Script Token

1. Go to **Settings → API Tokens → Create new**
2. Name: `content-script`
3. Type: `Full Access`
4. Click **Save** and copy the token — you will need this for seeding

### 2.7 Enable Public API Access

1. Go to **Settings → Roles → Public**
2. Enable `find` and `findOne` for: Blog-post, Case-study, Featured-case, Team-member
3. Click **Save**

---

## Step 3 — Set Up the Frontend (Next.js)

### 3.1 Install dependencies

```bash
cd apslock-frontend
npm install
```

### 3.2 Create the .env.local file

Create a file called `.env.local` inside the `apslock-frontend` folder and paste this — replace `YOUR_TOKEN_HERE` with the `nextjs-frontend` token you copied in Step 2.5:

```env
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=YOUR_TOKEN_HERE
```

### 3.3 Start the frontend

```bash
npm run dev
```

Open http://localhost:3000

---

## Step 4 — Seed Content into Strapi

This populates all blog posts, case studies, team members, and featured cases into Supabase via Strapi.

### 4.1 Update the seed script token

Open `seed.mjs` in the `apslock-frontend` folder and find this line:

```js
const STRAPI_TOKEN = "...";
```

Replace the token with the `content-script` token you copied in Step 2.6.

### 4.2 Run the seed

Make sure Strapi is running, then in a second terminal:

```bash
cd apslock-frontend
node seed.mjs
```

You should see all entries created with ✓

### 4.3 Link images to entries

```bash
node link-images.mjs
```

> Note: Update the `STRAPI_TOKEN` in `link-images.mjs` with the `content-script` token too before running.

---

## Step 5 — Set Up the Backend (Django)

### 5.1 Create virtual environment

```bash
cd apslock-backend
python -m venv venv
```

### 5.2 Activate virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 5.3 Install dependencies

```bash
pip install -r requirements.txt
```

### 5.4 Run migrations

```bash
python manage.py migrate
```

### 5.5 Start the backend

```bash
python manage.py runserver
```

Backend runs at http://127.0.0.1:8000

---

## Step 6 — Verify Everything Works

Open these in your browser and confirm they load correctly:

| URL | What you should see |
|-----|-------------------|
| http://localhost:3000 | APSLOCK homepage with featured cases |
| http://localhost:3000/blogs | All blog posts with images |
| http://localhost:3000/blogs/your-interface-isnt-broken | Full blog post with content |
| http://localhost:1337/admin | Strapi admin with all content |
| http://127.0.0.1:8000/api/contact/ | Django API response |

---

## Running Order (Every Time)

Every time you work on this project, start in this order:

1. Start Strapi: `cd apslock-cms && npm run develop`
2. Start Django: `cd apslock-backend && venv\Scripts\activate && python manage.py runserver`
3. Start Frontend: `cd apslock-frontend && npm run dev`

---

## Common Issues

### Frontend shows fallback data / 403 error
The Strapi API token in `.env.local` is wrong or expired. Go to Strapi admin → Settings → API Tokens → regenerate the `nextjs-frontend` token and update `.env.local`.

### Strapi admin shows no content
The data is in Supabase but not showing. Run `node seed.mjs` from the frontend folder with Strapi running.

### Images not showing
Run `node link-images.mjs` from the frontend folder with Strapi running. Make sure the images exist in `apslock-frontend/public/images/`.

### Strapi fails to start with "Metadata not found" error
The `src/api` or `src/components` folder is missing or incomplete. Pull the latest from GitHub — these are now included in the repo.

### Blog content only shows first paragraph
The `strapi.ts` file has old content mapping. Make sure `getBlogPostBySlug` returns the full content array, not just `content?.[0]`.

---

## Project Structure

```
apslock-cms/          → Strapi CMS (connects to Supabase)
  src/api/            → Content type definitions
  src/components/     → Shared components (metric, etc.)
  config/database.ts  → Supabase connection config

apslock-frontend/     → Next.js frontend (connects to Strapi)
  src/lib/strapi.ts   → All Strapi fetch utilities
  src/components/     → UI components
  public/images/      → Local images for seeding
  seed.mjs            → Seeds all content into Strapi
  link-images.mjs     → Links uploaded images to entries

apslock-backend/      → Django backend (forms, bookings, calendar)
  api/                → Contact, newsletter, booking endpoints
```

---

## Environment Files (Never Committed to GitHub)

| File | Location | Contains |
|------|----------|----------|
| `.env` | apslock-cms/ | Supabase credentials, Strapi secrets |
| `.env.local` | apslock-frontend/ | Strapi URL and API token |

These files are in `.gitignore` — you must create them manually on each new machine using the values in this README.
