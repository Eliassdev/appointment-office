import { z } from 'zod';

export const branchValidation = z.object({
  short_name: z
    .string()
    .min(5, { message: 'Ingresa por lo menos 5 caracteres' })
    .max(25, { message: 'Exceso de caracteres' }),
  business_name: z
    .string()
    .min(5, { message: 'Ingresa por lo menos 5 caracteres' }),
  country: z
    .string()
    .nonempty({ message: 'Selecciona el pais donde tu sucursal opera' }),
  state: z
    .string()
    .nonempty({ message: 'Selecciona la provincia donde tu sucursal opera' }),
  city: z
    .string()
    .nonempty({ message: 'Escribe la ciudad donde tu sucursal opera' }),
  street: z
    .string()
    .nonempty({ message: 'Escribe la ciudad donde tu sucursal opera' }),
  address: z
    .string()
    .nonempty({ message: 'Selecciona la direccion de tu sucursal' }),
  postal_code: z
    .string()
    .nonempty({ message: 'Escribi el codigo postal de tu sucursal' }),
  address_references: z
    .string()
    .max(30, { message: 'Puede escribir hasta 30 caracteres' }),
  business_phone: z
    .string()
    .nonempty({
      message: 'Escribe un numero de telefono para contactar a tu sucursal',
    })
    .max(15, {
      message: 'Puedes escribir hasta 15 caracteres como maximo en este campo',
    }),
  email: z
    .string()
    .email({ message: 'Escribe un mail valido para este campo' }),
});
