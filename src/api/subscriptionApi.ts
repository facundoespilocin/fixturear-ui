import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createSubscription = async (plan: string) => {
  return axios.post(`${API_URL}/subscription`, { plan });
};
