export function MetricRow({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex justify-between items-center backdrop-blur-md">
      <span className="text-xs font-mono text-white/50 tracking-wider uppercase">
        {label}
      </span>
      <span className="text-base font-mono font-bold text-white">{value}</span>
    </div>
  );
}
