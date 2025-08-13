# Deploy

## Backend (Render)
- Push repo to GitHub.
- In Render, "New > Web Service" from this repo.
- It auto-detects `render.yaml`. Deploy.
- Copy the service URL, e.g. https://meme-radar-api.onrender.com

## Frontend (Netlify)
- In Netlify, "Add new site > Import from Git".
- Pick the repo, set base directory = web
- Build cmd: npm ci && npm run build
- Publish dir: dist
- Create `web/netlify.toml` redirect to your Render URL (edit the placeholder).
- (Optional) Set env var VITE_API_BASE=https://meme-radar-api.onrender.com if you don't want to use the `/api` proxy.

## CORS
- In Render, set ALLOWED_ORIGINS to your Netlify domain, e.g. https://your-site.netlify.app


