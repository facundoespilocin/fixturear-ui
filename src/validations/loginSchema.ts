import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email inválido")
    .max(50)
    .required("Email es obligatorio"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .max(16, "Máximo 16 caracteres")
    .required("Contraseña es obligatoria"),
}).required();