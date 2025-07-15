import { formatEnum } from "../utils/formatEnum";
import type { User } from "../types/User"
import { SubscriptionTypes } from "../constants";

export default function ProfileHome({ user }: {user: User}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">¡Hola {user.fullName}!</h2>
      <p>Bienvenido a tu panel. Acá podés gestionar tus datos personales, suscripción y pagos.</p>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="p-4 bg-green-50 rounded-xl shadow">
          <h4 className="font-bold text-green-700">Plan actual</h4>
          <p className="mt-1">
            {user.subscription?.type
            ? formatEnum(
              SubscriptionTypes,
              user.subscription.type,
              {
                BASIC: "Basico",
                PREMIUM: "Premium"
              })
            : "-"}
          </p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-xl shadow">
          <h4 className="font-bold text-yellow-700">Último acceso</h4>
          <p className="mt-1">2025-07-10</p>
        </div>
      </div>
    </div>
  );
}
