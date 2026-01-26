export default function Button({ children, onClick, variant = "primary" }) {
  const style =
    variant === "primary"
      ? "bg-blue-600 text-white"
      : "bg-gray-200 text-gray-700";

  return (
    <button
      onClick={onClick}
      className={`${style} w-full py-2 rounded-lg font-semibold hover:opacity-90`}
    >
      {children}
    </button>
  );
}
