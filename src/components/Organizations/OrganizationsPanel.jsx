import React, { useState } from 'react';
import Button from '../../CustomComponents/Button/Button.component';
import { useGetOrganizationByIdQuery } from '../../redux/modular/api/organizations.slice';
import { Link } from 'react-router-dom';

const OrganizationsPanel = () => {
  const organizationId = localStorage.getItem('organizationId');

  const {
    data: org = {},
    isLoading,
    isSuccess,
  } = useGetOrganizationByIdQuery(organizationId);

  const handleFindOrganization = (e) => {
    e.preventDefault();
  };

  console.log('OrganizationId: ', organizationId);
  console.log('Organization: ', org);

  return <div className=""></div>;
};

export default OrganizationsPanel;
