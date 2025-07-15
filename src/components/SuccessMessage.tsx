import { FaCheckCircle } from "react-icons/fa";

type SuccessMessageProps = {
  title: string;
  message: string;
};

export default function SuccessMessage({ title, message }: SuccessMessageProps) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow border-green-600 bg-green-50 flex flex-col items-center">
      <FaCheckCircle className="text-green-600 text-6xl mb-4" />
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-center text-lg">{message}</p>
    </div>
  );
}
