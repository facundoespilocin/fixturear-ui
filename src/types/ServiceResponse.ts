export type ServiceResponse<T> = {
  errors: { code: string; message: string; details?: string }[];
  data: T;
};