import type { Tournament } from "../types/Tournament";

interface TournamentSelectorProps {
  tournaments: Tournament[];
  selectedTournament: Tournament | null;
  onChange: (tournament: Tournament | null) => void;
}

export default function TournamentSelector({
  tournaments,
  selectedTournament,
  onChange,
}: TournamentSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="tournament" className="font-semibold">
        Torneo:
      </label>
      <select
        id="tournament"
        value={selectedTournament?.id || ""}
        onChange={(e) => {
          const selected = tournaments.find(
            (t) => t.id === parseInt(e.target.value)
          );
          onChange(selected ?? null);
        }}
        className="border p-2 rounded"
      >
        {tournaments.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
