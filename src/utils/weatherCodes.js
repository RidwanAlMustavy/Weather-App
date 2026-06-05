export const PRESET_CITIES = {
  Dhaka: { lat: 23.8103, lon: 90.4125 },
  Chattogram: { lat: 22.3569, lon: 91.7832 },
  Sylhet: { lat: 24.8949, lon: 91.8687 },
  Khulna: { lat: 22.8456, lon: 89.5403 },
  Rajshahi: { lat: 24.3745, lon: 88.6042 },
  Barishal: { lat: 22.701, lon: 90.3535 },
  Rangpur: { lat: 25.7538, lon: 89.2467 },
  Mymensingh: { lat: 24.7471, lon: 90.4203 },
};

export function getWeatherCondition(code) {
  if (code === 0) return { label: "Clear / Sunny Skies", style: "clear" };
  if ([1, 2, 3].includes(code))
    return { label: "Scattered Clouds", style: "cloudy" };
  if ([45, 48].includes(code))
    return { label: "Dense River Fog", style: "foggy" };
  if ([51, 53, 55].includes(code))
    return { label: "Light Drizzle / Showers", style: "rainy" };
  if ([61, 63, 65, 80, 81, 82].includes(code))
    return { label: "Monsoonal Downpour / Heavy Rain", style: "rainy" };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { label: "Hail Elements / Ice", style: "snowy" };
  if ([95, 96, 99].includes(code))
    return { label: "Tropical Thunderstorm / Kalbaishakhi", style: "stormy" };
  return { label: "Atmospheric Phenomenon", style: "clear" };
}

export function getMeteorologicalWarning(temp, code) {
  if (temp >= 38) {
    return {
      text: "CRITICAL ALERT: Extreme Heatwave Condition. Avoid outdoor exposure.",
      level: "severe",
    };
  }
  if (temp >= 35) {
    return {
      text: "WARNING: High Heat Index. Keep hydrated.",
      level: "warning",
    };
  }
  if ([95, 96, 99].includes(code)) {
    return {
      text: "ALERT: Active Thunderstorm System (Kalbaishakhi activity). Stay indoors.",
      level: "severe",
    };
  }
  if ([63, 65, 82].includes(code)) {
    return {
      text: "NOTICE: Persistent heavy rain. High risk of localized waterlogging.",
      level: "warning",
    };
  }
  return null;
}

// Extrapolates relative moisture level thresholds into explicit human discomfort strings
export function calculateDiscomfortIndex(humidity) {
  if (humidity >= 85)
    return { text: "Extreme Distress", style: "text-red-400" };
  if (humidity >= 75)
    return { text: "High Discomfort", style: "text-amber-400" };
  if (humidity >= 60)
    return { text: "Noticeable Humid Discomfort", style: "text-yellow-300" };
  return { text: "Comfortable Environment", style: "text-emerald-400" };
}

export const THEME_MATRIX = {
  clear:
    "from-slate-950 via-teal-950 to-emerald-950 border-emerald-500/20 text-emerald-400",
  cloudy:
    "from-slate-950 via-cyan-950 to-indigo-950 border-cyan-500/20 text-cyan-400",
  rainy:
    "from-slate-950 via-blue-950 to-slate-900 border-blue-500/20 text-blue-400",
  snowy:
    "from-slate-950 via-indigo-950 to-neutral-950 border-pink-400/20 text-pink-300",
  stormy:
    "from-slate-950 via-purple-950 to-amber-950 border-amber-500/30 text-amber-400",
  foggy:
    "from-slate-950 via-stone-900 to-slate-900 border-stone-500/20 text-stone-400",
};
