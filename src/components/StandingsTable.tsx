import type { Standing } from "../types";

type Props = {
  standings: Standing[];
};

export default function StandingsTable({ standings }: Props) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Tabla de posiciones</h3>
      <table className="table-standard">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Equipo</th>
            <th className="border px-2 py-1">Pts</th>
            <th className="border px-2 py-1">PJ</th>
            <th className="border px-2 py-1">PG</th>
            <th className="border px-2 py-1">PE</th>
            <th className="border px-2 py-1">PP</th>
            <th className="border px-2 py-1">GF</th>
            <th className="border px-2 py-1">GC</th>
            <th className="border px-2 py-1">Amarillas</th>
            <th className="border px-2 py-1">Rojas</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s) => (
            <tr key={s.team.id}>
              <td className="border px-2 py-1">{s.team.name}</td>
              <td className="border px-2 py-1">{s.points}</td>
              <td className="border px-2 py-1">{s.played}</td>
              <td className="border px-2 py-1">{s.won}</td>
              <td className="border px-2 py-1">{s.drawn}</td>
              <td className="border px-2 py-1">{s.lost}</td>
              <td className="border px-2 py-1">{s.goalsFor}</td>
              <td className="border px-2 py-1">{s.goalsAgainst}</td>
              <td className="border px-2 py-1">{s.yellowCards}</td>
              <td className="border px-2 py-1">{s.redCards}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
