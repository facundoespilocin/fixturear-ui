export type AuthResponse = {
  id: number;
  fullName: string;
  email: string;
  token: string;
  userData: any;
  // refreshToken: {
  //   userId: number;
  //   token: string;
  //   created: string;
  //   expires: string;
  // }
};