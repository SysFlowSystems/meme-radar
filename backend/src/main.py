from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from datetime import datetime, timedelta, timezone

app = FastAPI(title="Meme Radar API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://<MY_NETLIFY_SITE>.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _isoformat_utc(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")

def get_timeseries_for_meme(meme_key: str, num_points: int = 10) -> List[Dict[str, Any]]:
    now = datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0)
    seed = sum(ord(c) for c in meme_key) % 5
    base = 3 + seed
    data: List[Dict[str, Any]] = []
    for i in range(num_points):
        ts = now - timedelta(hours=(num_points - 1 - i))
        count = base + ((i + seed) % 4)
        data.append({"ts": _isoformat_utc(ts), "count": int(count)})
    return data

def get_alerts_for_meme(meme_key: str) -> List[Dict[str, Any]]:
    ts = get_timeseries_for_meme(meme_key, 10)
    if not ts:
        return []
    mid_idx = max(0, len(ts) // 2 - 1)
    return [
        {"meme": meme_key, "ts": ts[mid_idx]["ts"], "count": int(ts[mid_idx]["count"]) + 3},
        {"meme": meme_key, "ts": ts[-2]["ts"], "count": int(ts[-2]["count"]) + 4},
    ]

@app.get("/timeseries/{meme_key}")
def timeseries(meme_key: str) -> List[Dict[str, Any]]:
    return get_timeseries_for_meme(meme_key, num_points=10)

@app.get("/alerts/{meme_key}")
def alerts(meme_key: str) -> List[Dict[str, Any]]:
    return get_alerts_for_meme(meme_key)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8088)


