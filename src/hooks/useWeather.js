import { useState, useEffect } from "react";
import { fetchWeatherData } from "../services/openMetro";
import { PRESET_CITIES } from "../utils/weatherCodes";

export function useWeather(selectedCity, customLat, customLon) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const coords = PRESET_CITIES[selectedCity] || {
      lat: parseFloat(customLat),
      lon: parseFloat(customLon),
    };

    if (!coords.lat || !coords.lon) {
      setLoading(false);
      return;
    }

    fetchWeatherData(coords.lat, coords.lon)
      .then((weatherJson) => {
        if (isMounted) {
          setData(weatherJson);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCity, customLat, customLon]);

  return { data, loading, error };
}
