export default function RiskCard({ title, value, color }) {
  return (
    <div className="bg-slate-800/60 p-5 rounded-xl shadow-md border border-slate-700">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );
}