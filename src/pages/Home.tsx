import { useAuth } from "../hooks/useAuth";
import { useDashboardData } from "../hooks/useDashboard";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const { user } = useAuth();
  const { data, loading } = useDashboardData();

  if (user) return <Dashboard />;

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-6">Bienvenido a FixtureAR</h2>
      {loading && <p>Cargando tabla de posiciones...</p>}
      {data && (
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">{data.tournament.name}</h3>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Equipo</th>
                <th className="border px-2 py-1">Pts</th>
              </tr>
            </thead>
            <tbody>
              {data.standings.map((s) => (
                <tr key={s.team.id}>
                  <td className="border px-2 py-1">{s.team.name}</td>
                  <td className="border px-2 py-1">{s.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6">
            <a href="/register" className="btn-primary">Registrate</a> o <a href="/login" className="btn-secondary">Inicia sesión</a> para ver estadísticas completas.
          </p>
        </div>
      )}
    </div>
  );
}
