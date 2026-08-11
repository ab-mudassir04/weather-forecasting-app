const RECENT_KEY = "weather_recent_cities";
const FAVORITE_KEY = "weather_favorite_cities";


export const getRecentCities = () => {

    try {

        return JSON.parse(
            localStorage.getItem(RECENT_KEY)
        ) || [];

    } catch {

        return [];

    }
};


export const saveRecentCity = (city) => {

    const existing = getRecentCities();

    const filtered = existing.filter(
        item =>
            !(
                item.lat === city.lat &&
                item.lon === city.lon
            )
    );

    const updated = [
        city,
        ...filtered
    ].slice(0, 5);

    localStorage.setItem(
        RECENT_KEY,
        JSON.stringify(updated)
    );

    return updated;
};


export const getFavoriteCities = () => {

    try {

        return JSON.parse(
            localStorage.getItem(FAVORITE_KEY)
        ) || [];

    } catch {

        return [];

    }
};


export const toggleFavoriteCity = (city) => {

    const favorites = getFavoriteCities();

    const exists = favorites.some(
        item =>
            item.lat === city.lat &&
            item.lon === city.lon
    );

    let updated;

    if (exists) {

        updated = favorites.filter(
            item =>
                !(
                    item.lat === city.lat &&
                    item.lon === city.lon
                )
        );

    } else {

        updated = [
            city,
            ...favorites
        ];

    }

    localStorage.setItem(
        FAVORITE_KEY,
        JSON.stringify(updated)
    );

    return updated;
};