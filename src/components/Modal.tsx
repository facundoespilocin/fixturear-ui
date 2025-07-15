import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 btn-secondary text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
