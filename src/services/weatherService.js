const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY;
    
const WEATHER_BASE_URL =
    "https://api.openweathermap.org/data/2.5";

const GEO_BASE_URL =
    "https://api.openweathermap.org/geo/1.0";



/* =========================================
   CITY SEARCH
========================================= */

export const searchCities = async (query) => {

    if (!query || query.trim().length < 2) {
        return [];
    }

    const response = await fetch(
        `${GEO_BASE_URL}/direct?q=${encodeURIComponent(
            query.trim()
        )}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to search cities"
        );
    }

    return await response.json();
};



/* =========================================
   PIN CODE SEARCH
========================================= */

export const searchByPinCode = async (pinCode) => {

    const response = await fetch(
        `https://api.postalpincode.in/pincode/${pinCode}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to search PIN code"
        );
    }

    const data = await response.json();

    if (
        !data[0] ||
        data[0].Status !== "Success" ||
        !data[0].PostOffice ||
        data[0].PostOffice.length === 0
    ) {
        throw new Error(
            "Invalid PIN code"
        );
    }

    return data[0].PostOffice;
};



/* =========================================
   CURRENT WEATHER
========================================= */

export const getCurrentWeather = async (
    lat,
    lon,
    units = "metric"
) => {

    const response = await fetch(
        `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to fetch current weather"
        );
    }

    return await response.json();
};



/* =========================================
   5-DAY / 3-HOUR FORECAST
========================================= */

export const getForecast = async (
    lat,
    lon,
    units = "metric"
) => {

    const response = await fetch(
        `${WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to fetch forecast"
        );
    }

    return await response.json();
};



/* =========================================
   AIR QUALITY
========================================= */

export const getAirQuality = async (
    lat,
    lon
) => {

    const response = await fetch(
        `${WEATHER_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to fetch air quality"
        );
    }

    return await response.json();
};