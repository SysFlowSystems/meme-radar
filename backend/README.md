# Meme Radar Backend (FastAPI)

## Project structure

```
backend/
  src/
    __init__.py
    main.py
  requirements.txt
  README.md
```

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

## Run (default port 8088)

```bash
python -m uvicorn backend.src.main:app --reload --port 8088
```

Endpoints:
- GET `/timeseries/{meme_key}` → mocked mentions per hour (last 10 hours)
- GET `/alerts/{meme_key}` → mocked spike alerts

CORS is enabled for all origins to support local and hosted dashboards.
