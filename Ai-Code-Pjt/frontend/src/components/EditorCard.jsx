export default function EditorCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full">
      <h2 className="text-lg font-semibold mb-2 text-blue-700">{title}</h2>
      {children}
    </div>
  );
}
