import { useEffect, useState } from 'react';
import { isRecent } from '../utils/format.js';

export default function TopBar({ apiUrl, onSaveApiUrl, onRefresh, lastFetch, loading }) {
  const [value, setValue] = useState(apiUrl || '');
  useEffect(() => setValue(apiUrl || ''), [apiUrl]);

  const save = () => {
    const v = (value || '').trim();
    if (v && v !== apiUrl) onSaveApiUrl(v);
  };

  let statusClass = 'orange';
  if (lastFetch && lastFetch.at) {
    if (lastFetch.ok && isRecent(lastFetch.at, 60_000)) statusClass = 'green';
    else if (!lastFetch.ok) statusClass = 'red';
    else statusClass = 'orange';
  }

  return (
    <div className="topbar">
      <div className="title">Meme Radar 👀</div>
      <div className="controls">
        <div className={`status-dot ${statusClass}`} title="Connection status" />
        <input
          className="api-input"
          placeholder="API URL"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
        />
        <button className="btn" onClick={save}>Save</button>
        <button className="btn primary" onClick={onRefresh} disabled={!!loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>
    </div>
  );
}


