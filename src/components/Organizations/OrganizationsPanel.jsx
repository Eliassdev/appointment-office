import React, { useEffect } from 'react';
import Button from '../../CustomComponents/Button/Button.component';
import { useGetOrganizationByIdQuery } from '../../redux/modular/api/organizations.slice';
import OrganizationsDetail from './OrganizationsDetail';

const OrganizationsPanel = () => {
  const organizationId = localStorage.getItem('organizationId');

  const {
    data: org = {},
    isLoading,
    isSuccess,
    isError,
  } = useGetOrganizationByIdQuery(organizationId);

  console.log('OrganizationId: ', organizationId);
  console.log('Organization: ', org);

  if (isSuccess) {
    return (
      <div
        id="organization_detail-bg"
        className="flex h-full w-full px-12 py-8"
      >
        <div
          id="organization_detail-container"
          className="h-full w-full bg-neutral-900 px-16 py-6 text-center"
        >
          <OrganizationsDetail data={org} />
        </div>
      </div>
    );
  }
};

export default OrganizationsPanel;
