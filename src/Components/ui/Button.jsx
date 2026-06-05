export function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs tracking-wider uppercase transition-all duration-200 px-4 py-2 rounded-lg w-full sm:w-auto cursor-pointer"
    >
      {children}
    </button>
  );
}
