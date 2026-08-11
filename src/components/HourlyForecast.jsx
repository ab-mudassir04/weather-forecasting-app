function HourlyForecast({ forecast }) {
  const hours = forecast.list.slice(0, 8);

  return (
    <section className="section">
      <div className="section-heading">
        <h2>Hourly Forecast</h2>

        <span>Next 24 hours</span>
      </div>

      <div className="hourly-container">
        {hours.map((item) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "numeric",
          });

          return (
            <div className="hour-card" key={item.dt}>
              <span className="hour-time">{time}</span>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt=""
              />

              <strong>{Math.round(item.main.temp)}°</strong>

              <small>{item.weather[0].main}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;
