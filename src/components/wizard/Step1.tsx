import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Card from "../Card";
import { FaRegSmile, FaCrown } from "react-icons/fa";

type Step1Props = {
  next: () => void;
};

export default function Step1({ next }: Step1Props) {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const selectedSubscription = watch("subscription");

  useEffect(() => {
    if (!selectedSubscription) {
      setValue("subscription", "basic");
    }
  }, [selectedSubscription, setValue]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card
          title="Plan Básico"
          icon={<FaRegSmile />}
          selected={selectedSubscription === "basic"}
          onClick={() => setValue("subscription", "basic")}
          footer={<span className="text-green-600 font-semibold">Gratis por 15 días</span>}>
            
            <p>Organizá torneos con tabla de posiciones y resultados ilimitados durante tu prueba gratuita.</p>
        </Card>

        <Card
          title="Plan Premium"
          icon={<FaCrown />}
          selected={selectedSubscription === "premium"}
          onClick={() => setValue("subscription", "premium")}
          footer={<span className="text-yellow-500 font-semibold">USD 9.99 / mes</span>}>
            <p>Agregá personalización avanzada, reportes y soporte prioritario a tu torneo.</p>
        </Card>
      </div>

      <button onClick={next} className="btn-primary w-full">
        Siguiente
      </button>
    </>
  );
}
