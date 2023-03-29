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
      <div>
        {console.log('Organization: ', org)}
        <h1 className="text-white">Organization Name: {org.business_name}</h1>
        <OrganizationsDetail data={org} />
      </div>
    );
  }
};

export default OrganizationsPanel;
