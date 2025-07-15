export const ApiRoutes = {
  //Auth
  AUTH: "/auth",
  AUTHENTICATE: "/authenticate",

  // Users
  USERS: "/users",
  USER_DATA: "/me",
  USER_DETAIL: (id: number) => `/users/${id}`,

  // Subscriptions
  SUBSCRIPTIONS: "/subscriptions",

  // Payments
  PAYMENTS: "/payments",
};
