import React from 'react';

function OrganizationsDetail({ data }) {
  const {
    short_name,
    business_name,
    country,
    state,
    city,
    street,
    address,
    postal_code,
    address_references,
    business_phone,
    email,
  } = data;

  return (
    <div className="flex h-screen w-full bg-neutral-800 px-12">
      <div className="  w-full py-8 px-12">
        <p className="mt-6 text-3xl text-purple-500">
          Detalles de la sucursal{' '}
          <span className="text-amber-500 underline underline-offset-8">
            {business_name}
          </span>
        </p>
        <h4 className="mt-6 text-lg text-amber-500">Nombre de la Empresa</h4>
        <p className="text-md mt-1 text-white">{business_name}</p>
        <h4 className="mt-2 text-lg text-amber-500">Nombre Corto</h4>
        <p className="text-md mt-1 text-white">{short_name}</p>
        <h4 className="mt-2 text-lg text-amber-500">Pais</h4>
        <p className="text-md mt-1 text-white">{country}</p>
        <h4 className="mt-2 text-lg text-amber-500">Provincia</h4>
        <p className="text-md mt-1 text-white">{state}</p>
        <h4 className="mt-2 text-lg text-amber-500">Ciudad</h4>
        <p className="text-md mt-1 text-white">{city}</p>
        <h4 className="mt-2 text-lg text-amber-500">Calle</h4>
        <p className="text-md mt-1 text-white">{street}</p>
        <h4 className="mt-2 text-lg text-amber-500">Direccion</h4>
        <p className="text-md mt-1 text-white">{address}</p>
        <h4 className="mt-2 text-lg text-amber-500">Referencia</h4>
        <p className="text-md mt-1 text-white">{address_references}</p>
        <h4 className="mt-2 text-lg text-amber-500">Codigo Postal</h4>
        <p className="text-md mt-1 text-white">{postal_code}</p>
        <h4 className="mt-2 text-lg text-amber-500">Telefono</h4>
        <p className="text-md mt-1 text-white">{business_phone}</p>
        <h4 className="mt-2 text-lg text-amber-500">E-mail</h4>
        <p className="text-md mt-1 text-white">{email}</p>
        <div className="mt-5 flex flex-row justify-start space-x-5"></div>
      </div>
    </div>
  );
}

export default OrganizationsDetail;
