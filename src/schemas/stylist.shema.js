import { z } from 'zod';

export const stylistValidation = z.object({

  stylist_firstname: z
  .string()
  .min(5, { message: 'Ingresa por lo menos 5 caracteres' })
  .max(25, { message: 'Exceso de caracteres' }),
  stylist_lastname: z
  .string()
  .min(5, { message: 'Ingresa por lo menos 5 caracteres' })
  .max(25, { message: 'Exceso de caracteres' }),
  marital_status: z
  .string()
  .min(5, { message: 'Seleccione una opcion' })
  .max(25, { message: 'Exceso de caracteres' }),
    gender:  z
    .string()
    .min(2, { message: 'Seleccione una opcion' })
    .max(25, { message: 'Exceso de caracteres' }),
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
