function FavoriteCities({ cities, onSelect }) {
  if (!cities.length) {
    return null;
  }

  return (
    <section className="section">
      <div className="section-heading">
        <h2>Favorite Cities</h2>

        <span>Your saved locations</span>
      </div>

      <div className="favorite-grid">
        {cities.map((city, index) => (
          <button
            className="favorite-city"
            key={`${city.lat}-${city.lon}-${index}`}
            onClick={() => onSelect(city)}
          >
            <span>⭐</span>

            <div>
              <strong>{city.name}</strong>

              <small>
                {city.state ? `${city.state}, ` : ""}
                {city.country}
              </small>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FavoriteCities;
