import { useCallback, useEffect, useMemo, useState } from 'react';
import TopBar from './components/TopBar.jsx';
import LineCard from './components/LineCard.jsx';
import AlertsTable from './components/AlertsTable.jsx';
import Controls from './components/Controls.jsx';
import ErrorBanner from './components/ErrorBanner.jsx';
import { useSettings } from './state/useSettings.js';
import { setBaseUrl, setMockMode, getTimeseries, getAlerts } from './api/client.js';

function App() {
  const [settings, actions] = useSettings();
  const [tsData, setTsData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBaseUrl(settings.apiUrl);
  }, [settings.apiUrl]);

  useEffect(() => {
    setMockMode(settings.mock);
  }, [settings.mock]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ts, al] = await Promise.all([
        getTimeseries(settings.memeKey),
        getAlerts(settings.memeKey),
      ]);
      setTsData(ts);
      setAlerts(al);
      actions.setLastFetch({ ok: true, at: Date.now() });
    } catch (e) {
      setError(e?.message || String(e));
      actions.setLastFetch({ ok: false, at: Date.now() });
    } finally {
      setLoading(false);
    }
  }, [settings.memeKey, actions]);

  useEffect(() => { refresh(); }, [settings.apiUrl, settings.memeKey, settings.mock, refresh]);

  useEffect(() => {
    if (!settings.autoRefresh.enabled) return undefined;
    const id = setInterval(() => { refresh(); }, settings.autoRefresh.intervalMs || 30000);
    return () => clearInterval(id);
  }, [settings.autoRefresh.enabled, settings.autoRefresh.intervalMs, refresh]);

  const status = useMemo(() => settings.lastFetch, [settings.lastFetch]);

  return (
    <div className="app">
      <TopBar
        apiUrl={settings.apiUrl}
        onSaveApiUrl={(url) => actions.setApiUrl(url)}
        onRefresh={refresh}
        lastFetch={status}
        loading={loading}
      />

      {error && (
        <ErrorBanner
          error={`${error}. If the backend is down, start FastAPI on http://localhost:8088 or enable Mock mode.`}
          onRetry={refresh}
        />
      )}

      <div className="grid">
        <LineCard data={tsData} loading={loading} />
        <Controls
          memeKey={settings.memeKey}
          onChangeMeme={actions.setMemeKey}
          autoRefresh={settings.autoRefresh}
          onToggleAutoRefresh={actions.setAutoRefreshEnabled}
          onChangeInterval={actions.setAutoRefreshInterval}
          mock={settings.mock}
          onToggleMock={actions.setMock}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <AlertsTable alerts={alerts} />
      </div>
    </div>
  );
}

export default App;
