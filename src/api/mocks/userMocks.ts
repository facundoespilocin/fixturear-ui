// src/api/mocks/userMocks.ts
import type { User } from "../../types/User";
import type { Subscription } from "../../types/Subscription";

const dummySubscription: Subscription = {
  id: 1,
  type: "basic",
  fromDate: "2025-07-01",
  toDate: "2025-08-01",
  active: true,
  paymentMethod: "mercadopago",
};

const dummyUser: User = {
  id: 1,
  name: "Facundo Espilocin",
  email: "facundo@example.com",
  role: "admin",
  subscription: dummySubscription
};

export const userMocks = {
  get<T>(url: string, params?: any): Promise<T> {
    if (url === "/users/me") {
      return Promise.resolve(dummyUser as unknown as T);
    }
    return Promise.reject(["Not found"]);
  },
  post<T>(url: string, body?: any): Promise<T> {
    return Promise.resolve({} as T);
  },
  put<T>(url: string, body?: any): Promise<T> {
    return Promise.resolve({} as T);
  },
  delete<T>(url: string): Promise<T> {
    return Promise.resolve({} as T);
  }
};
