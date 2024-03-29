import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetBranchesQuery } from '../../redux/modular/api/branches.slice';
import { BranchCard } from './BranchCard';
import { BranchPagination } from './BranchPagination';

export const BranchList = ({ navigateOut }) => {
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

  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-hidden bg-neutral-900 px-16 pt-2 text-center">
      <h1 className="mt-4 font-serif text-3xl uppercase text-purple-600">
        Sucursales
      </h1>
      <div className="mt-6 flex h-auto w-full flex-wrap justify-center gap-6">
        {pageData?.map((bra) => {
          console.log(bra);
          return (
            <BranchCard
              key={bra.branch_id}
              bra={bra}
              navigateOut={navigateOut}
            />
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
