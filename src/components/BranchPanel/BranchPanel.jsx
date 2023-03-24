import { Button } from 'bootstrap';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreationNav from '../CreationNav/CreationNav';
import { BranchList } from './BranchList';

export const BranchPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-neutral-800 h-screen w-full flex px-12">
      <CreationNav />
      <div className="w-full  ml-56 py-8">
        <BranchList />
        <button
          onClick={() => {
            navigate('/dashboard/branch/create');
          }}
          className="bg-neutral-900 px-4 py-2 rounded-full border-2 border-purple-600 text-purple-600 absolute bottom-12 right-32"
        >
          Crear Sucursal
        </button>
      </div>
    </div>
  );
};
