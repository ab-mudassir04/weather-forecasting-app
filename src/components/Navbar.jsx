function Navbar({ unit, setUnit, darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-icon">☁️</span>

        <div>
          <h1>WeatherNow</h1>

          <span>Smart Weather Forecast</span>
        </div>
      </div>

      <div className="nav-actions">
        <div className="unit-switch">
          <button
            className={unit === "metric" ? "active" : ""}
            onClick={() => setUnit("metric")}
          >
            °C
          </button>

          <button
            className={unit === "imperial" ? "active" : ""}
            onClick={() => setUnit("imperial")}
          >
            °F
          </button>
        </div>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
