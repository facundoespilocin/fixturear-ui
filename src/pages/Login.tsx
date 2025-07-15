import { apiClient } from "../api/apiClient";
import { ApiRoutes } from "../constants/apiRoutes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/AuthResponse";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [userName, setUserName] = useState("a@a.com");
  const [password, setPassword] = useState("asd123");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const result = await apiClient.post<AuthResponse>(
        ApiRoutes.AUTH + ApiRoutes.AUTHENTICATE,
        { userName, password }
      );

      if (result.token) {
        await login(result.token);
        navigate("/");
      } else {
        setErrors(["No se pudo iniciar sesión."]);
      }
    } catch (err) {
      if (Array.isArray(err) && err.length > 0) {
        setErrors(err.map(e => e.errorMessage ?? "Error desconocido"));
      } else {
        setErrors(["Ocurrió un error. Intenta nuevamente."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.length > 0 && (
          <div className="text-red-500 text-sm space-y-1">
            {errors.map((msg, idx) => (
              <div key={idx}>{msg}</div>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
