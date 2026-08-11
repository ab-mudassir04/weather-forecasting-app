function RecentCities({ cities, onSelect, onClear }) {
  if (!cities.length) {
    return null;
  }

  return (
    <section className="section">
      <div className="section-heading">
        <h2>Recent Searches</h2>

        <button className="clear-button" onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="city-list">
        {cities.map((city, index) => (
          <button
            className="city-chip"
            key={`${city.lat}-${city.lon}-${index}`}
            onClick={() => onSelect(city)}
          >
            🕘
            <span>{city.name}</span>
            <small>{city.country}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

export default RecentCities;
