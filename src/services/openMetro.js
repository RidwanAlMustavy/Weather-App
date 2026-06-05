export async function fetchWeatherData(lat, lon) {
  if (!lat || !lon) return null;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Telemetry connection failed.");
  return response.json();
}
