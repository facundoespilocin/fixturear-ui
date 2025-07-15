import { useState } from "react";

interface PersonalDataProps {
  user: {
    name: string;
    email: string;
    role?: string;
  };
}

export default function PersonalData({ user }: PersonalDataProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Datos personales</h2>

      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="mt-4">
        <label className="block mb-2 font-semibold">Celular</label>
        <input 
          type="text"
          className="border p-2 rounded w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ingrese su número"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2 font-semibold">Cambiar contraseña</label>
        <input 
          type="password"
          className="border p-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nueva contraseña"
        />
      </div>

      <button className="mt-6 px-4 py-2 btn-primary">
        Guardar cambios
      </button>
    </div>
  );
}
