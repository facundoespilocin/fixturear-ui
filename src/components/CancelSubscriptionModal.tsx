import { FaExclamationTriangle } from "react-icons/fa";

interface CancelSubscriptionModalProps {
  toDate: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CancelSubscriptionModal({
  toDate,
  onConfirm,
  onCancel,
}: CancelSubscriptionModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="text-yellow-500 text-2xl" />
          <h2 className="text-xl font-semibold">Cancelar suscripción</h2>
        </div>
        <p className="mb-4">
          Vas a cancelar tu suscripción, pero vas a poder utilizar los servicios hasta la próxima fecha de cobro: <strong>{new Date(toDate).toLocaleDateString()}</strong>.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="btn-secondary px-4 py-2 rounded border hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 btn-primary"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
