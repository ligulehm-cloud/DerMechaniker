export function Label({ children, className = "" }) {
  return (
    <label className={`block text-sm font-medium ${className}`}>
      {children}
    </label>
  );
}
