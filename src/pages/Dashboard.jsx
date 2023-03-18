import React, { useState } from 'react';
import BranchForm from '../components/BranchForm/BranchForm.component';
import CreationNav from '../components/CreationNav/CreationNav';
import OrganizationForm from '../components/OrganizacionForm/OrganizacionForm.component';
import ServicesForm from '../components/ServicesForm/ServicesForm.component';
import StylistsForm from '../components/StylistsForm/StylistsForm.component';
import StylistTable from '../components/StylistsForm/StylistTable';

const Dashboard = () => {
  const [Step, setStep] = useState('overview');
  function renderSwitch(step) {
    switch (step) {
      case 'branch':
        return (
          <div className="w-3/4">
            <BranchForm />
          </div>
        );
      case 'stylist':
        return (
          <div>
            <StylistsForm />
          </div>
        );
      case 'services':
        return (
          <div>
            <ServicesForm />
          </div>
        );
      case 'organization':
        return (
          <div>
            <OrganizationForm />
          </div>
        );
      default:
        return (
          <div className="grid-span-2">
            <StylistTable />
          </div>
        );
    }
  }
  return (
    <div className="bg-neutral-700 container-xl w-screen h-screen flex">
      <CreationNav setStep={setStep} />
      {renderSwitch(Step)}
    </div>
  );
};

export default Dashboard;
