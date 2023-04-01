import React from 'react';

import OrganizationForm from './OrganizacionsForm';
import { ORGANIZATIONS_FORM_TYPE } from './OrganizacionsForm';

function OrganizationsUpdate({ orgData }) {
  return (
    <>
      <OrganizationForm
        formType={ORGANIZATIONS_FORM_TYPE.edit}
        orgData={orgData}
      />
    </>
  );
}

export default OrganizationsUpdate;
