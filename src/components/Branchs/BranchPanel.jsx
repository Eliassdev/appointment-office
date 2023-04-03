import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BranchList } from './BranchList';

export const BranchPanel = () => {
  const navigate = useNavigate();
  const [InAnimation, setInAnimation] = useState(true);
  const [OutAnimation, setOutAnimation] = useState(false);

  const navigateOut = (path) => {
    setOutAnimation(true);
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };
  const navigateIn = () => {};
  return (
    <div
      className={` ${
        InAnimation
          ? 'flex h-full w-full px-12 py-8 animate-in slide-in-from-right duration-1000'
          : 'hidden'
      } ${
        OutAnimation
          ? 'flex h-full w-full px-12 py-8 animate-out slide-out-to-left duration-1000'
          : null
      }`}
    >
      <div className="h-full w-full">
        <BranchList navigateOut={navigateOut} />
        <button
          onClick={() => {
            navigateOut('/dashboard/branch/create');
          }}
          className="absolute bottom-12 right-32 rounded-full border-2 border-purple-600 bg-neutral-900 px-4 py-2 text-purple-600"
        >
          Crear Sucursal
        </button>
      </div>
    </div>
  );
};
