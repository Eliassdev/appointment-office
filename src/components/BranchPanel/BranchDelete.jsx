import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteBranchMutation,
  useGetBranchByIdQuery,
} from '../../redux/modular/api/orgSlice';
import CreationNav from '../CreationNav/CreationNav';

export const BranchDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bra = {}, isLoading, isSuccess } = useGetBranchByIdQuery(id);
  const [
    DeleteBranch,
    { isSuccess: isSuccessDeletion, isLoading: isLoadingDeletion },
  ] = useDeleteBranchMutation();
  console.log(isLoadingDeletion, isSuccessDeletion);
  return (
    <div className="bg-neutral-800 h-screen w-full flex px-12">
      <CreationNav />
      <div className="w-full  ml-56 py-8 px-12">
        <p className="text-purple-500 text-3xl mt-6">
          Detalles de la sucursal{' '}
          <span className="text-amber-500 underline underline-offset-8">
            {bra.branch_name}
          </span>
        </p>
        <h4 className="text-amber-500 text-lg mt-6">Nombre de Sucursal</h4>
        <p className="text-white text-md mt-1">{bra.branch_name}</p>
        <h4 className="text-amber-500 text-lg mt-2">Direccion</h4>
        <p className="text-white text-md mt-1">{bra.address}</p>
        <h4 className="text-amber-500 text-lg mt-2">Referencia</h4>
        <p className="text-white text-md mt-1">{bra.address_reference}</p>
        <h4 className="text-amber-500 text-lg mt-2">Ciudad</h4>
        <p className="text-white text-md mt-1">{bra.city}</p>
        <h4 className="text-amber-500 text-lg mt-2">Provincia</h4>
        <p className="text-white text-md mt-1">{bra.state}</p>
        <h4 className="text-amber-500 text-lg mt-2">Pais</h4>
        <p className="text-white text-md mt-1">{bra.country}</p>
        <h4 className="text-amber-500 text-lg mt-2">Codigo Postal</h4>
        <p className="text-white text-md mt-1">{bra.postal_code}</p>
        <h4 className="text-amber-500 text-lg mt-2">Telefono</h4>
        <p className="text-white text-md mt-1">{bra.business_phone}</p>
        <h4 className="text-amber-500 text-lg mt-2">E-mail</h4>
        <p className="text-white text-md mt-1">{bra.email}</p>
        {isSuccessDeletion === false && isLoadingDeletion === false ? (
          <div className="flex flex-row justify-start space-x-5 mt-10">
            <h1 className="text-purple-500 text-lg mt-2">
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
                  navigate('/dashboard/branches');
                }, 1000);
              }}
              className="px-4 py-2 border border-green-500 text-green-500 rounded-full"
            >
              Confirmar
            </button>
            <button
              onClick={() => {
                navigate('/dashboard/branches');
              }}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-full"
            >
              Cancelar
            </button>
          </div>
        ) : null}
      </div>
      {isLoadingDeletion === true ? (
        <div className="flex flex-row absolute bottom-10 left-80">
          <p className="text-purple-500 text-lg mt-2">
            Eliminando la sucursal
            <span className="text-amber-500">{bra.branch_name}</span>
          </p>
        </div>
      ) : null}
      {isSuccessDeletion === true ? (
        <div className="flex flex-row absolute bottom-10 left-80">
          <p className="text-purple-500 text-lg mt-2">
            Sucursal eliminado correctamente. Redirigiendo al panel de
            sucursales...
          </p>
        </div>
      ) : null}
    </div>
  );
};
