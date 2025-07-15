import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { Standing } from "../types";

type Props = {
  standings: Standing[];
};

export default function YellowCardsChart({ standings }: Props) {
  const data = standings.map(s => ({
    name: s.team.name,
    amarillas: s.yellowCards
  }));

  const greenColor = "#22c55e";

  return (
    <div className="p-3">
      <h4 className="font-semibold mb-2">Tarjetas amarillas por equipo</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="amarillas" fill={greenColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
