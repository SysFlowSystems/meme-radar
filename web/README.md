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

The default API URL is `http://localhost:8088`. To change it, set `VITE_API_URL` in `.env` or use the TopBar input to update and persist.

## Netlify

This directory includes `netlify.toml` with SPA redirects and build settings. Deploy the `web/` folder as a site; build command `npm run build`, publish `dist/`.
