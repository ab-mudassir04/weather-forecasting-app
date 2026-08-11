function Forecast({ forecast }) {
  const daily = forecast.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);

  return (
    <section className="section">
      <div className="section-heading">
        <h2>5-Day Forecast</h2>

        <span>Daily outlook</span>
      </div>

      <div className="forecast-grid">
        {daily.map((item) => {
          const date = new Date(item.dt * 1000);

          const day = date.toLocaleDateString("en-US", {
            weekday: "short",
          });

          const dateText = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          });

          return (
            <div className="forecast-card" key={item.dt}>
              <div>
                <h3>{day}</h3>

                <span>{dateText}</span>
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt=""
              />

              <strong>{Math.round(item.main.temp)}°</strong>

              <p>{item.weather[0].description}</p>

              <div className="forecast-info">
                <span>💧 {item.main.humidity}%</span>

                <span>💨 {item.wind.speed}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;
