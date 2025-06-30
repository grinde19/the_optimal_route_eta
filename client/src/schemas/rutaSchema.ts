import * as yup from 'yup';

export const puntoSchema = yup.object({
  direccion: yup.string().required(),
  lat: yup.number().required(),
  lng: yup.number().required()
});

export const rutaSchema = yup.object({
  nombre: yup.string().required(),
  origen: puntoSchema,
  entregas: yup.array(puntoSchema).min(1)
});

export type CrearRutaInput = yup.InferType<typeof rutaSchema>;
