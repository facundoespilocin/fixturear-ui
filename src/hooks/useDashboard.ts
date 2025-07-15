import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { dashboardMocks } from "../api/mocks/dashboardMocks";
import type { Match, Standing, TopPlayer, Tournament } from "../types";

type DashboardData = {
  tournament: Tournament;
  standings: Standing[];
  topScorer: TopPlayer;
  topYellow: TopPlayer;
  upcomingMatches: Match[];
};

const USE_MOCK = true; 

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        let response: DashboardData;

        if (USE_MOCK) {
          response = await dashboardMocks.getDashboard();
        } else {
          response = await apiClient.get<DashboardData>("/dashboard");
        }
        
        setData(response);
      } catch (err) {
        console.error("Error loading dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { data, loading };
}
