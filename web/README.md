# Meme Radar Web (React + Vite)

## Setup

```bash
cd web
npm install
cp .env.example .env # optional, to set VITE_API_URL
```

## Development

```bash
npm run dev
```

Open the app at http://localhost:5173.

## Build & Preview

```bash
npm run build
npm run preview
```

## API URL

Use `VITE_API_BASE` to point to the FastAPI backend.

- Netlify/Render: `VITE_API_BASE=https://meme-radar.onrender.com`
- Local dev: `VITE_API_BASE=http://127.0.0.1:8088`

You can also edit the URL in the app’s top bar; it persists in localStorage.

## Netlify

This directory includes `netlify.toml` with SPA redirects and build settings. Deploy the `web/` folder as a site; build command `npm run build`, publish `dist/`.
