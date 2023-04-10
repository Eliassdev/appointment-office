import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServicesTable = ({
  services,
  stylists,
  handleDeleteService,
  handleUpdateService,
}) => {
  const navigate = useNavigate();

  return (
    <table className="border-colapse w-full table-auto rounded-md bg-neutral-700">
      <thead className="w-full rounded-md bg-amber-500 text-left text-white">
        <tr>
          <td className=" px-2 py-2 text-lg">Nombre</td>
          <td className=" px-2 py-2 text-lg">Precio</td>
          <td className=" px-2 py-2 text-lg">Duracion</td>
          <td className=" px-2 py-2 text-lg">Estilista</td>
          <td className=" px-2 py-2 text-lg">Status</td>
          <td className="text-center">Detalles</td>
          <td className="text-center">Editar</td>
          <td className="text-center">Eliminar</td>
        </tr>
      </thead>
      <tbody className="text-left">
        {services?.map((ser) => {
          const stylist = stylists?.find(
            (sty) => sty.stylist_id === ser.stylist_id
          );
          return (
            <tr className="border-b border-t border-neutral-500">
              <td className="  px-2 py-1 text-white">{ser.service_name}</td>
              <td className=" px-2 py-1 text-white">${ser.service_price}</td>
              <td className=" px-2 py-1 text-white">{ser.service_duration}"</td>
              <td className=" px-2 py-1 text-white">
                <button
                  className="underline underline-offset-2"
                  onClick={() => {
                    navigate(`/dashboard/stylist/${ser.stylist_id}`);
                  }}
                >
                  {stylist?.stylist_firstname + ' ' + stylist?.stylist_lastname}
                </button>
              </td>
              <td className=" px-2 py-1 text-white">Activo</td>
              <td className=" px-2 py-1 text-center text-white">
                <button
                  className="rounded-full bg-neutral-800 px-2 py-1"
                  onClick={() => {
                    navigate(`/dashboard/services/${ser.service_id}`);
                  }}
                >
                  Ver detalles
                </button>
              </td>
              <td className=" px-2 py-1 text-center text-white">
                <button
                  className="rounded-full bg-purple-600 px-2 py-1"
                  onClick={() => {
                    navigate(`/dashboard/services/update/${ser.service_id}`);
                  }}
                >
                  Editar
                </button>
              </td>
              <td className=" px-2 py-1 text-center text-white">
                <button
                  className="rounded-full bg-red-700 px-2 py-1"
                  onClick={() => {
                    navigate(`/dashboard/services/delete/${ser.service_id}`);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ServicesTable;
