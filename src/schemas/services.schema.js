import { z } from 'zod';

export const serviceValidation = z.object({
  service_name: z
    .string()
    .min(5, { message: 'Ingresa por lo menos 5 caracteres' })
    .max(25, { message: 'Maximo 25 de caracteres' }),
  service_price: z.string().nonempty({ message: 'Ingrese valor del Servicio' }),
  service_duration: z
    .string()
    .nonempty({ message: 'Ingrese duracion del Servicio' }),
});
