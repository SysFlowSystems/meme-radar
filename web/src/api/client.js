// Lightweight API client with optional mock mode
// Reads default base URL from Vite env, falls back to Netlify proxy path /api

let baseUrl = import.meta.env.VITE_API_BASE || '/api';
let mockMode = false;

export function setBaseUrl(url) {
  if (typeof url === 'string' && url.trim()) {
    baseUrl = url.trim();
  }
}

export function setMockMode(enabled) {
  mockMode = !!enabled;
}

function sampleTimeseries(memeKey) {
  const now = new Date();
  const points = [];
  for (let i = 9; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() - i);
    let count = 2 + ((i + memeKey.length) % 4);
    if (i === 2) count += 6; // visible spike
    points.push({ ts: d.toISOString(), count });
  }
  return points;
}

function sampleAlerts(memeKey) {
  const ts = sampleTimeseries(memeKey);
  return [
    { meme: memeKey, ts: ts[7].ts, count: ts[7].count + 2 },
    { meme: memeKey, ts: ts[8].ts, count: ts[8].count + 3 },
  ];
}

async function requestJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Request failed ${res.status} ${res.statusText} for ${url}${text ? `: ${text}` : ''}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function getTimeseries(memeKey) {
  if (mockMode) return sampleTimeseries(memeKey);
  const url = `${baseUrl}/timeseries/${encodeURIComponent(memeKey)}`;
  return requestJson(url);
}

export async function getAlerts(memeKey) {
  if (mockMode) return sampleAlerts(memeKey);
  const url = `${baseUrl}/alerts/${encodeURIComponent(memeKey)}`;
  return requestJson(url);
}


