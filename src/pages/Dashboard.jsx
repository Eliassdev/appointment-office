import React, { useState } from 'react';
import CreationNav from '../components/CreationNav/CreationNav';

const Dashboard = () => {
  const [Step, setStep] = useState('overview');
  function renderSwitch(step) {
    switch (step) {
      case 'branch':
        return <div>Branch Form</div>;
      case 'stylist':
        return <div>Stylist Form</div>;
      case 'services':
        return <div>Services Form</div>;
      default:
        return <div>overview</div>;
    }
  }
  return (
    <div>
      <CreationNav setStep={setStep} />
      {renderSwitch(Step)}
    </div>
  );
};

export default Dashboard;
