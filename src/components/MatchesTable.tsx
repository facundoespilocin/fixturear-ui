import type { Match } from "../types";
import { useState } from "react";

type Props = {
  matches: Match[];
};

export default function MatchesTable({ matches }: Props) {
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const paginated = matches.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Partidos</h3>
      <table className="table-standard">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Local</th>
            <th className="border px-2 py-1">Visitante</th>
            <th className="border px-2 py-1">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(m => (
            <tr key={m.id}>
              <td className="border px-2 py-1">{m.homeTeam.name}</td>
              <td className="border px-2 py-1">{m.awayTeam.name}</td>
              <td className="border px-2 py-1">{new Date(m.matchDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 flex justify-center gap-2">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} className="btn-secondary">Prev</button>
        <button onClick={() => setPage(p => p + 1)} className="btn-secondary">Next</button>
      </div>
    </div>
  );
}
