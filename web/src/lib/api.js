// Centralized API base helper
const base = import.meta.env.VITE_API_BASE || '/api';

export async function fetchJSON(path) {
  const res = await fetch(`${base}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export { base as API_BASE };


