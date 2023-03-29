import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CreationNav from '../CreationNav/CreationNav';
import { BranchList } from './BranchList';

export const BranchPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full bg-neutral-800 px-12">
      <div className="  w-full py-8">
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
