import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetBranchesQuery } from '../../redux/modular/api/orgSlice';
import { BranchCard } from './BranchCard';

export const BranchList = () => {
  const dispatch = useDispatch();
  const [Refresh, setRefresh] = useState(true);
  const { data, isLoading, refetch } = useGetBranchesQuery();

  useEffect(() => {
    if (Refresh === true) {
      refetch();
      setRefresh(false);
    }
  }, [Refresh]);
  console.log(data);
  return (
    <div className="w-full h-full text-center px-16 pt-4 bg-neutral-900">
      <h1 className="font-serif text-2xl uppercase text-fuchsia-400">
        Sucursales
      </h1>
      <div className="w-full h-auto mt-5 flex flex-wrap justify-center  gap-8">
        {data?.map((bra) => {
          console.log(bra);
          return (
            // <div className="w-3/12 h-60 rounded-lg bg-neutral-700 py-2">
            //   <h3 className="mb-2 text-xl ">{bra.branch_name}</h3>
            //   <hr className="border-purple-600"></hr>
            //   <div className="flex justify-start px-4">
            //     <p>Ubicacion:</p>
            //   </div>
            //   <div className="w-64 ml-1 flex flex-row absolute bg-red-500 bottom-2">

            //   </div>
            // </div>
            <BranchCard bra={bra} />
          );
        })}
      </div>
    </div>
  );
};
