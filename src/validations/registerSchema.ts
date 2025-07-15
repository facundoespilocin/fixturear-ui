import * as yup from "yup";

export const registerSchema = yup.object({
  subscription: yup
    .string()
    .oneOf(["basic", "premium"], "Es requerido seleccionar el Plan"),

  name: yup
    .string()
    .required("El nombre es obligatorio")
    .max(20, "Máximo 20 caracteres"),

  surname: yup
    .string()
    .required("El apellido es obligatorio")
    .max(20, "Máximo 20 caracteres"),

  email: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio")
    .max(50, "Máximo 50 caracteres"),

  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email")], "Los emails deben coincidir")
    .required("Tenés confirmar el email"),

  areaCode: yup
    .string()
    .matches(/^\d+$/, "Debe contener solo números")
    .required("Código de área obligatorio")
    .max(4, "Máximo 4 dígitos"),

  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Debe contener solo números")
    .required("Número de celular obligatorio")
    .max(14, "Máximo 14 dígitos"),

  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "Mínimo 6 caracteres")
    .max(16, "Máximo 16 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .notOneOf(["123456", "654321", "111111", "000000"], "Contraseña demasiado simple"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Debes confirmar la contraseña"),

  tournament: yup
    .string()
    .required("El nombre del torneo es obligatorio"),
});
