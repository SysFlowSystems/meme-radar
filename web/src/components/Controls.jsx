export default function Controls({
  memeKey,
  onChangeMeme,
  autoRefresh,
  onToggleAutoRefresh,
  onChangeInterval,
  mock,
  onToggleMock,
}) {
  return (
    <div className="card">
      <div className="card-header">Controls</div>
      <div className="card-body controls-grid">
        <div className="control-item">
          <label>Meme key</label>
          <input value={memeKey} onChange={(e) => onChangeMeme(e.target.value)} />
        </div>

        <div className="control-item">
          <label>
            <input
              type="checkbox"
              checked={autoRefresh.enabled}
              onChange={(e) => onToggleAutoRefresh(e.target.checked)}
            />
            Auto refresh
          </label>
          <select
            value={autoRefresh.intervalMs}
            onChange={(e) => onChangeInterval(Number(e.target.value))}
            disabled={!autoRefresh.enabled}
          >
            <option value={15000}>15s</option>
            <option value={30000}>30s</option>
            <option value={60000}>60s</option>
          </select>
        </div>

        <div className="control-item">
          <label>
            <input type="checkbox" checked={mock} onChange={(e) => onToggleMock(e.target.checked)} />
            Mock mode
          </label>
        </div>
      </div>
    </div>
  );
}


