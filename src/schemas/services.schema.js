import { z } from 'zod';

export const serviceValidation = z.object({
  // stylist_id: z.number({
  //   required_error: 'Selecciona al estilista que presta este servicio',
  // }),
  service_name: z
    .string()
    .min(5, { message: 'Ingresa por lo menos 5 caracteres' })
    .max(25, { message: 'Maximo 25 de caracteres' }),
  service_price: z
    .number({ required_error: 'Ingresa un precio para el servicio' })
    .min(20, { message: 'Duracion minima: ARS$10000.' })
    .max({ message: 'Duracion Maxima: ARS$500' }),
  service_duration: z
    .number({ required_error: 'Ingresa cuanto dura el servicio' })
    .min(20, { message: 'Duracion minima: 20 minutos.' })
    .max({ message: 'Duracion Maxima: 180 minutos' }),
});
