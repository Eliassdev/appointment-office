import React, { useState, useEffect } from 'react';

// Organizations Components
import OrganizationsDetail from './OrganizationsDetail';
import OrganizationsUpdate from './OrganizationsUpdate';

// Redux
import { useGetOrganizationByIdQuery } from '../../redux/modular/api/organizations.slice';

// React Router
import { useLocation } from 'react-router-dom';

const OrganizationsPanel = () => {
  const [location, setLocation] = useState(null);
  const [Refresh, setRefresh] = useState(true);

  // Get organizationId from localStorage
  const organizationId = localStorage.getItem('organizationId');

  // Get organization data from API
  const { data, isLoading, isSuccess, isError, refetch } =
    useGetOrganizationByIdQuery(organizationId);

  const renderOption = {
    detail: <OrganizationsDetail orgData={data} />,
    update: <OrganizationsUpdate orgData={data} />,
    delete: <OrganizationsDetail orgData={data} />,
  };

  // Get path from location
  const path = useLocation().pathname;

  useEffect(() => {
    // Refectching data
    if (Refresh === true) {
      refetch();
      setRefresh(false);
    }
    // Define location based on path
    if (path.includes('/dashboard/organizations/update/')) {
      setLocation('update');
    } else if (path.includes('/dashboard/organizations/delete/')) {
      setLocation('delete');
    } else if (path.includes('/dashboard/organizations')) {
      setLocation('detail');
    }
  }, [path, Refresh]);

  if (isLoading) {
    return (
      <div
        id="organization_detail-bg"
        className="flex h-full w-full px-12 py-8"
      >
        <div
          id="organization_detail-container"
          className="h-full w-full bg-neutral-900 px-16 py-6 text-center"
        >
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        id="organization_detail-bg"
        className="flex h-full w-full px-12 py-8"
      >
        <div
          id="organization_detail-container"
          className="h-full w-full bg-neutral-900 px-16 py-6 text-center"
        >
          <p>Error</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div
        id="organization_detail-bg"
        className="flex h-full w-full px-12 py-8"
      >
        {
          // Render the component based on the location state
          renderOption[location]
        }
      </div>
    );
  }
};

export default OrganizationsPanel;
