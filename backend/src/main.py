from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import pandas as pd

app = FastAPI(title="meme-radar API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

POSTS: list[dict] = []
ALERTS: list[dict] = []

MEME = "ibiza final boss"
ALIASES = ["ibiza final boss", "ibiza boss", "final boss ibiza", "#ibizafinalboss"]

class RawPost(BaseModel):
    platform: str
    post_id: str
    caption: str
    likes: int = 0
    comments: int = 0
    shares: int = 0
    views: int = 0
    author_followers: int = 0
    posted_at: datetime
    url: str

def looks_like_meme(text: str) -> bool:
    t = (text or "").lower()
    return any(a in t for a in ALIASES)

def build_timeseries(posts: list[dict]) -> pd.DataFrame:
    ps = [p for p in posts if looks_like_meme(p.get("caption",""))]
    if not ps:
        return pd.DataFrame(columns=["ts", "count"])
    df = pd.DataFrame(ps)
    df["ts"] = pd.to_datetime(df["posted_at"]).dt.floor("H")
    out = df.groupby("ts").size().reset_index(name="count").sort_values("ts")
    return out

def detect_spikes(ts_df: pd.DataFrame) -> list[dict]:
    alerts = []
    if ts_df.empty:
        return alerts
    ts_df = ts_df.copy()
    ts_df["avg3"] = ts_df["count"].rolling(window=3, min_periods=1).mean()
    ts_df["prev_avg"] = ts_df["avg3"].shift(1).fillna(0)
    ts_df["diff"] = ts_df["count"] - ts_df["prev_avg"]
    for _, row in ts_df.iterrows():
        if row["count"] >= 3 and row["diff"] >= 2:
            alerts.append({
                "meme": MEME,
                "ts": pd.to_datetime(row["ts"]).isoformat(),
                "count": int(row["count"]),
            })
    return alerts

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/ingest")
def ingest(items: List[RawPost]):
    for it in items:
        POSTS.append(it.dict())
    ts_df = build_timeseries(POSTS)
    global ALERTS
    ALERTS = detect_spikes(ts_df)
    return {"ok": True, "stored": len(items)}

@app.get("/timeseries/{meme_key}")
def timeseries(meme_key: str):
    ts_df = build_timeseries(POSTS)
    return ts_df.to_dict(orient="records")

@app.get("/alerts/{meme_key}")
def alerts(meme_key: str):
    return ALERTS


