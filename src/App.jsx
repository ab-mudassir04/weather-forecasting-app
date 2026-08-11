import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherHighlights from "./components/WeatherHighlights";
import HourlyForecast from "./components/HourlyForecast";
import Forecast from "./components/Forecast";
import RecentCities from "./components/RecentCities";
import FavoriteCities from "./components/FavoriteCities";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import { getCurrentWeather, getForecast } from "./services/weatherService";

import {
  getRecentCities,
  saveRecentCity,
  getFavoriteCities,
  toggleFavoriteCity,
} from "./utils/storageUtils";

function App() {
  /* =========================
       WEATHER STATE
    ========================= */

  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState(null);

  const [selectedCity, setSelectedCity] = useState(null);

  /* =========================
       STORAGE STATE
    ========================= */

  const [recentCities, setRecentCities] = useState([]);

  const [favoriteCities, setFavoriteCities] = useState([]);

  /* =========================
       UI STATE
    ========================= */

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [unit, setUnit] = useState("metric");

  const [darkMode, setDarkMode] = useState(true);

  /* =========================
       INITIAL DATA
    ========================= */

  useEffect(() => {
    setRecentCities(getRecentCities());

    setFavoriteCities(getFavoriteCities());

    /*
     * Default city
     */

    const defaultCity = {
      name: "Hyderabad",
      state: "Telangana",
      country: "IN",
      lat: 17.385,
      lon: 78.4867,
    };

    loadCity(defaultCity);
  }, []);

  /* =========================
       LOAD CITY
    ========================= */

  const loadCity = async (city) => {
    if (!city || city.lat === undefined || city.lon === undefined) {
      setError("Invalid location selected.");

      return;
    }

    try {
      setLoading(true);

      setError("");

      setSelectedCity(city);

      /*
       * Current weather
       */

      const current = await getCurrentWeather(city.lat, city.lon, unit);

      /*
       * Forecast
       */

      const forecastData = await getForecast(city.lat, city.lon, unit);

      setWeather(current);

      setForecast(forecastData);

      /*
       * Save recent city
       */

      const updated = saveRecentCity(city);

      setRecentCities(updated);
    } catch (error) {
      console.error("Weather error:", error);

      setWeather(null);

      setForecast(null);

      setError("Unable to load weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
       UNIT CHANGE
    ========================= */

  useEffect(() => {
    /*
     * Don't reload when the
     * application initially starts.
     */

    if (!selectedCity) {
      return;
    }

    const updateWeatherUnit = async () => {
      try {
        setLoading(true);

        setError("");

        const current = await getCurrentWeather(
          selectedCity.lat,
          selectedCity.lon,
          unit,
        );

        const forecastData = await getForecast(
          selectedCity.lat,
          selectedCity.lon,
          unit,
        );

        setWeather(current);

        setForecast(forecastData);
      } catch (error) {
        console.error("Unit change error:", error);

        setError("Unable to update weather units.");
      } finally {
        setLoading(false);
      }
    };

    updateWeatherUnit();
  }, [unit]);

  /* =========================
       CURRENT LOCATION
    ========================= */

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");

      return;
    }

    setLoading(true);

    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const city = {
          name: "Current Location",

          country: "",

          state: "",

          lat: position.coords.latitude,

          lon: position.coords.longitude,
        };

        await loadCity(city);
      },

      (error) => {
        console.error("Geolocation error:", error);

        setLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setError(
            "Location permission was denied. Please allow location access.",
          );
        } else {
          setError("Unable to get your current location.");
        }
      },

      {
        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 300000,
      },
    );
  };

  /* =========================
       FAVORITE
    ========================= */

  const handleFavorite = () => {
    if (!selectedCity) {
      return;
    }

    const updated = toggleFavoriteCity(selectedCity);

    setFavoriteCities(updated);
  };

  /* =========================
       CHECK FAVORITE
    ========================= */

  const isFavorite =
    selectedCity &&
    favoriteCities.some(
      (city) => city.lat === selectedCity.lat && city.lon === selectedCity.lon,
    );

  /* =========================
       CLEAR RECENT
    ========================= */

  const clearRecent = () => {
    localStorage.removeItem("weather_recent_cities");

    setRecentCities([]);
  };

  /* =========================
       RETRY
    ========================= */

  const handleRetry = () => {
    if (selectedCity) {
      loadCity(selectedCity);
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {/* =========================
                NAVBAR
            ========================= */}

      <Navbar
        unit={unit}
        setUnit={setUnit}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* =========================
                MAIN
            ========================= */}

      <main className="main-container">
        {/* =========================
                    HERO
                ========================= */}

        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-label">🌍 WORLDWIDE WEATHER</span>

            <h1>
              Weather for <span>Every City</span>
            </h1>

            <p>
              Search any city around the world and get real-time weather, hourly
              updates and a 5-day forecast.
            </p>
          </div>

          <SearchBar
            onCitySelect={loadCity}
            onCurrentLocation={handleCurrentLocation}
          />
        </section>

        {/* =========================
                    ERROR
                ========================= */}

        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* =========================
                    LOADING
                ========================= */}

        {loading && <Loading />}

        {/* =========================
                    WEATHER CONTENT
                ========================= */}

        {!loading && weather && forecast && (
          <>
            {/* CURRENT WEATHER */}

            <CurrentWeather
              weather={weather}
              isFavorite={isFavorite}
              onFavorite={handleFavorite}
              unit={unit}
            />

            {/* WEATHER HIGHLIGHTS */}

            <WeatherHighlights weather={weather} />

            {/* HOURLY FORECAST */}

            <HourlyForecast forecast={forecast} />

            {/* 5 DAY FORECAST */}

            <Forecast forecast={forecast} />
          </>
        )}

        {/* =========================
                    FAVORITES
                ========================= */}

        {!loading && (
          <FavoriteCities cities={favoriteCities} onSelect={loadCity} />
        )}

        {/* =========================
                    RECENT CITIES
                ========================= */}

        {!loading && (
          <RecentCities
            cities={recentCities}
            onSelect={loadCity}
            onClear={clearRecent}
          />
        )}
      </main>

      {/* =========================
                FOOTER
            ========================= */}

      <footer className="footer">
        <div>
          <strong>🌤️ WeatherNow</strong>

          <p>Smart Weather Forecasting Application</p>
        </div>

        <div>
          <p>© 2026 WeatherNow</p>

          <p>Built with React.js & Weather API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
