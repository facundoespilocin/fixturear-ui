import { useState } from "react";
import { SubscriptionTypes, PaymentMethods } from "../constants";
import CancelSubscriptionModal from "./CancelSubscriptionModal";
import type { User } from "../types/User";
import { formatEnum } from "../utils/formatEnum";

interface Props {
  user: User;
}

export default function Subscription({ user }: Props) {
  const [showModal, setShowModal] = useState(false);

  //console.log(user);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Suscripción</h2>

      <p>
        <strong>Plan:</strong>{" "}
        {user.subscription?.type
          ? formatEnum(
              SubscriptionTypes,
              user.subscription.type,
              {
                BASIC: "Basico",
                PREMIUM: "Premium"
              }
            )
          : "-"}
      </p>

      <p>
        <strong>Activo hasta:</strong>{" "}
        {user.subscription?.endDate
          ? new Date(user.subscription.endDate).toLocaleDateString()
          : "-"}
      </p>

      <p>
        <strong>Método de pago:</strong>{" "}
        {user.subscription?.paymentMethodId
          ? formatEnum(
              PaymentMethods,
              user.subscription.paymentMethodId,
              {
                VISA: "Visa",
                MASTERCARD: "Mastercard",
                MERCADO_PAGO: "MercadoPago",
              }
            )
          : "-"}
      </p>

      <button
        className="btn-primary mt-4"
        onClick={() => setShowModal(true)}
      >
        Cancelar suscripción
      </button>

      {showModal && (
        <CancelSubscriptionModal
          toDate={user.subscription?.endDate || ""}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            console.log("Cancelar en backend...");
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
