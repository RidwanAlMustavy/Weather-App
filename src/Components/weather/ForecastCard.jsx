import { getWeatherCondition } from "../../utils/weatherCodes";

export function ForecastCard({
  timeString = "",
  weatherCode = 0,
  maxTemp = 0,
  minTemp = 0,
  isPeakMax = false,
  isPeakMin = false,
}) {
  const dateObj = new Date(timeString);
  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });
  const condition = getWeatherCondition(weatherCode);

  return (
    <div
      className={`bg-white/5 border p-4 rounded-xl text-center flex flex-col justify-between backdrop-blur-md transition-all duration-300 ${
        isPeakMax
          ? "border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)] scale-[1.02]"
          : isPeakMin
            ? "border-cyan-500/40"
            : "border-white/5"
      }`}
    >
      <span className="text-xs font-mono font-bold text-white/40 uppercase">
        {weekday}
      </span>
      <span
        className="text-xs text-white/80 block my-2 truncate"
        title={condition.label}
      >
        {condition.label}
      </span>
      <div className="text-xs font-mono font-semibold flex justify-center gap-2">
        <span className={isPeakMax ? "text-amber-400" : "text-white"}>
          {Math.round(maxTemp)}°
        </span>
        <span className={isPeakMin ? "text-cyan-400" : "text-white/40"}>
          {Math.round(minTemp)}°
        </span>
      </div>
    </div>
  );
}
