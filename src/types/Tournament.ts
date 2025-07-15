import type { Team } from "./Team"

export interface Tournament {
  id: number;
  name: string;
  active: boolean;
  startDate: string;
  endDate: string;
  teams?: Team[];
}
