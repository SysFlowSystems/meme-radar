import EmptyState from './EmptyState.jsx';
import { formatTime } from '../utils/format.js';

export default function AlertsTable({ alerts }) {
  const rows = (alerts || []).slice().sort((a, b) => (a.ts < b.ts ? 1 : -1));
  return (
    <div className="card">
      <div className="card-header">Spike alerts</div>
      <div className="card-body">
        {rows.length === 0 ? (
          <EmptyState message="No alerts yet." />
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Meme</th>
                  <th>Timestamp</th>
                  <th style={{ textAlign: 'right' }}>Count</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={`${r.meme}-${r.ts}-${idx}`}>
                    <td>{r.meme}</td>
                    <td>{formatTime(r.ts)}</td>
                    <td style={{ textAlign: 'right' }}>{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


