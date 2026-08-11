function CurrentWeather({ weather, isFavorite, onFavorite, unit }) {
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const temperatureUnit = unit === "metric" ? "C" : "F";

  return (
    <section className="current-card">
      {/* =========================
                TOP
            ========================= */}

      <div className="current-top">
        <div className="location-info">
          <span className="location-pin">📍</span>

          <div>
            <h2>{weather.name}</h2>

            <p>{weather.sys.country}</p>
          </div>

          <button
            className={`favorite-button ${isFavorite ? "favorite-active" : ""}`}
            onClick={onFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>

        <div className="updated">Updated just now</div>
      </div>

      {/* =========================
                WEATHER CONTENT
            ========================= */}

      <div className="current-content">
        {/* WEATHER ICON */}

        <div className="weather-visual">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
          />
        </div>

        {/* TEMPERATURE */}

        <div className="temperature">
          <div className="temperature-value">
            <h1>{Math.round(weather.main.temp)}</h1>

            <span className="degree-symbol">°</span>

            <span className="degree-label">{temperatureUnit}</span>
          </div>

          <h3>{weather.weather[0].description}</h3>

          <p>
            Feels like {Math.round(weather.main.feels_like)}°{temperatureUnit}
          </p>
        </div>

        {/* SUNRISE / SUNSET */}

        <div className="sun-times">
          <div>
            <span>🌅</span>

            <div>
              <small>Sunrise</small>

              <strong>{sunrise}</strong>
            </div>
          </div>

          <div>
            <span>🌇</span>

            <div>
              <small>Sunset</small>

              <strong>{sunset}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;
