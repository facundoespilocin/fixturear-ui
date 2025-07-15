import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

type Step2Props = {
  next: () => void;
  prev: () => void;
};

export default function Step2({ next, prev }: Step2Props) {
  const { watch, setValue, register, formState: { errors } } = useFormContext();
  const selectedSubscription = watch("subscription");

  useEffect(() => {
    if (!selectedSubscription) {
      setValue("subscription", "basic");
    }
  }, [selectedSubscription, setValue]);

  return (
    <>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nombre</label>

        <input
          type="text"
          maxLength={20}
          {...register("name")}
          className={`input w-full ${errors.name ? "border-red-500" : ""}`}/>
          
        {typeof errors.name?.message === "string" && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Apellido</label>

        <input
          type="text"
          maxLength={20}
          {...register("surname")}
          className={`input w-full ${errors.surname ? "border-red-500" : ""}`}/>

        {typeof errors.surname?.message === "string" && (
          <p className="text-red-500 text-sm">{errors.surname.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email</label>

        <input
          type="email"
          maxLength={50}
          {...register("email")}
          className={`input w-full ${errors.email ? "border-red-500" : ""}`}/>
          
        <small className="text-gray-600">Te vamos a enviar notificaciones importantes.</small>

        {typeof errors.email?.message === "string" && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Confirmar Email</label>

        <input
          type="email"
          maxLength={50}
          {...register("confirmEmail")}
          className={`input w-full ${errors.confirmEmail ? "border-red-500" : ""}`}/>

        {typeof errors.confirmEmail?.message === "string" && (
          <p className="text-red-500 text-sm">{errors.confirmEmail.message}</p>
        )}
      </div>

      <div className="mb-4 flex gap-4">
        <div className="basis-1/3">
          <label className="block mb-1 font-semibold">Código de área</label>

          <input
            type="text"
            maxLength={4}
            {...register("areaCode")}
            placeholder="+54"
            className={`input w-full ${errors.areaCode ? "border-red-500" : ""}`}/>

          <small className="text-gray-600">Solo números, el "+" se añade automáticamente.</small>

          {typeof errors.areaCode?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.areaCode.message}</p>
          )}
        </div>
        <div className="basis-2/3">
          <label className="block mb-1 font-semibold">Número de celular</label>

          <input
            type="text"
            maxLength={14}
            {...register("phoneNumber")}
            className={`input w-full ${errors.phoneNumber ? "border-red-500" : ""}`}/>

          <small className="text-gray-600">Vas a poder usar este número para recibir notificaciones.</small>

          {typeof errors.phoneNumber?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Contraseña</label>

        <input
          type="password"
          minLength={6}
          maxLength={16}
          {...register("password")}
          className={`input w-full ${errors.password ? "border-red-500" : ""}`}/>

        <small className="text-gray-600">
          <p>Mínimo 6 caracteres.</p>
          <p>Máximo 16 caracteres.</p>
          <p>Al menos una mayúscula</p>
          <p>No se permiten secuencias simples como "123456", "112233".</p>
        </small>

        {typeof errors.password?.message === "string" && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Confirmar Contraseña</label>

        <input
          type="password"
          minLength={6}
          maxLength={16}
          {...register("confirmPassword")}
          className={`input w-full ${errors.confirmPassword ? "border-red-500" : ""}`}/>

        {typeof errors.confirmPassword?.message === "string" && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={prev} className="btn-secondary">Anterior</button>
        <button type="button" onClick={next} className="btn-primary">Siguiente</button>
      </div>
    </>
  );
}
