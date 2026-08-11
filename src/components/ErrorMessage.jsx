function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <div className="error-icon">⚠️</div>

      <h3>Weather unavailable</h3>

      <p>{message}</p>

      {onRetry && <button onClick={onRetry}>Try Again</button>}
    </div>
  );
}

export default ErrorMessage;
