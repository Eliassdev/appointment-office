import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetBranchesQuery } from '../../redux/modular/api/branches.slice';
import { BranchCard } from './BranchCard';
import { BranchPagination } from './BranchPagination';

export const BranchList = () => {
  const dispatch = useDispatch();
  const [Refresh, setRefresh] = useState(true);
  const [Page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetBranchesQuery();

  const limit = 4;
  const total = data?.length;

  const indexEnd = Page * limit;
  const indexStart = indexEnd - limit;
  let pageData = data?.slice(indexStart, indexEnd);

  useEffect(() => {
    if (Refresh === true) {
      refetch();
      setRefresh(false);
    }
  }, [Refresh]);
  console.log(pageData);

  return (
    <div className="h-full w-full bg-neutral-900 px-16 pt-2 text-center">
      <h1 className="mt-4 font-serif text-3xl uppercase text-purple-600">
        Sucursales
      </h1>
      <div className="mt-6 flex h-auto w-full flex-wrap justify-center gap-7">
        {pageData?.map((bra) => {
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
            <BranchCard key={bra.branch_id} bra={bra} />
          );
        })}
      </div>
      <div className="absolute bottom-12 w-4/6">
        <BranchPagination
          total={total}
          limit={limit}
          setPage={setPage}
          Page={Page}
        />
      </div>
    </div>
  );
};