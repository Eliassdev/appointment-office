import React, { useState } from "react";
import BranchForm from "../components/BranchForm/BranchForm.component";
import CreationNav from "../components/CreationNav/CreationNav";
import OrganizationsDashboard from "../components/Organizations/OrganizationsDashboard.component";
import ServicesForm from "../components/ServicesForm/ServicesForm.component";
import StylistsForm from "../components/StylistsForm/StylistsForm.component";
import StylistTable from "../components/StylistsForm/StylistTable";

const Dashboard = () => {
  const [Step, setStep] = useState("overview");
  function renderSwitch(step) {
    switch (step) {
      case "branch":
        return (
          <div className="w-full h-screen">
            <BranchForm />
          </div>
        );
      case "stylist":
        return (
          <div className="w-full h-screen">
            <StylistsForm />
          </div>
        );
      case "services":
        return (
          <div className="w-full h-screen">
            <ServicesForm />
          </div>
        );
      case "organization":
        return <OrganizationsDashboard />;
      case "overview":
        return (
          <div className="w-full h-screen">
            <StylistTable />
          </div>
        );
      default:
        return <div className="grid-span-2">{/* <StylistTable /> */}</div>;
    }
  }
  return (
    <div className="bg-neutral-700 container-xl w-full h-screen flex">
      <CreationNav setStep={setStep} />
      {renderSwitch(Step)}
    </div>
  );
};

export default Dashboard;
