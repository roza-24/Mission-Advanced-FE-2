export default function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
