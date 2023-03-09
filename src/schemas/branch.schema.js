import { z } from 'zod';

export const branchValidation = z.object({
  short_name: z
    .string()
    .min(5, { message: 'Ingresa por lo menos 5 caracteres' })
    .max(25, { message: 'Exceso de caracteres' }),
  business_name: z
    .string()
    .min(5, { message: 'Ingresa por lo menos 5 caracteres' }),
  country: z.string({
    required_error: 'Selecciona el pais donde tu sucursal opera',
  }),
});
