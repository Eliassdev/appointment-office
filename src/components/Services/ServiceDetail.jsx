import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetServiceByIdQuery } from '../../redux/modular/api/services.slice';
import { useGetStylistByIdQuery } from '../../redux/modular/api/stylists.slice';

export const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: ser = {}, isLoading, isSuccess } = useGetServiceByIdQuery(id);
  const {
    data: sty = {},
    isLoading: isLoadingSty,
    isSuccess: isSuccessSty,
  } = useGetStylistByIdQuery(ser?.stylist_id);
  console.log(sty);
  return (
    <div className="flex h-screen w-full bg-neutral-800 px-12">
      <div className="  w-full px-12 py-8">
        <p className="mt-6 text-3xl text-purple-500">
          Detalles del servicio{' '}
          <span className="text-amber-500 underline underline-offset-8">
            {ser?.service_name}
          </span>
        </p>
        <h4 className="mt-6 text-lg text-amber-500">Nombre del Servicio</h4>
        <p className="text-md mt-1 text-white">{ser?.service_name}</p>
        <h4 className="mt-2 text-lg text-amber-500">Precio</h4>
        <p className="text-md mt-1 text-white">{ser?.service_price}</p>
        <h4 className="mt-2 text-lg text-amber-500">Duracion</h4>
        <p className="text-md mt-1 text-white">{ser?.service_duration}</p>
        <h4 className="mt-2 text-lg text-amber-500">Estilista</h4>
        <p className="text-md mt-1 text-white">
          {sty?.stylist_firstname + ' ' + sty?.stylist_lastname}
        </p>
        <h4 className="mt-2 text-lg text-amber-500">Estado</h4>
        <p className="text-md mt-1 text-white">Activo</p>

        <div className="mt-5 flex flex-row justify-start space-x-5">
          <button
            onClick={() => {
              navigate(`/dashboard/service/update/${id}`);
            }}
            className="rounded-full border border-purple-600 px-4 py-2 text-purple-600"
          >
            Editar
          </button>
          <button
            onClick={() => {
              navigate('/dashboard/services');
            }}
            className="rounded-full border border-purple-600 px-4 py-2 text-purple-600"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};
