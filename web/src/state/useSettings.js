import { useEffect, useMemo, useState } from 'react';
import { API_BASE } from '../lib/config.ts';

const STORAGE_KEY = 'meme-radar-settings-v1';
const DEFAULT_API = (import.meta.env.VITE_API_BASE) || API_BASE;

const DEFAULT_SETTINGS = {
  apiUrl: DEFAULT_API,
  memeKey: 'ibiza-final-boss',
  autoRefresh: { enabled: false, intervalMs: 30000 },
  mock: false,
  lastFetch: { ok: false, at: null },
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const actions = useMemo(() => ({
    setApiUrl: (url) => setSettings((s) => ({ ...s, apiUrl: url })),
    setMemeKey: (key) => setSettings((s) => ({ ...s, memeKey: key })),
    setAutoRefreshEnabled: (enabled) => setSettings((s) => ({ ...s, autoRefresh: { ...s.autoRefresh, enabled } })),
    setAutoRefreshInterval: (intervalMs) => setSettings((s) => ({ ...s, autoRefresh: { ...s.autoRefresh, intervalMs } })),
    setMock: (mock) => setSettings((s) => ({ ...s, mock })),
    setLastFetch: (payload) => setSettings((s) => ({ ...s, lastFetch: payload })),
  }), []);

  return [settings, actions];
}


