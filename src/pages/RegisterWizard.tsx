import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { registerSchema } from "../validations/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Step1 from "../components/wizard/Step1";
import Step2 from "../components/wizard/Step2";
import Step3 from "../components/wizard/Step3";
import StepsIndicator from "../components/wizard/StepsIndicator";
import SuccessMessage from "../components/SuccessMessage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      subscription: "",
      name: "",
      email: "",
      confirmEmail: "",
      areaCode: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      tournament: "",
    }
  });

  const { trigger, handleSubmit, formState: { errors } } = methods;

  const next = async () => {
    if (step === 1) {
      const valid = await trigger(["subscription"]);
      if (valid) setStep(2);
    }

    if (step === 2) {
      const valid = await trigger(["name", "email", "confirmEmail", "areaCode", "phoneNumber", "password", "confirmPassword"]);
        Object.entries(errors).forEach(([key, value]) => {
          console.log(`${key}: ${value?.message}`);
      });

      if (valid) setStep(3);
    }

    if (step === 3) {
      const valid = await trigger(["tournament"]);
      if (valid) {
        handleSubmit(onSubmit)();
      }
    }
  };

  const prev = () => setStep(step - 1);

  const onSubmit = (data: any) => {
    toast.success("Registro completado con éxito!");
    setIsSubmitted(true);
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow border-black">
        <h2 className="text-2xl font-bold mb-6">Registro</h2>

        {!isSubmitted && <StepsIndicator currentStep={step} totalSteps={3} />}

        <hr />

        {!isSubmitted ? (
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && <Step1 next={next} />}
            {step === 2 && <Step2 next={next} prev={prev} />}
            {step === 3 && <Step3 prev={prev} />}
          </form>
        ) : (
          <SuccessMessage
            title="¡Registro Exitoso!"
            message="Gracias por registrarte. Ahora puedes disfrutar de nuestra plataforma."
          />
        )}
      </div>

      <ToastContainer position="top-center" />
    </FormProvider>
  );
}
