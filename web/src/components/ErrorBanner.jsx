export default function ErrorBanner({ error, onRetry }) {
  if (!error) return null;
  return (
    <div className="error-banner">
      <div>
        {String(error)}
        {' '}
        <button className="btn" onClick={onRetry}>Retry</button>
      </div>
    </div>
  );
}


