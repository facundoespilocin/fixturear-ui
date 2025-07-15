import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Standing } from "../types";

type Props = {
  standings: Standing[];
};

export default function GoalsChart({ standings }: Props) {
  const data = standings.map(s => ({
    name: s.team.name,
    goles: s.goalsFor
  }));

  return (
    <div className="p-3">
      <h4 className="font-semibold mb-2">Goles a favor por equipo</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="goles" stroke="#34d399" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
