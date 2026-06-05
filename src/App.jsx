import { useState } from "react";
import { useWeather } from "./hooks/useWeather.js";
import {
  PRESET_CITIES,
  getWeatherCondition,
  THEME_MATRIX,
  getMeteorologicalWarning,
  calculateDiscomfortIndex,
} from "./utils/weatherCodes.js";
import { Input } from "./components/ui/Input.jsx";
import { Button } from "./components/ui/Button.jsx";
import { MetricRow } from "./components/weather/MetricRow.jsx";
import { ForecastCard } from "./components/weather/ForecastCard.jsx";

export default function App() {
  const [selectedCity, setSelectedCity] = useState("Dhaka");
  const [searchQuery, setSearchQuery] = useState("");
  const [customLat, setCustomLat] = useState("");
  const [customLon, setCustomLon] = useState("");
  const [submittedCoords, setSubmittedCoords] = useState({ lat: "", lon: "" });

  const {
    data: weatherData,
    loading,
    error,
  } = useWeather(selectedCity, submittedCoords.lat, submittedCoords.lon);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (customLat && customLon) {
      setSelectedCity("");
      setSubmittedCoords({ lat: customLat, lon: customLon });
    }
  };

  const filteredCities = Object.keys(PRESET_CITIES).filter((cityName) =>
    cityName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const currentStyleKey = weatherData
    ? getWeatherCondition(weatherData.current.weather_code).style
    : "clear";
  const dynamicBgClass = THEME_MATRIX[currentStyleKey] || THEME_MATRIX.clear;

  const activeWarning = weatherData
    ? getMeteorologicalWarning(
        weatherData.current.temperature_2m,
        weatherData.current.weather_code,
      )
    : null;

  // Extrapolate extreme parameters out of array states for peak tracking features
  const peakMaxTemp = weatherData
    ? Math.max(...weatherData.daily.temperature_2m_max)
    : null;
  const peakMinTemp = weatherData
    ? Math.min(...weatherData.daily.temperature_2m_min)
    : null;
  const moistureMetric = weatherData
    ? calculateDiscomfortIndex(weatherData.current.relative_humidity_2m)
    : null;

  return (
    <div
      className={`min-h-screen bg-linear-to-tr ${dynamicBgClass} transition-all duration-1000 p-6 flex flex-col items-center justify-center`}
    >
      <div className="w-full max-w-4xl bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl">
        {/* Navigation Headboard */}
        <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Weather Report
              <span className="text-opacity-80 font-light text-slate-400"></span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Developed by Ridwan</p>
          </div>

          <div className="w-full md:w-64">
            <Input
              placeholder="🔍 Search Division..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Division Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 max-h-24 overflow-y-auto p-1 bg-white/5 rounded-xl border border-white/5">
          {filteredCities.length > 0 ? (
            filteredCities.map((cityName) => (
              <button
                key={cityName}
                onClick={() => {
                  setSelectedCity(cityName);
                  setSubmittedCoords({ lat: "", lon: "" });
                }}
                className={`px-3 py-1.5 text-xs uppercase font-mono tracking-wider rounded-lg border transition-all duration-300 cursor-pointer ${
                  selectedCity === cityName
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/60 border-white/10 hover:border-white/40"
                }`}
              >
                {cityName}
              </button>
            ))
          ) : (
            <span className="text-xs text-white/40 p-2 font-mono">
              No regional division matches filter.
            </span>
          )}
        </div>

        {/* Warnings Banner */}
        {activeWarning && (
          <div
            className={`mb-6 p-4 rounded-xl border text-xs font-mono tracking-wide animate-pulse ${
              activeWarning.level === "severe"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}
          >
            {activeWarning.text}
          </div>
        )}

        {/* Coordination Form */}
        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 bg-white/5 p-4 rounded-xl border border-white/5"
        >
          <Input
            type="number"
            step="any"
            placeholder="Latitude"
            value={customLat}
            onChange={(e) => setCustomLat(e.target.value)}
            required
          />
          <Input
            type="number"
            step="any"
            placeholder="Longitude"
            value={customLon}
            onChange={(e) => setCustomLon(e.target.value)}
            required
          />
          <Button type="submit">Link Coordinates</Button>
        </form>

        <hr className="border-white/10 mb-8" />

        {/* Operational States */}
        {loading && (
          <div className="py-20 text-center font-mono text-sm tracking-widest text-white/40 animate-pulse">
            CONNECTING REGIONAL WEATHER MATRICES...
          </div>
        )}
        {error && (
          <div className="py-20 text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-4 font-mono text-sm">
            CRITICAL SETUP ERROR: {error}
          </div>
        )}

        {!loading && !error && weatherData && (
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col justify-between bg-linear-to-b from-white/5 to-transparent p-6 rounded-2xl border border-white/5">
              <div>
                <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                  Realtime Regional Telemetry
                </span>
                <h2 className="text-5xl font-light text-white mt-2">
                  {selectedCity ||
                    `Grid Lock [${weatherData.latitude.toFixed(2)}°N, ${weatherData.longitude.toFixed(2)}°E]`}
                </h2>
                <h3 className="text-xl font-medium mt-1 font-mono tracking-wide text-white">
                  {getWeatherCondition(weatherData.current.weather_code).label}
                </h3>
              </div>
              <div className="mt-12 flex items-baseline gap-2">
                <span className="text-8xl font-black tracking-tighter text-white">
                  {Math.round(weatherData.current.temperature_2m)}
                </span>
                <span className="text-3xl font-light text-white/60">°C</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 justify-between">
              <MetricRow
                label="Heat Index"
                value={`${Math.round(weatherData.current.apparent_temperature)}°C`}
              />
              <MetricRow
                label="Relative Humidity"
                value={`${weatherData.current.relative_humidity_2m}%`}
              />
              <MetricRow
                label="Wind Velocity"
                value={`${weatherData.current.wind_speed_10m} km/h`}
              />
              {/* Feature 1 UI Output: Realtime Humid Atmosphere Evaluation */}
              <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex justify-between items-center backdrop-blur-md">
                <span className="text-xs font-mono text-white/50 uppercase">
                  Atmosphere Risk
                </span>
                <span
                  className={`text-sm font-mono font-bold ${moistureMetric.style}`}
                >
                  {moistureMetric.text}
                </span>
              </div>
            </div>

            {/* Forecast Panel with Peak Highlighting Feature */}
            <section className="lg:col-span-3 mt-4">
              <h4 className="text-xs font-mono tracking-widest text-white/40 uppercase mb-4">
                7-Day Regional Outlook (Highlights: Amber=Peak Max, Blue=Peak
                Min)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {weatherData.daily.time.map((timeString, index) => {
                  const dayMax = weatherData.daily.temperature_2m_max[index];
                  const dayMin = weatherData.daily.temperature_2m_min[index];
                  return (
                    <ForecastCard
                      key={timeString}
                      timeString={timeString}
                      weatherCode={weatherData.daily.weather_code[index]}
                      maxTemp={dayMax}
                      minTemp={dayMin}
                      isPeakMax={dayMax === peakMaxTemp}
                      isPeakMin={dayMin === peakMinTemp}
                    />
                  );
                })}
              </div>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}
