import React from 'react';

import OrganizationForm from './OrganizationsForm';
import { ORGANIZATIONS_FORM_TYPE } from './OrganizationsForm';

function OrganizationsUpdate({ orgData }) {
  return (
    <div className=" flex h-full w-full bg-neutral-800 px-12">
      <div className="w-full py-8">
        <h1 className="mb-8 text-center text-2xl font-bold text-purple-500">
          Datos de tu Empresa
        </h1>
        <OrganizationForm
          formType={ORGANIZATIONS_FORM_TYPE.update}
          orgData={orgData}
        />
      </div>
    </div>
  );
}

export default OrganizationsUpdate;
