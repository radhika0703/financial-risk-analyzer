import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard Loaded ✅</h1>
        <p className="text-gray-400 mt-2">
          Financial Risk Analyzer is working
        </p>
      </div>
    </div>
  );
}