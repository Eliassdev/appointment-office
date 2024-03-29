import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBranchMutation } from '../../redux/modular/api/branches.slice';

export const BranchCard = ({ bra, navigateOut }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md basis-1/2 overflow-hidden rounded bg-neutral-800   ">
      <div className="px-6 py-4">
        <div className="mb-2 text-left text-xl font-bold text-amber-500">
          {bra.branch_name}
        </div>
        <div className="mt-2 flex flex-col justify-start text-left">
          <h4 className="text-purple-600">Ubicacion</h4>
          <p className="text-sm text-white">
            {bra.address +
              ', ' +
              bra.city +
              ', ' +
              bra.state +
              ', ' +
              bra.country}
          </p>
          <h4 className="text-purple-600">Telefono</h4>
          <p className="text-sm text-white">{bra.business_phone}</p>
          <h4 className="text-purple-600">Email</h4>
          <p className="text-sm text-white">{bra.email}</p>
        </div>
      </div>
      <div className="space-x-3 px-6 pb-2">
        <button
          className="w-28 rounded-full border-2 border-purple-600 bg-neutral-800 px-4 py-2 text-purple-600"
          onClick={() => {
            navigateOut(`/dashboard/branch/${bra.branch_id}`);
          }}
        >
          Detalles
        </button>
        <button
          className="w-28 rounded-full border-2 border-amber-500 bg-neutral-800 px-4 py-2 text-amber-500"
          onClick={() => {
            navigateOut(`/dashboard/branch/update/${bra.branch_id}`);
          }}
        >
          Editar
        </button>
        <button
          id={bra.branch_id}
          onClick={(e) => {
            navigateOut(`/dashboard/branch/delete/${bra.branch_id}`);
          }}
          className="w-28 rounded-full border-2 border-red-600 bg-neutral-800 px-4 py-2 text-red-600"
        >
          Eliminar
        </button>
      </div>
      {/* <div
        className={`w-screen h-screen absolute ${
          Show ? 'flex' : 'hidden'
        } bg-black bg-opacity-50 top-0 left-0 pt-44 justify-center`}
      >
        {isLoading === false && isSuccess === false ? (
          <div className="w-2/6 h-2/6 bg-neutral-800 px-8 py-4 rounded-md">
            <h3 class="text-center text-purple-600 font-bold text-2xl">
              Confirmacion
            </h3>
            <p className="text-white mt-6">
              ¿Esta seguro que desea eliminar{' '}
              <span className="text-amber-500">{bra.branch_name}</span>?
            </p>
            <div className="flex flex-row justify-center space-x-5 mt-10">
              <button
                id={bra.branch_id}
                onClick={(e) => {
                  const info = {
                    id: e.target.id,
                  };
                  DeleteBranch(info);
                }}
                className="px-4 py-2 border border-green-500 text-green-500 rounded-full"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setShow(false);
                }}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-full"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : null}
        {/* {isLoading ? (
          <div className="w-2/6 h-2/6 bg-neutral-800 px-8 py-4 rounded-md">
            <h3 class="text-center text-purple-600 font-bold text-2xl">
              Confirmado
            </h3>
            <p className="text-white mt-6">
              Eliminando la sucursal
              <span className="text-amber-500">{bra.branch_name}</span>
            </p>
          </div>
        ) : null}
        {isSuccess ? (
          <div className="w-2/6 h-2/6 bg-neutral-800 px-8 py-4 rounded-md">
            <h3 class="text-center text-purple-600 font-bold text-2xl">
              Operacion Exitosa
            </h3>
            <p className="text-white mt-6">Sucursal eliminado correctamente</p>
          </div>
        ) : null} 
      </div> */}
    </div>
  );
};
