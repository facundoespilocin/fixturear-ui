import { useFormContext } from "react-hook-form";
import { ErrorText } from "../ErrorText";

type Step3Props = {
  prev: () => void;
};

export default function Step3({ prev }: Step3Props) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nombre del Torneo</label>
        <input
          type="text"
          {...register("tournament")}
          className={`input ${errors.tournament ? "border-red-500" : ""}`}
        />
        
        <ErrorText message={errors.tournament?.message} />
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={prev} className="btn-secondary">Anterior</button>
        <button type="submit" className="btn-primary">Registrar</button>
      </div>
    </>
  );
}
