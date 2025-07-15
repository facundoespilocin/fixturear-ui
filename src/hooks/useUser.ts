// src/hooks/useUser.ts
import { useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";
import { toast } from "react-toastify";

type User = {
  id: number;
  name: string;
  email: string;
};

export function useUser(userId: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiClient.get<User>(`/users/${userId}`);
        setUser(data);
      } catch (errors) {
        if (Array.isArray(errors)) {
          errors.forEach(err => toast.error(err));
        } else {
          toast.error("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [userId]);

  return { user, loading };
}
