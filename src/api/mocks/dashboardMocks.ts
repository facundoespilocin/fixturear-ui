import type { Match, Player, Standing, TopPlayer, Team, Tournament } from "../../types";

const teams: Team[] = [
  { id: 1, name: "Atlético Sur", logoUrl: "" },
  { id: 2, name: "Deportivo Norte", logoUrl: "" },
  { id: 3, name: "Ferro Oeste", logoUrl: "" },
  { id: 4, name: "Central Este", logoUrl: "" },
];

const extraTeams: Team[] = [
  { id: 5, name: "Río Verde", logoUrl: "" },
  { id: 6, name: "San Martín", logoUrl: "" },
];

export const dashboardMocks = {
  getDashboard: async () => {
    const tournament: Tournament = {
      id: 1,
      name: "Torneo Clausura 2025",
      active: true,
      startDate: "2025-03-01",
      endDate: "2025-11-30",
      teams
    };

    const standings: Standing[] = [
      {
        team: teams[0] as Team,
        points: 24,
        played: 12,
        won: 7,
        drawn: 3,
        lost: 2,
        goalsFor: 21,
        goalsAgainst: 14,
        yellowCards: 18,
        redCards: 2,
      },
      {
        team: teams[1] as Team,
        points: 22,
        played: 12,
        won: 6,
        drawn: 4,
        lost: 2,
        goalsFor: 19,
        goalsAgainst: 12,
        yellowCards: 15,
        redCards: 1,
      },
      {
        team: teams[2] as Team,
        points: 20,
        played: 12,
        won: 6,
        drawn: 2,
        lost: 4,
        goalsFor: 17,
        goalsAgainst: 16,
        yellowCards: 20,
        redCards: 3,
      },
      {
        team: teams[3] as Team,
        points: 15,
        played: 12,
        won: 4,
        drawn: 3,
        lost: 5,
        goalsFor: 14,
        goalsAgainst: 18,
        yellowCards: 25,
        redCards: 4,
      },
    ];

    const topScorer: TopPlayer = {
      player: {
        id: 1,
        name: "Juan Pérez",
        teamId: 1,
        position: "Delantero",
      },
      value: 12,
    };

    const topYellow: TopPlayer = {
      player: {
        id: 5,
        name: "Carlos Gómez",
        teamId: 4,
        position: "Defensa",
      },
      value: 8,
    };

    const upcomingMatches: Match[] = [
      {
        id: 1,
        tournamentId: 1,
        homeTeam: teams[0] as Team,
        awayTeam: teams[1] as Team,
        matchDate: "2025-07-15T19:00:00Z",
        venue: "Estadio Sur",
        status: "scheduled",
        yellowCards: 0,
        redCards: 0,
        goalsForHome: 0,
        goalsForAway: 0,
      },
      {
        id: 2,
        tournamentId: 1,
        homeTeam: teams[2] as Team,
        awayTeam: teams[3] as Team,
        matchDate: "2025-07-16T21:00:00Z",
        venue: "Estadio Oeste",
        status: "scheduled",
        yellowCards: 0,
        redCards: 0,
        goalsForHome: 0,
        goalsForAway: 0,
      },
    ];

    return {
      tournament,
      standings,
      topScorer,
      topYellow,
      upcomingMatches,
    };
  },

  getTournaments: async () => [
    {
      id: 1,
      name: "Clausura 2025",
      startDate: "2025-03-01",
      endDate: "2025-11-30",
      active: true,
      teams,
    },
    {
      id: 2,
      name: "Apertura 2026",
      startDate: "2026-03-01",
      endDate: "2026-11-30",
      active: false,
      teams: [],
    },
    {
      id: 3,
      name: "Invierno 2027",
      startDate: "2027-06-01",
      endDate: "2027-12-30",
      active: true,
      teams: [...teams, ...extraTeams],
    },
  ],

  getMatchesByTournament: async (tournamentId: number) => {
    if (tournamentId === 1) {
      const matchesByTournament: Match[] = [
        {
          id: 1,
          tournamentId: tournamentId,
          matchDate: "2025-07-20T19:00:00Z",
          homeTeam: teams[0] as Team,
          awayTeam: teams[1] as Team,
          venue: "Estadio Sur",
          status: "scheduled",
          yellowCards: 3,
          redCards: 1,
          goalsForHome: 2,
          goalsForAway: 1,
        },
        {
          id: 2,
          tournamentId: tournamentId,
          matchDate: "2025-07-21T21:00:00Z",
          homeTeam: teams[2] as Team,
          awayTeam: teams[3] as Team,
          venue: "Estadio Oeste",
          status: "scheduled",
          yellowCards: 2,
          redCards: 0,
          goalsForHome: 0,
          goalsForAway: 0,
        },
      ];
      return matchesByTournament;
    }
    return [];
  },
};
