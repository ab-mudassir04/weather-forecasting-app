function WeatherHighlights({ weather }) {
  const visibility = (weather.visibility / 1000).toFixed(1);

  const windDirection = weather.wind.deg ?? 0;

  const getDirection = (degree) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    return directions[Math.round(degree / 45) % 8];
  };

  return (
    <section className="section">
      <div className="section-heading">
        <h2>Today's Highlights</h2>

        <span>Live weather data</span>
      </div>

      <div className="highlights-grid">
        <div className="highlight-card">
          <span className="highlight-icon">💧</span>

          <p>Humidity</p>

          <h3>{weather.main.humidity}%</h3>
        </div>

        <div className="highlight-card">
          <span className="highlight-icon">💨</span>

          <p>Wind</p>

          <h3>
            {weather.wind.speed}
            <small> m/s</small>
          </h3>

          <span className="sub-value">{getDirection(windDirection)}</span>
        </div>

        <div className="highlight-card">
          <span className="highlight-icon">👁️</span>

          <p>Visibility</p>

          <h3>
            {visibility}
            <small> km</small>
          </h3>
        </div>

        <div className="highlight-card">
          <span className="highlight-icon">🎚️</span>

          <p>Pressure</p>

          <h3>
            {weather.main.pressure}
            <small> hPa</small>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default WeatherHighlights;
