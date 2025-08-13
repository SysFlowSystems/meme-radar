import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatTime } from '../utils/format.js';
import Loader from './Loader.jsx';
import EmptyState from './EmptyState.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function LineCard({ data, loading }) {
  return (
    <div className="card">
      <div className="card-header">Mentions per hour</div>
      <div className="card-body">
        {loading ? (
          <Loader />
        ) : !data || data.length === 0 ? (
          <EmptyState message="No meme mentions yet. Try mock mode or ingest data." />
        ) : (
          <Line
            data={{
              labels: data.map((d) => formatTime(d.ts)),
              datasets: [
                {
                  label: 'Mentions',
                  data: data.map((d) => d.count),
                  borderColor: '#2563eb',
                  backgroundColor: 'rgba(37, 99, 235, 0.2)',
                  tension: 0.35,
                  fill: true,
                  pointRadius: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } },
              },
            }}
            height={260}
          />
        )}
      </div>
    </div>
  );
}


