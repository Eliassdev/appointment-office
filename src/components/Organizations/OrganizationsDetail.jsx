import React from 'react';

// Components
import OrganizationForm from './OrganizationsForm';

// Constants
import { ORGANIZATIONS_FORM_TYPE } from './OrganizationsForm';

function OrganizationsDetail({ orgData }) {
  return (
    <div className=" flex h-full w-full bg-neutral-800 px-12">
      <div className="w-full py-8">
        <h1 className="mb-8 text-center text-2xl font-bold text-purple-500">
          Datos de tu Empresa
        </h1>
        <OrganizationForm
          formType={ORGANIZATIONS_FORM_TYPE.read}
          orgData={orgData}
        />
      </div>
    </div>
  );
}

export default OrganizationsDetail;
