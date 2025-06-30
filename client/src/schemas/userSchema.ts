import * as yup from 'yup';

export const userSchema = yup.object({
  nombre: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  rol_id: yup.string().uuid().required()
});

export type UserFormValues = yup.InferType<typeof userSchema>;
