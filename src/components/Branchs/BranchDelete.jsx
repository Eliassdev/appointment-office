import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteBranchMutation,
  useGetBranchByIdQuery,
} from '../../redux/modular/api/branches.slice';
import CreationNav from '../CreationNav/CreationNav';

export const BranchDelete = () => {
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
    DeleteBranch,
    { isSuccess: isSuccessDeletion, isLoading: isLoadingDeletion },
  ] = useDeleteBranchMutation();
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
          Detalles de la sucursal{' '}
          <span className="text-amber-500 underline underline-offset-8">
            {bra.branch_name}
          </span>
        </p>
        <h4 className="mt-6 text-lg text-amber-500">Nombre de Sucursal</h4>
        <p className="text-md mt-1 text-white">{bra.branch_name}</p>
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
              ¿Esta seguro que desea eliminar esta sucursal?
            </h1>
            <button
              id={bra.branch_id}
              onClick={(e) => {
                const info = {
                  id: e.target.id,
                };
                DeleteBranch(info);
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
            Eliminando la sucursal
            <span className="text-amber-500">{bra.branch_name}</span>
          </p>
        </div>
      ) : null}
      {isSuccessDeletion === true ? (
        <div className="absolute bottom-10 left-80 flex flex-row">
          <p className="mt-2 text-lg text-purple-500">
            Sucursal eliminado correctamente. Redirigiendo al panel de
            sucursales...
          </p>
        </div>
      ) : null}
    </div>
  );
};
