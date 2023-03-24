import React, { useState } from 'react';
import BranchForm from '../components/BranchForm/BranchForm.component';
import { BranchPanel } from '../components/BranchPanel/BranchPanel';
import CreationNav from '../components/CreationNav/CreationNav';
import OrganizationForm from '../components/OrganizacionForm/OrganizacionForm.component';
import ServicesForm from '../components/ServicesForm/ServicesForm.component';
import StylistsForm from '../components/StylistsForm/StylistsForm.component';
import StylistTable from '../components/StylistsForm/StylistTable';

const Dashboard = () => {
  const [Step, setStep] = useState('branch');
  function renderSwitch(step) {
    switch (step) {
      case 'branch':
        return (
          <div className="w-full px-8 py-12 ">
            <BranchPanel />
          </div>
        );
      case 'stylist':
        return (
          <div className="w-full px-12 py-8">
            <StylistsForm />
          </div>
        );
      case 'services':
        return (
          <div className="w-full px-12 py-8">
            <ServicesForm />
          </div>
        );
      case 'organization':
        return (
          <div className="w-full px-12 py-8">
            <OrganizationForm />
          </div>
        );
      case 'overview':
        return (
          <div className="w-full px-12 py-8">
            <StylistTable />
          </div>
        );
      default:
        return <div className="grid-span-2">{/* <StylistTable /> */}</div>;
    }
  }
  return (
    <div className="bg-neutral-700 container-xl w-screen h-screen flex">
      <CreationNav setStep={setStep} />
      <StylistTable />
      {Step === 'branch' ? null : renderSwitch(Step)}
    </div>
  );
};

export default Dashboard;
