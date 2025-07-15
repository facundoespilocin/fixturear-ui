import { useDashboardData } from "../hooks/useDashboard";
import StandingsTable from "../components/StandingsTable";
import MatchesTable from "../components/MatchesTable";
import GoalsChart from "../components/GoalsChart";
import YellowCardsChart from "../components/YellowCardsChart";
import Carousel from "../components/Carousel";

export default function Dashboard() {
  const { data, loading } = useDashboardData();

  if (loading) return <div>Cargando dashboard...</div>;
  if (!data) return <div>Error al cargar dashboard</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">{data.tournament.name}</h2>

      <StandingsTable standings={data.standings} />

      <Carousel
        slides={[
          <GoalsChart key="goals" standings={data.standings} />,
          <YellowCardsChart key="yellow" standings={data.standings} />,
        ]}
      />

      <MatchesTable matches={data.upcomingMatches} />
    </div>
  );
}
