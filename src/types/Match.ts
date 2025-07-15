import type { Team } from "./Team";

export interface Match {
  id: number;
  tournamentId: number;
  matchDate: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  status: string;
  yellowCards: number;
  redCards: number;
  goalsForHome: number;
  goalsForAway: number;
}

