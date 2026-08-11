function WeatherDetails({ weather }) {
  return (
    <section className="details-section">
      <h2 className="section-title">Weather Details</h2>

      <div className="details-grid">
        <div className="detail-card">
          <div className="detail-icon">💧</div>

          <div>
            <span>Humidity</span>

            <strong>{weather.main.humidity}%</strong>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💨</div>

          <div>
            <span>Wind Speed</span>

            <strong>{weather.wind.speed} m/s</strong>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌡️</div>

          <div>
            <span>Pressure</span>

            <strong>{weather.main.pressure} hPa</strong>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">👁️</div>

          <div>
            <span>Visibility</span>

            <strong>{(weather.visibility / 1000).toFixed(1)} km</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeatherDetails;
