# App Hub

My own apps in one place: a React + Vite site hosted on Azure Static Web Apps (Free plan), installable on the phone as a home-screen app, and locked to my own login.

## Layout

```
src/apps/<name>/App.jsx    the app (default export)
src/apps/<name>/meta.js    title, description, group, accent colour, order
src/Launcher.jsx           home screen, built automatically from src/apps
api/src/functions/         Azure Functions (e.g. /api/analyse calls Claude)
staticwebapp.config.json   routes, login lock, runtime
```

## Add an app

1. Create `src/apps/<name>/` and put the artifact's code in `App.jsx`.
2. Add `meta.js`:
   ```js
   export default { title: "…", description: "…", group: "Training", accent: "#10B981", order: 2 };
   ```
3. Push. It appears on the home screen and at `/apps/<name>`.

Porting notes for Claude artifacts:
- Tailwind, lucide-react and recharts are installed; `@/…` imports resolve to `src/`.
- `window.storage` → `localStorage`/IndexedDB (or a Function + Cosmos DB for sync across devices).
- Calls to Claude from inside an app → `fetch("/api/analyse", …)`; the API key stays in the Function.

## Run locally

```
npm install
npm run dev
```

## Deploy (one-off setup)

1. Push this repo to GitHub (private is fine).
2. Azure portal → Create **Static Web App** → Plan: **Free** → Source: GitHub → pick this repo.
   Build details: preset **React** (or Custom), App location `/`, Api location `api`, Output location `dist`.
   Azure adds a GitHub Actions workflow; every push redeploys.
3. Lock it to yourself: Static Web App → **Role management** → Invite → provider GitHub, your username, role `owner` → open the invite link and sign in.
4. For apps that call Claude: **Environment variables** → add `ANTHROPIC_API_KEY`.
5. On the phone: open the site, sign in, then **Add to Home Screen**.

Everything except `/manifest.webmanifest` and `/icons/*` requires the `owner` role; plain `authenticated` would let any GitHub user in.
