import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BranchList } from './BranchList';

export const BranchPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full px-12 py-8">
      <div className="h-full w-full">
        <BranchList />
        <button
          onClick={() => {
            navigate('/dashboard/branch/create');
          }}
          className="absolute bottom-12 right-32 rounded-full border-2 border-purple-600 bg-neutral-900 px-4 py-2 text-purple-600"
        >
          Crear Sucursal
        </button>
      </div>
      <Outlet />
    </div>
  );
};
