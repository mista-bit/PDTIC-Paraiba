export default function StatCard({ titulo, valor, icone, cor = "blue" }) {
  const cores = {
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    green: "bg-green-100 text-green-600 border-green-200",
    purple: "bg-purple-100 text-purple-600 border-purple-200",
    orange: "bg-orange-100 text-orange-600 border-orange-200",
  };

  return (
    <div className={`${cores[cor]} rounded-lg p-6 border-2`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80 mb-1">{titulo}</p>
          <p className="text-3xl font-bold">{valor}</p>
        </div>
        {icone && <div className="text-4xl opacity-50">{icone}</div>}
      </div>
    </div>
  );
}
