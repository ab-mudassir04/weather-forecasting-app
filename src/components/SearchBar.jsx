import { useEffect, useRef, useState } from "react";

import { searchCities, searchByPinCode } from "../services/weatherService";

function SearchBar({ onCitySelect, onCurrentLocation }) {
  const [query, setQuery] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [searchError, setSearchError] = useState("");

  const searchRef = useRef(null);

  /* =================================
       SEARCH INPUT HANDLER
    ================================= */

  useEffect(() => {
    const value = query.trim();

    if (value.length < 2) {
      setSuggestions([]);

      setShowSuggestions(false);

      setSearchError("");

      return;
    }

    const timer = setTimeout(
      async () => {
        try {
          setLoading(true);

          setSearchError("");

          /*
           * Detect Indian PIN Code
           *
           * Exactly 6 digits
           */

          const isPinCode = /^\d{6}$/.test(value);

          /* =========================
                       PIN CODE SEARCH
                    ========================= */

          if (isPinCode) {
            const postOffices = await searchByPinCode(value);

            /*
             * Convert India Post
             * response into the same
             * structure used by
             * city suggestions.
             */

            const pinSuggestions = postOffices.slice(0, 5).map((office) => ({
              name: office.Name,

              state: office.State,

              country: "India",

              district: office.District,

              pincode: office.Pincode,

              searchType: "pincode",
            }));

            /*
             * Get coordinates from
             * OpenWeather using
             * district/state.
             */

            const coordinateResults = await Promise.all(
              pinSuggestions.map(async (location) => {
                try {
                  const cities = await searchCities(
                    `${location.district}, ${location.state}, India`,
                  );

                  if (cities && cities.length) {
                    const city = cities[0];

                    return {
                      ...location,

                      name: location.district || location.name,

                      lat: city.lat,

                      lon: city.lon,

                      state: location.state,

                      country: "IN",
                    };
                  }
                } catch (error) {
                  console.error(error);
                }

                return null;
              }),
            );

            const validResults = coordinateResults.filter(Boolean);

            setSuggestions(validResults);

            setShowSuggestions(true);

            if (validResults.length === 0) {
              setSearchError(
                "Location found, but weather coordinates are unavailable.",
              );
            }
          } else {

          /* =========================
                       CITY SEARCH
             ========================= */
            const cities = await searchCities(value);

            const citySuggestions = cities.map((city) => ({
              ...city,

              searchType: "city",
            }));

            setSuggestions(citySuggestions);

            setShowSuggestions(citySuggestions.length > 0);

            if (citySuggestions.length === 0) {
              setSearchError("No matching city found.");
            }
          }
        } catch (error) {
          console.error("Search error:", error);

          setSuggestions([]);

          setShowSuggestions(false);

          /*
           * Different message for
           * PIN code and city search.
           */

          if (/^\d{6}$/.test(value)) {
            setSearchError(
              "Invalid PIN code. Please enter a valid 6-digit Indian PIN code.",
            );
          } else {
            setSearchError("Unable to search this location.");
          }
        } finally {
          setLoading(false);
        }
      },

      /*
       * Debounce
       */

      450,
    );

    return () => clearTimeout(timer);
  }, [query]);

  /* =================================
       CLOSE SUGGESTIONS
    ================================= */

  useEffect(() => {
    const handleClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  /* =================================
       SELECT LOCATION
    ================================= */

  const selectLocation = (location) => {
    setQuery("");

    setSuggestions([]);

    setShowSuggestions(false);

    setSearchError("");

    onCitySelect(location);
  };

  /* =================================
       INPUT CHANGE
    ================================= */

  const handleInputChange = (event) => {
    const value = event.target.value;

    /*
     * Allow city names and
     * numeric PIN codes.
     *
     * Maximum 6 digits if
     * user is typing numbers.
     */

    setQuery(value);
  };

  /* =================================
       SEARCH SUBMIT
    ================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    /*
     * If suggestions exist,
     * select the first result.
     */

    if (suggestions.length > 0) {
      selectLocation(suggestions[0]);
    }
  };

  return (
    <div className="smart-search" ref={searchRef}>
      {/* =========================
                SEARCH FORM
            ========================= */}

      <form className="search-wrapper" onSubmit={handleSubmit}>
        <span className="search-icon">🔍</span>

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder="Search city or PIN code..."
          autoComplete="off"
        />

        {loading && <span className="search-loading">⏳</span>}

        {!loading && query.length > 0 && (
          <button
            type="button"
            className="clear-search"
            onClick={() => {
              setQuery("");

              setSuggestions([]);

              setSearchError("");

              setShowSuggestions(false);
            }}
          >
            ✕
          </button>
        )}

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* =========================
                SEARCH TYPE
            ========================= */}

      {query.trim().length > 0 && (
        <div className="search-type">
          {/^\d{6}$/.test(query.trim()) ? (
            <>📮 Indian PIN Code</>
          ) : (
            <>🌍 City / Location</>
          )}
        </div>
      )}

      {/* =========================
                SUGGESTIONS
            ========================= */}

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions">
          <div className="suggestion-title">
            {/^\d{6}$/.test(query.trim())
              ? "📮 PIN Code Locations"
              : "🌍 City Suggestions"}
          </div>

          {suggestions.map((location, index) => (
            <button
              key={`${location.lat}-${location.lon}-${index}`}
              className="suggestion"
              onClick={() => selectLocation(location)}
            >
              <span className="suggestion-icon">
                {location.searchType === "pincode" ? "📮" : "📍"}
              </span>

              <div className="suggestion-content">
                <strong>{location.name}</strong>

                <small>
                  {location.state ? `${location.state}, ` : ""}

                  {location.country === "IN" ? "India" : location.country}
                </small>

                {location.searchType === "pincode" && (
                  <span className="pincode-info">
                    PIN Code: {location.pincode}
                    {location.district && ` • ${location.district}`}
                  </span>
                )}
              </div>

              <span className="arrow">→</span>
            </button>
          ))}
        </div>
      )}

      {/* =========================
                ERROR
            ========================= */}

      {searchError && !loading && (
        <div className="search-error">⚠️ {searchError}</div>
      )}

      {/* =========================
                CURRENT LOCATION
            ========================= */}

      <button className="location-button" onClick={onCurrentLocation}>
        📍 Use My Current Location
      </button>

      {/* =========================
                SEARCH HELP
            ========================= */}

      <div className="search-help">
        <span>💡 Try:</span>

        <button onClick={() => setQuery("Hyderabad")}>Hyderabad</button>

        <button onClick={() => setQuery("500001")}>500001</button>

        <button onClick={() => setQuery("Mumbai")}>Mumbai</button>
      </div>
    </div>
  );
}

export default SearchBar;
