import { useEffect, useState } from 'react';

// React Router

// React Router
import { useNavigate } from 'react-router-dom';

// Redux

// Redux
import { useGetServicesQuery } from '../../redux/modular/api/services.slice';
import { useGetStylistQuery } from '../../redux/modular/api/stylists.slice';

// Components
import NewServiceNav from './ServicesNewServiceNav';
import ServicesTable from './ServicesTable';

export const ServicesPanel = () => {
  const navigate = useNavigate();
  const [Refresh, setRefresh] = useState(true);

  const {
    data: services,
    isLoading: isLoadingSer,
    isError: isErrorSer,
    refetch,
  } = useGetServicesQuery();
  const {
    data: stylists,
    isLoading: isLoadingSty,
    isError: isErrorSty,
  } = useGetStylistQuery();

  useEffect(() => {
    if (Refresh === true) {
      refetch();
      setRefresh(false);
    }
  }, [Refresh]);

  return (
    <div className=" flex h-full w-full bg-neutral-800 px-12">
      <div className="w-full py-8">
        <h1 className="mb-8 text-center text-2xl font-bold text-purple-500">
          Servicios
        </h1>
        <div className="flex h-auto w-full flex-col rounded-md bg-neutral-900 px-10 py-8">
          <ServicesTable services={services} stylists={stylists} />
          <NewServiceNav />
        </div>
      </div>
    </div>
  );
};
