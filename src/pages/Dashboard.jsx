import React, { useState } from "react";
import CreationNav from "../components/CreationNav/CreationNav";
import BranchForm from "../components/BranchForm/BranchForm.component";
import OrganizationForm from "../components/OrganizacionForm/OrganizacionForm.component";
import StylistsForm from "../components/StylistsForm/StylistsForm.component";
import ServicesForm from "../components/ServicesForm/ServicesForm.component";

const Dashboard = () => {
  const [Step, setStep] = useState("overview");
  function renderSwitch(step) {
    switch (step) {
      case "branch":
        return (
          <div>
            <BranchForm />
          </div>
        );
      case "stylist":
        return (
          <div>
            <StylistsForm />
          </div>
        );
      case "services":
        return (
          <div>
            <ServicesForm />
          </div>
        );
      case "organization":
        return (
          <div>
            <OrganizationForm />
          </div>
        );
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
