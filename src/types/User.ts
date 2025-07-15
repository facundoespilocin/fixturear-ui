import type { Subscription } from "./Subscription";

export interface User {
  id: number;
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  role?: string;
  subscription?: Subscription;
}
