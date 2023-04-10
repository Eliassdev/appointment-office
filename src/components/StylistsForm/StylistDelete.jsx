import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteStylistMutation,
  useGetStylistByIdQuery,
} from '../../redux/modular/api/stylists.slice';

export const StylistDelete = () => {
  const [InAnimation, setInAnimation] = useState(true);
  const [OutAnimation, setOutAnimation] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: bra = {}, isLoading, isSuccess } = useGetBranchByIdQuery(id);

  const navigateOut = (path) => {
    setOutAnimation(true);
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  const [
    StylistBranch,
    { isSuccess: isSuccessDeletion, isLoading: isLoadingDeletion },
  ] = useDeleteStylistMutation();
  return (
    <div
      className={` ${
        InAnimation
          ? 'flex h-screen w-full bg-neutral-800 px-12 animate-in slide-in-from-right duration-1000'
          : 'hidden'
      } ${
        OutAnimation
          ? 'flex h-screen w-full bg-neutral-800 px-12 animate-out slide-out-to-left duration-1000'
          : null
      }`}
    >
      <div className="  w-full px-12 py-8">
        <p className="mt-6 text-3xl text-purple-500">
          Detalles de Estilistas{' '}
          <span className="text-amber-500 underline underline-offset-8">
            {bra.stylist_firstname}
          </span>
        </p>
        <h4 className="mt-6 text-lg text-amber-500">Nombre de Estilista</h4>
        <p className="text-md mt-1 text-white">{bra.stylist_firstname}</p>
        <h4 className="mt-2 text-lg text-amber-500">Direccion</h4>
        <p className="text-md mt-1 text-white">{bra.address}</p>
        <h4 className="mt-2 text-lg text-amber-500">Referencia</h4>
        <p className="text-md mt-1 text-white">{bra.address_references}</p>
        <h4 className="mt-2 text-lg text-amber-500">Ciudad</h4>
        <p className="text-md mt-1 text-white">{bra.city}</p>
        <h4 className="mt-2 text-lg text-amber-500">Provincia</h4>
        <p className="text-md mt-1 text-white">{bra.state}</p>
        <h4 className="mt-2 text-lg text-amber-500">Pais</h4>
        <p className="text-md mt-1 text-white">{bra.country}</p>
        <h4 className="mt-2 text-lg text-amber-500">Codigo Postal</h4>
        <p className="text-md mt-1 text-white">{bra.postal_code}</p>
        <h4 className="mt-2 text-lg text-amber-500">Telefono</h4>
        <p className="text-md mt-1 text-white">{bra.business_phone}</p>
        <h4 className="mt-2 text-lg text-amber-500">E-mail</h4>
        <p className="text-md mt-1 text-white">{bra.email}</p>
        {isSuccessDeletion === false && isLoadingDeletion === false ? (
        <div className="mt-5 flex flex-row justify-start space-x-5">
          <h1 className="mt-2 text-lg text-purple-500">
            ¿Esta seguro que desea eliminar al estilista?
          </h1>
          <button
            id={bra.branch_id}
            onClick={(e) => {
              const info = {
                id: e.target.id,
              };
              DeleteStylist(info);
              setTimeout(() => {
                navigateOut('/dashboard/branches');
              }, 500);
            }}
            className="rounded-full border border-green-500 px-4 py-2 text-green-500"
          >
            Confirmar
          </button>
          <button
            onClick={() => {
              navigateOut('/dashboard/branches');
            }}
            className="rounded-full border border-red-500 px-4 py-2 text-red-500"
          >
            Cancelar
          </button>
        </div>
      ) : null}
      </div>
      {isLoadingDeletion === true ? (
        <div className="absolute bottom-10 left-80 flex flex-row">
          <p className="mt-2 text-lg text-purple-500">
            Eliminando Estilista
            <span className="text-amber-500">{bra.branch_name}</span>
          </p>
        </div>
      ) : null}
      {isSuccessDeletion === true ? (
        <div className="absolute bottom-10 left-80 flex flex-row">
          <p className="mt-2 text-lg text-purple-500">
            Estilista eliminado correctamente. Redirigiendo al panel de
            estilistas...
          </p>
        </div>
      ) : null}
    </div>
  );
};

