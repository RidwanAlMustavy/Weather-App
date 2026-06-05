export function Input({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 w-full"
      {...props}
    />
  );
}
